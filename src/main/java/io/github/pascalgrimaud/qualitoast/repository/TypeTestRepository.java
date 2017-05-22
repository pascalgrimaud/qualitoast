package io.github.pascalgrimaud.qualitoast.repository;

import io.github.pascalgrimaud.qualitoast.domain.TypeTest;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TypeTest entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TypeTestRepository extends JpaRepository<TypeTest,Long> {

}
