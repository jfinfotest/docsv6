---
title: "Mermaid Diagrams - Specific Use Cases"
position: 5
---

# Mermaid Diagrams - Specific Use Cases

Practical examples of Mermaid diagrams for real-world situations in software development and technical documentation.

## Enhanced Component Features

Our Mermaid component has been updated with the following improvements:

- **Safe ID generation**: Prevents CSS selector errors with unique and valid identifiers
- **Optimized dynamic loading**: Library loads only when needed, improving performance
- **Complete theme support**: Automatic and smooth adaptation to dark/light mode
- **Robust error handling**: Clear error visualization with informative messages
- **Enhanced responsive design**: Perfect adaptation to different screen sizes
- **More stable rendering**: Elimination of ID conflicts and improved stability

## Microservices Architecture

Diagram showing a microservices system architecture.

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
    
    subgraph "Microservices"
        USER[User Service]
        PRODUCT[Product Service]
        ORDER[Order Service]
        PAYMENT[Payment Service]
        NOTIFICATION[Notification Service]
    end
    
    subgraph "Databases"
        USERDB[(User DB)]
        PRODUCTDB[(Product DB)]
        ORDERDB[(Order DB)]
    end
    
    subgraph "External Services"
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

**Result:**
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
    
    subgraph "Microservices"
        USER[User Service]
        PRODUCT[Product Service]
        ORDER[Order Service]
        PAYMENT[Payment Service]
        NOTIFICATION[Notification Service]
    end
    
    subgraph "Databases"
        USERDB[(User DB)]
        PRODUCTDB[(Product DB)]
        ORDERDB[(Order DB)]
    end
    
    subgraph "External Services"
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

## CI/CD Pipeline Flow

Continuous integration and deployment process.

````markdown
```mermaid
flowchart LR
    DEV[Developer] --> COMMIT[Commit Code]
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
    
    TEST -.->|Fails| NOTIFY_DEV[Notify Developer]
    SECURITY -.->|Vulnerabilities| BLOCK[Block Pipeline]
    E2E -.->|Fails| ROLLBACK[Rollback]
    
    style BUILD fill:#e3f2fd
    style TEST fill:#e8f5e8
    style DEPLOY_PROD fill:#c8e6c9
    style BLOCK fill:#ffcdd2
    style ROLLBACK fill:#fff3e0
```
````

**Result:**
```mermaid
flowchart LR
    DEV[Developer] --> COMMIT[Commit Code]
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
    
    TEST -.->|Fails| NOTIFY_DEV[Notify Developer]
    SECURITY -.->|Vulnerabilities| BLOCK[Block Pipeline]
    E2E -.->|Fails| ROLLBACK[Rollback]
    
    style BUILD fill:#e3f2fd
    style TEST fill:#e8f5e8
    style DEPLOY_PROD fill:#c8e6c9
    style BLOCK fill:#ffcdd2
    style ROLLBACK fill:#fff3e0
```

## Network and Infrastructure Diagram

Cloud infrastructure architecture.

````markdown
```mermaid
flowchart TB
    subgraph "Internet"
        USERS[Users]
        CDN[CloudFlare CDN]
    end
    
    subgraph "AWS Cloud"
        subgraph "VPC - Availability Zone A"
            subgraph "Public Subnet A"
                ALB[Application Load Balancer]
                NAT_A[NAT Gateway A]
            end
            
            subgraph "Private Subnet A"
                EC2_A1[EC2 Instance A1]
                EC2_A2[EC2 Instance A2]
                RDS_A[RDS Primary]
            end
        end
        
        subgraph "VPC - Availability Zone B"
            subgraph "Public Subnet B"
                NAT_B[NAT Gateway B]
            end
            
            subgraph "Private Subnet B"
                EC2_B1[EC2 Instance B1]
                EC2_B2[EC2 Instance B2]
                RDS_B[RDS Standby]
            end
        end
        
        subgraph "Additional Services"
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
    
    RDS_A -.->|Replication| RDS_B
    
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

**Result:**
```mermaid
flowchart TB
    subgraph "Internet"
        USERS[Users]
        CDN[CloudFlare CDN]
    end
    
    subgraph "AWS Cloud"
        subgraph "VPC - Availability Zone A"
            subgraph "Public Subnet A"
                ALB[Application Load Balancer]
                NAT_A[NAT Gateway A]
            end
            
            subgraph "Private Subnet A"
                EC2_A1[EC2 Instance A1]
                EC2_A2[EC2 Instance A2]
                RDS_A[RDS Primary]
            end
        end
        
        subgraph "VPC - Availability Zone B"
            subgraph "Public Subnet B"
                NAT_B[NAT Gateway B]
            end
            
            subgraph "Private Subnet B"
                EC2_B1[EC2 Instance B1]
                EC2_B2[EC2 Instance B2]
                RDS_B[RDS Standby]
            end
        end
        
        subgraph "Additional Services"
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
    
    RDS_A -.->|Replication| RDS_B
    
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

