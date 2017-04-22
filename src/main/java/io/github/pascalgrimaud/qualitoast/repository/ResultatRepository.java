package io.github.pascalgrimaud.qualitoast.repository;

import io.github.pascalgrimaud.qualitoast.domain.Resultat;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Resultat entity.
 */
@SuppressWarnings("unused")
public interface ResultatRepository extends JpaRepository<Resultat,Long> {

}
