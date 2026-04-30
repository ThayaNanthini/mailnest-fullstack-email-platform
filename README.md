# MailNest 📧

MailNest is a full-stack email campaign management platform built using React, TypeScript, Spring Boot, Hibernate, and MySQL.

It allows users to manage contacts, create email templates, send campaigns, and track campaign relationships using relational database mappings.

---

## 🚀 Features

* Contact management
* Email template management
* Campaign creation and email sending
* Real email integration using JavaMailSender
* Toast notification system
* Reusable React component architecture
* Custom React hooks
* Premium dashboard UI
* One-to-One Hibernate relationship
* Many-to-Many Hibernate relationship

---

## 🛠 Tech Stack

### Frontend

* React
* TypeScript
* Tailwind CSS

### Backend

* Spring Boot
* Hibernate / JPA
* MySQL
* JavaMailSender

---

## 🗄 Database Relationships

* One-to-One → Contact ↔ Profile
* Many-to-Many → Campaign ↔ Contacts

---

## ▶ Run Frontend

```bash
npm install
npm run dev
```

---

## ▶ Run Backend

```bash
mvn spring-boot:run
```

---

## 📌 Future Improvements

* JWT Authentication
* Campaign analytics dashboard
* Scheduled campaigns
* Email tracking
* Queue-based email processing
* Docker deployment

---
