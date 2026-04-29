package com.mailnest.backend.controller;
import com.mailnest.backend.dto.ContactRequest;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.mailnest.backend.entity.Contact;
import com.mailnest.backend.service.ContactService;
import java.util.List;

@RestController
@RequestMapping("/api/contacts")
@CrossOrigin
public class ContactController {

    @Autowired
    private ContactService service;

    @GetMapping
    public List<Contact> getAll() {
        return service.getAllContacts();
    }

    @GetMapping("/{id}")
    public Contact getById(@PathVariable Long id) {
        return service.getContactById(id);
    }

    @PostMapping
    public Contact create(@RequestBody ContactRequest request) {
        return service.createContact(
                request.getName(),
                request.getEmail(),
                request.getDepartment(),
                request.getPhone(),
                request.getAddress()
        );
    }


    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteContact(id);
    }
    @PutMapping("/{id}")
    public Contact update(@PathVariable Long id, @RequestBody Contact contact) {
        return service.updateContact(id, contact);
    }
}