package io.github.fertwbr.boxIdeia.controller;

import io.github.fertwbr.boxIdeia.model.Idea;
import io.github.fertwbr.boxIdeia.repository.IdeaRepository;
import io.github.fertwbr.boxIdeia.service.FilterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/ideas")
@CrossOrigin
public class IdeaController {

    @Autowired
    private IdeaRepository ideaRepository;

    @Autowired
    private FilterService filterService;

    @PostMapping
    public ResponseEntity<Idea> createIdea(@RequestBody Idea idea) {
        if (idea.getTitle() == null || idea.getTitle().isBlank() ||
                idea.getDescription() == null || idea.getDescription().isBlank()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        if (idea.getName() == null || idea.getName().isBlank()) {
            idea.setName("Anônimo " + UUID.randomUUID().toString().substring(0, 8));
        }

        filterService.assignFilters(idea);

        Idea savedIdea = ideaRepository.save(idea);

        return new ResponseEntity<>(savedIdea, HttpStatus.CREATED);
    }

    @Transactional
    @GetMapping
    public List<Idea> getAllIdeas(@RequestParam(required = false) String query) {
        if (query == null || query.isEmpty()) {
            return ideaRepository.findAll();
        }
        return ideaRepository.findByTitleOrDescriptionOrName(query);
    }

    @GetMapping("/filter")
    public List<Idea> getIdeasByFilter(@RequestParam String filter) {
        return ideaRepository.findByFilter(filter);
    }

    @PostMapping("/{id}/upvote")
    public ResponseEntity<Idea> upvoteIdea(@PathVariable Long id) {
        return updateVote(id, true);
    }

    @PostMapping("/{id}/downvote")
    public ResponseEntity<Idea> downvoteIdea(@PathVariable Long id) {
        return updateVote(id, false);
    }

    private ResponseEntity<Idea> updateVote(Long id, boolean isUpvote) {
        Idea idea = ideaRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Ideia não encontrada"));

        if (isUpvote) {
            idea.setUpvotes(idea.getUpvotes() + 1);
        } else {
            idea.setDownvotes(idea.getDownvotes() + 1);
        }

        ideaRepository.save(idea);
        return new ResponseEntity<>(idea, HttpStatus.OK);
    }
}