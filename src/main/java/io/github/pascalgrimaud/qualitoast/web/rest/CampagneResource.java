package io.github.pascalgrimaud.qualitoast.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.web.util.ResponseUtil;
import io.github.pascalgrimaud.qualitoast.domain.Campagne;
import io.github.pascalgrimaud.qualitoast.service.CampagneService;
import io.github.pascalgrimaud.qualitoast.web.rest.util.HeaderUtil;
import io.github.pascalgrimaud.qualitoast.web.rest.util.PaginationUtil;
import io.swagger.annotations.ApiParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Campagne.
 */
@RestController
@RequestMapping("/api")
public class CampagneResource {

    private final Logger log = LoggerFactory.getLogger(CampagneResource.class);

    private static final String ENTITY_NAME = "campagne";

    private final CampagneService campagneService;

    public CampagneResource(CampagneService campagneService) {
        this.campagneService = campagneService;
    }

    /**
     * POST  /campagnes : Create a new campagne.
     *
     * @param campagne the campagne to create
     * @return the ResponseEntity with status 201 (Created) and with body the new campagne, or with status 400 (Bad Request) if the campagne has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/campagnes")
    @Timed
    public ResponseEntity<Campagne> createCampagne(@Valid @RequestBody Campagne campagne) throws URISyntaxException {
        log.debug("REST request to save Campagne : {}", campagne);
        if (campagne.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new campagne cannot already have an ID")).body(null);
        }
        Campagne result = campagneService.save(campagne);
        return ResponseEntity.created(new URI("/api/campagnes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /campagnes : Updates an existing campagne.
     *
     * @param campagne the campagne to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated campagne,
     * or with status 400 (Bad Request) if the campagne is not valid,
     * or with status 500 (Internal Server Error) if the campagne couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/campagnes")
    @Timed
    public ResponseEntity<Campagne> updateCampagne(@Valid @RequestBody Campagne campagne) throws URISyntaxException {
        log.debug("REST request to update Campagne : {}", campagne);
        if (campagne.getId() == null) {
            return createCampagne(campagne);
        }
        Campagne result = campagneService.save(campagne);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, campagne.getId().toString()))
            .body(result);
    }

    /**
     * GET  /campagnes : get all the campagnes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of campagnes in body
     */
    @GetMapping("/campagnes")
    @Timed
    public ResponseEntity<List<Campagne>> getAllCampagnes(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Campagnes");
        Page<Campagne> page = campagneService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/campagnes");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /campagnes/:id : get the "id" campagne.
     *
     * @param id the id of the campagne to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the campagne, or with status 404 (Not Found)
     */
    @GetMapping("/campagnes/{id}")
    @Timed
    public ResponseEntity<Campagne> getCampagne(@PathVariable Long id) {
        log.debug("REST request to get Campagne : {}", id);
        Campagne campagne = campagneService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(campagne));
    }

    /**
     * DELETE  /campagnes/:id : delete the "id" campagne.
     *
     * @param id the id of the campagne to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/campagnes/{id}")
    @Timed
    public ResponseEntity<Void> deleteCampagne(@PathVariable Long id) {
        log.debug("REST request to delete Campagne : {}", id);
        campagneService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/campagnes?query=:query : search for the campagne corresponding
     * to the query.
     *
     * @param query the query of the campagne search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/campagnes")
    @Timed
    public ResponseEntity<List<Campagne>> searchCampagnes(@RequestParam String query, @ApiParam Pageable pageable) {
        log.debug("REST request to search for a page of Campagnes for query {}", query);
        Page<Campagne> page = campagneService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/campagnes");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }


}
