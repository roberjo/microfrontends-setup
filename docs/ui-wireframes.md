# UI Wireframes (Text)

## Shell Layout (Desktop)
```
+---------------------------------------------------------------------------------+
| LOGO | Search...                      | Bell | Settings | Theme | Avatar       |
+---------------------------------------------------------------------------------+
| NAV (LOBs + Tools)        | Content Area (MFE Route)                             |
| - Retail Banking          |                                                     |
| - Wealth                  |                                                     |
| - Insurance               |                                                     |
| - Treasury                |                                                     |
| ------------------------- |                                                     |
| - Admin (role-gated)      |                                                     |
| - Reports                 |                                                     |
+---------------------------------------------------------------------------------+
```

## Admin: Access Management
```
+---------------------------------------------------------------------------------+
| Admin > Access Management                                                       |
+---------------------------------------------------------------------------------+
| Filters: [User] [LOB] [Role] [Status]                                           |
|---------------------------------------------------------------------------------|
| User            | LOB            | Role        | Status   | Actions              |
| j.smith@...     | Retail Banking | Analyst     | Active   | View | Revoke         |
| m.lee@...       | Wealth         | Advisor     | Pending  | View | Approve        |
| a.patel@...     | Insurance      | Admin       | Active   | View | Revoke         |
+---------------------------------------------------------------------------------+
| Selected User: j.smith@...                                                     |
| [Grant Access] [Remove Access] [Audit Log]                                     |
+---------------------------------------------------------------------------------+
```

## Notifications Panel
```
+----------------------------------------+
| Notifications                          |
| - Access request approved              |
| - New report available                 |
| - MFA required next login              |
+----------------------------------------+
```

Notes:
- Left nav is fixed and collapsible.
- Top bar provides global actions and user context.
- MFEs render within the content area and inherit shared layout.
