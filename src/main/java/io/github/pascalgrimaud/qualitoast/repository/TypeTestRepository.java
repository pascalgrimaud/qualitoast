package io.github.pascalgrimaud.qualitoast.repository;

import io.github.pascalgrimaud.qualitoast.domain.TypeTest;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the TypeTest entity.
 */
@SuppressWarnings("unused")
public interface TypeTestRepository extends JpaRepository<TypeTest,Long> {

}
