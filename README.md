
<p align="center">
  <a href="https://nestjs.com" target="_blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="NestJS Logo" />
  </a>
</p>

<h1 align="center">Eltemtek Performance Evaluation System</h1>

<p align="center">
A complete, production-ready backend system developed as part of a professional software engineering internship at <b>Eltemtek</b>.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Backend-NestJS-red" />
  <img src="https://img.shields.io/badge/Language-TypeScript-blue" />
  <img src="https://img.shields.io/badge/Database-PostgreSQL-316192" />
  <img src="https://img.shields.io/badge/Auth-JWT%20%2B%20Cookies-green" />
  <img src="https://img.shields.io/badge/API-Swagger%20(OpenAPI%203.0)-brightgreen" />
</p>

---

## 1. Introduction

The **Eltemtek Performance Evaluation System** is a backend application designed to digitally manage and evaluate employee performance in a structured, transparent, and scalable way.

This system was developed during my internship at **Eltemtek** and reflects real-world backend engineering practices, including modular architecture, secure authentication, role-based authorization, and data-driven performance scoring.

The project is not a demo or toy example.  
It is a **fully functional backend system**, designed with maintainability, clarity, and extensibility in mind.

---

## 2. Problem Statement & Motivation

In many organizations, employee performance evaluations are:
- handled manually,
- difficult to standardize,
- error-prone,
- and hard to track historically.

This project aims to solve these problems by introducing:
- structured exams,
- weighted evaluation questions,
- centralized personnel management,
- and automated performance score calculation.

The result is a **consistent and auditable performance evaluation workflow**.

---

## 3. High-Level System Overview

At its core, the system provides:

- Secure authentication using **Sicil No + Password**
- Role-based access control
- Personnel, department, and role management
- Exam creation and classification
- Question-based evaluation with configurable weights
- Automatic performance score calculation
- Fully documented REST API via Swagger

All features are exposed through a **RESTful API**, making the system suitable for integration with:
- web frontends,
- internal dashboards,
- or other enterprise services.

---

## 4. Technology Stack

The following technologies were used intentionally to match enterprise backend standards:

- **NestJS** – scalable Node.js backend framework
- **TypeScript** – strong typing and maintainability
- **PostgreSQL** – relational data integrity
- **TypeORM** – ORM with repository pattern
- **JWT Authentication** – stateless, secure sessions
- **HTTP-only Cookies** – protection against XSS
- **Swagger (OpenAPI 3.0)** – API documentation & testing

---

## 5. Architecture & Design Principles

The project follows a **layered architecture**:

- **Controller Layer**
  - Handles HTTP requests & responses
  - No business logic

- **Service Layer**
  - Contains all business rules
  - Orchestrates repositories and validations

- **Repository Layer**
  - Encapsulates database access
  - Uses TypeORM repositories and custom queries

- **DTOs & Validation**
  - Request/response validation using DTOs
  - Centralized data integrity enforcement

This separation ensures:
- clean code,
- easier debugging,
- and long-term maintainability.

---

## 6. Authentication & Authorization

### Authentication Flow

1. User logs in using **Sicil No and password**
2. Credentials are validated
3. A JWT is generated
4. JWT is stored in an **HTTP-only cookie**
5. Subsequent requests are authenticated automatically

### Authorization

- Role-based access control is applied
- Each endpoint can be protected based on user roles
- Sensitive operations are restricted

This design mirrors real enterprise security standards.

---

## 7. Core Domain Modules

### 7.1 Personnel Module

Responsible for:
- Creating and managing employees
- Assigning roles and departments
- Central identity representation of users

Supports full CRUD operations.

---

### 7.2 Department Module

- Organizational unit management
- Logical grouping of personnel
- Future-ready for reporting & analytics

---

### 7.3 Role Module

- Defines system roles
- Enables authorization rules
- Separates permissions from identities

---

### 7.4 Question Module

- Stores performance evaluation questions
- Questions are reusable across exams
- Fully manageable via API

---

### 7.5 Question Weight Module

- Each question can have a custom weight
- Enables flexible scoring strategies
- Directly affects performance calculations

---

### 7.6 Exam Module

- Represents evaluation events
- Exams can be categorized by type
- Performance score can be calculated dynamically

---

### 7.7 Exam Type Module

- Groups exams by purpose
- Allows classification (e.g., technical, soft skills, etc.)

---

### 7.8 Exam Detail Module

- Stores individual exam results
- Links personnel, exams, and answers
- Enables detailed performance tracking

---

## 8. API Documentation (Swagger)

All endpoints are fully documented and testable via Swagger.

After running the project, open:

```
http://localhost:3000/api
```

Swagger includes:
- request/response schemas
- authentication support
- real-time testing

This makes onboarding and testing extremely fast.

---

## 9. Project Setup

### 9.1 Requirements

- Node.js (v18+ recommended)
- PostgreSQL
- npm

---

### 9.2 Installation

```bash
npm install
```

---

### 9.3 Environment Configuration

Create a `.env` file in the root directory:

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=your_password
DATABASE_NAME=eltemtek_db

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
```

---

## 10. Running the Application

### Development Mode

```bash
npm run start:dev
```

### Production Mode

```bash
npm run start:prod
```

The server will start on:

```
http://localhost:3000
```

---

## 11. Testing

```bash
# Unit tests
npm run test

# End-to-end tests
npm run test:e2e

# Coverage
npm run test:cov
```

---

## 12. Project Status

✅ **Completed**  
All planned features have been implemented and tested.

The system is stable and ready for real-world usage or further extension.

---

## 13. Future Improvements

Possible future enhancements:
- Frontend dashboard
- Advanced analytics & reporting
- Audit logs
- Notification system
- Multi-tenant support

---

## 14. Author

**Asya Berk**  
Computer Engineering Student  
Internship Project – Eltemtek

---

## 15. License

This project was developed for educational and professional internship purposes.
