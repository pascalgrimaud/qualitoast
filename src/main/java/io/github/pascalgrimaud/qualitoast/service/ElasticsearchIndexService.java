package io.github.pascalgrimaud.qualitoast.service;

import com.codahale.metrics.annotation.Timed;
import io.github.pascalgrimaud.qualitoast.domain.*;
import io.github.pascalgrimaud.qualitoast.repository.*;
import io.github.pascalgrimaud.qualitoast.repository.search.*;
import org.elasticsearch.indices.IndexAlreadyExistsException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.elasticsearch.core.ElasticsearchTemplate;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.Serializable;
import java.lang.reflect.Method;
import java.util.List;

@Service
public class ElasticsearchIndexService {

    private final Logger log = LoggerFactory.getLogger(ElasticsearchIndexService.class);

    private final ApplicationRepository applicationRepository;

    private final ApplicationSearchRepository applicationSearchRepository;

    private final CampagneRepository campagneRepository;

    private final CampagneSearchRepository campagneSearchRepository;

    private final ResultatRepository resultatRepository;

    private final ResultatSearchRepository resultatSearchRepository;

    private final TesteurRepository testeurRepository;

    private final TesteurSearchRepository testeurSearchRepository;

    private final TypeTestRepository typeTestRepository;

    private final TypeTestSearchRepository typeTestSearchRepository;

    private final UserRepository userRepository;

    private final UserSearchRepository userSearchRepository;

    private final ElasticsearchTemplate elasticsearchTemplate;

    public ElasticsearchIndexService(
        UserRepository userRepository,
        UserSearchRepository userSearchRepository,
        ApplicationRepository applicationRepository,
        ApplicationSearchRepository applicationSearchRepository,
        CampagneRepository campagneRepository,
        CampagneSearchRepository campagneSearchRepository,
        ResultatRepository resultatRepository,
        ResultatSearchRepository resultatSearchRepository,
        TesteurRepository testeurRepository,
        TesteurSearchRepository testeurSearchRepository,
        TypeTestRepository typeTestRepository,
        TypeTestSearchRepository typeTestSearchRepository,
        ElasticsearchTemplate elasticsearchTemplate) {
        this.userRepository = userRepository;
        this.userSearchRepository = userSearchRepository;
        this.applicationRepository = applicationRepository;
        this.applicationSearchRepository = applicationSearchRepository;
        this.campagneRepository = campagneRepository;
        this.campagneSearchRepository = campagneSearchRepository;
        this.resultatRepository = resultatRepository;
        this.resultatSearchRepository = resultatSearchRepository;
        this.testeurRepository = testeurRepository;
        this.testeurSearchRepository = testeurSearchRepository;
        this.typeTestRepository = typeTestRepository;
        this.typeTestSearchRepository = typeTestSearchRepository;
        this.elasticsearchTemplate = elasticsearchTemplate;
    }

    @Async
    @Timed
    public void reindexAll() {
        reindexForClass(Application.class, applicationRepository, applicationSearchRepository);
        reindexForClass(Campagne.class, campagneRepository, campagneSearchRepository);
        reindexForClass(Resultat.class, resultatRepository, resultatSearchRepository);
        reindexForClass(Testeur.class, testeurRepository, testeurSearchRepository);
        reindexForClass(TypeTest.class, typeTestRepository, typeTestSearchRepository);
        reindexForClass(User.class, userRepository, userSearchRepository);

        log.info("Elasticsearch: Successfully performed reindexing");
    }

    @Transactional(readOnly = true)
    @SuppressWarnings("squid:S1166") // Sonar Rule: Either log or rethrow this exception
    public <T, ID extends Serializable> void reindexForClass(Class<T> entityClass, JpaRepository<T, ID> jpaRepository,
                                                              ElasticsearchRepository<T, ID> elasticsearchRepository) {
        elasticsearchTemplate.deleteIndex(entityClass);
        try {
            elasticsearchTemplate.createIndex(entityClass);
        } catch (IndexAlreadyExistsException e) {
            // Do nothing. Index was already concurrently recreated by some other service.
        }
        elasticsearchTemplate.putMapping(entityClass);
        if (jpaRepository.count() > 0) {
            try {
                Method m = jpaRepository.getClass().getMethod("findAllWithEagerRelationships");
                elasticsearchRepository.save((List<T>) m.invoke(jpaRepository));
            } catch (Exception e) {
                elasticsearchRepository.save(jpaRepository.findAll());
            }
        }
        log.info("Elasticsearch: Indexed all rows for " + entityClass.getSimpleName());
    }
}
