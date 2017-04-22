package io.github.pascalgrimaud.qualitoast.repository.search;

import io.github.pascalgrimaud.qualitoast.domain.Campagne;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Campagne entity.
 */
public interface CampagneSearchRepository extends ElasticsearchRepository<Campagne, Long> {
}
