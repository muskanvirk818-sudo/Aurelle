# Maison Aurelle Paris — Production Deployment & Connection Guide

This guide provides step-by-step instructions for deploying the **Maison Aurelle** full-stack quiet luxury e-commerce platform to **Cloudflare Pages** (Frontend) and **Render** (Backend), backed by **MongoDB Atlas**.

---

## Architecture Overview

```
                      +-----------------------------+
                      |       Client Browser        |
                      +--------------+--------------+
                                     |
                HTTPS / HTTP/3       |       HTTPS REST API
          (HTML, CSS, JS Bundles)    |    (JSON Payloads, JWT Auth)
                                     v
                 +-------------------+-------------------+
                 |                                       |
                 v                                       v
  +-------------------------------+       +-------------------------------+
  |       Cloudflare Pages        |       |        Render Web Service     |
  |      (React 18 + Vite)        |       |     (Node.js / Express API)   |
  |   https://aurelle.pages.dev   |       | https://aurelle-api.onrender.com
  +-------------------------------+       +---------------+---------------+
                                                          |
                                                          | Mongoose Connection
                                                          v
                                          +---------------+---------------+
                                          |         MongoDB Atlas         |
                                          |      (Encrypted Database)     |
                                          +-------------------------------+
```

---

## Step 1: Database Setup (MongoDB Atlas)

1. Log in or create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a new Cluster (e.g., M0 Free Tier).
3. **Create Database User:**
   - Go to **Security > Database Access**.
   - Click **Add New Database User**.
   - Authentication Method: **Password**.
   - Example username: `aurelle_admin`
   - Example password: `<strong-secure-password>`
   - Database User Privileges: `Read and write to any database`.
4. **Configure Network Access:**
   - Go to **Security > Network Access**.
   - Click **Add IP Address**.
   - Select **Allow Access from Anywhere** (`0.0.0.0/0`) so Render instances can connect dynamically.
5. **Obtain Connection String:**
   - Go to **Clusters > Connect > Drivers**.
   - Driver: `Node.js`, Version: `5.5 or later`.
   - Active configured URI for this project:
     ```
     mongodb+srv://muskanvirk818_db_user:V9p93tGCFo2OOIVD@cluster0.9cvrgdh.mongodb.net/aurelle_maison?retryWrites=true&w=majority
     ```

---

## Step 2: Backend Deployment on Render

1. Push your repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: complete Maison Aurelle luxury e-commerce platform"
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git branch -M main
   git push -u origin main
   ```
2. Log in to [Render](https://render.com).
3. Click **New +** > **Web Service**.
4. Connect your GitHub repository.
5. Configure the service:
   - **Name:** `aurelle-backend` (or your preferred name)
   - **Region:** Frankfurt (EU Central) or Oregon (US West)
   - **Branch:** `main`
   - **Root Directory:** `backend`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** `Free` (or Starter for high availability)
6. **Environment Variables:**
   Click **Advanced** > **Add Environment Variable** and enter:

   | Key | Value | Notes |
   |---|---|---|
   | `PORT` | `5000` | Internal port |
   | `NODE_ENV` | `production` | Production mode |
   | `MONGODB_URI` | `mongodb+srv://muskanvirk818_db_user:V9p93tGCFo2OOIVD@cluster0.9cvrgdh.mongodb.net/aurelle_maison?retryWrites=true&w=majority` | Your configured MongoDB Atlas connection string |
   | `JWT_SECRET` | `aurelle_couture_quiet_luxury_secret_jwt_key_1928_paris` | Secret key for JWT signing |
   | `CLIENT_URL` | `https://aurelle.pages.dev` | Your Cloudflare Pages URL (or `*`) |

7. Click **Create Web Service**.
8. Once deployed, note down your Render Web Service URL (e.g., `https://aurelle-backend.onrender.com`).
9. **Seed Catalog Data on Render:**
   - Go to the Render dashboard for your web service.
   - Click the **Shell** tab.
   - Run:
     ```bash
     npm run seed
     ```
   - This populates the MongoDB Atlas database with all luxury atelier garments, materials, and editorial photos.

---

## Step 3: Frontend Deployment on Cloudflare Pages

1. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Navigate to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select your GitHub repository.
4. Set up the build configuration:
   - **Project Name:** `aurelle` (becomes `https://aurelle.pages.dev`)
   - **Production Branch:** `main`
   - **Framework Preset:** `Vite`
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Build Output Directory:** `dist`
5. **Environment Variables:**
   Under **Environment variables (advanced)**, add:

   | Variable name | Value |
   |---|---|
   | `VITE_API_URL` | `https://aurelle-backend.onrender.com` |

   *(Replace with your actual Render URL from Step 2).*

6. Click **Save and Deploy**.
7. Cloudflare Pages builds the app and provisions global CDN edge delivery with SSL certificates enabled automatically.
8. *(Note: SPA routing is natively configured via `frontend/wrangler.json` with `"not_found_handling": "single-page-application"` to prevent any infinite loop errors with Cloudflare's asset pipeline).*

---

## Step 4: Connecting Frontend and Backend

1. **Update Backend CORS Origins:**
   - Once your Cloudflare Pages domain is active (e.g. `https://aurelle.pages.dev`), update the `CLIENT_URL` environment variable on Render if strict origin enforcement is preferred. (The server already permits all incoming origins by default via `cors({ origin: '*' })`).
2. **Cold Start Awareness:**
   - On Render Free Tier, services spin down after 15 minutes of inactivity.
   - When a client visits the site, the frontend automatically falls back to bundled in-memory atelier data while Render spins up, guaranteeing that the interface is never blank or frozen.
3. **Verify Full-Stack Communication:**
   - Visit `https://aurelle.pages.dev`.
   - Open browser DevTools Network tab.
   - Navigate to `/catalog` — verify requests to `https://aurelle-backend.onrender.com/api/products` return status `200 OK`.
   - Add a piece to the Shopping Bag.
   - Open Checkout, fill client correspondence, and place an order.
   - Verify the order is registered and saved in MongoDB Atlas.

---

## Local Development Quickstart

To run the full stack locally:

### 1. Start Backend:
```bash
cd backend
npm install
npm run seed     # (optional, populates local catalog)
npm run dev      # Runs server on http://localhost:5000
```

### 2. Start Frontend:
```bash
cd frontend
npm install
npm run dev      # Runs Vite dev server on http://localhost:5173
```

### 3. Or Run Concurrently from Root:
```bash
npm install
npm run dev      # Boots both backend (port 5000) and frontend (port 5173) simultaneously
```
