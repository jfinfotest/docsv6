---
title: "Diagramas Mermaid - Casos de Uso Específicos"
position: 5
---

# Diagramas Mermaid - Casos de Uso Específicos

Ejemplos prácticos de diagramas Mermaid para situaciones reales en desarrollo de software y documentación técnica.

## Características del Componente Mejorado

Nuestro componente Mermaid ha sido actualizado con las siguientes mejoras:

- **Generación de IDs seguros**: Evita errores de selector CSS con identificadores únicos y válidos
- **Carga dinámica optimizada**: La librería se carga solo cuando es necesaria, mejorando el rendimiento
- **Soporte completo para temas**: Adaptación automática y fluida al modo oscuro/claro
- **Manejo robusto de errores**: Visualización clara de errores con mensajes informativos
- **Diseño responsive mejorado**: Adaptación perfecta a diferentes tamaños de pantalla
- **Renderizado más estable**: Eliminación de conflictos de ID y mejora en la estabilidad

## Arquitectura de Microservicios

Diagrama que muestra la arquitectura de un sistema de microservicios.

````markdown
```mermaid
flowchart TB
    subgraph "Frontend"
        WEB[Web App]
        MOBILE[Mobile App]
    end
    
    subgraph "API Gateway"
        GATEWAY[API Gateway]
        AUTH[Auth Service]
    end
    
    subgraph "Microservicios"
        USER[User Service]
        PRODUCT[Product Service]
        ORDER[Order Service]
        PAYMENT[Payment Service]
        NOTIFICATION[Notification Service]
    end
    
    subgraph "Bases de Datos"
        USERDB[(User DB)]
        PRODUCTDB[(Product DB)]
        ORDERDB[(Order DB)]
    end
    
    subgraph "Servicios Externos"
        PAYPAL[PayPal API]
        EMAIL[Email Service]
        SMS[SMS Service]
    end
    
    WEB --> GATEWAY
    MOBILE --> GATEWAY
    
    GATEWAY --> AUTH
    GATEWAY --> USER
    GATEWAY --> PRODUCT
    GATEWAY --> ORDER
    
    USER --> USERDB
    PRODUCT --> PRODUCTDB
    ORDER --> ORDERDB
    
    ORDER --> PAYMENT
    PAYMENT --> PAYPAL
    
    ORDER --> NOTIFICATION
    NOTIFICATION --> EMAIL
    NOTIFICATION --> SMS
    
    style GATEWAY fill:#e3f2fd
    style AUTH fill:#fff3e0
    style USER fill:#f3e5f5
    style PRODUCT fill:#e8f5e8
    style ORDER fill:#fff8e1
    style PAYMENT fill:#fce4ec
    style NOTIFICATION fill:#e0f2f1
```
````

**Resultado:**
```mermaid
flowchart TB
    subgraph "Frontend"
        WEB[Web App]
        MOBILE[Mobile App]
    end
    
    subgraph "API Gateway"
        GATEWAY[API Gateway]
        AUTH[Auth Service]
    end
    
    subgraph "Microservicios"
        USER[User Service]
        PRODUCT[Product Service]
        ORDER[Order Service]
        PAYMENT[Payment Service]
        NOTIFICATION[Notification Service]
    end
    
    subgraph "Bases de Datos"
        USERDB[(User DB)]
        PRODUCTDB[(Product DB)]
        ORDERDB[(Order DB)]
    end
    
    subgraph "Servicios Externos"
        PAYPAL[PayPal API]
        EMAIL[Email Service]
        SMS[SMS Service]
    end
    
    WEB --> GATEWAY
    MOBILE --> GATEWAY
    
    GATEWAY --> AUTH
    GATEWAY --> USER
    GATEWAY --> PRODUCT
    GATEWAY --> ORDER
    
    USER --> USERDB
    PRODUCT --> PRODUCTDB
    ORDER --> ORDERDB
    
    ORDER --> PAYMENT
    PAYMENT --> PAYPAL
    
    ORDER --> NOTIFICATION
    NOTIFICATION --> EMAIL
    NOTIFICATION --> SMS
    
    style GATEWAY fill:#e3f2fd
    style AUTH fill:#fff3e0
    style USER fill:#f3e5f5
    style PRODUCT fill:#e8f5e8
    style ORDER fill:#fff8e1
    style PAYMENT fill:#fce4ec
    style NOTIFICATION fill:#e0f2f1
```

