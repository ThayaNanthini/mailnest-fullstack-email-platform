package com.mailnest.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.mailnest.backend.entity.Profile;

public interface ProfileRepository extends JpaRepository<Profile, Long> {
}