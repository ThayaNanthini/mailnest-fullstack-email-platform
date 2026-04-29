package com.mailnest.backend.dto;
import java.util.List;

public class CampaignRequest {

    private Long templateId;
    private String name;
    private List<Long> contactIds;

    // getters & setters

    public Long getTemplateId() { return templateId; }
    public void setTemplateId(Long templateId) { this.templateId = templateId; }
    public String getName() {
        return name;
    }

    public List<Long> getContactIds() {
        return contactIds;
    }

    // ✅ setters
    public void setName(String name) {
        this.name = name;
    }

    public void setContactIds(List<Long> contactIds) {
        this.contactIds = contactIds;
    }
}