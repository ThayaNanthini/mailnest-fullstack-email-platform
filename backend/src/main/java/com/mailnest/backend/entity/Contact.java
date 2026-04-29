package com.mailnest.backend.entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
@Entity
@Table(name = "Contact")
public class Contact {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;
    @Column(name = "name")
    private String name;
    @Column(name = "email")
    private String email;
    @Column(name = "department")
    private String department;

    @OneToOne(mappedBy = "contact", cascade = CascadeType.ALL)
    private Profile profile;
    @ManyToOne
    @JoinColumn(name = "campaign_id")
    @JsonIgnore   //avoid infinite loop
    private Campaign campaign;

    // 👉 ADD GETTERS & SETTERS HERE 👇

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getEmail() {
        return email;
    }

    public void setDepartment(String department) {
        this.department = department;
    }
    public String getDepartment() {
        return department;
    }
    public void setProfile(Profile profile) {
        this.profile = profile;
    }

    public Profile getProfile() {
        return profile;
    }

    // getter
    public Campaign getCampaign() {
        return campaign;
    }

    // setter
    public void setCampaign(Campaign campaign) {
        this.campaign = campaign;
    }
}
