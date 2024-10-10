package io.github.fertwbr.boxIdeia.repository;

import io.github.fertwbr.boxIdeia.model.Idea;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IdeaRepository extends JpaRepository<Idea, Long> {
    List<Idea> findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String title, String description);
}

