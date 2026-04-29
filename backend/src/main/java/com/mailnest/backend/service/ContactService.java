package com.mailnest.backend.service;
import com.mailnest.backend.entity.Profile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.mailnest.backend.entity.Contact;
import com.mailnest.backend.repository.ContactRepository;
import java.util.List;
@Service
public class ContactService {

    @Autowired
    private ContactRepository repository;

    public List<Contact> getAllContacts() {
        return repository.findAll();
    }

    public Contact getContactById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Contact createContact(String name, String email, String department,
                                 String phone, String address) {

        Contact contact = new Contact();
        contact.setName(name);
        contact.setEmail(email);
        contact.setDepartment(department);

        Profile profile = new Profile();
//        profile.setPhone(phone);
//        profile.setAddress(address);
        profile.setPhone("123456789");
        profile.setAddress("London");

        profile.setContact(contact);
        contact.setProfile(profile);
        return repository.save(contact);
    }

    public Contact updateContact(Long id, Contact updatedContact) {
        Contact existing = repository.findById(id).orElse(null);

        if (existing != null) {
            existing.setName(updatedContact.getName());
            existing.setEmail(updatedContact.getEmail());
            existing.setDepartment(updatedContact.getDepartment());
            return repository.save(existing);
        }

        return null;
    }
    public void deleteContact(Long id) {
        repository.deleteById(id);
    }


}