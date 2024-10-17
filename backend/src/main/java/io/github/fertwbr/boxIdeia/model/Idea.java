package io.github.fertwbr.boxIdeia.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;


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

    @Column(columnDefinition="TEXT")
    private String description;
    
    @ElementCollection
    @CollectionTable(name = "idea_filters", joinColumns = @JoinColumn(name = "idea_id"))
    @Column(name = "filter")
    private Set<String> filters = new HashSet<>();
}