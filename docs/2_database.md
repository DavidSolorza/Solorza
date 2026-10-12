# 🗄️ Documento de Base de Datos y Modelo de Datos
**Proyecto:** Portafolio Profesional de David Solorza  
**Versión:** 2026.3.1  
**Autor:** Agente 3 - Principal DBA  
**Estado:** Inmaculado / Aprobado  

---

## 1. Script DDL Inmaculado (PostgreSQL)

```sql
-- Habilitación de extensión para identificadores universales únicos (UUID)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Tabla de Perfil Profesional
CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(150) NOT NULL,
    headline VARCHAR(200) NOT NULL,
    summary TEXT NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(50) NOT NULL,
    location VARCHAR(120) NOT NULL,
    nationality VARCHAR(80) NOT NULL,
    github_url VARCHAR(255) NOT NULL,
    linkedin_url VARCHAR(255) NOT NULL,
    resume_url VARCHAR(255) NOT NULL,
    is_available BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabla de Historial Laboral / Experiencia Profesional
CREATE TABLE work_experiences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID NOT NULL,
    company_name VARCHAR(150) NOT NULL,
    role_title VARCHAR(150) NOT NULL,
    location VARCHAR(120) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NULL,
    is_current BOOLEAN NOT NULL DEFAULT false,
    description TEXT NOT NULL,
    responsibilities TEXT[] NOT NULL DEFAULT '{}',
    display_order INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_work_profile FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE,
    CONSTRAINT chk_work_dates CHECK (end_date IS NULL OR end_date >= start_date)
);

-- 3. Tabla de Proyectos Destacados
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID NOT NULL,
    title VARCHAR(150) NOT NULL,
    slug VARCHAR(150) NOT NULL UNIQUE,
    category VARCHAR(50) NOT NULL, -- 'web', 'mobile', 'backend', 'ai', 'infrastructure'
    summary TEXT NOT NULL,
    detailed_description TEXT NULL,
    technologies TEXT[] NOT NULL DEFAULT '{}',
    github_url VARCHAR(255) NULL,
    live_url VARCHAR(255) NULL,
    apk_url VARCHAR(255) NULL,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    display_order INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_project_profile FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE,
    CONSTRAINT chk_project_category CHECK (category IN ('web', 'mobile', 'backend', 'ai', 'infrastructure'))
);

-- 4. Tabla de Formación y Certificaciones
CREATE TABLE education_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID NOT NULL,
    institution VARCHAR(180) NOT NULL,
    degree_or_certification VARCHAR(250) NOT NULL,
    record_type VARCHAR(50) NOT NULL, -- 'university', 'course', 'certification'
    start_date DATE NOT NULL,
    end_date DATE NULL,
    is_in_progress BOOLEAN NOT NULL DEFAULT false,
    field_of_study VARCHAR(150) NULL,
    display_order INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_education_profile FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE,
    CONSTRAINT chk_education_dates CHECK (end_date IS NULL OR end_date >= start_date),
    CONSTRAINT chk_record_type CHECK (record_type IN ('university', 'course', 'certification'))
);

-- 5. Tabla de Aptitudes y Tecnologías
CREATE TABLE skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID NOT NULL,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL, -- 'frontend', 'backend', 'mobile', 'database', 'tools', 'soft'
    proficiency_level VARCHAR(50) NOT NULL DEFAULT 'intermediate',
    display_order INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_skill_profile FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE,
    CONSTRAINT chk_skill_category CHECK (category IN ('frontend', 'backend', 'mobile', 'database', 'tools', 'soft'))
);

-- Índices de Alto Rendimiento
CREATE INDEX idx_work_profile ON work_experiences(profile_id, display_order);
CREATE INDEX idx_projects_profile ON projects(profile_id, category, display_order);
CREATE INDEX idx_education_profile ON education_records(profile_id, display_order);
CREATE INDEX idx_skills_profile ON skills(profile_id, category);
```

---

## 2. Diccionario de Datos Exhaustivo

### 2.1. Entidad: `profiles`
| Nombre de Columna | Tipo de Datos Exacto | Restricciones | Regla de Negocio / Descripción Detallada |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | `PRIMARY KEY, NOT NULL` | Identificador único universal e inmutable del titular del portafolio. |
| `full_name` | `VARCHAR(150)` | `NOT NULL` | Nombre completo del profesional ("David Solorza"). |
| `headline` | `VARCHAR(200)` | `NOT NULL` | Cargo / Titular profesional ("Software Engineer | Mobile & Offline-First Systems (Flutter) & Scalable Backends (Node.js / Python)"). |
| `summary` | `TEXT` | `NOT NULL` | Resumen ejecutivo y propuesta de valor profesional extraída del CV. |
| `email` | `VARCHAR(255)` | `NOT NULL, UNIQUE` | Correo electrónico directo de contacto. |
| `phone` | `VARCHAR(50)` | `NOT NULL` | Teléfono móvil de contacto ("+57 313 737 4108"). |
| `location` | `VARCHAR(120)` | `NOT NULL` | Ubicación geográfica base ("Manizales, Caldas, Colombia"). |
| `nationality` | `VARCHAR(80)` | `NOT NULL` | Nacionalidad ("Colombiano"). |
| `github_url` | `VARCHAR(255)` | `NOT NULL` | Enlace verificado al perfil de GitHub. |
| `linkedin_url` | `VARCHAR(255)` | `NOT NULL` | Enlace verificado al perfil de LinkedIn. |
| `resume_url` | `VARCHAR(255)` | `NOT NULL` | Ruta al archivo PDF descargable del currículum. |
| `is_available` | `BOOLEAN` | `NOT NULL, DEFAULT true` | Estado de disponibilidad para nuevos proyectos o contratación. |
| `created_at` | `TIMESTAMP WITH TIME ZONE` | `NOT NULL, DEFAULT CURRENT_TIMESTAMP` | Fecha y hora de creación del registro. |
| `updated_at` | `TIMESTAMP WITH TIME ZONE` | `NOT NULL, DEFAULT CURRENT_TIMESTAMP` | Marca temporal de la última actualización. |

