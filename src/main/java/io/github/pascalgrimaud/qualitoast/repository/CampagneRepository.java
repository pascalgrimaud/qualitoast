package io.github.pascalgrimaud.qualitoast.repository;

import io.github.pascalgrimaud.qualitoast.domain.Campagne;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Campagne entity.
 */
@SuppressWarnings("unused")
public interface CampagneRepository extends JpaRepository<Campagne,Long> {

}
