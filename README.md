
<p align="center">
  <a href="http://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
  </a>
</p>

<h1 align="center">Eltemtek Performans Değerlendirme Sistemi</h1>

<p align="center">
  Eltemtek stajım kapsamında geliştirilmiş, kurumsal ölçekte bir <b>Performans Değerlendirme Backend Sistemi</b>.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/NestJS-Backend-red" />
  <img src="https://img.shields.io/badge/PostgreSQL-Database-blue" />
  <img src="https://img.shields.io/badge/JWT-Auth-green" />
  <img src="https://img.shields.io/badge/Swagger-API%20Docs-brightgreen" />
</p>

---

## 📌 Proje Özeti

Bu proje, şirket içi personel performanslarının ölçülmesi, sınavlar üzerinden skorlanması ve rol bazlı yetkilendirme ile yönetilmesini sağlayan **tam fonksiyonel bir REST API** sunar.

Backend mimarisi **NestJS** ile geliştirilmiş olup, modüler ve ölçeklenebilir bir yapı hedeflenmiştir.

---

## 🧱 Kullanılan Teknolojiler

- **NestJS**
- **TypeScript**
- **PostgreSQL**
- **TypeORM**
- **JWT Authentication**
- **HTTP-only Cookie Auth**
- **Swagger (OpenAPI 3.0)**

---

## 🔐 Kimlik Doğrulama (Auth)

- Sicil No + Şifre ile giriş
- JWT tabanlı authentication
- Role-based access control
- Secure HTTP-only cookie kullanımı

---

## 🧩 Modüller

### 👤 Personel
- Personel CRUD işlemleri
- Sicil No bazlı işlemler
- Role & departman ilişkileri

### 🏢 Departman
- Departman CRUD
- Personel–Departman bağlantısı

### 🧑‍💼 Rol
- Rol tanımlama ve yönetimi
- Yetkilendirme altyapısı

### ❓ Sorular
- Performans değerlendirme soruları
- Dinamik soru yönetimi

### ⚖️ Soru Ağırlıkları
- Her soruya özel ağırlık
- Skor hesaplama altyapısı

### 📝 Sınav
- Sınav oluşturma
- Sınav türleri
- Performans skoru hesaplama

### 📊 Sınav Detay
- Personel bazlı sınav kayıtları
- Detaylı skor takibi

---

## 📎 API Dokümantasyonu

Swagger arayüzü üzerinden tüm endpoint’ler test edilebilir:

```
http://localhost:3000/api
```

Swagger;  
- Personel  
- Departman  
- Rol  
- Soru  
- Soru Ağırlık  
- Sınav  
- Sınav Türü  
- Sınav Detay  
- Auth  

endpoint’lerinin tamamını kapsamaktadır.

---

## ⚙️ Kurulum

```bash
npm install
```

### Ortam Değişkenleri

`.env` dosyasında aşağıdaki değişkenler tanımlanmalıdır:

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=yourpassword
DATABASE_NAME=eltemtek_db
JWT_SECRET=yoursecret
```

---

## ▶️ Çalıştırma

```bash
# development
npm run start:dev

# production
npm run start:prod
```

---

## 🧪 Test

```bash
npm run test
npm run test:e2e
npm run test:cov
```

---

## 🧠 Mimari Notlar

- Layered Architecture (Controller / Service / Repository)
- DTO + ValidationPipe kullanımı
- Custom Repository yapısı
- Modüler, okunabilir ve maintainable kod yapısı

---

## ✅ Proje Durumu

> 🎉 **Proje tamamlandı.**  
Tüm işlevler çalışır durumda, Swagger üzerinden test edilebilir.

---

## 👩‍💻 Geliştirici

**Asya Berk**  
Bilgisayar Mühendisliği Öğrencisi  
Eltemtek Staj Projesi  

---

## 📄 Lisans

Bu proje eğitim ve staj kapsamında geliştirilmiştir.
