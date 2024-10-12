package io.github.fertwbr.boxIdeia.controller;

import io.github.fertwbr.boxIdeia.model.Idea;
import io.github.fertwbr.boxIdeia.repository.IdeaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID; // Importa a classe UUID para gerar um nome único

@RestController
@RequestMapping("/ideas")
@CrossOrigin
public class IdeaController {

    @Autowired
    private IdeaRepository ideaRepository;

    @PostMapping
    public ResponseEntity<Idea> createIdea(@RequestBody Idea idea) {
        if (idea.getTitle() == null || idea.getTitle().isBlank() ||
                idea.getDescription() == null || idea.getDescription().isBlank()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        if (idea.getName() == null || idea.getName().isBlank()) {
            idea.setName("Anônimo " + UUID.randomUUID().toString().substring(0, 8)); // Nome anônimo
        }

        Idea savedIdea = ideaRepository.save(idea);
        return new ResponseEntity<>(savedIdea, HttpStatus.CREATED);
    }

    @Transactional
    @GetMapping
    public List<Idea> getAllIdeas(@RequestParam(required = false) String query) {
        if (query == null || query.isEmpty()) {
            return ideaRepository.findAll();
        }
        return ideaRepository.findByTitleOrDescription(query);
    }
}
