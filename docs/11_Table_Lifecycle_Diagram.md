# Table Lifecycle Diagram
```mermaid
stateDiagram-v2
    Available --> Occupied
    Occupied --> Ordering
    Ordering --> Preparing
    Preparing --> PaymentPending
    PaymentPending --> Available
```
