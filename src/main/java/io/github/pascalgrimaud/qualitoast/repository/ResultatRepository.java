package io.github.pascalgrimaud.qualitoast.repository;

import io.github.pascalgrimaud.qualitoast.domain.Resultat;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Resultat entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ResultatRepository extends JpaRepository<Resultat, Long> {

}
