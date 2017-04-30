package io.github.pascalgrimaud.qualitoast.service;

import io.github.pascalgrimaud.qualitoast.domain.TypeTest;
import io.github.pascalgrimaud.qualitoast.repository.TypeTestRepository;
import io.github.pascalgrimaud.qualitoast.repository.search.TypeTestSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing TypeTest.
 */
@Service
@Transactional
public class TypeTestService {

    private final Logger log = LoggerFactory.getLogger(TypeTestService.class);
    
    private final TypeTestRepository typeTestRepository;

    private final TypeTestSearchRepository typeTestSearchRepository;

    public TypeTestService(TypeTestRepository typeTestRepository, TypeTestSearchRepository typeTestSearchRepository) {
        this.typeTestRepository = typeTestRepository;
        this.typeTestSearchRepository = typeTestSearchRepository;
    }

    /**
     * Save a typeTest.
     *
     * @param typeTest the entity to save
     * @return the persisted entity
     */
    public TypeTest save(TypeTest typeTest) {
        log.debug("Request to save TypeTest : {}", typeTest);
        TypeTest result = typeTestRepository.save(typeTest);
        typeTestSearchRepository.save(result);
        return result;
    }

    /**
     *  Get all the typeTests.
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<TypeTest> findAll(Pageable pageable) {
        log.debug("Request to get all TypeTests");
        Page<TypeTest> result = typeTestRepository.findAll(pageable);
        return result;
    }

    /**
     *  Get one typeTest by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public TypeTest findOne(Long id) {
        log.debug("Request to get TypeTest : {}", id);
        TypeTest typeTest = typeTestRepository.findOne(id);
        return typeTest;
    }

    /**
     *  Delete the  typeTest by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete TypeTest : {}", id);
        typeTestRepository.delete(id);
        typeTestSearchRepository.delete(id);
    }

    /**
     * Search for the typeTest corresponding to the query.
     *
     *  @param query the query of the search
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<TypeTest> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of TypeTests for query {}", query);
        Page<TypeTest> result = typeTestSearchRepository.search(queryStringQuery(query), pageable);
        return result;
    }
}
