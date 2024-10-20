package io.github.fertwbr.boxIdeia.repository;

import io.github.fertwbr.boxIdeia.model.Area;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AreaRepository extends JpaRepository<Area, Long> {

}