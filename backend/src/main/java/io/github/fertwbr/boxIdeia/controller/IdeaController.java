package io.github.fertwbr.boxIdeia.controller;

import io.github.fertwbr.boxIdeia.model.Idea;
import io.github.fertwbr.boxIdeia.repository.IdeaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ideas")
@CrossOrigin
public class IdeaController {

    @Autowired
    private IdeaRepository ideaRepository;

    @PostMapping
    public ResponseEntity<Idea> createIdea(@RequestBody Idea idea) {
        Idea savedIdea = ideaRepository.save(idea);
        return new ResponseEntity<>(savedIdea, HttpStatus.CREATED);
    }

    @GetMapping
    public List<Idea> getAllIdeas(@RequestParam(required = false) String query) {
        if (query == null || query.isEmpty()) {
            return ideaRepository.findAll();
        }
        return ideaRepository.findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(query, query);
    }

}
