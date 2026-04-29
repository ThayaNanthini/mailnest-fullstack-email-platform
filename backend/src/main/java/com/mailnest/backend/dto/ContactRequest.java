package com.mailnest.backend.dto;

public class ContactRequest {

    private String name;
    private String email;
    private String department;

    private String phone;
    private String address;
    // ✅ GETTERS
    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getDepartment() {
        return department;
    }

    public String getPhone() {
        return phone;
    }

    public String getAddress() {
        return address;
    }

    // ✅ SETTERS
//    public void setName(String name) {
//        this.name = name;
//    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}