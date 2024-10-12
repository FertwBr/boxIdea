package io.github.fertwbr.boxIdeia.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.Lob;
import jakarta.persistence.Column;


@Entity
@Getter
@Setter
public class Idea {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String name;

    @Lob
    @Column(columnDefinition="TEXT")
    private String description;
}