package io.github.pascalgrimaud.qualitoast.web.rest;

import io.github.pascalgrimaud.qualitoast.QualiToastApp;
import io.github.pascalgrimaud.qualitoast.service.ElasticsearchIndexService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Test class for ElasticsearchIndexResource REST controller.
 *
 * @see ElasticsearchIndexResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = QualiToastApp.class)
public class ElasticsearchIndexResourceIntTest {

    @Autowired
    private ElasticsearchIndexService elasticsearchIndexService;

    private MockMvc restElasticsearchMockMvc;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        ElasticsearchIndexResource elasticResource = new ElasticsearchIndexResource(elasticsearchIndexService);
        this.restElasticsearchMockMvc = MockMvcBuilders.standaloneSetup(elasticResource)
            .build();
    }

    @Test
    public void launchReindex() throws Exception {
        restElasticsearchMockMvc.perform(post("/api/elasticsearch/index"))
            .andExpect(status().isAccepted());
    }
}
