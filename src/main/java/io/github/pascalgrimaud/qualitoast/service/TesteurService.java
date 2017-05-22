package io.github.pascalgrimaud.qualitoast.service;

import io.github.pascalgrimaud.qualitoast.domain.Testeur;
import io.github.pascalgrimaud.qualitoast.repository.TesteurRepository;
import io.github.pascalgrimaud.qualitoast.repository.search.TesteurSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Testeur.
 */
@Service
@Transactional
public class TesteurService {

    private final Logger log = LoggerFactory.getLogger(TesteurService.class);
    
    private final TesteurRepository testeurRepository;

    private final TesteurSearchRepository testeurSearchRepository;

    public TesteurService(TesteurRepository testeurRepository, TesteurSearchRepository testeurSearchRepository) {
        this.testeurRepository = testeurRepository;
        this.testeurSearchRepository = testeurSearchRepository;
    }

    /**
     * Save a testeur.
     *
     * @param testeur the entity to save
     * @return the persisted entity
     */
    public Testeur save(Testeur testeur) {
        log.debug("Request to save Testeur : {}", testeur);
        Testeur result = testeurRepository.save(testeur);
        testeurSearchRepository.save(result);
        return result;
    }

    /**
     *  Get all the testeurs.
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Testeur> findAll(Pageable pageable) {
        log.debug("Request to get all Testeurs");
        Page<Testeur> result = testeurRepository.findAll(pageable);
        return result;
    }

    /**
     *  Get one testeur by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public Testeur findOne(Long id) {
        log.debug("Request to get Testeur : {}", id);
        Testeur testeur = testeurRepository.findOne(id);
        return testeur;
    }

    /**
     *  Delete the  testeur by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Testeur : {}", id);
        testeurRepository.delete(id);
        testeurSearchRepository.delete(id);
    }

    /**
     * Search for the testeur corresponding to the query.
     *
     *  @param query the query of the search
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Testeur> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Testeurs for query {}", query);
        Page<Testeur> result = testeurSearchRepository.search(queryStringQuery(query), pageable);
        return result;
    }
}
