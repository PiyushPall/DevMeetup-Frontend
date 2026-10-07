<div align="center">

# 🤝 DevMeetup — Developer Networking & Matchmaking Platform

**Connect, Collaborate, and Build Together with Developers Worldwide.**

[![React](https://img.shields.io/badge/Frontend-React_19_+_Vite-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js_+_Express-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB_+_Mongoose-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/Auth-JWT_+_HTTP--Only_Cookies-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com/)

<br />

[![Live Demo](https://img.shields.io/badge/🚀_LIVE_DEMO-CLICK_HERE_TO_OPEN-2563EB?style=for-the-badge)](https://dev-meetup.vercel.app/)

🔗 **Live Demo URL:** [https://dev-meetup.vercel.app/](https://dev-meetup.vercel.app/)

</div>

---

## 📖 Overview

**DevMeetup** is a full-stack developer networking and matchmaking web application built with the **MERN Stack (MongoDB, Express.js, React, Node.js)**. Designed specifically for software engineers, open-source contributors, and tech creators, DevMeetup enables developers to discover peers, send and review connection requests, manage their professional network, and showcase their technical skills and bio.

---

## ✨ Key Features

- 🔐 **Secure JWT Authentication**: Full signup, login, and logout flows using `bcrypt` password hashing and HTTP-only cookies for session security.
- 🧭 **Developer Discovery Feed**: Browse curated developer profiles excluding already-connected users, pending requests, and your own profile.
- 🤝 **Interactive Matchmaking Workflow**:
  - **Send Requests**: Express interest (`interested`) or pass (`ignored`) on developer profiles in the discovery feed.
  - **Review Incoming Requests**: Accept (`accepted`) or decline (`rejected`) incoming connection requests in real time.
- 👥 **Connections Directory**: View and manage all accepted developer connections in a dedicated dashboard view.
- 👤 **Dynamic Profile Management**: Edit personal details, profile photo URL, age, gender, bio (`about`), and technical `skills` with live profile preview.
- 🛡️ **Schema & Input Validation**: Strict backend validation via `validator` and Mongoose schema constraints (preventing duplicate requests and self-connections).
- 📱 **Responsive Dashboard UI**: Clean layout featuring a dedicated sidebar (`Aside`), top navigation (`Header`), and modular route views (`Discover`, `Request`, `Connection`, `Profile`).

---

## 🛠️ Tech Stack

### Frontend (`/frontend`)
| Technology | Purpose |
| :--- | :--- |
| **React (Vite)** | Fast, component-based Single Page Application (SPA) architecture |
| **React Router** | Client-side routing for Public (`Login`, `Signup`) & Protected (`DashboardLayout`) views |
| **CSS3 / Modern Styling** | Responsive layout, dashboard grid, cards, and interactive states |
| **Fetch / REST API Client** | Centralized API communication (`src/api.js` & `src/auth.js`) with credential cookies |

### Backend (`/backend`)
| Technology | Purpose |
| :--- | :--- |
| **Node.js & Express.js** | RESTful API server and modular routing (`Auth`, `Profile`, `Request`) |
| **MongoDB & Mongoose** | NoSQL database and ODM for `User` and `ConnectionRequest` models |
| **JSON Web Token (`jsonwebtoken`)** | Stateless user authentication stored in HTTP-only cookies |
| **Bcrypt (`bcrypt`)** | Secure salted password encryption |
| **Validator (`validator`)** | Email, strong password, and URL sanitization & validation |
| **Vercel** | Serverless backend & frontend deployment (`vercel.json`) |

---

## 📂 Project Architecture

```text
DevMeetup/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js        # MongoDB connection setup via Mongoose
│   │   ├── model/
│   │   │   ├── user.js            # User schema, JWT helper methods, password compare
│   │   │   └── connection.js      # ConnectionRequest schema & pre-save hooks
│   │   ├── Router/
│   │   │   ├── Auth.js            # /signup, /login, /logout routes
│   │   │   ├── Profile.js         # /profile/view, /profile/edit, /profile/password
│   │   │   └── Request.js         # Connection request & discovery feed routes
│   │   └── utils/
│   │       ├── userAuth.js        # JWT cookie authentication middleware
│   │       └── validation.js      # Request payload validation utilities
│   ├── App.js                     # Express application entry point
│   ├── vercel.json                # Vercel deployment configuration
│   └── package.json
│
└── frontend/
    ├── public/
    │   ├── favicon.svg
    │   └── icons.svg
    ├── src/
    │   ├── assets/                # Brand logos & hero graphics (logo.png, hero.png)
    │   ├── Components/
    │   │   ├── Aside.jsx          # Dashboard sidebar navigation
    │   │   ├── DashboardLayout.jsx# Protected dashboard wrapper
    │   │   ├── Header.jsx         # Top navigation bar
    │   │   └── Layout.jsx         # Root layout wrapper
    │   ├── Pages/
    │   │   ├── HomePages/
    │   │   │   ├── Connection.jsx # Accepted developer connections list
    │   │   │   ├── Discover.jsx   # Developer discovery feed & matchmaking actions
    │   │   │   ├── Profile.jsx    # Developer profile viewer & editor
    │   │   │   └── Request.jsx    # Incoming connection requests (Accept / Reject)
    │   │   ├── Login.jsx          # User sign-in page
    │   │   └── Signup.jsx         # User registration page
    │   ├── api.js                 # API base configuration & request helpers
    │   ├── auth.js                # Client authentication state helpers
    │   ├── App.jsx                # Application router & route definitions
    │   ├── App.css                # Component-level styles
    │   ├── index.css              # Global stylesheet
    │   └── main.jsx               # React DOM root entry
    ├── index.html
    ├── vite.config.js
    └── package.json
```

---

## 🔌 REST API Endpoints Reference

### 1. Authentication (`src/Router/Auth.js`)
| Method | Endpoint | Auth Required | Description |
| :--- | :--- | :---: | :--- |
| `POST` | `/signup` | ❌ | Register a new developer account |
| `POST` | `/login` | ❌ | Authenticate user & set JWT HTTP-only cookie |
| `POST` | `/logout` | ✅ | Clear authentication cookie and end session |

### 2. Profile Management (`src/Router/Profile.js`)
| Method | Endpoint | Auth Required | Description |
| :--- | :--- | :---: | :--- |
| `GET` | `/profile/view` | ✅ | Fetch currently authenticated developer's profile |
| `PATCH` | `/profile/edit` | ✅ | Update profile fields (`firstName`, `lastName`, `age`, `gender`, `about`, `photoUrl`, `skills`) |
| `PATCH` | `/profile/password` | ✅ | Update account password securely |

### 3. Matchmaking, Requests & Feed (`src/Router/Request.js`)
| Method | Endpoint | Auth Required | Description |
| :--- | :--- | :---: | :--- |
| `POST` | `/request/send/:status/:toUserId` | ✅ | Send a request (`interested` or `ignored`) to a developer |
| `POST` | `/request/review/:status/:requestId` | ✅ | Review a received request (`accepted` or `rejected`) |
| `GET` | `/user/requests/received` | ✅ | List all pending (`interested`) connection requests received |
| `GET` | `/user/connections` | ✅ | List all accepted connections for the logged-in developer |
| `GET` | `/feed` | ✅ | Paginated discovery feed of developers to connect with |

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)
Create a `.env` file in the `backend/` directory:

```env
PORT=3000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/devMeetup
JWT_SECRET=your_super_secret_jwt_key_here
FRONTEND_URL=http://localhost:5173
```

### Frontend (`frontend/.env`)
Create a `.env` file in the `frontend/` directory:

```env
VITE_API_URL=http://localhost:3000
```

---

## 🚀 Getting Started Locally

### Prerequisites
- **Node.js** (v18+ recommended)
- **MongoDB** (Local instance or MongoDB Atlas cluster)
- **npm** or **bun**

### 1. Clone the Repository
```bash
git clone https://github.com/piyushpal/DevMeetup.git
cd DevMeetup
```

### 2. Setup & Run Backend
```bash
cd backend
npm install
npm run dev
```
*The backend API server will start on `http://localhost:3000`.*

### 3. Setup & Run Frontend
Open a new terminal window:
```bash
cd frontend
npm install
npm run dev
```
*The React Vite app will start on `http://localhost:5173`.*

---

## 🌐 Live Demo

Experience **DevMeetup** live in your browser:

[![Live Demo](https://img.shields.io/badge/🚀_LIVE_DEMO-OPEN_APPLICATION-2563EB?style=for-the-badge)](https://ais-pre-ra2go74y5zxxq7ftybm44i-874841661966.asia-southeast1.run.app)

- **Live Demo URL:** https://ais-pre-ra2go74y5zxxq7ftybm44i-874841661966.asia-southeast1.run.app

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<div align="center">
  <b>Built with ❤️ by Piyush Pal</b>
</div>