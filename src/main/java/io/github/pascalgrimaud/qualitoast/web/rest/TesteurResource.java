package io.github.pascalgrimaud.qualitoast.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.web.util.ResponseUtil;
import io.github.pascalgrimaud.qualitoast.domain.Testeur;
import io.github.pascalgrimaud.qualitoast.service.TesteurService;
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
 * REST controller for managing Testeur.
 */
@RestController
@RequestMapping("/api")
public class TesteurResource {

    private final Logger log = LoggerFactory.getLogger(TesteurResource.class);

    private static final String ENTITY_NAME = "testeur";

    private final TesteurService testeurService;

    public TesteurResource(TesteurService testeurService) {
        this.testeurService = testeurService;
    }

    /**
     * POST  /testeurs : Create a new testeur.
     *
     * @param testeur the testeur to create
     * @return the ResponseEntity with status 201 (Created) and with body the new testeur, or with status 400 (Bad Request) if the testeur has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/testeurs")
    @Timed
    public ResponseEntity<Testeur> createTesteur(@Valid @RequestBody Testeur testeur) throws URISyntaxException {
        log.debug("REST request to save Testeur : {}", testeur);
        if (testeur.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new testeur cannot already have an ID")).body(null);
        }
        Testeur result = testeurService.save(testeur);
        return ResponseEntity.created(new URI("/api/testeurs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /testeurs : Updates an existing testeur.
     *
     * @param testeur the testeur to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated testeur,
     * or with status 400 (Bad Request) if the testeur is not valid,
     * or with status 500 (Internal Server Error) if the testeur couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/testeurs")
    @Timed
    public ResponseEntity<Testeur> updateTesteur(@Valid @RequestBody Testeur testeur) throws URISyntaxException {
        log.debug("REST request to update Testeur : {}", testeur);
        if (testeur.getId() == null) {
            return createTesteur(testeur);
        }
        Testeur result = testeurService.save(testeur);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, testeur.getId().toString()))
            .body(result);
    }

    /**
     * GET  /testeurs : get all the testeurs.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of testeurs in body
     */
    @GetMapping("/testeurs")
    @Timed
    public ResponseEntity<List<Testeur>> getAllTesteurs(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Testeurs");
        Page<Testeur> page = testeurService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/testeurs");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /testeurs/:id : get the "id" testeur.
     *
     * @param id the id of the testeur to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the testeur, or with status 404 (Not Found)
     */
    @GetMapping("/testeurs/{id}")
    @Timed
    public ResponseEntity<Testeur> getTesteur(@PathVariable Long id) {
        log.debug("REST request to get Testeur : {}", id);
        Testeur testeur = testeurService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(testeur));
    }

    /**
     * DELETE  /testeurs/:id : delete the "id" testeur.
     *
     * @param id the id of the testeur to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/testeurs/{id}")
    @Timed
    public ResponseEntity<Void> deleteTesteur(@PathVariable Long id) {
        log.debug("REST request to delete Testeur : {}", id);
        testeurService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/testeurs?query=:query : search for the testeur corresponding
     * to the query.
     *
     * @param query the query of the testeur search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/testeurs")
    @Timed
    public ResponseEntity<List<Testeur>> searchTesteurs(@RequestParam String query, @ApiParam Pageable pageable) {
        log.debug("REST request to search for a page of Testeurs for query {}", query);
        Page<Testeur> page = testeurService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/testeurs");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }
}
