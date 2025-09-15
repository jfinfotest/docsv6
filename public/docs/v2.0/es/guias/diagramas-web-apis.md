---
title: "Diagramas para Desarrollo Web y APIs"
position: 3
---

# Diagramas para Desarrollo Web y APIs



Ejemplos específicos de diagramas Mermaid para documentar APIs REST, arquitecturas web y flujos de autenticación.

## API REST - Endpoints y Recursos

Diagrama que muestra la estructura de una API REST.

````markdown
```mermaid
flowchart TD
    subgraph "API REST - E-commerce"
        BASE[/api/v1]
    end
    
    subgraph "Autenticación"
        AUTH[/auth]
        LOGIN[/auth/login]
        REGISTER[/auth/register]
        REFRESH[/auth/refresh]
        LOGOUT[/auth/logout]
    end
    
    subgraph "Usuarios"
        USERS[/users]
        USER_ID[/users/:id]
        USER_PROFILE[/users/:id/profile]
        USER_ORDERS[/users/:id/orders]
    end
    
    subgraph "Productos"
        PRODUCTS[/products]
        PRODUCT_ID[/products/:id]
        PRODUCT_REVIEWS[/products/:id/reviews]
        CATEGORIES[/categories]
        SEARCH[/products/search]
    end
    
    subgraph "Carrito y Órdenes"
        CART[/cart]
        CART_ITEMS[/cart/items]
        ORDERS[/orders]
        ORDER_ID[/orders/:id]
        CHECKOUT[/checkout]
    end
    
    subgraph "Administración"
        ADMIN[/admin]
        ADMIN_USERS[/admin/users]
        ADMIN_PRODUCTS[/admin/products]
        ADMIN_ORDERS[/admin/orders]
        ANALYTICS[/admin/analytics]
    end
    
    BASE --> AUTH
    BASE --> USERS
    BASE --> PRODUCTS
    BASE --> CART
    BASE --> ORDERS
    BASE --> ADMIN
    
    AUTH --> LOGIN
    AUTH --> REGISTER
    AUTH --> REFRESH
    AUTH --> LOGOUT
    
    USERS --> USER_ID
    USER_ID --> USER_PROFILE
    USER_ID --> USER_ORDERS
    
    PRODUCTS --> PRODUCT_ID
    PRODUCTS --> CATEGORIES
    PRODUCTS --> SEARCH
    PRODUCT_ID --> PRODUCT_REVIEWS
    
    CART --> CART_ITEMS
    ORDERS --> ORDER_ID
    ORDERS --> CHECKOUT
    
    ADMIN --> ADMIN_USERS
    ADMIN --> ADMIN_PRODUCTS
    ADMIN --> ADMIN_ORDERS
    ADMIN --> ANALYTICS
    
    style BASE fill:#e3f2fd
    style AUTH fill:#fff3e0
    style USERS fill:#f3e5f5
    style PRODUCTS fill:#e8f5e8
    style CART fill:#fff8e1
    style ORDERS fill:#fce4ec
    style ADMIN fill:#ffebee
```
````

