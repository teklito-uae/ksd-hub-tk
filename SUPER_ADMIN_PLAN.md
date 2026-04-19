# Super Admin Dashboard Plan — "Kasaragod Hub God Mode"

This document outlines the architecture and feature set for the Super Admin panel, designed for total control over the Kasaragod Hub platform.

## 1. Core Architecture & Security

### **Security & Access Control**
- **Role-Based Access Control (RBAC)**: Only users with `role: 'admin'` in the `users` table can access `/admin/*` routes.
- **Middleware Protection**: All Admin API endpoints will be protected by `auth:sanctum` and a custom `EnsureUserIsAdmin` middleware.
- **Session Security**: Auto-logout on token expiration and secure cookie handling.

### **UI/UX Strategy**
- **Theme**: Consistent with Kasaragod Hub (Vibrant Blue/Secondary color palette).
- **Layout**: Fixed sidebar navigation with a responsive header and fluid content area.
- **Components**: High-density data tables, modal-based CRUD, and real-time chart visualizations.

---

## 2. Sidebar Modules & Functions

### **Module 1: Analytics & Insights (Dashboard)**
- **Total Registrations**: Breakdown by User, Business, and Professional.
- **Listing Stats**: Approved vs. Pending Businesses/Pros.
- **Lead Generation**: Total Inquiries in the last 24h/7d.
- **Traffic Heatmap**: Most visited categories and popular blog posts.

### **Module 2: User Management (Registrations)**
- **Registrations Table**: See every user who joins.
- **Role Control**: Promote/Demote users (Admin, Business, Pro, User).
- **Account Actions**: Reset passwords, Ban/Suspend accounts, and verify email status.
- **Search & Filter**: Find users by email, name, or role.

### **Module 3: Directory Control (Business & Pros)**
- **Approval Pipeline**: A dedicated list of "Pending" listings that need manual verification.
- **Business CRUD**: Edit any business listing (Contact info, pricing, category).
- **Pro CRUD**: Manage professional profiles and services.
- **Verification Badges**: Manually toggle the "Verified" and "Featured" status for premium listings.

### **Module 4: Blog Engine**
- **Post Management**: Create, edit, and delete blog posts with a rich text editor.
- **Slug Management**: Ensure SEO-friendly URLs.
- **Media Library**: Manage images used in blog posts and listings.
- **Category Control**: CRUD for Blog Categories.

### **Module 5: Interactions & Lead Tracking**
- **Global Inquiries**: View every inquiry sent to every business (Total visibility on leads).
- **Inquiry Status**: Mark leads as "Followed up" or "Closed."
- **Export Data**: Download CSV/Excel lists of inquiries for marketing.

### **Module 6: System Configuration (God Mode)**
- **Category Manager**: Manage the entire Directory Category tree (Icons, parent/child relationships).
- **Place Manager**: Manage the list of Cities/Towns (Places) available for filtering.
- **Laravel Log Viewer**: Real-time view of `laravel.log` to debug production 500 errors instantly.
- **Global Settings**: Manage Site Name, SEO meta tags, and contact information.

---

## 3. Technical Implementation Strategy

### **Phase 1: Foundation (Backend)**
- [ ] Create `AdminController` to handle bulk stats.
- [ ] Implement `isAdmin` middleware in Laravel.
- [ ] Define Admin-only API routes under `api/v1/admin/`.

### **Phase 2: Core UI (Frontend)**
- [ ] Build `AdminLayout` with Sidebar and Breadcrumbs.
- [ ] Implement `AdminDashboard` with Recharts for analytics.
- [ ] Develop `AdminDataTable` reusable component for all modules.

### **Phase 3: Module Implementation**
- [ ] User Management Module.
- [ ] Listing Approval Module.
- [ ] Content Manager (Blog & Directory).
- [ ] Lead Tracking & Settings.

---

## 4. Design Aesthetics Preview
- **Sidebar**: Dark/Blurred Sidebar with glassmorphism effects.
- **Typography**: Outfit/Inter for high readability.
- **Density**: Compact table rows to allow viewing 20+ records without scrolling.
- **Micro-interactions**: Subtle hover states on charts and action buttons.

---
*Status: Pending Approval*
