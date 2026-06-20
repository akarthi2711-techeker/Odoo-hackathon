# Order Lifecycle Diagram
```mermaid
stateDiagram-v2
    Draft --> SentToKitchen
    SentToKitchen --> ToCook
    ToCook --> Preparing
    Preparing --> Completed
    Completed --> Paid
    Paid --> [*]
```
