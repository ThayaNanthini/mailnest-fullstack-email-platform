package com.mailnest.backend.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.mailnest.backend.entity.Campaign;
import com.mailnest.backend.entity.Contact;
import com.mailnest.backend.entity.Template;
import com.mailnest.backend.repository.CampaignRepository;
import com.mailnest.backend.repository.ContactRepository;
import com.mailnest.backend.repository.TemplateRepository;
import jakarta.transaction.Transactional;
import java.util.List;
@Service
public class CampaignService {

    @Autowired
    private CampaignRepository campaignRepository;

    @Autowired
    private ContactRepository contactRepository;

    @Autowired
    private TemplateRepository templateRepository;

    @Autowired
    private EmailService emailService;

    public Campaign sendCampaign(Long templateId, List<Long> contactIds) {
        Campaign campaign = new Campaign();
        campaign.setName("Campaign-" + System.currentTimeMillis());
        campaign.setStatus("SENT");

        // Simulate sending emails
        System.out.println("Template ID: " + templateId);
        System.out.println("Contact IDs: " + contactIds);

        List<Contact> contacts = contactRepository.findAllById(contactIds);
        System.out.println("Contacts found: " + contacts.size());

        Template template = templateRepository.findById(templateId).orElse(null);
        System.out.println("Template found: " + (template != null));

        // ✅ ADD ERROR HANDLING HERE 👇

        if (template == null) {
            throw new RuntimeException("Template not found");
        }

        if (contacts.isEmpty()) {
            throw new RuntimeException("No contacts found");
        }

        for (Contact contact : contacts) {
            String emailBody = template.getBody()
                    .replace("{{name}}", contact.getName())
                    .replace("{{department}}", contact.getDepartment());

            emailService.sendEmail(
                    contact.getEmail(),
                    template.getSubject(),
                    emailBody
            );
        }

        return campaignRepository.save(campaign);
    }

    public List<Campaign> getAllCampaigns() {
        return campaignRepository.findAll();
    }

    @Transactional
    public Campaign createCampaign(Long templateId,
                                   String name,
                                   List<Long> contactIds) {

        List<Contact> contacts = contactRepository.findAllById(contactIds);

        Template template = templateRepository.findById(templateId)
                .orElseThrow(() -> new RuntimeException("Template not found"));

        // ✅ create campaign
        Campaign campaign = new Campaign();
//        campaign.setName(name);
        campaign.setName("Campaign-" + System.currentTimeMillis());
        campaign.setStatus("SENT");

        // ✅ save first
        Campaign savedCampaign = campaignRepository.save(campaign);

        // ✅ assign campaign to contacts
        for (Contact contact : contacts) {

            contact.setCampaign(savedCampaign);

            // send email
            String body = template.getBody()
                    .replace("{{name}}", contact.getName())
                    .replace("{{department}}", contact.getDepartment());

            emailService.sendEmail(
                    contact.getEmail(),
                    template.getSubject(),
                    body
            );
        }

        // ✅ update contacts
        contactRepository.saveAll(contacts);

        savedCampaign.setContacts(contacts);

        // ✅ update campaign again
        return campaignRepository.save(savedCampaign);
    }
}
