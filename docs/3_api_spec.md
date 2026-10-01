# 📄 Especificación Técnica de Contratos de API (RESTful)
**Proyecto:** Portafolio Profesional de David Solorza  
**Versión:** 2026.3.1  
**Autor:** Agente 6 - Technical Writer & QA  
**Estado:** Inmaculado / Aprobado  

---

## 1. Alcance Técnico
Este documento define los contratos de comunicación y especificaciones de endpoints RESTful para la gestión y consulta de los datos estructurados del portafolio (Perfil, Experiencias, Proyectos, Formación y Envío de Contacto). Todas las llamadas consumen y devuelven `application/json` mediante el cliente HTTP nativo sin intermediación de SDKs propietarios.

---

## 2. Matriz de Endpoints

### 2.1. GET `/api/v1/profile`
Obtiene la información general de presentación del perfil profesional, resumen de CV, canales directos y estado de disponibilidad.

- **Método HTTP:** `GET`
- **Cabeceras Requeridas:**
  - `Accept: application/json`
- **Payload de Entrada:** Ninguno (Parámetros de consulta opcionales: `?lang=es|en`).

#### Matriz de Respuestas:
- **`200 OK` (Éxito):**
```json
{
  "status": "success",
  "data": {
    "fullName": "David Solorza",
    "headline": "Desarrollador Full-Stack & Mobile (Bilingüe)",
    "summary": "Desarrollador Full-Stack & Mobile (Bilingüe) con experiencia en el diseño de arquitecturas escalables, sistemas offline-first (Flutter/Dart) y aplicaciones web de alto rendimiento (React/Node.js).",
    "email": "david.josue.solorza@gmail.com",
    "phone": "+57 313 737 4108",
    "location": "Manizales, Caldas, Colombia",
    "nationality": "Colombiano",
    "isAvailable": true,
    "githubUrl": "https://github.com/DavidSolorza",
    "linkedinUrl": "https://www.linkedin.com/in/david-josue-solorza-viera",
    "resumeUrl": "/cv/DAVID_SOLORZA.pdf"
  }
}
```
- **`500 Internal Server Error`:**
```json
{
  "status": "error",
  "code": "INTERNAL_SERVER_ERROR",
  "message": "Falla inesperada al recuperar la información del perfil del sistema de persistencia."
}
```

---

### 2.2. GET `/api/v1/experiences`
Retorna el historial laboral profesional organizado cronológicamente.

- **Método HTTP:** `GET`
- **Cabeceras:** `Accept: application/json`

#### Matriz de Respuestas:
- **`200 OK` (Éxito):**
```json
{
  "status": "success",
  "results": 2,
  "data": [
    {
      "id": "e4b1a830-47b2-4d22-95e2-632df30be281",
      "company": "Wolf Enterprise",
      "role": "Fundador",
      "location": "Manizales, Caldas",
      "startDate": "2026-01-01",
      "endDate": null,
      "isCurrent": true,
      "responsibilities": [
        "Supervisión del desarrollo tecnológico, incluyendo software y soluciones digitales.",
        "Creación y mantenimiento de relaciones estratégicas con socios y proveedores claves.",
        "Planificación, desarrollo y coordinación del funcionamiento general de la empresa."
      ]
    },
    {
      "id": "90e386df-b924-4f0f-8c33-911ef78f01b4",
      "company": "Fundación FreeAgents",
      "role": "Desarrollador de Software e Integrador",
      "location": "Remoto / Colombia",
      "startDate": "2024-01-01",
      "endDate": "2026-01-01",
      "isCurrent": false,
      "responsibilities": [
        "Creación de sistemas Web Personalizados",
        "APIs y Microservicios",
        "Elaboración de integración de Sistemas",
        "Divulgación E-commerce"
      ]
    }
  ]
}
```

---

### 2.3. GET `/api/v1/education`
Lista los títulos universitarios, certificaciones de programación e idiomas en el orden exacto del CV.