**Resultado:**
```mermaid
flowchart TD
    subgraph "API REST - E-commerce"
        BASE[/api/v1]
    end
    
    subgraph "Autenticación"
        AUTH[/auth]
        LOGIN[/auth/login]
        REGISTER[/auth/register]
        REFRESH[/auth/refresh]
        LOGOUT[/auth/logout]
    end
    
    subgraph "Usuarios"
        USERS[/users]
        USER_ID[/users/:id]
        USER_PROFILE[/users/:id/profile]
        USER_ORDERS[/users/:id/orders]
    end
    
    subgraph "Productos"
        PRODUCTS[/products]
        PRODUCT_ID[/products/:id]
        PRODUCT_REVIEWS[/products/:id/reviews]
        CATEGORIES[/categories]
        SEARCH[/products/search]
    end
    
    subgraph "Carrito y Órdenes"
        CART[/cart]
        CART_ITEMS[/cart/items]
        ORDERS[/orders]
        ORDER_ID[/orders/:id]
        CHECKOUT[/checkout]
    end
    
    subgraph "Administración"
        ADMIN[/admin]
        ADMIN_USERS[/admin/users]
        ADMIN_PRODUCTS[/admin/products]
        ADMIN_ORDERS[/admin/orders]
        ANALYTICS[/admin/analytics]
    end
    
    BASE --> AUTH
    BASE --> USERS
    BASE --> PRODUCTS
    BASE --> CART
    BASE --> ORDERS
    BASE --> ADMIN
    
    AUTH --> LOGIN
    AUTH --> REGISTER
    AUTH --> REFRESH
    AUTH --> LOGOUT
    
    USERS --> USER_ID
    USER_ID --> USER_PROFILE
    USER_ID --> USER_ORDERS
    
    PRODUCTS --> PRODUCT_ID
    PRODUCTS --> CATEGORIES
    PRODUCTS --> SEARCH
    PRODUCT_ID --> PRODUCT_REVIEWS
    
    CART --> CART_ITEMS
    ORDERS --> ORDER_ID
    ORDERS --> CHECKOUT
    
    ADMIN --> ADMIN_USERS
    ADMIN --> ADMIN_PRODUCTS
    ADMIN --> ADMIN_ORDERS
    ADMIN --> ANALYTICS
    
    style BASE fill:#e3f2fd
    style AUTH fill:#fff3e0
    style USERS fill:#f3e5f5
    style PRODUCTS fill:#e8f5e8
    style CART fill:#fff8e1
    style ORDERS fill:#fce4ec
    style ADMIN fill:#ffebee
```

## Flujo de Autenticación JWT

Proceso completo de autenticación con JSON Web Tokens.

````markdown
```mermaid
sequenceDiagram
    participant U as Usuario
    participant F as Frontend
    participant A as API Gateway
    participant AS as Auth Service
    participant DB as Base de Datos
    participant R as Redis Cache
    
    Note over U,R: Proceso de Login
    U->>F: Ingresa credenciales
    F->>A: POST /auth/login
    A->>AS: Validar credenciales
    AS->>DB: Verificar usuario
    DB-->>AS: Datos del usuario
    
    alt Credenciales válidas
        AS->>AS: Generar JWT
        AS->>R: Guardar refresh token
        AS-->>A: JWT + Refresh Token
        A-->>F: Tokens + User Info
        F->>F: Guardar tokens
        F-->>U: Login exitoso
    else Credenciales inválidas
        AS-->>A: Error 401
        A-->>F: Error de autenticación
        F-->>U: Mostrar error
    end
    
    Note over U,R: Solicitud Autenticada
    U->>F: Solicitar datos protegidos
    F->>F: Verificar JWT válido
    
    alt JWT válido
        F->>A: GET /protected (con JWT)
        A->>A: Validar JWT
        A->>AS: Procesar solicitud
        AS-->>A: Datos solicitados
        A-->>F: Respuesta exitosa
        F-->>U: Mostrar datos
    else JWT expirado
        F->>A: POST /auth/refresh
        A->>AS: Validar refresh token
        AS->>R: Verificar refresh token
        R-->>AS: Token válido
        AS->>AS: Generar nuevo JWT
        AS-->>A: Nuevo JWT
        A-->>F: Nuevo token
        F->>F: Actualizar token
        F->>A: Repetir solicitud original
    end
    
    Note over U,R: Logout
    U->>F: Cerrar sesión
    F->>A: POST /auth/logout
    A->>AS: Invalidar tokens
    AS->>R: Eliminar refresh token
    AS->>AS: Agregar JWT a blacklist
    AS-->>A: Logout exitoso
    A-->>F: Confirmación
    F->>F: Limpiar tokens locales
    F-->>U: Sesión cerrada
```
````