## Flujo de CI/CD

Proceso de integración y despliegue continuo.

````markdown
```mermaid
flowchart LR
    DEV[Desarrollador] --> COMMIT[Commit Code]
    COMMIT --> TRIGGER[Trigger Pipeline]
    
    subgraph "CI Pipeline"
        BUILD[Build]
        TEST[Run Tests]
        LINT[Code Linting]
        SECURITY[Security Scan]
        PACKAGE[Package App]
    end
    
    subgraph "CD Pipeline"
        DEPLOY_DEV[Deploy to Dev]
        E2E[E2E Tests]
        DEPLOY_STAGING[Deploy to Staging]
        MANUAL[Manual Approval]
        DEPLOY_PROD[Deploy to Production]
    end
    
    TRIGGER --> BUILD
    BUILD --> TEST
    TEST --> LINT
    LINT --> SECURITY
    SECURITY --> PACKAGE
    
    PACKAGE --> DEPLOY_DEV
    DEPLOY_DEV --> E2E
    E2E --> DEPLOY_STAGING
    DEPLOY_STAGING --> MANUAL
    MANUAL --> DEPLOY_PROD
    
    TEST -.->|Falla| NOTIFY_DEV[Notificar Desarrollador]
    SECURITY -.->|Vulnerabilidades| BLOCK[Bloquear Pipeline]
    E2E -.->|Falla| ROLLBACK[Rollback]
    
    style BUILD fill:#e3f2fd
    style TEST fill:#e8f5e8
    style DEPLOY_PROD fill:#c8e6c9
    style BLOCK fill:#ffcdd2
    style ROLLBACK fill:#fff3e0
```
````

**Resultado:**
```mermaid
flowchart LR
    DEV[Desarrollador] --> COMMIT[Commit Code]
    COMMIT --> TRIGGER[Trigger Pipeline]
    
    subgraph "CI Pipeline"
        BUILD[Build]
        TEST[Run Tests]
        LINT[Code Linting]
        SECURITY[Security Scan]
        PACKAGE[Package App]
    end
    
    subgraph "CD Pipeline"
        DEPLOY_DEV[Deploy to Dev]
        E2E[E2E Tests]
        DEPLOY_STAGING[Deploy to Staging]
        MANUAL[Manual Approval]
        DEPLOY_PROD[Deploy to Production]
    end
    
    TRIGGER --> BUILD
    BUILD --> TEST
    TEST --> LINT
    LINT --> SECURITY
    SECURITY --> PACKAGE
    
    PACKAGE --> DEPLOY_DEV
    DEPLOY_DEV --> E2E
    E2E --> DEPLOY_STAGING
    DEPLOY_STAGING --> MANUAL
    MANUAL --> DEPLOY_PROD
    
    TEST -.->|Falla| NOTIFY_DEV[Notificar Desarrollador]
    SECURITY -.->|Vulnerabilidades| BLOCK[Bloquear Pipeline]
    E2E -.->|Falla| ROLLBACK[Rollback]
    
    style BUILD fill:#e3f2fd
    style TEST fill:#e8f5e8
    style DEPLOY_PROD fill:#c8e6c9
    style BLOCK fill:#ffcdd2
    style ROLLBACK fill:#fff3e0
```

## Diagrama de Red y Infraestructura

Arquitectura de infraestructura en la nube.

