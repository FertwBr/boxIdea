package io.github.fertwbr.boxIdeia.repository;

import io.github.fertwbr.boxIdeia.model.Idea;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IdeaRepository extends JpaRepository<Idea, Long> {

    @Query("SELECT i FROM Idea i WHERE LOWER(i.title) LIKE LOWER(CONCAT('%', :query, '%')) " +
            "OR LOWER(CAST(i.description AS string)) LIKE LOWER(CONCAT('%', :query, '%'))" +
            "OR LOWER(i.name) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Idea> findByTitleOrDescriptionOrName(@Param("query") String query);

    @Query("SELECT i FROM Idea i JOIN i.filters f WHERE f = :filter")
    List<Idea> findByFilter(@Param("filter") String filter);
}


