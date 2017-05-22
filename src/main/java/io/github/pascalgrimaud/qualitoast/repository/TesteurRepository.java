package io.github.pascalgrimaud.qualitoast.repository;

import io.github.pascalgrimaud.qualitoast.domain.Testeur;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Testeur entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TesteurRepository extends JpaRepository<Testeur,Long> {

}