**Resultado:**
```mermaid
sequenceDiagram
    participant U as Usuario
    participant F as Frontend
    participant A as API Gateway
    participant AS as Auth Service
    participant DB as Base de Datos
    participant R as Redis Cache
    
    Note over U,R: Proceso de Login
    U->>F: Ingresa credenciales
    F->>A: POST /auth/login
    A->>AS: Validar credenciales
    AS->>DB: Verificar usuario
    DB-->>AS: Datos del usuario
    
    alt Credenciales válidas
        AS->>AS: Generar JWT
        AS->>R: Guardar refresh token
        AS-->>A: JWT + Refresh Token
        A-->>F: Tokens + User Info
        F->>F: Guardar tokens
        F-->>U: Login exitoso
    else Credenciales inválidas
        AS-->>A: Error 401
        A-->>F: Error de autenticación
        F-->>U: Mostrar error
    end
    
    Note over U,R: Solicitud Autenticada
    U->>F: Solicitar datos protegidos
    F->>F: Verificar JWT válido
    
    alt JWT válido
        F->>A: GET /protected (con JWT)
        A->>A: Validar JWT
        A->>AS: Procesar solicitud
        AS-->>A: Datos solicitados
        A-->>F: Respuesta exitosa
        F-->>U: Mostrar datos
    else JWT expirado
        F->>A: POST /auth/refresh
        A->>AS: Validar refresh token
        AS->>R: Verificar refresh token
        R-->>AS: Token válido
        AS->>AS: Generar nuevo JWT
        AS-->>A: Nuevo JWT
        A-->>F: Nuevo token
        F->>F: Actualizar token
        F->>A: Repetir solicitud original
    end
    
    Note over U,R: Logout
    U->>F: Cerrar sesión
    F->>A: POST /auth/logout
    A->>AS: Invalidar tokens
    AS->>R: Eliminar refresh token
    AS->>AS: Agregar JWT a blacklist
    AS-->>A: Logout exitoso
    A-->>F: Confirmación
    F->>F: Limpiar tokens locales
    F-->>U: Sesión cerrada
```

## Arquitectura de Aplicación Web Moderna

Estructura completa de una aplicación web con frontend, backend y servicios.

````markdown
```mermaid
flowchart TB
    subgraph "Cliente"
        BROWSER[Navegador Web]
        MOBILE[App Móvil]
        PWA[Progressive Web App]
    end
    
    subgraph "CDN y Edge"
        CDN[CloudFlare CDN]
        EDGE[Edge Functions]
    end
    
    subgraph "Frontend"
        REACT[React App]
        NEXTJS[Next.js SSR]
        STATIC[Archivos Estáticos]
    end
    
    subgraph "API Layer"
        GATEWAY[API Gateway]
        GRAPHQL[GraphQL Server]
        REST[REST APIs]
        WEBSOCKET[WebSocket Server]
    end
    
    subgraph "Backend Services"
        AUTH_SVC[Auth Service]
        USER_SVC[User Service]
        PRODUCT_SVC[Product Service]
        ORDER_SVC[Order Service]
        NOTIFICATION_SVC[Notification Service]
    end
    
    subgraph "Bases de Datos"
        POSTGRES[(PostgreSQL)]
        MONGODB[(MongoDB)]
        REDIS[(Redis Cache)]
        ELASTICSEARCH[(Elasticsearch)]
    end
    
    subgraph "Servicios Externos"
        PAYMENT[Stripe/PayPal]
        EMAIL[SendGrid]
        SMS[Twilio]
        STORAGE[AWS S3]
        ANALYTICS[Google Analytics]
    end
    
    subgraph "Infraestructura"
        DOCKER[Docker Containers]
        K8S[Kubernetes]
        MONITORING[Prometheus/Grafana]
        LOGS[ELK Stack]
    end
    
    BROWSER --> CDN
    MOBILE --> CDN
    PWA --> CDN
    
    CDN --> EDGE
    CDN --> REACT
    CDN --> NEXTJS
    CDN --> STATIC
    
    REACT --> GATEWAY
    NEXTJS --> GATEWAY
    PWA --> GATEWAY
    
    GATEWAY --> GRAPHQL
    GATEWAY --> REST
    GATEWAY --> WEBSOCKET
    
    GRAPHQL --> AUTH_SVC
    GRAPHQL --> USER_SVC
    GRAPHQL --> PRODUCT_SVC
    GRAPHQL --> ORDER_SVC
    
    REST --> AUTH_SVC
    REST --> USER_SVC
    REST --> PRODUCT_SVC
    REST --> ORDER_SVC
    REST --> NOTIFICATION_SVC
    
    WEBSOCKET --> NOTIFICATION_SVC
    
    AUTH_SVC --> POSTGRES
    AUTH_SVC --> REDIS
    
    USER_SVC --> POSTGRES
    USER_SVC --> REDIS
    
    PRODUCT_SVC --> MONGODB
    PRODUCT_SVC --> ELASTICSEARCH
    PRODUCT_SVC --> REDIS
    
    ORDER_SVC --> POSTGRES
    ORDER_SVC --> REDIS
    
    NOTIFICATION_SVC --> REDIS
    
    ORDER_SVC --> PAYMENT
    NOTIFICATION_SVC --> EMAIL
    NOTIFICATION_SVC --> SMS
    
    REACT --> STORAGE
    NEXTJS --> STORAGE
    
    BROWSER --> ANALYTICS
    MOBILE --> ANALYTICS
    PWA --> ANALYTICS
    
    AUTH_SVC -.-> DOCKER
    USER_SVC -.-> DOCKER
    PRODUCT_SVC -.-> DOCKER
    ORDER_SVC -.-> DOCKER
    NOTIFICATION_SVC -.-> DOCKER
    
    DOCKER -.-> K8S
    K8S -.-> MONITORING
    K8S -.-> LOGS
    
    style GATEWAY fill:#e3f2fd
    style REDIS fill:#ffcdd2
    style POSTGRES fill:#c8e6c9
    style MONGODB fill:#fff3e0
    style K8S fill:#f3e5f5
```
````

