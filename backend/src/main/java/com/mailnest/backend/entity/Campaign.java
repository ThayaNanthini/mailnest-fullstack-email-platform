package com.mailnest.backend.entity;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name="Campaign")
public class Campaign {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="name")
    private String name;
    @Column(name="status")
    private String status;

    @OneToMany(mappedBy = "campaign", cascade = CascadeType.ALL)
    private List<Contact> contacts;

    // 👉 ADD GETTERS & SETTERS HERE 👇
    public Long getId() {
        return id;
    }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    // getter
    public List<Contact> getContact() {
        return contacts;
    }


    // setter
    public void setContacts(List<Contact> contacts) {
        this.contacts = contacts;
    }
}