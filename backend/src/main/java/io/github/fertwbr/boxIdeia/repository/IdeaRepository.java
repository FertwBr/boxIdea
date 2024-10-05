package io.github.fertwbr.boxIdeia.repository;

import io.github.fertwbr.boxIdeia.model.Idea;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IdeaRepository extends JpaRepository<Idea, Long> {
    
}