**Resultado:**
```mermaid
flowchart TB
    subgraph "Cliente"
        BROWSER[Navegador Web]
        MOBILE[App Móvil]
        PWA[Progressive Web App]
    end
    
    subgraph "CDN y Edge"
        CDN[CloudFlare CDN]
        EDGE[Edge Functions]
    end
    
    subgraph "Frontend"
        REACT[React App]
        NEXTJS[Next.js SSR]
        STATIC[Archivos Estáticos]
    end
    
    subgraph "API Layer"
        GATEWAY[API Gateway]
        GRAPHQL[GraphQL Server]
        REST[REST APIs]
        WEBSOCKET[WebSocket Server]
    end
    
    subgraph "Backend Services"
        AUTH_SVC[Auth Service]
        USER_SVC[User Service]
        PRODUCT_SVC[Product Service]
        ORDER_SVC[Order Service]
        NOTIFICATION_SVC[Notification Service]
    end
    
    subgraph "Bases de Datos"
        POSTGRES[(PostgreSQL)]
        MONGODB[(MongoDB)]
        REDIS[(Redis Cache)]
        ELASTICSEARCH[(Elasticsearch)]
    end
    
    subgraph "Servicios Externos"
        PAYMENT[Stripe/PayPal]
        EMAIL[SendGrid]
        SMS[Twilio]
        STORAGE[AWS S3]
        ANALYTICS[Google Analytics]
    end
    
    subgraph "Infraestructura"
        DOCKER[Docker Containers]
        K8S[Kubernetes]
        MONITORING[Prometheus/Grafana]
        LOGS[ELK Stack]
    end
    
    BROWSER --> CDN
    MOBILE --> CDN
    PWA --> CDN
    
    CDN --> EDGE
    CDN --> REACT
    CDN --> NEXTJS
    CDN --> STATIC
    
    REACT --> GATEWAY
    NEXTJS --> GATEWAY
    PWA --> GATEWAY
    
    GATEWAY --> GRAPHQL
    GATEWAY --> REST
    GATEWAY --> WEBSOCKET
    
    GRAPHQL --> AUTH_SVC
    GRAPHQL --> USER_SVC
    GRAPHQL --> PRODUCT_SVC
    GRAPHQL --> ORDER_SVC
    
    REST --> AUTH_SVC
    REST --> USER_SVC
    REST --> PRODUCT_SVC
    REST --> ORDER_SVC
    REST --> NOTIFICATION_SVC
    
    WEBSOCKET --> NOTIFICATION_SVC
    
    AUTH_SVC --> POSTGRES
    AUTH_SVC --> REDIS
    
    USER_SVC --> POSTGRES
    USER_SVC --> REDIS
    
    PRODUCT_SVC --> MONGODB
    PRODUCT_SVC --> ELASTICSEARCH
    PRODUCT_SVC --> REDIS
    
    ORDER_SVC --> POSTGRES
    ORDER_SVC --> REDIS
    
    NOTIFICATION_SVC --> REDIS
    
    ORDER_SVC --> PAYMENT
    NOTIFICATION_SVC --> EMAIL
    NOTIFICATION_SVC --> SMS
    
    REACT --> STORAGE
    NEXTJS --> STORAGE
    
    BROWSER --> ANALYTICS
    MOBILE --> ANALYTICS
    PWA --> ANALYTICS
    
    AUTH_SVC -.-> DOCKER
    USER_SVC -.-> DOCKER
    PRODUCT_SVC -.-> DOCKER
    ORDER_SVC -.-> DOCKER
    NOTIFICATION_SVC -.-> DOCKER
    
    DOCKER -.-> K8S
    K8S -.-> MONITORING
    K8S -.-> LOGS
    
    style GATEWAY fill:#e3f2fd
    style REDIS fill:#ffcdd2
    style POSTGRES fill:#c8e6c9
    style MONGODB fill:#fff3e0
    style K8S fill:#f3e5f5
```

