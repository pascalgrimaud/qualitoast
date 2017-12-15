package io.github.pascalgrimaud.qualitoast.repository.search;

import io.github.pascalgrimaud.qualitoast.domain.Resultat;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Resultat entity.
 */
public interface ResultatSearchRepository extends ElasticsearchRepository<Resultat, Long> {
}
