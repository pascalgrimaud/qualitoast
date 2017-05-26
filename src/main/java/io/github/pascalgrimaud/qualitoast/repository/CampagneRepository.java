package io.github.pascalgrimaud.qualitoast.repository;

import io.github.pascalgrimaud.qualitoast.domain.Campagne;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Campagne entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CampagneRepository extends JpaRepository<Campagne,Long> {

    @Query("select distinct campagne from Campagne campagne left join fetch campagne.testeurs")
    List<Campagne> findAllWithEagerRelationships();

    @Query("select campagne from Campagne campagne left join fetch campagne.testeurs where campagne.id =:id")
    Campagne findOneWithEagerRelationships(@Param("id") Long id);

    @EntityGraph(attributePaths = "testeurs")
    Page<Campagne> findAllWithTesteursBy(Pageable pageable);
}