## Flujo de Procesamiento de Pagos

Proceso completo de pago en línea con validaciones y confirmaciones.

````markdown
```mermaid
sequenceDiagram
    participant U as Usuario
    participant F as Frontend
    participant API as API Gateway
    participant OS as Order Service
    participant PS as Payment Service
    participant STRIPE as Stripe API
    participant NS as Notification Service
    participant DB as Base de Datos
    
    U->>F: Iniciar checkout
    F->>API: POST /checkout/initiate
    API->>OS: Crear orden pendiente
    OS->>DB: Guardar orden (status: pending)
    OS-->>API: Order ID + Total
    API-->>F: Datos de la orden
    
    F->>F: Mostrar formulario de pago
    U->>F: Ingresar datos de tarjeta
    F->>F: Validar datos localmente
    
    F->>API: POST /payment/process
    API->>PS: Procesar pago
    PS->>STRIPE: Crear payment intent
    STRIPE-->>PS: Payment intent ID
    PS-->>API: Payment intent
    API-->>F: Client secret
    
    F->>STRIPE: Confirmar pago (client-side)
    STRIPE-->>F: Resultado del pago
    
    alt Pago exitoso
        F->>API: POST /payment/confirm
        API->>PS: Confirmar pago
        PS->>STRIPE: Verificar pago
        STRIPE-->>PS: Pago confirmado
        PS->>OS: Actualizar orden
        OS->>DB: Actualizar status (paid)
        OS->>NS: Enviar confirmación
        
        par Notificaciones
            NS->>U: Email de confirmación
        and
            NS->>U: SMS de confirmación
        and
            NS-->>F: Notificación push
        end
        
        PS-->>API: Pago completado
        API-->>F: Orden confirmada
        F-->>U: Mostrar confirmación
        
    else Pago fallido
        F->>API: POST /payment/failed
        API->>PS: Registrar fallo
        PS->>OS: Marcar orden como fallida
        OS->>DB: Actualizar status (failed)
        PS-->>API: Error de pago
        API-->>F: Error de pago
        F-->>U: Mostrar error
        
    else Pago cancelado
        F->>API: POST /payment/cancel
        API->>OS: Cancelar orden
        OS->>DB: Actualizar status (cancelled)
        OS-->>API: Orden cancelada
        API-->>F: Cancelación confirmada
        F-->>U: Pago cancelado
    end
    
    Note over U,DB: Webhook de Stripe (backup)
    STRIPE->>PS: Webhook: payment succeeded
    PS->>PS: Verificar webhook signature
    PS->>DB: Verificar estado de la orden
    
    alt Orden no actualizada
        PS->>OS: Forzar actualización
        OS->>DB: Actualizar status (paid)
        OS->>NS: Enviar notificación tardía
    end
```
````

