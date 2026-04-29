package com.mailnest.backend.repository;
import com.mailnest.backend.entity.Template;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TemplateRepository extends JpaRepository<Template, Long> {
}