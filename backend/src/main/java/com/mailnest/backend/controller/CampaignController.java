package com.mailnest.backend.controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.mailnest.backend.entity.Campaign;
import com.mailnest.backend.service.CampaignService;
import com.mailnest.backend.dto.CampaignRequest;
import java.util.List;

@RestController
@RequestMapping("/api/campaigns")
@CrossOrigin
public class CampaignController {

    @Autowired
    private CampaignService service;

    @PostMapping
    public Campaign create(@RequestBody CampaignRequest request) {
        return service.createCampaign(
                request.getTemplateId(),
                request.getName(),
                request.getContactIds()
        );
    }
    @PostMapping("/send")
    public Campaign send(@RequestBody CampaignRequest request) {
        return service.sendCampaign(
                request.getTemplateId(),
                request.getContactIds()
        );
    }
    @GetMapping
    public List<Campaign> getAll() {
        return service.getAllCampaigns();
    }
}