package com.mailnest.backend.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.mailnest.backend.entity.Template;
import com.mailnest.backend.repository.TemplateRepository;
import java.util.List;

@Service
public class TemplateService {

    @Autowired
    private TemplateRepository repository;

    public List<Template> getAllTemplates() {
        return repository.findAll();
    }

    public Template createTemplate(Template template) {
        return repository.save(template);
    }

    public void deleteTemplate(Long id) {
        repository.deleteById(id);
    }
}