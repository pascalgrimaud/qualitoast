package io.github.pascalgrimaud.qualitoast.web.rest;

import io.github.pascalgrimaud.qualitoast.QualiToastApp;

import io.github.pascalgrimaud.qualitoast.domain.Campagne;
import io.github.pascalgrimaud.qualitoast.domain.Application;
import io.github.pascalgrimaud.qualitoast.domain.TypeTest;
import io.github.pascalgrimaud.qualitoast.domain.Resultat;
import io.github.pascalgrimaud.qualitoast.repository.CampagneRepository;
import io.github.pascalgrimaud.qualitoast.service.CampagneService;
import io.github.pascalgrimaud.qualitoast.repository.search.CampagneSearchRepository;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the CampagneResource REST controller.
 *
 * @see CampagneResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = QualiToastApp.class)
public class CampagneResourceIntTest {

    private static final String DEFAULT_VERSION = "AAAAAAAAAA";
    private static final String UPDATED_VERSION = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATEDEBUT = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATEDEBUT = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DATEFIN = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATEFIN = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_COMMENTAIRE = "AAAAAAAAAA";
    private static final String UPDATED_COMMENTAIRE = "BBBBBBBBBB";

    private static final Integer DEFAULT_BLOQUANT = 0;
    private static final Integer UPDATED_BLOQUANT = 1;

    private static final Integer DEFAULT_MAJEUR = 0;
    private static final Integer UPDATED_MAJEUR = 1;

    private static final Integer DEFAULT_MINEUR = 0;
    private static final Integer UPDATED_MINEUR = 1;

    private static final Integer DEFAULT_EVOLUTION = 0;
    private static final Integer UPDATED_EVOLUTION = 1;

    private static final Boolean DEFAULT_TERMINE = false;
    private static final Boolean UPDATED_TERMINE = true;

    @Autowired
    private CampagneRepository campagneRepository;

    @Autowired
    private CampagneService campagneService;

    @Autowired
    private CampagneSearchRepository campagneSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCampagneMockMvc;

    private Campagne campagne;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        CampagneResource campagneResource = new CampagneResource(campagneService);
        this.restCampagneMockMvc = MockMvcBuilders.standaloneSetup(campagneResource)
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
    public static Campagne createEntity(EntityManager em) {
        Campagne campagne = new Campagne()
            .version(DEFAULT_VERSION)
            .datedebut(DEFAULT_DATEDEBUT)
            .datefin(DEFAULT_DATEFIN)
            .commentaire(DEFAULT_COMMENTAIRE)
            .bloquant(DEFAULT_BLOQUANT)
            .majeur(DEFAULT_MAJEUR)
            .mineur(DEFAULT_MINEUR)
            .evolution(DEFAULT_EVOLUTION)
            .termine(DEFAULT_TERMINE);
        // Add required entity
        Application application = ApplicationResourceIntTest.createEntity(em);
        em.persist(application);
        em.flush();
        campagne.setApplication(application);
        // Add required entity
        TypeTest typetest = TypeTestResourceIntTest.createEntity(em);
        em.persist(typetest);
        em.flush();
        campagne.setTypetest(typetest);
        // Add required entity
        Resultat resultat = ResultatResourceIntTest.createEntity(em);
        em.persist(resultat);
        em.flush();
        campagne.setResultat(resultat);
        return campagne;
    }

    @Before
    public void initTest() {
        campagneSearchRepository.deleteAll();
        campagne = createEntity(em);
    }

