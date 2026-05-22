# GrowFast IT Solutions - MERN Web Application

A professional, secure MERN stack web application for an IT Solutions company offering:

- Android Development
- Software Development
- Web Development

Built to support startups with affordable pricing and enterprises with scalable architecture.

---

## Project Structure

```bash
.
├── client
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src
│       ├── App.jsx
│       ├── main.jsx
│       ├── styles.css
│       ├── components
│       │   ├── Navbar.jsx
│       │   └── Footer.jsx
│       └── pages
│           ├── HomePage.jsx
│           ├── AboutPage.jsx
│           ├── ServicesPage.jsx
│           └── ContactPage.jsx
├── server
│   ├── .env.example
│   ├── package.json
│   └── src
│       ├── server.js
│       ├── models
│       │   ├── Lead.js
│       │   └── Admin.js
│       ├── controllers
│       │   ├── contact.controller.js
│       │   └── newsletter.controller.js
│       ├── middlewares
│       │   └── validate.middleware.js
│       ├── validators
│       │   ├── contact.validator.js
│       │   └── newsletter.validator.js
│       └── routes
│           ├── contact.routes.js
│           └── newsletter.routes.js
└── TODO.md
```

---

## Security Features Implemented

Backend includes modern security hardening:

- `helmet` for secure HTTP headers
- `cors` with origin whitelist
- `express-rate-limit` to mitigate abuse
- `express-mongo-sanitize` for NoSQL injection protection
- `xss-clean` for basic XSS payload cleanup
- `hpp` to prevent HTTP parameter pollution
- Strict input validation with `Joi`
- Request body size limit (`10kb`)
- Password hashing via `bcryptjs` in Admin model
- Environment-based configuration using `.env`

> Note: No web application can be guaranteed “100% unhackable”, but this setup follows strong industry best practices.

---

## Setup Instructions

## 1) Backend Setup

```bash
cd server
npm install
```

Create `.env` from example:

```bash
copy .env.example .env
```

Update `.env` values (especially `MONGO_URI` and `JWT_SECRET`).

Run backend:

```bash
npm run dev
```

Backend URL: `http://localhost:5000`

Health check: `GET http://localhost:5000/api/health`

---

## 2) Frontend Setup

```bash
cd client
npm install
```

(Optional) create `client/.env`:

```env
VITE_API_BASE_URL=http://localhost:5000
```

Run frontend:

```bash
npm run dev
```

Frontend URL: `http://localhost:5173`

---

## Available API Endpoints

### Health
- `GET /api/health`

### Contact
- `POST /api/contact`
- Body:
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "9999999999",
  "companyName": "Acme Inc",
  "service": "Web Development",
  "budget": "2000 USD",
  "message": "Need a secure business website."
}
```

### Newsletter
- `POST /api/newsletter`
- Body:
```json
{
  "email": "john@example.com"
}
```

---

## Next Recommended Enhancements

- Add admin authentication routes (login/logout/refresh token)
- Store newsletter emails in MongoDB (currently in-memory Set)
- Add logging/monitoring (Winston + centralized logs)
- Add unit/integration tests (Jest + Supertest)
- Add CI/CD pipeline and deployment configs
- Add SSL + reverse proxy setup (Nginx/Cloudflare) for production
