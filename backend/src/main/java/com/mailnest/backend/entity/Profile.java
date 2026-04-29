package com.mailnest.backend.entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String phone;
    private String address;


    @OneToOne
    @JoinColumn(name = "contact_id")
    @JsonIgnore
    private Contact contact;

    public String getPhone() {
        return phone;
    }

    public String getAddress() {
        return address;
    }

    public Contact getContact() {
        return contact;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setContact(Contact contact) {
        this.contact = contact;
    }
}