### 2.2. Entidad: `work_experiences`
| Nombre de Columna | Tipo de Datos Exacto | Restricciones | Regla de Negocio / Descripción Detallada |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | `PRIMARY KEY, NOT NULL` | Identificador único de la experiencia laboral. |
| `profile_id` | `UUID` | `NOT NULL, FK` | Llave foránea hacia `profiles(id)` con `ON DELETE CASCADE`. |
| `company_name` | `VARCHAR(150)` | `NOT NULL` | Organización o empresa ("Wolf Enterprise", "Fundación FreeAgents"). |
| `role_title` | `VARCHAR(150)` | `NOT NULL` | Rol desempeñado ("Fundador & Líder Técnico", "Desarrollador de Software Backend"). |
| `location` | `VARCHAR(120)` | `NOT NULL` | Ciudad/país donde se desarrolló la actividad laboral. |
| `start_date` | `DATE` | `NOT NULL` | Fecha de inicio de la relación contractual. |
| `end_date` | `DATE` | `NULL` | Fecha de culminación. Nulo si el rol sigue activo. |
| `is_current` | `BOOLEAN` | `NOT NULL, DEFAULT false` | Indica si actualmente labora en esta organización. |
| `description` | `TEXT` | `NOT NULL` | Resumen de alto impacto sobre el alcance de la posición. |
| `responsibilities` | `TEXT[]` | `NOT NULL, DEFAULT '{}'` | Lista de logros con métricas STAR cuantificables. |
| `display_order` | `INTEGER` | `NOT NULL, DEFAULT 1` | Orden de visualización cronológico inverso. |
| `created_at` | `TIMESTAMP WITH TIME ZONE` | `NOT NULL, DEFAULT CURRENT_TIMESTAMP` | Fecha de inserción. |

### 2.3. Entidad: `projects`
| Nombre de Columna | Tipo de Datos Exacto | Restricciones | Regla de Negocio / Descripción Detallada |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | `PRIMARY KEY, NOT NULL` | Identificador único del proyecto. |
| `profile_id` | `UUID` | `NOT NULL, FK` | Relación con `profiles(id)` con `ON DELETE CASCADE`. |
| `title` | `VARCHAR(150)` | `NOT NULL` | Nombre público del proyecto. |
| `slug` | `VARCHAR(150)` | `NOT NULL, UNIQUE` | Identificador de URL amigable. |
| `category` | `VARCHAR(50)` | `NOT NULL, CHECK` | Clasificación técnica: 'web', 'mobile', 'backend', 'ai', 'infrastructure'. |
| `summary` | `TEXT` | `NOT NULL` | Descripción concisa del problema resuelto y valor aportado. |
| `technologies` | `TEXT[]` | `NOT NULL` | Array de tecnologías aplicadas (e.g. Flutter, React, Node, etc.). |
| `is_flagship` | `BOOLEAN` | `NOT NULL, DEFAULT false` | Bandera que indica si el proyecto es uno de los 3 Proyectos Insignia (Flagship Case Studies). |
| `problem_statement` | `TEXT` | `NULL` | Planteamiento del problema técnico o de negocio resuelto. |
| `technical_challenge` | `TEXT` | `NULL` | Reto técnico complejo superado durante la implementación. |
| `impact_metrics` | `TEXT` | `NULL` | Métricas cuantitativas de impacto y rendimiento en producción. |
| `github_url` | `VARCHAR(255)` | `NULL` | Repositorio público de código. |
| `live_url` | `VARCHAR(255)` | `NULL` | Enlace a despliegue productivo o caso de estudio. |
| `apk_url` | `VARCHAR(255)` | `NULL` | Enlace de descarga de artefacto móvil compilado si aplica. |
| `is_featured` | `BOOLEAN` | `NOT NULL, DEFAULT false` | Destacado principal en la vista de presentación. |
| `display_order` | `INTEGER` | `NOT NULL, DEFAULT 1` | Prioridad de visualización en la grilla. |

### 2.4. Entidad: `education_records`
| Nombre de Columna | Tipo de Datos Exacto | Restricciones | Regla de Negocio / Descripción Detallada |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | `PRIMARY KEY, NOT NULL` | Identificador único de la certificación o título. |
| `profile_id` | `UUID` | `NOT NULL, FK` | Relación obligatoria con `profiles(id)`. |
| `institution` | `VARCHAR(180)` | `NOT NULL` | Centro de educación ("Universidad de Caldas", "PUC Chile", "SENA"). |
| `degree_or_certification`| `VARCHAR(250)`| `NOT NULL` | Nombre oficial de la titulación o certificación. |
| `record_type` | `VARCHAR(50)` | `NOT NULL, CHECK` | Tipo: 'university', 'course', 'certification'. |
| `start_date` | `DATE` | `NOT NULL` | Fecha de inicio. |
| `end_date` | `DATE` | `NULL` | Fecha de finalización o graduación. |
| `is_in_progress` | `BOOLEAN` | `NOT NULL, DEFAULT false` | Indica si el programa está actualmente en curso. |
| `field_of_study` | `VARCHAR(150)` | `NULL` | Área de conocimiento (e.g. "Ingeniería en Sistemas"). |
| `display_order` | `INTEGER` | `NOT NULL, DEFAULT 1` | Orden secuencial de acuerdo al CV. |
