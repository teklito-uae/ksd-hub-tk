# Final Automated Deployment Plan - Kasaragod Hub

This document documents the finalized automated deployment workflow for Kasaragod Hub on Hostinger.

## 1. The Automated Workflow
The project uses a GitHub Action (`.github/workflows/deploy.yml`) that triggers on every push to the **master** branch.

### **What the Action does:**
1.  **Builds Frontend**: Runs `npm run build` in the `frontend` directory.
2.  **Prepares Backend**: Runs `composer install` in the `backend` directory.
3.  **Generates Config Files**:
    *   **`.env`**: Automatically creates the production environment file inside `backend/`.
    *   **`.htaccess`**: Automatically creates the root routing rules for API proxying and React SPA support.
4.  **Includes Dependencies**: Force-includes the `vendor/` folder in the deployment.
5.  **Fixes Permissions**: Sets `775` permissions on `storage` and `bootstrap/cache`.
6.  **Deploys**: Pushes a "ready-to-run" snapshot to the **`production`** branch.

## 2. Hostinger Configuration
Once you push to `master` and the GitHub Action completes:

1.  **Git Settings**:
    *   **Repository**: `teklito-uae/ksd-hub-tk`
    *   **Branch**: `production`
    *   **Install Directory**: `/`
2.  **Deployment**:
    *   If a previous deployment exists, always click **"Reset"** or **"Discard Changes"** before deploying to clear server-side modifications (like logs).
    *   Click **Deploy**.

## 3. Site Architecture
*   **Root `/`**: Contains the React Frontend build.
*   **Folder `/backend`**: Contains the Laravel API.
*   **API Prefix**: All API calls are routed through `https://kasaragodhub.com/api/v1/...`.

## 4. Troubleshooting
If the site returns a 500 error:
1.  **Check Permissions**: Ensure `public_html/backend/storage` is writable.
2.  **Database Sync**: Visit `https://kasaragodhub.com/setup-db-secret` to ensure the database tables and seed data are up to date.
3.  **Debug Mode**: `APP_DEBUG` is currently set to `true` in the automated `.env` to catch any remaining issues. Once the site is 100% stable, you can change this to `false` in `deploy.yml`.

---
*Last Updated: 2026-04-20*
