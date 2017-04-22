package io.github.pascalgrimaud.qualitoast.repository.search;

import io.github.pascalgrimaud.qualitoast.domain.TypeTest;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the TypeTest entity.
 */
public interface TypeTestSearchRepository extends ElasticsearchRepository<TypeTest, Long> {
}
