package io.github.pascalgrimaud.qualitoast.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Testeur.
 */
@Entity
@Table(name = "testeur")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "testeur")
public class Testeur implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "identifiant", nullable = false)
    private String identifiant;

    @NotNull
    @Column(name = "nom", nullable = false)
    private String nom;

    @NotNull
    @Column(name = "prenom", nullable = false)
    private String prenom;

    @ManyToOne(optional = false)
    @NotNull
    private TypeTest typetest;

    @ManyToMany(mappedBy = "testeurs")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Campagne> campagnes = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIdentifiant() {
        return identifiant;
    }

    public Testeur identifiant(String identifiant) {
        this.identifiant = identifiant;
        return this;
    }

    public void setIdentifiant(String identifiant) {
        this.identifiant = identifiant;
    }

    public String getNom() {
        return nom;
    }

    public Testeur nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public Testeur prenom(String prenom) {
        this.prenom = prenom;
        return this;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public TypeTest getTypetest() {
        return typetest;
    }

    public Testeur typetest(TypeTest typeTest) {
        this.typetest = typeTest;
        return this;
    }

    public void setTypetest(TypeTest typeTest) {
        this.typetest = typeTest;
    }

    public Set<Campagne> getCampagnes() {
        return campagnes;
    }

    public Testeur campagnes(Set<Campagne> campagnes) {
        this.campagnes = campagnes;
        return this;
    }

    public Testeur addCampagne(Campagne campagne) {
        this.campagnes.add(campagne);
        campagne.getTesteurs().add(this);
        return this;
    }

    public Testeur removeCampagne(Campagne campagne) {
        this.campagnes.remove(campagne);
        campagne.getTesteurs().remove(this);
        return this;
    }

    public void setCampagnes(Set<Campagne> campagnes) {
        this.campagnes = campagnes;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Testeur testeur = (Testeur) o;
        if (testeur.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), testeur.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Testeur{" +
            "id=" + getId() +
            ", identifiant='" + getIdentifiant() + "'" +
            ", nom='" + getNom() + "'" +
            ", prenom='" + getPrenom() + "'" +
            "}";
    }
}
