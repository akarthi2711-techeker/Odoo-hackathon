# Customer Ordering Workflow
```mermaid
stateDiagram-v2
    [*] --> ScanQR
    ScanQR --> BrowseMenu
    BrowseMenu --> AddItems
    AddItems --> PlaceOrder
    PlaceOrder --> TrackStatus
```
