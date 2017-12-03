package io.github.pascalgrimaud.qualitoast.service;

import io.github.pascalgrimaud.qualitoast.domain.Campagne;
import io.github.pascalgrimaud.qualitoast.repository.CampagneRepository;
import io.github.pascalgrimaud.qualitoast.repository.search.CampagneSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Campagne.
 */
@Service
@Transactional
public class CampagneService {

    private final Logger log = LoggerFactory.getLogger(CampagneService.class);

    private final CampagneRepository campagneRepository;

    private final CampagneSearchRepository campagneSearchRepository;

    public CampagneService(CampagneRepository campagneRepository, CampagneSearchRepository campagneSearchRepository) {
        this.campagneRepository = campagneRepository;
        this.campagneSearchRepository = campagneSearchRepository;
    }

    /**
     * Save a campagne.
     *
     * @param campagne the entity to save
     * @return the persisted entity
     */
    public Campagne save(Campagne campagne) {
        log.debug("Request to save Campagne : {}", campagne);
        Campagne result = campagneRepository.save(campagne);
        campagneSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the campagnes.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Campagne> findAll(Pageable pageable) {
        log.debug("Request to get all Campagnes");
        return campagneRepository.findAllWithTesteursBy(pageable);
    }

    /**
     * Get one campagne by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Campagne findOne(Long id) {
        log.debug("Request to get Campagne : {}", id);
        return campagneRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the campagne by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Campagne : {}", id);
        campagneRepository.delete(id);
        campagneSearchRepository.delete(id);
    }

    /**
     * Search for the campagne corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Campagne> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Campagnes for query {}", query);
        Page<Campagne> result = campagneSearchRepository.search(queryStringQuery(query), pageable);
        return result;
    }
}
