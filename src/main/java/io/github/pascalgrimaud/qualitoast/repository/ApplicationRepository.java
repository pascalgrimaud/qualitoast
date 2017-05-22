package io.github.pascalgrimaud.qualitoast.repository;

import io.github.pascalgrimaud.qualitoast.domain.Application;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Application entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ApplicationRepository extends JpaRepository<Application,Long> {

}
