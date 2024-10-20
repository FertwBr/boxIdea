package io.github.fertwbr.boxIdeia.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

import java.time.LocalDate;
import java.time.LocalDateTime;


@Entity
@Getter
@Setter
public class Idea {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String name;

    private int upvotes = 0;
    private int downvotes = 0;

    private LocalDate experienceDate;

    @Column(nullable = false)
    private LocalDateTime postingDateTime = LocalDateTime.now();

    @Column(columnDefinition="TEXT")
    private String description;

    @ElementCollection
    @CollectionTable(name = "idea_filters", joinColumns = @JoinColumn(name = "idea_id"))
    @Column(name = "filter")
    private Set<String> filters = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "area_id")
    private Area area;
}