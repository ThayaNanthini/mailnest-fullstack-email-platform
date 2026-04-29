package com.mailnest.backend.controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.mailnest.backend.entity.Template;
import com.mailnest.backend.service.TemplateService;
import java.util.List;

@RestController
@RequestMapping("/api/templates")
@CrossOrigin
public class TemplateController {

    @Autowired
    private TemplateService service;

    @GetMapping
    public List<Template> getAll() {
        return service.getAllTemplates();
    }

    @PostMapping
    public Template create(@RequestBody Template template) {
        return service.createTemplate(template);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteTemplate(id);
    }
}