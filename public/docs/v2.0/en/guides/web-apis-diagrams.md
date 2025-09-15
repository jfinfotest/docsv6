---
title: "Diagrams for Web Development and APIs"
position: 3
---

# Diagrams for Web Development and APIs

Specific examples of Mermaid diagrams for documenting REST APIs, web architectures, and authentication flows.

## REST API - Endpoints and Resources

Diagram showing the structure of a REST API.

````markdown
```mermaid
flowchart TD
    subgraph "REST API - E-commerce"
        BASE[/api/v1]
    end
    
    subgraph "Authentication"
        AUTH[/auth]
        LOGIN[/auth/login]
        REGISTER[/auth/register]
        REFRESH[/auth/refresh]
        LOGOUT[/auth/logout]
    end
    
    subgraph "Users"
        USERS[/users]
        USER_ID[/users/:id]
        USER_PROFILE[/users/:id/profile]
        USER_ORDERS[/users/:id/orders]
    end
    
    subgraph "Products"
        PRODUCTS[/products]
        PRODUCT_ID[/products/:id]
        PRODUCT_REVIEWS[/products/:id/reviews]
        CATEGORIES[/categories]
        SEARCH[/products/search]
    end
    
    subgraph "Cart and Orders"
        CART[/cart]
        CART_ITEMS[/cart/items]
        ORDERS[/orders]
        ORDER_ID[/orders/:id]
        CHECKOUT[/checkout]
    end
    
    subgraph "Administration"
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

**Result:**
```mermaid
flowchart TD
    subgraph "REST API - E-commerce"
        BASE[/api/v1]
    end
    
    subgraph "Authentication"
        AUTH[/auth]
        LOGIN[/auth/login]
        REGISTER[/auth/register]
        REFRESH[/auth/refresh]
        LOGOUT[/auth/logout]
    end
    
    subgraph "Users"
        USERS[/users]
        USER_ID[/users/:id]
        USER_PROFILE[/users/:id/profile]
        USER_ORDERS[/users/:id/orders]
    end
    
    subgraph "Products"
        PRODUCTS[/products]
        PRODUCT_ID[/products/:id]
        PRODUCT_REVIEWS[/products/:id/reviews]
        CATEGORIES[/categories]
        SEARCH[/products/search]
    end
    
    subgraph "Cart and Orders"
        CART[/cart]
        CART_ITEMS[/cart/items]
        ORDERS[/orders]
        ORDER_ID[/orders/:id]
        CHECKOUT[/checkout]
    end
    
    subgraph "Administration"
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

## JWT Authentication Flow

Complete authentication process with JSON Web Tokens.

````markdown
```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant A as API Gateway
    participant AS as Auth Service
    participant DB as Database
    participant R as Redis Cache
    
    Note over U,R: Login Process
    U->>F: Enter credentials
    F->>A: POST /auth/login
    A->>AS: Validate credentials
    AS->>DB: Verify user
    DB-->>AS: User data
    
    alt Valid credentials
        AS->>AS: Generate JWT
        AS->>R: Store refresh token
        AS-->>A: JWT + Refresh Token
        A-->>F: Tokens + User Info
        F->>F: Store tokens
        F-->>U: Login successful
    else Invalid credentials
        AS-->>A: Error 401
        A-->>F: Authentication error
        F-->>U: Show error
    end
    
    Note over U,R: Authenticated Request
    U->>F: Request protected data
    F->>F: Check JWT validity
    
    alt Valid JWT
        F->>A: GET /protected (with JWT)
        A->>A: Validate JWT
        A->>AS: Process request
        AS-->>A: Requested data
        A-->>F: Successful response
        F-->>U: Show data
    else Expired JWT
        F->>A: POST /auth/refresh
        A->>AS: Validate refresh token
        AS->>R: Check refresh token
        R-->>AS: Valid token
        AS->>AS: Generate new JWT
        AS-->>A: New JWT
        A-->>F: New token
        F->>F: Update token
        F->>A: Retry original request
    end
    
    Note over U,R: Logout
    U->>F: Logout
    F->>A: POST /auth/logout
    A->>AS: Invalidate tokens
    AS->>R: Remove refresh token
    AS->>AS: Add JWT to blacklist
    AS-->>A: Logout successful
    A-->>F: Confirmation
    F->>F: Clear local tokens
    F-->>U: Session closed
```
````