    @Test
    @Transactional
    public void createCampagne() throws Exception {
        int databaseSizeBeforeCreate = campagneRepository.findAll().size();

        // Create the Campagne
        restCampagneMockMvc.perform(post("/api/campagnes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(campagne)))
            .andExpect(status().isCreated());

        // Validate the Campagne in the database
        List<Campagne> campagneList = campagneRepository.findAll();
        assertThat(campagneList).hasSize(databaseSizeBeforeCreate + 1);
        Campagne testCampagne = campagneList.get(campagneList.size() - 1);
        assertThat(testCampagne.getVersion()).isEqualTo(DEFAULT_VERSION);
        assertThat(testCampagne.getDatedebut()).isEqualTo(DEFAULT_DATEDEBUT);
        assertThat(testCampagne.getDatefin()).isEqualTo(DEFAULT_DATEFIN);
        assertThat(testCampagne.getCommentaire()).isEqualTo(DEFAULT_COMMENTAIRE);
        assertThat(testCampagne.getBloquant()).isEqualTo(DEFAULT_BLOQUANT);
        assertThat(testCampagne.getMajeur()).isEqualTo(DEFAULT_MAJEUR);
        assertThat(testCampagne.getMineur()).isEqualTo(DEFAULT_MINEUR);
        assertThat(testCampagne.getEvolution()).isEqualTo(DEFAULT_EVOLUTION);
        assertThat(testCampagne.isTermine()).isEqualTo(DEFAULT_TERMINE);

        // Validate the Campagne in Elasticsearch
        Campagne campagneEs = campagneSearchRepository.findOne(testCampagne.getId());
        assertThat(campagneEs).isEqualToComparingFieldByField(testCampagne);
    }

    @Test
    @Transactional
    public void createCampagneWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = campagneRepository.findAll().size();

        // Create the Campagne with an existing ID
        campagne.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCampagneMockMvc.perform(post("/api/campagnes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(campagne)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Campagne> campagneList = campagneRepository.findAll();
        assertThat(campagneList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkVersionIsRequired() throws Exception {
        int databaseSizeBeforeTest = campagneRepository.findAll().size();
        // set the field null
        campagne.setVersion(null);

        // Create the Campagne, which fails.

        restCampagneMockMvc.perform(post("/api/campagnes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(campagne)))
            .andExpect(status().isBadRequest());

        List<Campagne> campagneList = campagneRepository.findAll();
        assertThat(campagneList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDatedebutIsRequired() throws Exception {
        int databaseSizeBeforeTest = campagneRepository.findAll().size();
        // set the field null
        campagne.setDatedebut(null);

        // Create the Campagne, which fails.

        restCampagneMockMvc.perform(post("/api/campagnes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(campagne)))
            .andExpect(status().isBadRequest());

        List<Campagne> campagneList = campagneRepository.findAll();
        assertThat(campagneList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCampagnes() throws Exception {
        // Initialize the database
        campagneRepository.saveAndFlush(campagne);

        // Get all the campagneList
        restCampagneMockMvc.perform(get("/api/campagnes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(campagne.getId().intValue())))
            .andExpect(jsonPath("$.[*].version").value(hasItem(DEFAULT_VERSION.toString())))
            .andExpect(jsonPath("$.[*].datedebut").value(hasItem(DEFAULT_DATEDEBUT.toString())))
            .andExpect(jsonPath("$.[*].datefin").value(hasItem(DEFAULT_DATEFIN.toString())))
            .andExpect(jsonPath("$.[*].commentaire").value(hasItem(DEFAULT_COMMENTAIRE.toString())))
            .andExpect(jsonPath("$.[*].bloquant").value(hasItem(DEFAULT_BLOQUANT)))
            .andExpect(jsonPath("$.[*].majeur").value(hasItem(DEFAULT_MAJEUR)))
            .andExpect(jsonPath("$.[*].mineur").value(hasItem(DEFAULT_MINEUR)))
            .andExpect(jsonPath("$.[*].evolution").value(hasItem(DEFAULT_EVOLUTION)))
            .andExpect(jsonPath("$.[*].termine").value(hasItem(DEFAULT_TERMINE.booleanValue())));
    }

    @Test
    @Transactional
    public void getCampagne() throws Exception {
        // Initialize the database
        campagneRepository.saveAndFlush(campagne);

        // Get the campagne
        restCampagneMockMvc.perform(get("/api/campagnes/{id}", campagne.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(campagne.getId().intValue()))
            .andExpect(jsonPath("$.version").value(DEFAULT_VERSION.toString()))
            .andExpect(jsonPath("$.datedebut").value(DEFAULT_DATEDEBUT.toString()))
            .andExpect(jsonPath("$.datefin").value(DEFAULT_DATEFIN.toString()))
            .andExpect(jsonPath("$.commentaire").value(DEFAULT_COMMENTAIRE.toString()))
            .andExpect(jsonPath("$.bloquant").value(DEFAULT_BLOQUANT))
            .andExpect(jsonPath("$.majeur").value(DEFAULT_MAJEUR))
            .andExpect(jsonPath("$.mineur").value(DEFAULT_MINEUR))
            .andExpect(jsonPath("$.evolution").value(DEFAULT_EVOLUTION))
            .andExpect(jsonPath("$.termine").value(DEFAULT_TERMINE.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingCampagne() throws Exception {
        // Get the campagne
        restCampagneMockMvc.perform(get("/api/campagnes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCampagne() throws Exception {
        // Initialize the database
        campagneService.save(campagne);

        int databaseSizeBeforeUpdate = campagneRepository.findAll().size();

        // Update the campagne
        Campagne updatedCampagne = campagneRepository.findOne(campagne.getId());
        updatedCampagne
            .version(UPDATED_VERSION)
            .datedebut(UPDATED_DATEDEBUT)
            .datefin(UPDATED_DATEFIN)
            .commentaire(UPDATED_COMMENTAIRE)
            .bloquant(UPDATED_BLOQUANT)
            .majeur(UPDATED_MAJEUR)
            .mineur(UPDATED_MINEUR)
            .evolution(UPDATED_EVOLUTION)
            .termine(UPDATED_TERMINE);

        restCampagneMockMvc.perform(put("/api/campagnes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCampagne)))
            .andExpect(status().isOk());

        // Validate the Campagne in the database
        List<Campagne> campagneList = campagneRepository.findAll();
        assertThat(campagneList).hasSize(databaseSizeBeforeUpdate);
        Campagne testCampagne = campagneList.get(campagneList.size() - 1);
        assertThat(testCampagne.getVersion()).isEqualTo(UPDATED_VERSION);
        assertThat(testCampagne.getDatedebut()).isEqualTo(UPDATED_DATEDEBUT);
        assertThat(testCampagne.getDatefin()).isEqualTo(UPDATED_DATEFIN);
        assertThat(testCampagne.getCommentaire()).isEqualTo(UPDATED_COMMENTAIRE);
        assertThat(testCampagne.getBloquant()).isEqualTo(UPDATED_BLOQUANT);
        assertThat(testCampagne.getMajeur()).isEqualTo(UPDATED_MAJEUR);
        assertThat(testCampagne.getMineur()).isEqualTo(UPDATED_MINEUR);
        assertThat(testCampagne.getEvolution()).isEqualTo(UPDATED_EVOLUTION);
        assertThat(testCampagne.isTermine()).isEqualTo(UPDATED_TERMINE);

        // Validate the Campagne in Elasticsearch
        Campagne campagneEs = campagneSearchRepository.findOne(testCampagne.getId());
        assertThat(campagneEs).isEqualToComparingFieldByField(testCampagne);
    }

    @Test
    @Transactional
    public void updateNonExistingCampagne() throws Exception {
        int databaseSizeBeforeUpdate = campagneRepository.findAll().size();

        // Create the Campagne

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCampagneMockMvc.perform(put("/api/campagnes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(campagne)))
            .andExpect(status().isCreated());

        // Validate the Campagne in the database
        List<Campagne> campagneList = campagneRepository.findAll();
        assertThat(campagneList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCampagne() throws Exception {
        // Initialize the database
        campagneService.save(campagne);

        int databaseSizeBeforeDelete = campagneRepository.findAll().size();

        // Get the campagne
        restCampagneMockMvc.perform(delete("/api/campagnes/{id}", campagne.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean campagneExistsInEs = campagneSearchRepository.exists(campagne.getId());
        assertThat(campagneExistsInEs).isFalse();

        // Validate the database is empty
        List<Campagne> campagneList = campagneRepository.findAll();
        assertThat(campagneList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchCampagne() throws Exception {
        // Initialize the database
        campagneService.save(campagne);

        // Search the campagne
        restCampagneMockMvc.perform(get("/api/_search/campagnes?query=id:" + campagne.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(campagne.getId().intValue())))
            .andExpect(jsonPath("$.[*].version").value(hasItem(DEFAULT_VERSION.toString())))
            .andExpect(jsonPath("$.[*].datedebut").value(hasItem(DEFAULT_DATEDEBUT.toString())))
            .andExpect(jsonPath("$.[*].datefin").value(hasItem(DEFAULT_DATEFIN.toString())))
            .andExpect(jsonPath("$.[*].commentaire").value(hasItem(DEFAULT_COMMENTAIRE.toString())))
            .andExpect(jsonPath("$.[*].bloquant").value(hasItem(DEFAULT_BLOQUANT)))
            .andExpect(jsonPath("$.[*].majeur").value(hasItem(DEFAULT_MAJEUR)))
            .andExpect(jsonPath("$.[*].mineur").value(hasItem(DEFAULT_MINEUR)))
            .andExpect(jsonPath("$.[*].evolution").value(hasItem(DEFAULT_EVOLUTION)))
            .andExpect(jsonPath("$.[*].termine").value(hasItem(DEFAULT_TERMINE.booleanValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Campagne.class);
    }
}