````markdown
```mermaid
flowchart TB
    subgraph "Internet"
        USERS[Usuarios]
        CDN[CloudFlare CDN]
    end
    
    subgraph "AWS Cloud"
        subgraph "VPC - Zona de Disponibilidad A"
            subgraph "Subred Pública A"
                ALB[Application Load Balancer]
                NAT_A[NAT Gateway A]
            end
            
            subgraph "Subred Privada A"
                EC2_A1[EC2 Instance A1]
                EC2_A2[EC2 Instance A2]
                RDS_A[RDS Primary]
            end
        end
        
        subgraph "VPC - Zona de Disponibilidad B"
            subgraph "Subred Pública B"
                NAT_B[NAT Gateway B]
            end
            
            subgraph "Subred Privada B"
                EC2_B1[EC2 Instance B1]
                EC2_B2[EC2 Instance B2]
                RDS_B[RDS Standby]
            end
        end
        
        subgraph "Servicios Adicionales"
            S3[S3 Bucket]
            REDIS[ElastiCache Redis]
            SQS[SQS Queue]
        end
    end
    
    USERS --> CDN
    CDN --> ALB
    ALB --> EC2_A1
    ALB --> EC2_A2
    ALB --> EC2_B1
    ALB --> EC2_B2
    
    EC2_A1 --> RDS_A
    EC2_A2 --> RDS_A
    EC2_B1 --> RDS_A
    EC2_B2 --> RDS_A
    
    RDS_A -.->|Replicación| RDS_B
    
    EC2_A1 --> REDIS
    EC2_A2 --> REDIS
    EC2_B1 --> REDIS
    EC2_B2 --> REDIS
    
    EC2_A1 --> S3
    EC2_A2 --> S3
    EC2_B1 --> S3
    EC2_B2 --> S3
    
    EC2_A1 --> SQS
    EC2_A2 --> SQS
    EC2_B1 --> SQS
    EC2_B2 --> SQS
    
    style ALB fill:#e3f2fd
    style RDS_A fill:#c8e6c9
    style RDS_B fill:#fff3e0
    style REDIS fill:#ffcdd2
    style S3 fill:#f3e5f5
```
````

**Resultado:**
```mermaid
flowchart TB
    subgraph "Internet"
        USERS[Usuarios]
        CDN[CloudFlare CDN]
    end
    
    subgraph "AWS Cloud"
        subgraph "VPC - Zona de Disponibilidad A"
            subgraph "Subred Pública A"
                ALB[Application Load Balancer]
                NAT_A[NAT Gateway A]
            end
            
            subgraph "Subred Privada A"
                EC2_A1[EC2 Instance A1]
                EC2_A2[EC2 Instance A2]
                RDS_A[RDS Primary]
            end
        end
        
        subgraph "VPC - Zona de Disponibilidad B"
            subgraph "Subred Pública B"
                NAT_B[NAT Gateway B]
            end
            
            subgraph "Subred Privada B"
                EC2_B1[EC2 Instance B1]
                EC2_B2[EC2 Instance B2]
                RDS_B[RDS Standby]
            end
        end
        
        subgraph "Servicios Adicionales"
            S3[S3 Bucket]
            REDIS[ElastiCache Redis]
            SQS[SQS Queue]
        end
    end
    
    USERS --> CDN
    CDN --> ALB
    ALB --> EC2_A1
    ALB --> EC2_A2
    ALB --> EC2_B1
    ALB --> EC2_B2
    
    EC2_A1 --> RDS_A
    EC2_A2 --> RDS_A
    EC2_B1 --> RDS_A
    EC2_B2 --> RDS_A
    
    RDS_A -.->|Replicación| RDS_B
    
    EC2_A1 --> REDIS
    EC2_A2 --> REDIS
    EC2_B1 --> REDIS
    EC2_B2 --> REDIS
    
    EC2_A1 --> S3
    EC2_A2 --> S3
    EC2_B1 --> S3
    EC2_B2 --> S3
    
    EC2_A1 --> SQS
    EC2_A2 --> SQS
    EC2_B1 --> SQS
    EC2_B2 --> SQS
    
    style ALB fill:#e3f2fd
    style RDS_A fill:#c8e6c9
    style RDS_B fill:#fff3e0
    style REDIS fill:#ffcdd2
    style S3 fill:#f3e5f5
```

## Flujo de Procesamiento de Datos

Pipeline de procesamiento de datos en tiempo real.