## Data Processing Pipeline

Real-time data processing pipeline.

````markdown
```mermaid
flowchart LR
    subgraph "Data Sources"
        API[External APIs]
        DB[Database]
        FILES[CSV/JSON Files]
        STREAM[Real-time Stream]
    end
    
    subgraph "Ingestion"
        KAFKA[Apache Kafka]
        COLLECTOR[Data Collector]
    end
    
    subgraph "Processing"
        SPARK[Apache Spark]
        TRANSFORM[Transformations]
        VALIDATE[Validations]
        ENRICH[Enrichment]
    end
    
    subgraph "Storage"
        WAREHOUSE[Data Warehouse]
        LAKE[Data Lake]
        CACHE[Redis Cache]
    end
    
    subgraph "Consumption"
        DASHBOARD[Dashboards]
        ML[Machine Learning]
        REPORTS[Reports]
        ALERTS[Alerts]
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
    
    VALIDATE -.->|Invalid Data| ERROR_QUEUE[Error Queue]
    ERROR_QUEUE --> MANUAL_REVIEW[Manual Review]
    
    style KAFKA fill:#e3f2fd
    style SPARK fill:#fff3e0
    style WAREHOUSE fill:#c8e6c9
    style ERROR_QUEUE fill:#ffcdd2
```
````

**Result:**
```mermaid
flowchart LR
    subgraph "Data Sources"
        API[External APIs]
        DB[Database]
        FILES[CSV/JSON Files]
        STREAM[Real-time Stream]
    end
    
    subgraph "Ingestion"
        KAFKA[Apache Kafka]
        COLLECTOR[Data Collector]
    end
    
    subgraph "Processing"
        SPARK[Apache Spark]
        TRANSFORM[Transformations]
        VALIDATE[Validations]
        ENRICH[Enrichment]
    end
    
    subgraph "Storage"
        WAREHOUSE[Data Warehouse]
        LAKE[Data Lake]
        CACHE[Redis Cache]
    end
    
    subgraph "Consumption"
        DASHBOARD[Dashboards]
        ML[Machine Learning]
        REPORTS[Reports]
        ALERTS[Alerts]
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
    
    VALIDATE -.->|Invalid Data| ERROR_QUEUE[Error Queue]
    ERROR_QUEUE --> MANUAL_REVIEW[Manual Review]
    
    style KAFKA fill:#e3f2fd
    style SPARK fill:#fff3e0
    style WAREHOUSE fill:#c8e6c9
    style ERROR_QUEUE fill:#ffcdd2
```

## React Components Diagram

Component structure in a React application.

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

**Result:**
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

## Git Flow Diagram

Git workflow with branches.

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

**Result:**
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

## Tips for Specific Use Cases

### For Software Architecture
- Use subgraphs to group related components
- Apply consistent colors for different service types
- Include annotations to explain architectural decisions

### For Business Processes
- Keep flow from left to right or top to bottom
- Use different shapes for different activity types
- Include clear decision points

### For Technical Documentation
- Combine different diagram types as needed
- Maintain consistency in naming and styles
- Update diagrams alongside code changes

### Common Troubleshooting

#### "Failed to execute 'querySelector'" Error
This error has been completely resolved in the new component version. Unique and valid IDs are now automatically generated for each diagram.

#### Rendering Issues
- **Incorrect syntax**: Verify your code in [Mermaid Live Editor](https://mermaid.live/)
- **Special characters**: Ensure special characters are properly escaped
- **Unbalanced braces**: Check that all braces `{}` and parentheses `()` are properly closed
- **Inconsistent themes**: The component now automatically handles theme changes

#### Performance Best Practices
- Avoid extremely complex diagrams (more than 50 nodes)
- Break large diagrams into multiple smaller ones
- Use descriptive but concise names for nodes
- Leverage colors and styles to improve readability

### Complementary Tools
- **Mermaid Live Editor**: For quick diagram testing
- **VS Code Extensions**: For real-time preview
- **GitHub Integration**: Diagrams render automatically in README
- **Confluence/Notion**: Native support for Mermaid diagrams
- **Official Documentation**: [Complete syntax guide](https://mermaid-js.github.io/mermaid/)