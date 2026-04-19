# Production Deployment Summary

## Current Working Setup (As of April 20, 2026)

### **1. Folder Structure**
The site is structured to maximize performance on Hostinger:
- **`public_html/`**: React frontend files + root `.htaccess`.
- **`public_html/backend/`**: Laravel API files + `vendor/` + `.env`.

### **2. Automated Configuration**
The following files are managed automatically by the **GitHub Action** (do not edit manually on the server):
- **`.env`**: Contains production database and SMTP credentials.
- **`.htaccess`**: Handles API proxying (`/api/*` -> `backend/public/index.php`) and React routing.

### **3. Database Connectivity**
- **Endpoint**: `https://kasaragodhub.com/check-db` (Checks if Laravel can talk to MySQL).
- **Setup**: `https://kasaragodhub.com/setup-db-secret` (Runs migrations and seeds).

### **4. Credentials**
- **DB Name**: `u703200280_ksdhub_db`
- **DB User**: `u703200280_ksdhub_db`
- **DB Pass**: `hC6A/d+MHSz#`

### **5. Important Note**
If you see a **500 error** after a new push:
1.  **Reset Git** in the Hostinger panel.
2.  **Re-deploy** from the `production` branch.
3.  Ensure the **PHP version** on Hostinger is set to **8.3**.
