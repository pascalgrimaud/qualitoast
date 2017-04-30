package io.github.pascalgrimaud.qualitoast.web.rest;

import io.github.pascalgrimaud.qualitoast.QualiToastApp;

import io.github.pascalgrimaud.qualitoast.domain.TypeTest;
import io.github.pascalgrimaud.qualitoast.repository.TypeTestRepository;
import io.github.pascalgrimaud.qualitoast.repository.search.TypeTestSearchRepository;
import io.github.pascalgrimaud.qualitoast.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the TypeTestResource REST controller.
 *
 * @see TypeTestResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = QualiToastApp.class)
public class TypeTestResourceIntTest {

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    @Autowired
    private TypeTestRepository typeTestRepository;

    @Autowired
    private TypeTestSearchRepository typeTestSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTypeTestMockMvc;

    private TypeTest typeTest;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        TypeTestResource typeTestResource = new TypeTestResource(typeTestRepository, typeTestSearchRepository);
        this.restTypeTestMockMvc = MockMvcBuilders.standaloneSetup(typeTestResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TypeTest createEntity(EntityManager em) {
        TypeTest typeTest = new TypeTest()
            .code(DEFAULT_CODE)
            .nom(DEFAULT_NOM);
        return typeTest;
    }

    @Before
    public void initTest() {
        typeTestSearchRepository.deleteAll();
        typeTest = createEntity(em);
    }

    @Test
    @Transactional
    public void createTypeTest() throws Exception {
        int databaseSizeBeforeCreate = typeTestRepository.findAll().size();

        // Create the TypeTest
        restTypeTestMockMvc.perform(post("/api/type-tests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(typeTest)))
            .andExpect(status().isCreated());

        // Validate the TypeTest in the database
        List<TypeTest> typeTestList = typeTestRepository.findAll();
        assertThat(typeTestList).hasSize(databaseSizeBeforeCreate + 1);
        TypeTest testTypeTest = typeTestList.get(typeTestList.size() - 1);
        assertThat(testTypeTest.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testTypeTest.getNom()).isEqualTo(DEFAULT_NOM);

        // Validate the TypeTest in Elasticsearch
        TypeTest typeTestEs = typeTestSearchRepository.findOne(testTypeTest.getId());
        assertThat(typeTestEs).isEqualToComparingFieldByField(testTypeTest);
    }

    @Test
    @Transactional
    public void createTypeTestWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = typeTestRepository.findAll().size();

        // Create the TypeTest with an existing ID
        typeTest.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTypeTestMockMvc.perform(post("/api/type-tests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(typeTest)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<TypeTest> typeTestList = typeTestRepository.findAll();
        assertThat(typeTestList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = typeTestRepository.findAll().size();
        // set the field null
        typeTest.setCode(null);

        // Create the TypeTest, which fails.

        restTypeTestMockMvc.perform(post("/api/type-tests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(typeTest)))
            .andExpect(status().isBadRequest());

        List<TypeTest> typeTestList = typeTestRepository.findAll();
        assertThat(typeTestList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNomIsRequired() throws Exception {
        int databaseSizeBeforeTest = typeTestRepository.findAll().size();
        // set the field null
        typeTest.setNom(null);

        // Create the TypeTest, which fails.

        restTypeTestMockMvc.perform(post("/api/type-tests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(typeTest)))
            .andExpect(status().isBadRequest());

        List<TypeTest> typeTestList = typeTestRepository.findAll();
        assertThat(typeTestList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTypeTests() throws Exception {
        // Initialize the database
        typeTestRepository.saveAndFlush(typeTest);

        // Get all the typeTestList
        restTypeTestMockMvc.perform(get("/api/type-tests?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(typeTest.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM.toString())));
    }

    @Test
    @Transactional
    public void getTypeTest() throws Exception {
        // Initialize the database
        typeTestRepository.saveAndFlush(typeTest);

        // Get the typeTest
        restTypeTestMockMvc.perform(get("/api/type-tests/{id}", typeTest.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(typeTest.getId().intValue()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE.toString()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTypeTest() throws Exception {
        // Get the typeTest
        restTypeTestMockMvc.perform(get("/api/type-tests/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTypeTest() throws Exception {
        // Initialize the database
        typeTestRepository.saveAndFlush(typeTest);
        typeTestSearchRepository.save(typeTest);
        int databaseSizeBeforeUpdate = typeTestRepository.findAll().size();

        // Update the typeTest
        TypeTest updatedTypeTest = typeTestRepository.findOne(typeTest.getId());
        updatedTypeTest
            .code(UPDATED_CODE)
            .nom(UPDATED_NOM);

        restTypeTestMockMvc.perform(put("/api/type-tests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTypeTest)))
            .andExpect(status().isOk());

        // Validate the TypeTest in the database
        List<TypeTest> typeTestList = typeTestRepository.findAll();
        assertThat(typeTestList).hasSize(databaseSizeBeforeUpdate);
        TypeTest testTypeTest = typeTestList.get(typeTestList.size() - 1);
        assertThat(testTypeTest.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testTypeTest.getNom()).isEqualTo(UPDATED_NOM);

        // Validate the TypeTest in Elasticsearch
        TypeTest typeTestEs = typeTestSearchRepository.findOne(testTypeTest.getId());
        assertThat(typeTestEs).isEqualToComparingFieldByField(testTypeTest);
    }

    @Test
    @Transactional
    public void updateNonExistingTypeTest() throws Exception {
        int databaseSizeBeforeUpdate = typeTestRepository.findAll().size();

        // Create the TypeTest

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTypeTestMockMvc.perform(put("/api/type-tests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(typeTest)))
            .andExpect(status().isCreated());

        // Validate the TypeTest in the database
        List<TypeTest> typeTestList = typeTestRepository.findAll();
        assertThat(typeTestList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTypeTest() throws Exception {
        // Initialize the database
        typeTestRepository.saveAndFlush(typeTest);
        typeTestSearchRepository.save(typeTest);
        int databaseSizeBeforeDelete = typeTestRepository.findAll().size();

        // Get the typeTest
        restTypeTestMockMvc.perform(delete("/api/type-tests/{id}", typeTest.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean typeTestExistsInEs = typeTestSearchRepository.exists(typeTest.getId());
        assertThat(typeTestExistsInEs).isFalse();

        // Validate the database is empty
        List<TypeTest> typeTestList = typeTestRepository.findAll();
        assertThat(typeTestList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchTypeTest() throws Exception {
        // Initialize the database
        typeTestRepository.saveAndFlush(typeTest);
        typeTestSearchRepository.save(typeTest);

        // Search the typeTest
        restTypeTestMockMvc.perform(get("/api/_search/type-tests?query=id:" + typeTest.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(typeTest.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TypeTest.class);
    }
}
