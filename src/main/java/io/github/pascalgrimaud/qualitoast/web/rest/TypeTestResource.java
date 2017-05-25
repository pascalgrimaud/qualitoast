package io.github.pascalgrimaud.qualitoast.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.web.util.ResponseUtil;
import io.github.pascalgrimaud.qualitoast.domain.TypeTest;
import io.github.pascalgrimaud.qualitoast.service.TypeTestService;
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
 * REST controller for managing TypeTest.
 */
@RestController
@RequestMapping("/api")
public class TypeTestResource {

    private final Logger log = LoggerFactory.getLogger(TypeTestResource.class);

    private static final String ENTITY_NAME = "typeTest";

    private final TypeTestService typeTestService;

    public TypeTestResource(TypeTestService typeTestService) {
        this.typeTestService = typeTestService;
    }

    /**
     * POST  /type-tests : Create a new typeTest.
     *
     * @param typeTest the typeTest to create
     * @return the ResponseEntity with status 201 (Created) and with body the new typeTest, or with status 400 (Bad Request) if the typeTest has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/type-tests")
    @Timed
    public ResponseEntity<TypeTest> createTypeTest(@Valid @RequestBody TypeTest typeTest) throws URISyntaxException {
        log.debug("REST request to save TypeTest : {}", typeTest);
        if (typeTest.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new typeTest cannot already have an ID")).body(null);
        }
        TypeTest result = typeTestService.save(typeTest);
        return ResponseEntity.created(new URI("/api/type-tests/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /type-tests : Updates an existing typeTest.
     *
     * @param typeTest the typeTest to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated typeTest,
     * or with status 400 (Bad Request) if the typeTest is not valid,
     * or with status 500 (Internal Server Error) if the typeTest couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/type-tests")
    @Timed
    public ResponseEntity<TypeTest> updateTypeTest(@Valid @RequestBody TypeTest typeTest) throws URISyntaxException {
        log.debug("REST request to update TypeTest : {}", typeTest);
        if (typeTest.getId() == null) {
            return createTypeTest(typeTest);
        }
        TypeTest result = typeTestService.save(typeTest);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, typeTest.getId().toString()))
            .body(result);
    }

    /**
     * GET  /type-tests : get all the typeTests.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of typeTests in body
     */
    @GetMapping("/type-tests")
    @Timed
    public ResponseEntity<List<TypeTest>> getAllTypeTests(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of TypeTests");
        Page<TypeTest> page = typeTestService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/type-tests");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /type-tests/:id : get the "id" typeTest.
     *
     * @param id the id of the typeTest to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the typeTest, or with status 404 (Not Found)
     */
    @GetMapping("/type-tests/{id}")
    @Timed
    public ResponseEntity<TypeTest> getTypeTest(@PathVariable Long id) {
        log.debug("REST request to get TypeTest : {}", id);
        TypeTest typeTest = typeTestService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(typeTest));
    }

    /**
     * DELETE  /type-tests/:id : delete the "id" typeTest.
     *
     * @param id the id of the typeTest to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/type-tests/{id}")
    @Timed
    public ResponseEntity<Void> deleteTypeTest(@PathVariable Long id) {
        log.debug("REST request to delete TypeTest : {}", id);
        typeTestService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/type-tests?query=:query : search for the typeTest corresponding
     * to the query.
     *
     * @param query the query of the typeTest search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/type-tests")
    @Timed
    public ResponseEntity<List<TypeTest>> searchTypeTests(@RequestParam String query, @ApiParam Pageable pageable) {
        log.debug("REST request to search for a page of TypeTests for query {}", query);
        Page<TypeTest> page = typeTestService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/type-tests");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }
}
