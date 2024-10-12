package io.github.fertwbr.boxIdeia.controller;

import io.github.fertwbr.boxIdeia.model.Idea;
import io.github.fertwbr.boxIdeia.repository.IdeaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ideas")
@CrossOrigin
public class IdeaController {

    @Autowired
    private IdeaRepository ideaRepository;

    // TODO Criar opção de automaticamente atribuir nome do usuário anonimo
    @PostMapping
    public ResponseEntity<Idea> createIdea(@RequestBody Idea idea) {
        if (idea.getTitle() == null || idea.getTitle().isBlank() || idea.getDescription() == null || idea.getDescription().isBlank()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Idea savedIdea = ideaRepository.save(idea);
        return new ResponseEntity<>(savedIdea, HttpStatus.CREATED);
    }

// TODO Arrumar pesquisa
    @Transactional
    @GetMapping
    public List<Idea> getAllIdeas(@RequestParam(required = false) String query) {
        if (query == null || query.isEmpty()) {
            return ideaRepository.findAll();
        }
        return ideaRepository.findByTitleOrDescription(query, query);
    }

}
