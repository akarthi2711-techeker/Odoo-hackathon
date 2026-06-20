# Kitchen Workflow (KDS)
```mermaid
stateDiagram-v2
    [*] --> ToCook : New Order Received
    ToCook --> Preparing : Chef Started
    Preparing --> Completed : Food Ready
```