````markdown
```mermaid
flowchart LR
    subgraph "Fuentes de Datos"
        API[APIs Externas]
        DB[Base de Datos]
        FILES[Archivos CSV/JSON]
        STREAM[Stream en Tiempo Real]
    end
    
    subgraph "Ingesta"
        KAFKA[Apache Kafka]
        COLLECTOR[Data Collector]
    end
    
    subgraph "Procesamiento"
        SPARK[Apache Spark]
        TRANSFORM[Transformaciones]
        VALIDATE[Validaciones]
        ENRICH[Enriquecimiento]
    end
    
    subgraph "Almacenamiento"
        WAREHOUSE[Data Warehouse]
        LAKE[Data Lake]
        CACHE[Cache Redis]
    end
    
    subgraph "Consumo"
        DASHBOARD[Dashboards]
        ML[Machine Learning]
        REPORTS[Reportes]
        ALERTS[Alertas]
    end
    
    API --> COLLECTOR
    DB --> COLLECTOR
    FILES --> COLLECTOR
    STREAM --> KAFKA
    
    COLLECTOR --> KAFKA
    KAFKA --> SPARK
    
    SPARK --> TRANSFORM
    TRANSFORM --> VALIDATE
    VALIDATE --> ENRICH
    
    ENRICH --> WAREHOUSE
    ENRICH --> LAKE
    ENRICH --> CACHE
    
    WAREHOUSE --> DASHBOARD
    WAREHOUSE --> REPORTS
    LAKE --> ML
    CACHE --> ALERTS
    
    VALIDATE -.->|Datos Inválidos| ERROR_QUEUE[Cola de Errores]
    ERROR_QUEUE --> MANUAL_REVIEW[Revisión Manual]
    
    style KAFKA fill:#e3f2fd
    style SPARK fill:#fff3e0
    style WAREHOUSE fill:#c8e6c9
    style ERROR_QUEUE fill:#ffcdd2
```
````

**Resultado:**
```mermaid
flowchart LR
    subgraph "Fuentes de Datos"
        API[APIs Externas]
        DB[Base de Datos]
        FILES[Archivos CSV/JSON]
        STREAM[Stream en Tiempo Real]
    end
    
    subgraph "Ingesta"
        KAFKA[Apache Kafka]
        COLLECTOR[Data Collector]
    end
    
    subgraph "Procesamiento"
        SPARK[Apache Spark]
        TRANSFORM[Transformaciones]
        VALIDATE[Validaciones]
        ENRICH[Enriquecimiento]
    end
    
    subgraph "Almacenamiento"
        WAREHOUSE[Data Warehouse]
        LAKE[Data Lake]
        CACHE[Cache Redis]
    end
    
    subgraph "Consumo"
        DASHBOARD[Dashboards]
        ML[Machine Learning]
        REPORTS[Reportes]
        ALERTS[Alertas]
    end
    
    API --> COLLECTOR
    DB --> COLLECTOR
    FILES --> COLLECTOR
    STREAM --> KAFKA
    
    COLLECTOR --> KAFKA
    KAFKA --> SPARK
    
    SPARK --> TRANSFORM
    TRANSFORM --> VALIDATE
    VALIDATE --> ENRICH
    
    ENRICH --> WAREHOUSE
    ENRICH --> LAKE
    ENRICH --> CACHE
    
    WAREHOUSE --> DASHBOARD
    WAREHOUSE --> REPORTS
    LAKE --> ML
    CACHE --> ALERTS
    
    VALIDATE -.->|Datos Inválidos| ERROR_QUEUE[Cola de Errores]
    ERROR_QUEUE --> MANUAL_REVIEW[Revisión Manual]
    
    style KAFKA fill:#e3f2fd
    style SPARK fill:#fff3e0
    style WAREHOUSE fill:#c8e6c9
    style ERROR_QUEUE fill:#ffcdd2
```

## Diagrama de Componentes React

Estructura de componentes en una aplicación React.

