package io.github.pascalgrimaud.qualitoast.web.rest;

import io.github.pascalgrimaud.qualitoast.QualiToastApp;

import io.github.pascalgrimaud.qualitoast.domain.Testeur;
import io.github.pascalgrimaud.qualitoast.domain.TypeTest;
import io.github.pascalgrimaud.qualitoast.repository.TesteurRepository;
import io.github.pascalgrimaud.qualitoast.service.TesteurService;
import io.github.pascalgrimaud.qualitoast.repository.search.TesteurSearchRepository;
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

import static io.github.pascalgrimaud.qualitoast.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the TesteurResource REST controller.
 *
 * @see TesteurResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = QualiToastApp.class)
public class TesteurResourceIntTest {

    private static final String DEFAULT_IDENTIFIANT = "AAAAAAAAAA";
    private static final String UPDATED_IDENTIFIANT = "BBBBBBBBBB";

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final String DEFAULT_PRENOM = "AAAAAAAAAA";
    private static final String UPDATED_PRENOM = "BBBBBBBBBB";

    @Autowired
    private TesteurRepository testeurRepository;

    @Autowired
    private TesteurService testeurService;

    @Autowired
    private TesteurSearchRepository testeurSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTesteurMockMvc;

    private Testeur testeur;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TesteurResource testeurResource = new TesteurResource(testeurService);
        this.restTesteurMockMvc = MockMvcBuilders.standaloneSetup(testeurResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Testeur createEntity(EntityManager em) {
        Testeur testeur = new Testeur()
            .identifiant(DEFAULT_IDENTIFIANT)
            .nom(DEFAULT_NOM)
            .prenom(DEFAULT_PRENOM);
        // Add required entity
        TypeTest typetest = TypeTestResourceIntTest.createEntity(em);
        em.persist(typetest);
        em.flush();
        testeur.setTypetest(typetest);
        return testeur;
    }

    @Before
    public void initTest() {
        testeurSearchRepository.deleteAll();
        testeur = createEntity(em);
    }

    @Test
    @Transactional
    public void createTesteur() throws Exception {
        int databaseSizeBeforeCreate = testeurRepository.findAll().size();

        // Create the Testeur
        restTesteurMockMvc.perform(post("/api/testeurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testeur)))
            .andExpect(status().isCreated());

        // Validate the Testeur in the database
        List<Testeur> testeurList = testeurRepository.findAll();
        assertThat(testeurList).hasSize(databaseSizeBeforeCreate + 1);
        Testeur testTesteur = testeurList.get(testeurList.size() - 1);
        assertThat(testTesteur.getIdentifiant()).isEqualTo(DEFAULT_IDENTIFIANT);
        assertThat(testTesteur.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testTesteur.getPrenom()).isEqualTo(DEFAULT_PRENOM);

        // Validate the Testeur in Elasticsearch
        Testeur testeurEs = testeurSearchRepository.findOne(testTesteur.getId());
        assertThat(testeurEs).isEqualToComparingFieldByField(testTesteur);
    }

    @Test
    @Transactional
    public void createTesteurWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = testeurRepository.findAll().size();

        // Create the Testeur with an existing ID
        testeur.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTesteurMockMvc.perform(post("/api/testeurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testeur)))
            .andExpect(status().isBadRequest());

        // Validate the Testeur in the database
        List<Testeur> testeurList = testeurRepository.findAll();
        assertThat(testeurList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkIdentifiantIsRequired() throws Exception {
        int databaseSizeBeforeTest = testeurRepository.findAll().size();
        // set the field null
        testeur.setIdentifiant(null);

        // Create the Testeur, which fails.

        restTesteurMockMvc.perform(post("/api/testeurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testeur)))
            .andExpect(status().isBadRequest());

        List<Testeur> testeurList = testeurRepository.findAll();
        assertThat(testeurList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNomIsRequired() throws Exception {
        int databaseSizeBeforeTest = testeurRepository.findAll().size();
        // set the field null
        testeur.setNom(null);

        // Create the Testeur, which fails.

        restTesteurMockMvc.perform(post("/api/testeurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testeur)))
            .andExpect(status().isBadRequest());

        List<Testeur> testeurList = testeurRepository.findAll();
        assertThat(testeurList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPrenomIsRequired() throws Exception {
        int databaseSizeBeforeTest = testeurRepository.findAll().size();
        // set the field null
        testeur.setPrenom(null);

        // Create the Testeur, which fails.

        restTesteurMockMvc.perform(post("/api/testeurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testeur)))
            .andExpect(status().isBadRequest());

        List<Testeur> testeurList = testeurRepository.findAll();
        assertThat(testeurList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTesteurs() throws Exception {
        // Initialize the database
        testeurRepository.saveAndFlush(testeur);

        // Get all the testeurList
        restTesteurMockMvc.perform(get("/api/testeurs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(testeur.getId().intValue())))
            .andExpect(jsonPath("$.[*].identifiant").value(hasItem(DEFAULT_IDENTIFIANT.toString())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM.toString())))
            .andExpect(jsonPath("$.[*].prenom").value(hasItem(DEFAULT_PRENOM.toString())));
    }

    @Test
    @Transactional
    public void getTesteur() throws Exception {
        // Initialize the database
        testeurRepository.saveAndFlush(testeur);

        // Get the testeur
        restTesteurMockMvc.perform(get("/api/testeurs/{id}", testeur.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(testeur.getId().intValue()))
            .andExpect(jsonPath("$.identifiant").value(DEFAULT_IDENTIFIANT.toString()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM.toString()))
            .andExpect(jsonPath("$.prenom").value(DEFAULT_PRENOM.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTesteur() throws Exception {
        // Get the testeur
        restTesteurMockMvc.perform(get("/api/testeurs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTesteur() throws Exception {
        // Initialize the database
        testeurService.save(testeur);

        int databaseSizeBeforeUpdate = testeurRepository.findAll().size();

        // Update the testeur
        Testeur updatedTesteur = testeurRepository.findOne(testeur.getId());
        // Disconnect from session so that the updates on updatedTesteur are not directly saved in db
        em.detach(updatedTesteur);
        updatedTesteur
            .identifiant(UPDATED_IDENTIFIANT)
            .nom(UPDATED_NOM)
            .prenom(UPDATED_PRENOM);

        restTesteurMockMvc.perform(put("/api/testeurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTesteur)))
            .andExpect(status().isOk());

        // Validate the Testeur in the database
        List<Testeur> testeurList = testeurRepository.findAll();
        assertThat(testeurList).hasSize(databaseSizeBeforeUpdate);
        Testeur testTesteur = testeurList.get(testeurList.size() - 1);
        assertThat(testTesteur.getIdentifiant()).isEqualTo(UPDATED_IDENTIFIANT);
        assertThat(testTesteur.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testTesteur.getPrenom()).isEqualTo(UPDATED_PRENOM);

        // Validate the Testeur in Elasticsearch
        Testeur testeurEs = testeurSearchRepository.findOne(testTesteur.getId());
        assertThat(testeurEs).isEqualToComparingFieldByField(testTesteur);
    }

    @Test
    @Transactional
    public void updateNonExistingTesteur() throws Exception {
        int databaseSizeBeforeUpdate = testeurRepository.findAll().size();

        // Create the Testeur

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTesteurMockMvc.perform(put("/api/testeurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testeur)))
            .andExpect(status().isCreated());

        // Validate the Testeur in the database
        List<Testeur> testeurList = testeurRepository.findAll();
        assertThat(testeurList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTesteur() throws Exception {
        // Initialize the database
        testeurService.save(testeur);

        int databaseSizeBeforeDelete = testeurRepository.findAll().size();

        // Get the testeur
        restTesteurMockMvc.perform(delete("/api/testeurs/{id}", testeur.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean testeurExistsInEs = testeurSearchRepository.exists(testeur.getId());
        assertThat(testeurExistsInEs).isFalse();

        // Validate the database is empty
        List<Testeur> testeurList = testeurRepository.findAll();
        assertThat(testeurList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchTesteur() throws Exception {
        // Initialize the database
        testeurService.save(testeur);

        // Search the testeur
        restTesteurMockMvc.perform(get("/api/_search/testeurs?query=id:" + testeur.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(testeur.getId().intValue())))
            .andExpect(jsonPath("$.[*].identifiant").value(hasItem(DEFAULT_IDENTIFIANT.toString())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM.toString())))
            .andExpect(jsonPath("$.[*].prenom").value(hasItem(DEFAULT_PRENOM.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Testeur.class);
        Testeur testeur1 = new Testeur();
        testeur1.setId(1L);
        Testeur testeur2 = new Testeur();
        testeur2.setId(testeur1.getId());
        assertThat(testeur1).isEqualTo(testeur2);
        testeur2.setId(2L);
        assertThat(testeur1).isNotEqualTo(testeur2);
        testeur1.setId(null);
        assertThat(testeur1).isNotEqualTo(testeur2);
    }
}