**Resultado:**
```mermaid
sequenceDiagram
    participant U as Usuario
    participant F as Frontend
    participant API as API Gateway
    participant OS as Order Service
    participant PS as Payment Service
    participant STRIPE as Stripe API
    participant NS as Notification Service
    participant DB as Base de Datos
    
    U->>F: Iniciar checkout
    F->>API: POST /checkout/initiate
    API->>OS: Crear orden pendiente
    OS->>DB: Guardar orden (status: pending)
    OS-->>API: Order ID + Total
    API-->>F: Datos de la orden
    
    F->>F: Mostrar formulario de pago
    U->>F: Ingresar datos de tarjeta
    F->>F: Validar datos localmente
    
    F->>API: POST /payment/process
    API->>PS: Procesar pago
    PS->>STRIPE: Crear payment intent
    STRIPE-->>PS: Payment intent ID
    PS-->>API: Payment intent
    API-->>F: Client secret
    
    F->>STRIPE: Confirmar pago (client-side)
    STRIPE-->>F: Resultado del pago
    
    alt Pago exitoso
        F->>API: POST /payment/confirm
        API->>PS: Confirmar pago
        PS->>STRIPE: Verificar pago
        STRIPE-->>PS: Pago confirmado
        PS->>OS: Actualizar orden
        OS->>DB: Actualizar status (paid)
        OS->>NS: Enviar confirmación
        
        par Notificaciones
            NS->>U: Email de confirmación
        and
            NS->>U: SMS de confirmación
        and
            NS-->>F: Notificación push
        end
        
        PS-->>API: Pago completado
        API-->>F: Orden confirmada
        F-->>U: Mostrar confirmación
        
    else Pago fallido
        F->>API: POST /payment/failed
        API->>PS: Registrar fallo
        PS->>OS: Marcar orden como fallida
        OS->>DB: Actualizar status (failed)
        PS-->>API: Error de pago
        API-->>F: Error de pago
        F-->>U: Mostrar error
        
    else Pago cancelado
        F->>API: POST /payment/cancel
        API->>OS: Cancelar orden
        OS->>DB: Actualizar status (cancelled)
        OS-->>API: Orden cancelada
        API-->>F: Cancelación confirmada
        F-->>U: Pago cancelado
    end
    
    Note over U,DB: Webhook de Stripe (backup)
    STRIPE->>PS: Webhook: payment succeeded
    PS->>PS: Verificar webhook signature
    PS->>DB: Verificar estado de la orden
    
    alt Orden no actualizada
        PS->>OS: Forzar actualización
        OS->>DB: Actualizar status (paid)
        OS->>NS: Enviar notificación tardía
    end
```

## Estados de una Aplicación Web

Diagrama de estados para el ciclo de vida de una sesión de usuario.

````markdown
```mermaid
stateDiagram-v2
    [*] --> Visitante
    
    state Visitante {
        [*] --> Navegando
        Navegando --> ViendoProducto
        ViendoProducto --> Navegando
        ViendoProducto --> AgregandoCarrito
        AgregandoCarrito --> Navegando
    }
    
    Visitante --> Registrando : Crear cuenta
    Visitante --> Autenticando : Iniciar sesión
    
    state Registrando {
        [*] --> IngresandoDatos
        IngresandoDatos --> ValidandoEmail
        ValidandoEmail --> ConfirmandoCuenta
        ConfirmandoCuenta --> [*]
    }
    
    state Autenticando {
        [*] --> IngresandoCredenciales
        IngresandoCredenciales --> ValidandoCredenciales
        ValidandoCredenciales --> AutenticacionExitosa
        ValidandoCredenciales --> ErrorAutenticacion
        ErrorAutenticacion --> IngresandoCredenciales
        AutenticacionExitosa --> [*]
    }
    
    Registrando --> UsuarioAutenticado : Registro exitoso
    Autenticando --> UsuarioAutenticado : Login exitoso
    
    state UsuarioAutenticado {
        [*] --> NavegandoAutenticado
        NavegandoAutenticado --> GestionandoPerfil
        NavegandoAutenticado --> GestionandoCarrito
        NavegandoAutenticado --> RealizandoCompra
        NavegandoAutenticado --> ViendoHistorial
        
        GestionandoPerfil --> NavegandoAutenticado
        GestionandoCarrito --> NavegandoAutenticado
        ViendoHistorial --> NavegandoAutenticado
        
        state RealizandoCompra {
            [*] --> SeleccionandoProductos
            SeleccionandoProductos --> RevisandoCarrito
            RevisandoCarrito --> IngresandoDatosEnvio
            IngresandoDatosEnvio --> SeleccionandoPago
            SeleccionandoPago --> ProcesandoPago
            ProcesandoPago --> CompraExitosa
            ProcesandoPago --> ErrorPago
            ErrorPago --> SeleccionandoPago
            CompraExitosa --> [*]
        }
        
        RealizandoCompra --> NavegandoAutenticado : Compra completada
        RealizandoCompra --> NavegandoAutenticado : Cancelar compra
    }
    
    UsuarioAutenticado --> Visitante : Cerrar sesión
    UsuarioAutenticado --> SessionExpirada : Token expirado
    SessionExpirada --> Visitante : Redirigir a login
    
    Visitante --> [*] : Salir del sitio
    UsuarioAutenticado --> [*] : Salir del sitio
```
````