````markdown
```mermaid
flowchart TD
    subgraph "App Component"
        APP[App.tsx]
    end
    
    subgraph "Layout Components"
        HEADER[Header.tsx]
        SIDEBAR[Sidebar.tsx]
        FOOTER[Footer.tsx]
        MAIN[MainContent.tsx]
    end
    
    subgraph "Page Components"
        HOME[HomePage.tsx]
        PRODUCTS[ProductsPage.tsx]
        PRODUCT_DETAIL[ProductDetail.tsx]
        CART[CartPage.tsx]
        CHECKOUT[CheckoutPage.tsx]
    end
    
    subgraph "UI Components"
        BUTTON[Button.tsx]
        INPUT[Input.tsx]
        MODAL[Modal.tsx]
        CARD[Card.tsx]
        LOADER[Loader.tsx]
    end
    
    subgraph "Business Components"
        PRODUCT_CARD[ProductCard.tsx]
        CART_ITEM[CartItem.tsx]
        PAYMENT_FORM[PaymentForm.tsx]
        USER_PROFILE[UserProfile.tsx]
    end
    
    subgraph "Hooks & Context"
        AUTH_CONTEXT[AuthContext.tsx]
        CART_CONTEXT[CartContext.tsx]
        USE_API[useApi.ts]
        USE_LOCAL_STORAGE[useLocalStorage.ts]
    end
    
    APP --> HEADER
    APP --> SIDEBAR
    APP --> MAIN
    APP --> FOOTER
    
    MAIN --> HOME
    MAIN --> PRODUCTS
    MAIN --> PRODUCT_DETAIL
    MAIN --> CART
    MAIN --> CHECKOUT
    
    PRODUCTS --> PRODUCT_CARD
    CART --> CART_ITEM
    CHECKOUT --> PAYMENT_FORM
    HEADER --> USER_PROFILE
    
    PRODUCT_CARD --> BUTTON
    PRODUCT_CARD --> CARD
    CART_ITEM --> BUTTON
    PAYMENT_FORM --> INPUT
    PAYMENT_FORM --> BUTTON
    USER_PROFILE --> MODAL
    
    HOME --> USE_API
    PRODUCTS --> USE_API
    CART --> CART_CONTEXT
    CHECKOUT --> AUTH_CONTEXT
    USER_PROFILE --> USE_LOCAL_STORAGE
    
    style APP fill:#e3f2fd
    style AUTH_CONTEXT fill:#fff3e0
    style CART_CONTEXT fill:#fff3e0
    style USE_API fill:#e8f5e8
    style BUTTON fill:#f3e5f5
    style INPUT fill:#f3e5f5
```
````

**Resultado:**
```mermaid
flowchart TD
    subgraph "App Component"
        APP[App.tsx]
    end
    
    subgraph "Layout Components"
        HEADER[Header.tsx]
        SIDEBAR[Sidebar.tsx]
        FOOTER[Footer.tsx]
        MAIN[MainContent.tsx]
    end
    
    subgraph "Page Components"
        HOME[HomePage.tsx]
        PRODUCTS[ProductsPage.tsx]
        PRODUCT_DETAIL[ProductDetail.tsx]
        CART[CartPage.tsx]
        CHECKOUT[CheckoutPage.tsx]
    end
    
    subgraph "UI Components"
        BUTTON[Button.tsx]
        INPUT[Input.tsx]
        MODAL[Modal.tsx]
        CARD[Card.tsx]
        LOADER[Loader.tsx]
    end
    
    subgraph "Business Components"
        PRODUCT_CARD[ProductCard.tsx]
        CART_ITEM[CartItem.tsx]
        PAYMENT_FORM[PaymentForm.tsx]
        USER_PROFILE[UserProfile.tsx]
    end
    
    subgraph "Hooks & Context"
        AUTH_CONTEXT[AuthContext.tsx]
        CART_CONTEXT[CartContext.tsx]
        USE_API[useApi.ts]
        USE_LOCAL_STORAGE[useLocalStorage.ts]
    end
    
    APP --> HEADER
    APP --> SIDEBAR
    APP --> MAIN
    APP --> FOOTER
    
    MAIN --> HOME
    MAIN --> PRODUCTS
    MAIN --> PRODUCT_DETAIL
    MAIN --> CART
    MAIN --> CHECKOUT
    
    PRODUCTS --> PRODUCT_CARD
    CART --> CART_ITEM
    CHECKOUT --> PAYMENT_FORM
    HEADER --> USER_PROFILE
    
    PRODUCT_CARD --> BUTTON
    PRODUCT_CARD --> CARD
    CART_ITEM --> BUTTON
    PAYMENT_FORM --> INPUT
    PAYMENT_FORM --> BUTTON
    USER_PROFILE --> MODAL
    
    HOME --> USE_API
    PRODUCTS --> USE_API
    CART --> CART_CONTEXT
    CHECKOUT --> AUTH_CONTEXT
    USER_PROFILE --> USE_LOCAL_STORAGE
    
    style APP fill:#e3f2fd
    style AUTH_CONTEXT fill:#fff3e0
    style CART_CONTEXT fill:#fff3e0
    style USE_API fill:#e8f5e8
    style BUTTON fill:#f3e5f5
    style INPUT fill:#f3e5f5
```

## Diagrama de Flujo de Git

Flujo de trabajo con Git y ramas.

