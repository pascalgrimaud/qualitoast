package io.github.pascalgrimaud.qualitoast.repository.search;

import io.github.pascalgrimaud.qualitoast.domain.Testeur;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Testeur entity.
 */
public interface TesteurSearchRepository extends ElasticsearchRepository<Testeur, Long> {
}
