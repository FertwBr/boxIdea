package io.github.fertwbr.boxIdeia.repository;

import io.github.fertwbr.boxIdeia.model.Idea;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IdeaRepository extends JpaRepository<Idea, Long> {
    @Query("SELECT i FROM Idea i WHERE CAST(i.title AS string) LIKE %:title% OR CAST(i.description AS string) LIKE %:description%")
    List<Idea> findByTitleOrDescription(String title, String description);
}