- **Método HTTP:** `GET`
- **Cabeceras:** `Accept: application/json`

#### Matriz de Respuestas:
- **`200 OK` (Éxito):**
```json
{
  "status": "success",
  "data": {
    "higherEducation": [
      {
        "institution": "Universidad de Caldas",
        "degree": "Ingeniero en Sistemas y Computación",
        "period": "01/2024 - Actual",
        "isCurrent": true,
        "location": "Manizales, Caldas"
      }
    ],
    "certifications": [
      {
        "institution": "Pontificia Universidad Católica de Chile",
        "title": "Introducción a la programación en Python I",
        "period": "01/2020 - 12/2020"
      },
      {
        "institution": "SENA",
        "title": "Aplicación de las etapas del desarrollo de software en la implementación de soluciones de TIC",
        "period": "01/2020 - 12/2020"
      },
      {
        "institution": "SENA",
        "title": "Estructura de lenguaje de programación C++ (NIVEL I)",
        "period": "01/2020 - 12/2020"
      },
      {
        "institution": "SENA",
        "title": "Certificado en Experiencias de Ciencia para la Vida",
        "period": "01/2021 - 12/2021"
      },
      {
        "institution": "SENA",
        "title": "Certificado en English Dot Works Beginner",
        "period": "04/2019 - 07/2019"
      },
      {
        "institution": "SENA",
        "title": "Certificado en Elaborar Circuitos Electrónicos",
        "period": "06/2019 - 12/2019"
      }
    ],
    "languages": [
      { "language": "Español", "proficiency": "Nativo" },
      { "language": "Inglés", "proficiency": "Intermedio B1" }
    ]
  }
}
```

---

### 2.4. POST `/api/v1/contact`
Recepción y validación de mensajes entrantes del formulario de contacto.

- **Método HTTP:** `POST`
- **Cabeceras Requeridas:**
  - `Content-Type: application/json`
  - `Accept: application/json`

#### Payload Completo de Entrada (JSON):
```json
{
  "name": "Alexander Hamilton",
  "email": "alexander@financialtech.com",
  "subject": "Propuesta de desarrollo de aplicación móvil offline-first",
  "message": "Hola David, revisamos tu perfil y proyectos en Flutter y arquitectura limpia. Deseamos coordinar una entrevista técnica para un proyecto."
}
```

#### Matriz Estricta de Respuestas y Errores:
- **`201 Created`:**
```json
{
  "status": "success",
  "message": "Mensaje recibido correctamente. Nos pondremos en contacto dentro de las próximas 24-48 horas.",
  "receiptId": "msg_90e386df-b924-4f0f-8c33-911ef78f01b4"
}
```
- **`400 Bad Request`:**
```json
{
  "status": "fail",
  "code": "INVALID_REQUEST_PAYLOAD",
  "message": "El cuerpo de la solicitud no contiene un formato JSON válido o contiene caracteres no permitidos."
}
```
- **`401 Unauthorized` / `403 Forbidden`:**
```json
{
  "status": "fail",
  "code": "AUTH_FORBIDDEN",
  "message": "Acceso denegado. Se requiere un token de sesión o verificación de origen válido."
}
```
- **`422 Unprocessable Entity` (Errores de Validación de Esquema):**
```json
{
  "status": "fail",
  "code": "VALIDATION_FAILED",
  "message": "Los datos suministrados no superan las reglas de validación de negocio.",
  "errors": [
    { "field": "email", "issue": "Debe proporcionar una dirección de correo electrónico válida con formato RFC 5322." },
    { "field": "message", "issue": "El mensaje debe contener al menos 15 caracteres descriptivos." }
  ]
}
```
- **`500 Internal Server Error`:**
```json
{
  "status": "error",
  "code": "TRANSACTION_FAILED",
  "message": "Falla de red en el servicio de transporte SMTP o encolamiento de mensajes."
}
```
