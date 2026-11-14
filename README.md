# Aurelle — Timeless Quiet Luxury Maison

> High-fashion atelier e-commerce platform crafted with React, Vite, Tailwind CSS, Node.js, Express, and MongoDB.

Inspired by the understated confidence of couture houses like The Row, Céline, and Totême, **Aurelle** marries classical editorial Roman typography (`Playfair Display`) with crisp functional modernism (`Inter`).

---

## Features

- **Strict Fidelity to Stitch Design:** Exact palette (`#00081e`, `#0a1f44`, `#755a24`, `#fbf9f5`, `#eae8e4`), 3:4 editorial portrait card aspect ratios, sharp razor-tailored edges (`0px` border radius), hairline gold and slate borders.
- **Complete Page Navigation & Connected Modules:**
  - **Maison Homepage (`/`):** Hero with Edition N° 09 Paris • Como, Atelier Manifesto Strip, Signature Disciplines asymmetric matrix, Curated Editor's Picks 4-column grid, Atelier Service Strip, Split Editorial Heritage Story, and VIP Circle Invitation.
  - **Atelier Catalog (`/catalog`):** Category filter tabs (New In, Ready to Wear, Dresses, Knitwear & Outerwear, Accessories), material filter (Cashmere, Silk, Wool, Calfskin), price range slider, sort options (Curated, Price Low-High, Price High-Low), quick view triggers, and live wishlist filtering.
  - **Garment Detail View (`/product/:id`):** Multi-angle gallery, size selectors (36, 38, 40, 42), tonal color swatches, quantity adjustment, Add to Shopping Bag, Save to Wishlist, Book Private Fitting, and tabbed specifications (Fabric, Origin, Seamwork, White-glove delivery).
  - **Slide-out Cart Drawer & Full Bag (`/cart`):** Live quantity increments, complimentary white-glove shipping progress bar ($350 threshold), bespoke gift packaging toggle with custom note card, privilege promo codes, itemized breakdown.
  - **Bespoke Checkout (`/checkout`):** Client correspondence, delivery destination, payment protocols (Encrypted Card, Private Salon Wire, Fitting Invoice), order submission connected to backend REST API.
  - **Order Confirmation Certificate (`/order-confirmation/:id`):** Unique acquisition code (e.g. `AUR-2025-XXXXXX`), date of registry, courier protocol, itemized receipt, private concierge desk hotline.
  - **Client Access Portal (`/login` & `/account`):** JWT token authentication, registration dossier, order tracking history, saved wishlist pieces, and salon fitting appointments.
  - **Autumn/Winter Lookbook (`/lookbook`):** "Edition N° 09 — Paris • Como" campaign spreads with shop-the-look hotspot triggers.
  - **The Maison Story (`/about`):** Heritage since 1928, Como silk mills, Biella wool spinning, and Paris Flagship Salon directory.
  - **Private Salon Concierge (`/concierge`):** Private fitting scheduling form, live order tracking lookup, French couture sizing concordance table, and shipping protocols.
  - **Interactive Global Search Modal:** Live query across garment titles, descriptions, fabrics, and categories with suggested keyword chips.
  - **Aurelle Circle VIP Newsletter:** Connected directly to Express backend.

---

## Full-Stack Architecture

```
AI Project/
├── frontend/               # React 18 + Vite + Tailwind CSS + React Router
│   ├── public/             # Static assets & _redirects for Cloudflare Pages SPA routing
│   ├── src/
│   │   ├── components/     # Header, Footer, QuickViewModal, CartDrawer, SearchModal
│   │   ├── context/        # CartContext, WishlistContext, AuthContext
│   │   ├── data/           # Resilient fallback catalog data
│   │   ├── pages/          # Home, Catalog, ProductDetail, Cart, Checkout, Confirmation, Auth, Account, Lookbook, About, Concierge
│   │   └── services/       # API client with production endpoint configuration
│   └── tailwind.config.js  # Exact Quiet Luxury design tokens
├── backend/                # Node.js + Express + Mongoose (MongoDB)
│   ├── config/             # MongoDB database connection with graceful resilience
│   ├── controllers/        # Product, Auth, Order, Newsletter, Appointment
│   ├── middleware/         # JWT verification & error handling
│   ├── models/             # Product, User, Order, Newsletter, Appointment schemas
│   ├── routes/             # REST endpoints
│   ├── seed/               # High-fashion catalog seeder
│   └── server.js           # Express app with CORS
├── .env                    # Root environment configuration
├── .gitignore              # Production Git ignore rules
└── DEPLOYMENT.md           # Step-by-step Cloudflare Pages + Render guide
```

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/products` | Fetch all garments (supports `?category=`, `?sort=`, `?search=`, `?curated=true`) |
| `GET` | `/api/products/:id` | Fetch single garment by ID |
| `POST` | `/api/auth/register` | Register new client dossier |
| `POST` | `/api/auth/login` | Authenticate client and return JWT |
| `GET` | `/api/auth/profile` | Get logged-in client profile (Requires Bearer token) |
| `POST` | `/api/orders` | Place new luxury atelier order |
| `GET` | `/api/orders/:id` | Lookup order by ID or Order Number |
| `GET` | `/api/orders/myorders` | Get logged-in client's order history |
| `POST` | `/api/newsletter/subscribe` | Subscribe email to Aurelle Circle |
| `POST` | `/api/appointments` | Book private salon fitting appointment |
| `GET` | `/api/health` | Health check endpoint |

---

## Getting Started

### Local Development:
```bash
# Backend
cd backend
npm install
npm run dev

# Frontend (in another terminal)
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173` to explore the Maison Aurelle platform.
For production deployment instructions on Cloudflare Pages and Render, see [DEPLOYMENT.md](file:///c:/Users/anmol/OneDrive/Documents/AI%20Project/DEPLOYMENT.md).
