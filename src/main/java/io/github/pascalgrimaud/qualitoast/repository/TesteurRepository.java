package io.github.pascalgrimaud.qualitoast.repository;

import io.github.pascalgrimaud.qualitoast.domain.Testeur;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Testeur entity.
 */
@SuppressWarnings("unused")
public interface TesteurRepository extends JpaRepository<Testeur,Long> {

}