**Resultado:**
```mermaid
stateDiagram-v2
    [*] --> Visitante
    
    state Visitante {
        [*] --> Navegando
        Navegando --> ViendoProducto
        ViendoProducto --> Navegando
        ViendoProducto --> AgregandoCarrito
        AgregandoCarrito --> Navegando
    }
    
    Visitante --> Registrando : Crear cuenta
    Visitante --> Autenticando : Iniciar sesión
    
    state Registrando {
        [*] --> IngresandoDatos
        IngresandoDatos --> ValidandoEmail
        ValidandoEmail --> ConfirmandoCuenta
        ConfirmandoCuenta --> [*]
    }
    
    state Autenticando {
        [*] --> IngresandoCredenciales
        IngresandoCredenciales --> ValidandoCredenciales
        ValidandoCredenciales --> AutenticacionExitosa
        ValidandoCredenciales --> ErrorAutenticacion
        ErrorAutenticacion --> IngresandoCredenciales
        AutenticacionExitosa --> [*]
    }
    
    Registrando --> UsuarioAutenticado : Registro exitoso
    Autenticando --> UsuarioAutenticado : Login exitoso
    
    state UsuarioAutenticado {
        [*] --> NavegandoAutenticado
        NavegandoAutenticado --> GestionandoPerfil
        NavegandoAutenticado --> GestionandoCarrito
        NavegandoAutenticado --> RealizandoCompra
        NavegandoAutenticado --> ViendoHistorial
        
        GestionandoPerfil --> NavegandoAutenticado
        GestionandoCarrito --> NavegandoAutenticado
        ViendoHistorial --> NavegandoAutenticado
        
        state RealizandoCompra {
            [*] --> SeleccionandoProductos
            SeleccionandoProductos --> RevisandoCarrito
            RevisandoCarrito --> IngresandoDatosEnvio
            IngresandoDatosEnvio --> SeleccionandoPago
            SeleccionandoPago --> ProcesandoPago
            ProcesandoPago --> CompraExitosa
            ProcesandoPago --> ErrorPago
            ErrorPago --> SeleccionandoPago
            CompraExitosa --> [*]
        }
        
        RealizandoCompra --> NavegandoAutenticado : Compra completada
        RealizandoCompra --> NavegandoAutenticado : Cancelar compra
    }
    
    UsuarioAutenticado --> Visitante : Cerrar sesión
    UsuarioAutenticado --> SessionExpirada : Token expirado
    SessionExpirada --> Visitante : Redirigir a login
    
    Visitante --> [*] : Salir del sitio
    UsuarioAutenticado --> [*] : Salir del sitio
```

## Mejores Prácticas para APIs

### Documentación de Endpoints
- Usa diagramas de flujo para mostrar la estructura de la API
- Incluye códigos de estado HTTP en los diagramas de secuencia
- Documenta los flujos de error y manejo de excepciones

### Autenticación y Seguridad
- Muestra claramente los flujos de autenticación
- Incluye validaciones y puntos de seguridad
- Documenta el manejo de tokens y sesiones

### Arquitectura de Servicios
- Separa claramente las responsabilidades de cada servicio
- Muestra las dependencias entre servicios
- Incluye patrones de comunicación (síncrona/asíncrona)

### Monitoreo y Observabilidad
- Incluye puntos de logging y métricas
- Documenta flujos de error y recuperación
- Muestra integraciones con herramientas de monitoreo