**Result:**
```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant A as API Gateway
    participant AS as Auth Service
    participant DB as Database
    participant R as Redis Cache
    
    Note over U,R: Login Process
    U->>F: Enter credentials
    F->>A: POST /auth/login
    A->>AS: Validate credentials
    AS->>DB: Verify user
    DB-->>AS: User data
    
    alt Valid credentials
        AS->>AS: Generate JWT
        AS->>R: Store refresh token
        AS-->>A: JWT + Refresh Token
        A-->>F: Tokens + User Info
        F->>F: Store tokens
        F-->>U: Login successful
    else Invalid credentials
        AS-->>A: Error 401
        A-->>F: Authentication error
        F-->>U: Show error
    end
    
    Note over U,R: Authenticated Request
    U->>F: Request protected data
    F->>F: Check JWT validity
    
    alt Valid JWT
        F->>A: GET /protected (with JWT)
        A->>A: Validate JWT
        A->>AS: Process request
        AS-->>A: Requested data
        A-->>F: Successful response
        F-->>U: Show data
    else Expired JWT
        F->>A: POST /auth/refresh
        A->>AS: Validate refresh token
        AS->>R: Check refresh token
        R-->>AS: Valid token
        AS->>AS: Generate new JWT
        AS-->>A: New JWT
        A-->>F: New token
        F->>F: Update token
        F->>A: Retry original request
    end
    
    Note over U,R: Logout
    U->>F: Logout
    F->>A: POST /auth/logout
    A->>AS: Invalidate tokens
    AS->>R: Remove refresh token
    AS->>AS: Add JWT to blacklist
    AS-->>A: Logout successful
    A-->>F: Confirmation
    F->>F: Clear local tokens
    F-->>U: Session closed
```

## Modern Web Application Architecture

Complete structure of a web application with frontend, backend, and services.

````markdown
```mermaid
flowchart TB
    subgraph "Client"
        BROWSER[Web Browser]
        MOBILE[Mobile App]
        PWA[Progressive Web App]
    end
    
    subgraph "CDN and Edge"
        CDN[CloudFlare CDN]
        EDGE[Edge Functions]
    end
    
    subgraph "Frontend"
        REACT[React App]
        NEXTJS[Next.js SSR]
        STATIC[Static Files]
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
    
    subgraph "Databases"
        POSTGRES[(PostgreSQL)]
        MONGODB[(MongoDB)]
        REDIS[(Redis Cache)]
        ELASTICSEARCH[(Elasticsearch)]
    end
    
    subgraph "External Services"
        PAYMENT[Stripe/PayPal]
        EMAIL[SendGrid]
        SMS[Twilio]
        STORAGE[AWS S3]
        ANALYTICS[Google Analytics]
    end
    
    subgraph "Infrastructure"
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

**Result:**
```mermaid
flowchart TB
    subgraph "Client"
        BROWSER[Web Browser]
        MOBILE[Mobile App]
        PWA[Progressive Web App]
    end
    
    subgraph "CDN and Edge"
        CDN[CloudFlare CDN]
        EDGE[Edge Functions]
    end
    
    subgraph "Frontend"
        REACT[React App]
        NEXTJS[Next.js SSR]
        STATIC[Static Files]
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
    
    subgraph "Databases"
        POSTGRES[(PostgreSQL)]
        MONGODB[(MongoDB)]
        REDIS[(Redis Cache)]
        ELASTICSEARCH[(Elasticsearch)]
    end
    
    subgraph "External Services"
        PAYMENT[Stripe/PayPal]
        EMAIL[SendGrid]
        SMS[Twilio]
        STORAGE[AWS S3]
        ANALYTICS[Google Analytics]
    end
    
    subgraph "Infrastructure"
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

## Payment Processing Flow

Complete online payment process with validations and confirmations.