````markdown
```mermaid
gitgraph
    commit id: "Initial commit"
    commit id: "Setup project"
    
    branch develop
    checkout develop
    commit id: "Add basic structure"
    commit id: "Configure build"
    
    branch feature/user-auth
    checkout feature/user-auth
    commit id: "Add login form"
    commit id: "Implement auth logic"
    commit id: "Add tests"
    
    checkout develop
    merge feature/user-auth
    commit id: "Update documentation"
    
    branch feature/product-catalog
    checkout feature/product-catalog
    commit id: "Create product model"
    commit id: "Add product list"
    commit id: "Implement search"
    
    checkout develop
    merge feature/product-catalog
    
    branch release/v1.0
    checkout release/v1.0
    commit id: "Prepare release"
    commit id: "Fix minor bugs"
    
    checkout main
    merge release/v1.0
    commit id: "v1.0.0" tag: "v1.0.0"
    
    checkout develop
    merge release/v1.0
    
    branch hotfix/critical-bug
    checkout hotfix/critical-bug
    commit id: "Fix critical bug"
    
    checkout main
    merge hotfix/critical-bug
    commit id: "v1.0.1" tag: "v1.0.1"
    
    checkout develop
    merge hotfix/critical-bug
```
````

**Resultado:**
```mermaid
gitgraph
    commit id: "Initial commit"
    commit id: "Setup project"
    
    branch develop
    checkout develop
    commit id: "Add basic structure"
    commit id: "Configure build"
    
    branch feature/user-auth
    checkout feature/user-auth
    commit id: "Add login form"
    commit id: "Implement auth logic"
    commit id: "Add tests"
    
    checkout develop
    merge feature/user-auth
    commit id: "Update documentation"
    
    branch feature/product-catalog
    checkout feature/product-catalog
    commit id: "Create product model"
    commit id: "Add product list"
    commit id: "Implement search"
    
    checkout develop
    merge feature/product-catalog
    
    branch release/v1.0
    checkout release/v1.0
    commit id: "Prepare release"
    commit id: "Fix minor bugs"
    
    checkout main
    merge release/v1.0
    commit id: "v1.0.0" tag: "v1.0.0"
    
    checkout develop
    merge release/v1.0
    
    branch hotfix/critical-bug
    checkout hotfix/critical-bug
    commit id: "Fix critical bug"
    
    checkout main
    merge hotfix/critical-bug
    commit id: "v1.0.1" tag: "v1.0.1"
    
    checkout develop
    merge hotfix/critical-bug
```

## Consejos para Casos de Uso Específicos

### Para Arquitectura de Software
- Usa subgrafos para agrupar componentes relacionados
- Aplica colores consistentes para diferentes tipos de servicios
- Incluye anotaciones para explicar decisiones arquitectónicas

### Para Procesos de Negocio
- Mantén el flujo de izquierda a derecha o de arriba hacia abajo
- Usa formas diferentes para diferentes tipos de actividades
- Incluye puntos de decisión claros

### Para Documentación Técnica
- Combina diferentes tipos de diagramas según sea necesario
- Mantén la consistencia en nomenclatura y estilos
- Actualiza los diagramas junto con el código

### Solución de Problemas Comunes

#### Error "Failed to execute 'querySelector'"
Este error ha sido completamente resuelto en la nueva versión del componente. Ahora se generan automáticamente IDs únicos y válidos para cada diagrama.

#### Problemas de Renderizado
- **Sintaxis incorrecta**: Verifica tu código en [Mermaid Live Editor](https://mermaid.live/)
- **Caracteres especiales**: Asegúrate de escapar correctamente los caracteres especiales
- **Llaves desbalanceadas**: Revisa que todas las llaves `{}` y paréntesis `()` estén correctamente cerrados
- **Temas inconsistentes**: El componente ahora maneja automáticamente los cambios de tema

#### Mejores Prácticas para Rendimiento
- Evita diagramas extremadamente complejos (más de 50 nodos)
- Divide diagramas grandes en múltiples diagramas más pequeños
- Usa nombres descriptivos pero concisos para los nodos
- Aprovecha los colores y estilos para mejorar la legibilidad

### Herramientas Complementarias
- **Mermaid Live Editor**: Para probar diagramas rápidamente
- **VS Code Extensions**: Para previsualización en tiempo real
- **GitHub Integration**: Los diagramas se renderizan automáticamente en README
- **Confluence/Notion**: Soporte nativo para diagramas Mermaid
- **Documentación oficial**: [Guía completa de sintaxis](https://mermaid-js.github.io/mermaid/)