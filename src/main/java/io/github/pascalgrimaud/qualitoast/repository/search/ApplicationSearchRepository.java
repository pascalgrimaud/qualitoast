package io.github.pascalgrimaud.qualitoast.repository.search;

import io.github.pascalgrimaud.qualitoast.domain.Application;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Application entity.
 */
public interface ApplicationSearchRepository extends ElasticsearchRepository<Application, Long> {
}