````markdown
```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant API as API Gateway
    participant OS as Order Service
    participant PS as Payment Service
    participant STRIPE as Stripe API
    participant NS as Notification Service
    participant DB as Database
    
    U->>F: Initiate checkout
    F->>API: POST /checkout/initiate
    API->>OS: Create pending order
    OS->>DB: Save order (status: pending)
    OS-->>API: Order ID + Total
    API-->>F: Order data
    
    F->>F: Show payment form
    U->>F: Enter card details
    F->>F: Validate data locally
    
    F->>API: POST /payment/process
    API->>PS: Process payment
    PS->>STRIPE: Create payment intent
    STRIPE-->>PS: Payment intent ID
    PS-->>API: Payment intent
    API-->>F: Client secret
    
    F->>STRIPE: Confirm payment (client-side)
    STRIPE-->>F: Payment result
    
    alt Payment successful
        F->>API: POST /payment/confirm
        API->>PS: Confirm payment
        PS->>STRIPE: Verify payment
        STRIPE-->>PS: Payment confirmed
        PS->>OS: Update order
        OS->>DB: Update status (paid)
        OS->>NS: Send confirmation
        
        par Notifications
            NS->>U: Confirmation email
        and
            NS->>U: SMS confirmation
        and
            NS-->>F: Push notification
        end
        
        PS-->>API: Payment completed
        API-->>F: Order confirmed
        F-->>U: Show confirmation
        
    else Payment failed
        F->>API: POST /payment/failed
        API->>PS: Register failure
        PS->>OS: Mark order as failed
        OS->>DB: Update status (failed)
        PS-->>API: Payment error
        API-->>F: Payment error
        F-->>U: Show error
        
    else Payment cancelled
        F->>API: POST /payment/cancel
        API->>OS: Cancel order
        OS->>DB: Update status (cancelled)
        OS-->>API: Order cancelled
        API-->>F: Cancellation confirmed
        F-->>U: Payment cancelled
    end
    
    Note over U,DB: Stripe Webhook (backup)
    STRIPE->>PS: Webhook: payment succeeded
    PS->>PS: Verify webhook signature
    PS->>DB: Check order status
    
    alt Order not updated
        PS->>OS: Force update
        OS->>DB: Update status (paid)
        OS->>NS: Send late notification
    end
```
````

**Result:**
```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant API as API Gateway
    participant OS as Order Service
    participant PS as Payment Service
    participant STRIPE as Stripe API
    participant NS as Notification Service
    participant DB as Database
    
    U->>F: Initiate checkout
    F->>API: POST /checkout/initiate
    API->>OS: Create pending order
    OS->>DB: Save order (status: pending)
    OS-->>API: Order ID + Total
    API-->>F: Order data
    
    F->>F: Show payment form
    U->>F: Enter card details
    F->>F: Validate data locally
    
    F->>API: POST /payment/process
    API->>PS: Process payment
    PS->>STRIPE: Create payment intent
    STRIPE-->>PS: Payment intent ID
    PS-->>API: Payment intent
    API-->>F: Client secret
    
    F->>STRIPE: Confirm payment (client-side)
    STRIPE-->>F: Payment result
    
    alt Payment successful
        F->>API: POST /payment/confirm
        API->>PS: Confirm payment
        PS->>STRIPE: Verify payment
        STRIPE-->>PS: Payment confirmed
        PS->>OS: Update order
        OS->>DB: Update status (paid)
        OS->>NS: Send confirmation
        
        par Notifications
            NS->>U: Confirmation email
        and
            NS->>U: SMS confirmation
        and
            NS-->>F: Push notification
        end
        
        PS-->>API: Payment completed
        API-->>F: Order confirmed
        F-->>U: Show confirmation
        
    else Payment failed
        F->>API: POST /payment/failed
        API->>PS: Register failure
        PS->>OS: Mark order as failed
        OS->>DB: Update status (failed)
        PS-->>API: Payment error
        API-->>F: Payment error
        F-->>U: Show error
        
    else Payment cancelled
        F->>API: POST /payment/cancel
        API->>OS: Cancel order
        OS->>DB: Update status (cancelled)
        OS-->>API: Order cancelled
        API-->>F: Cancellation confirmed
        F-->>U: Payment cancelled
    end
    
    Note over U,DB: Stripe Webhook (backup)
    STRIPE->>PS: Webhook: payment succeeded
    PS->>PS: Verify webhook signature
    PS->>DB: Check order status
    
    alt Order not updated
        PS->>OS: Force update
        OS->>DB: Update status (paid)
        OS->>NS: Send late notification
    end
```

## Web Application State Diagram

State diagram for user session lifecycle in a web application.

