package com.mailnest.backend.entity;
import jakarta.persistence.*;

@Entity
@Table(name = "Template")
public class Template {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "name")

    private String name;

    @Column(name = "subject")
    private String subject;

    @Column(name = "body")
    private String body;

    // 👉 ADD GETTERS & SETTERS HERE 👇

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }

    public String getBody() { return body; }
    public void setBody(String body) { this.body = body; }
}