````markdown
```mermaid
stateDiagram-v2
    [*] --> Visitor
    
    state Visitor {
        [*] --> Browsing
        Browsing --> ViewingProduct
        ViewingProduct --> Browsing
        ViewingProduct --> AddingToCart
        AddingToCart --> Browsing
    }
    
    Visitor --> Registering : Create account
    Visitor --> Authenticating : Sign in
    
    state Registering {
        [*] --> EnteringData
        EnteringData --> ValidatingEmail
        ValidatingEmail --> ConfirmingAccount
        ConfirmingAccount --> [*]
    }
    
    state Authenticating {
        [*] --> EnteringCredentials
        EnteringCredentials --> ValidatingCredentials
        ValidatingCredentials --> AuthenticationSuccess
        ValidatingCredentials --> AuthenticationError
        AuthenticationError --> EnteringCredentials
        AuthenticationSuccess --> [*]
    }
    
    Registering --> AuthenticatedUser : Registration successful
    Authenticating --> AuthenticatedUser : Login successful
    
    state AuthenticatedUser {
        [*] --> BrowsingAuthenticated
        BrowsingAuthenticated --> ManagingProfile
        BrowsingAuthenticated --> ManagingCart
        BrowsingAuthenticated --> MakingPurchase
        BrowsingAuthenticated --> ViewingHistory
        
        ManagingProfile --> BrowsingAuthenticated
        ManagingCart --> BrowsingAuthenticated
        ViewingHistory --> BrowsingAuthenticated
        
        state MakingPurchase {
            [*] --> SelectingProducts
            SelectingProducts --> ReviewingCart
            ReviewingCart --> EnteringShippingData
            EnteringShippingData --> SelectingPayment
            SelectingPayment --> ProcessingPayment
            ProcessingPayment --> PurchaseSuccess
            ProcessingPayment --> PaymentError
            PaymentError --> SelectingPayment
            PurchaseSuccess --> [*]
        }
        
        MakingPurchase --> BrowsingAuthenticated : Purchase completed
        MakingPurchase --> BrowsingAuthenticated : Cancel purchase
    }
    
    AuthenticatedUser --> Visitor : Logout
    AuthenticatedUser --> SessionExpired : Token expired
    SessionExpired --> Visitor : Redirect to login
    
    Visitor --> [*] : Exit site
    AuthenticatedUser --> [*] : Exit site
```
````

**Result:**
```mermaid
stateDiagram-v2
    [*] --> Visitor
    
    state Visitor {
        [*] --> Browsing
        Browsing --> ViewingProduct
        ViewingProduct --> Browsing
        ViewingProduct --> AddingToCart
        AddingToCart --> Browsing
    }
    
    Visitor --> Registering : Create account
    Visitor --> Authenticating : Sign in
    
    state Registering {
        [*] --> EnteringData
        EnteringData --> ValidatingEmail
        ValidatingEmail --> ConfirmingAccount
        ConfirmingAccount --> [*]
    }
    
    state Authenticating {
        [*] --> EnteringCredentials
        EnteringCredentials --> ValidatingCredentials
        ValidatingCredentials --> AuthenticationSuccess
        ValidatingCredentials --> AuthenticationError
        AuthenticationError --> EnteringCredentials
        AuthenticationSuccess --> [*]
    }
    
    Registering --> AuthenticatedUser : Registration successful
    Authenticating --> AuthenticatedUser : Login successful
    
    state AuthenticatedUser {
        [*] --> BrowsingAuthenticated
        BrowsingAuthenticated --> ManagingProfile
        BrowsingAuthenticated --> ManagingCart
        BrowsingAuthenticated --> MakingPurchase
        BrowsingAuthenticated --> ViewingHistory
        
        ManagingProfile --> BrowsingAuthenticated
        ManagingCart --> BrowsingAuthenticated
        ViewingHistory --> BrowsingAuthenticated
        
        state MakingPurchase {
            [*] --> SelectingProducts
            SelectingProducts --> ReviewingCart
            ReviewingCart --> EnteringShippingData
            EnteringShippingData --> SelectingPayment
            SelectingPayment --> ProcessingPayment
            ProcessingPayment --> PurchaseSuccess
            ProcessingPayment --> PaymentError
            PaymentError --> SelectingPayment
            PurchaseSuccess --> [*]
        }
        
        MakingPurchase --> BrowsingAuthenticated : Purchase completed
        MakingPurchase --> BrowsingAuthenticated : Cancel purchase
    }
    
    AuthenticatedUser --> Visitor : Logout
    AuthenticatedUser --> SessionExpired : Token expired
    SessionExpired --> Visitor : Redirect to login
    
    Visitor --> [*] : Exit site
    AuthenticatedUser --> [*] : Exit site
```

## Best Practices for APIs

### Endpoint Documentation
- Use flowcharts to show API structure
- Include HTTP status codes in sequence diagrams
- Document error flows and exception handling

### Authentication and Security
- Clearly show authentication flows
- Include validations and security checkpoints
- Document token and session handling

### Service Architecture
- Clearly separate responsibilities of each service
- Show dependencies between services
- Include communication patterns (sync/async)

### Monitoring and Observability
- Include logging and metrics points
- Document error and recovery flows
- Show integrations with monitoring tools