<div align="center">
🚀 DevMeetup
A Modern Full-Stack Developer Networking & Connection Platform
<p align="center">
<img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
<img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
<img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
<img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" alt="React Router DOM" />
<img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="Axios" />
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
<img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
<img src="https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white" alt="Mongoose" />
<img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT Authentication" />
<img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
</p>
<br />
[🚀 LIVE DEMO — VIEW LIVE PROJECT](https://img.shields.io/badge/🚀_LIVE_DEMO_—_VIEW_LIVE_PROJECT-2563EB?style=for-the-badge)](https://dev-meetup.vercel.app/)
</div>
🚀 Live Demo
👉 Experience DevMeetup here: 🔗 View Live Project
Frontend Live URL: dev-meetup.vercel.app
Backend API Base URL: https://devmeetupbackend.vercel.app
Frontend Repository: https://github.com/PiyushPall/DevMeetup-Frontend
📖 About DevMeetup
DevMeetup is a modern full-stack developer networking platform designed to help software developers discover peers, explore developer profiles, send and manage connection requests, and build a professional technical network.
Built with a React 19 + Vite + Tailwind CSS frontend and a Node.js + Express.js + MongoDB REST API backend, DevMeetup provides a clean, responsive dashboard experience with JWT-based authentication, structured connection workflows, and full profile management.
🖼️ Application Preview
Replace or update the preview path below with your deployed application screenshots if needed.
<div align="center">
<img src="./src/assets/hero.png" alt="DevMeetup Application Preview" width="85%" />
</div>
✨ Features
JWT-Based Authentication: Secure developer signup and login with bcrypt password hashing and Bearer token authorization.
Developer Discovery: Browse other registered developers and inspect their profiles, bio, and technical background.
Connection Request System: Send connection requests to other developers directly from the discovery view and track outgoing requests.
Request Management: View incoming connection requests and accept or reject them from a dedicated requests dashboard.
Connections Directory: Access and manage all accepted developer connections in one centralized view.
Profile Management: View, update, or delete your developer profile information seamlessly.
Protected Dashboard Routes: Client-side route protection ensuring only authenticated developers can access dashboard views.
Responsive UI: Modern interface built with Tailwind CSS and Lucide React icons that adapts smoothly across desktop, tablet, and mobile viewports.
🔍 Developer Discovery
The Discover module (Discover.jsx) serves as the primary networking hub inside the dashboard:
Fetches available developer profiles from the backend (GET /user/users).
Displays structured developer cards highlighting profile details and skills.
Allows authenticated developers to inspect individual profiles (GET /user/user/:id) and initiate a connection request with a single action.
🔐 Authentication
DevMeetup implements stateless authentication using JSON Web Tokens (JWT) and bcrypt:
Registration (POST /user/signup): Validates user input and hashes passwords securely using bcrypt before storing developer records in MongoDB.
Login (POST /user/login): Verifies credentials and issues a signed JWT token.
Client Token Handling (src/auth.js & src/api.js): The frontend stores the authentication state and attaches the JWT to protected API requests via the HTTP Authorization header:
code
Http
Authorization: Bearer <token>
🤝 Connection Request System
DevMeetup enables structured peer-to-peer connection requests between developers:
Send Connection Request (POST /user/sendRequest/:toUserId): An authenticated developer can send a connection request to another developer using their user ID.
Sent Requests Tracking (GET /user/view/sentRequests): Developers can view requests they have already sent to avoid duplicate outreach and monitor pending statuses.
Single Request Lookup (GET /user/view/request/:id): Fetch detailed information about a specific connection request.
✅ Accept / Reject Requests
Incoming connection requests are managed in the Request module (Request.jsx):
View Received Requests (GET /user/view/allRequest): Lists all pending connection requests sent to the currently authenticated developer.
Review Request (PATCH /user/acceptRequest/:id/:status): The receiving developer can Accept or Reject a request by passing the request ID and target status, immediately updating the relationship state in MongoDB.
🌐 Connections
Once a connection request is accepted, both developers become part of each other's network in the Connection module (Connection.jsx):
View Connections (GET /user/view/connections): Retrieves all accepted connections for the logged-in developer.
Displays connected developers in an organized directory for easy reference and profile viewing.
👤 Profile Management
The Profile module (Profile.jsx) gives developers full control over their identity on the platform:
View Own Profile (GET /user/profile): Retrieves the authenticated developer's current profile data.
Update Profile (PATCH /user/updateProfile): Allows updating profile details such as name, bio, skills, and profile metadata.
Account Removal (DELETE /user/user/:id): Supports deleting a user account when requested.
🛠️ Tech Stack & Technology Breakdown
Frontend
Technology	Role in Project
React 19	Component-based UI architecture and state management
Vite	Lightning-fast frontend build tool and development server
JavaScript (ES6+)	Application logic, asynchronous API handling, and state flows
Tailwind CSS	Utility-first styling and responsive dashboard layout
React Router DOM	Client-side routing and nested dashboard layout navigation
Axios	Promise-based HTTP client for REST API communication
Lucide React	Clean, consistent iconography across navigation and cards
Backend
Technology	Role in Project
Node.js	Server-side JavaScript runtime environment
Express.js	RESTful API framework, routing, and middleware pipeline
MongoDB	NoSQL document database for users and connection requests
Mongoose	Object Data Modeling (ODM), schema validation, and queries
JWT (jsonwebtoken)	Token generation and verification for protected routes
bcrypt	Password hashing and credential verification
CORS	Cross-Origin Resource Sharing between Vercel frontend and backend
cookie-parser	Cookie parsing middleware for Express requests
dotenv	Environment variable management
📚 Detailed Technology Overview
React 19 + Vite: Provides fast HMR during development and an optimized bundle for production deployment on Vercel.
Tailwind CSS: Powers the layout system (Layout.jsx, DashboardLayout.jsx, Header.jsx, Aside.jsx), ensuring consistent spacing, typography, and responsive behavior without bloated stylesheets.
Axios API Layer (src/api.js): Centralizes base URL configuration (https://devmeetupbackend.vercel.app) and automatically attaches Authorization: Bearer <token> headers to authenticated requests.
Express.js + Mongoose (backend/src): Separates concerns cleanly into Router (Auth.js, Profile.js, Request.js), model (user.js, connection.js), config (database.js), and utils (userAuth.js, validation.js).
🏗️ Application Architecture
code
Text
+-------------------------------------------------------------------+
|                        FRONTEND (Vercel)                          |
|                                                                   |
|   React 19 + Vite                                                 |
|         │                                                         |
|         ▼                                                         |
|   React Router DOM (Public Routes & Protected DashboardLayout)    |
|         │                                                         |
|         ▼                                                         |
|   Pages & Components (Discover, Request, Connection, Profile)     |
|         │                                                         |
|         ▼                                                         |
|   Axios API Layer (src/api.js + src/auth.js)                      |
|   Headers: Authorization: Bearer <token>                          |
+-------------------------------------------------------------------+
                                  │
                                  │ HTTPS REST API Calls (CORS)
                                  ▼
+-------------------------------------------------------------------+
|                        BACKEND (Vercel)                           |
|              https://devmeetupbackend.vercel.app                  |
|                                                                   |
|   Express.js Server (App.js)                                      |
|         │                                                         |
|         ▼                                                         |
|   JWT Authentication & Validation Middleware (userAuth.js)        |
|         │                                                         |
|         ▼                                                         |
|   Modular Routers (Auth.js, Profile.js, Request.js)               |
|         │                                                         |
|         ▼                                                         |
|   Mongoose Models (user.js, connection.js)                        |
+-------------------------------------------------------------------+
                                  │
                                  ▼
+-------------------------------------------------------------------+
|                     DATABASE (MongoDB Atlas)                      |
|               Collections: Users, ConnectionRequests              |
+-------------------------------------------------------------------+
🔄 Application Flow
code
Text
+-------------------+
                            |     Developer     |
                            +-------------------+
                                      │
                                      ▼
                            +-------------------+
                            |  Signup / Login   |
                            +-------------------+
                                      │
                                      ▼
                            +-------------------+
                            |Discover Developers|
                            +-------------------+
                                      │
                                      ▼
                            +-------------------+
                            |  View Developer   |
                            |     Profiles      |
                            +-------------------+
                                      │
                                      ▼
                            +-------------------+
                            |  Send Connection  |
                            |      Request      |
                            +-------------------+
                                      │
                                      ▼
                            +-------------------+
                            |  Other Developer  |
                            | Receives Request  |
                            +-------------------+
                                      │
                                      ▼
                            +-------------------+
                            |  Accept / Reject  |
                            +-------------------+
                                      │
                           (If Accepted)
                                      ▼
                            +-------------------+
                            | Accepted Request  |
                            +-------------------+
                                      │
                                      ▼
                            +-------------------+
                            |    Connections    |
                            +-------------------+
🔐 Authentication Flow
code
Text
Developer Enters Credentials (Signup / Login Page)
        │
        ▼
POST /user/signup  OR  POST /user/login
        │
        ▼
Backend Validates Input & Verifies Password with bcrypt
        │
        ▼
Backend Signs & Returns JWT Token
        │
        ▼
Frontend Stores Auth State (src/auth.js)
        │
        ▼
Subsequent Requests Include Header:
Authorization: Bearer <token>
        │
        ▼
Backend Middleware (userAuth.js) Verifies Token & Grants Access
📩 Connection Request Flow
code
Text
[Developer A]                                         [Developer B]
      │                                                     │
      ├─► 1. Browses GET /user/users                        │
      │                                                     │
      ├─► 2. Sends Request:                                 │
      │      POST /user/sendRequest/:toUserId               │
      │                                                     │
      ├─► 3. Tracks Sent Requests:                          │
      │      GET /user/view/sentRequests                    │
      │                                                     │
      │                     4. Views Incoming Requests: ◄───┤
      │                        GET /user/view/allRequest    │
      │                                                     │
      │                     5. Accepts or Rejects:      ◄───┤
      │                        PATCH /user/acceptRequest/:id/:status
      │                                                     │
      └──────────────► 6. Both View Connected Network ◄─────┘
                          GET /user/view/connections
🔌 API Architecture
The frontend communicates with the Express backend through a centralized Axios configuration (src/api.js):
Base URL Configuration: Points to the environment variable VITE_API_URL (or live backend https://devmeetupbackend.vercel.app).
Request Interception / Headers: Automatically attaches Authorization: Bearer <token> from client storage (src/auth.js) for protected endpoints.
RESTful Conventions: Uses standard HTTP methods (GET, POST, PATCH, DELETE) and JSON payloads.
📡 Backend API Endpoints
Authentication & Users
Method	Endpoint	Auth	Description
POST	/user/signup	Public	Register a new developer account
POST	/user/login	Public	Authenticate developer and return a JWT token
GET	/user/users	Bearer JWT	Fetch all discoverable developers
GET	/user/profile	Bearer JWT	Get the logged-in developer's own profile
GET	/user/user/:id	Bearer JWT	Get a specific developer's profile by ID
PATCH	/user/updateProfile	Bearer JWT	Update the logged-in developer's profile information
DELETE	/user/user/:id	Bearer JWT	Delete a developer account by ID
Connection Requests & Network
Method	Endpoint	Auth	Description
POST	/user/sendRequest/:toUserId	Bearer JWT	Send a connection request to a specific developer
PATCH	/user/acceptRequest/:id/:status	Bearer JWT	Accept or reject a received connection request
GET	/user/view/allRequest	Bearer JWT	View all incoming connection requests
GET	/user/view/request/:id	Bearer JWT	View details of a specific connection request by ID
GET	/user/view/sentRequests	Bearer JWT	View all connection requests sent by the current user
GET	/user/view/connections	Bearer JWT	View all accepted developer connections
🛡️ Error Handling
Input Validation (validation.js): Validates signup payloads and profile update fields before database operations occur.
Authentication Guards (userAuth.js): Rejects unauthorized or expired tokens with appropriate 401 Unauthorized responses.
Database Integrity (connection.js & user.js): Mongoose schema rules prevent invalid status transitions and duplicate records.
Frontend Feedback: Axios error responses are caught gracefully in UI components to display clear user feedback during login, signup, and request actions.
📱 Responsive Design
DevMeetup is built with a mobile-first approach using Tailwind CSS:
Desktop Viewports: Full dashboard layout featuring a persistent sidebar (Aside.jsx), top header (Header.jsx), and multi-column developer discovery grids.
Tablet & Mobile Viewports: Adaptive navigation and stacked card layouts ensuring smooth usability on smaller screens.
🚀 Getting Started
Prerequisites
Ensure you have the following installed on your local machine:
Node.js (v18 or higher recommended)
npm
MongoDB (Local MongoDB server or MongoDB Atlas connection URI)
Git
📦 Installation
1. Clone the Repository
code
Bash
# Clone the Frontend repository
git clone https://github.com/PiyushPall/DevMeetup-Frontend.git

# Or if working with the full monorepo structure

cd DevMeetup 2. Install Backend Dependencies
code
Bash
cd backend
npm install 3. Install Frontend Dependencies
code
Bash
cd ../frontend
npm install
⚙️ Environment Variables
Backend (backend/.env)
Create a .env file inside the backend directory:
code
Env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
Frontend (frontend/.env)
Create a .env file inside the frontend directory:
code
Env
VITE_API_URL=https://devmeetupbackend.vercel.app
(For local backend development, you can set VITE_API_URL=http://localhost:3000)
▶️ Run the Project
Start the Backend Server
code
Bash
cd backend
npm start
Start the Frontend Development Server
code
Bash
cd frontend
npm run dev
The Vite development server will start locally (typically at http://localhost:5173).
🏗️ Production Build
To create an optimized production build of the frontend:
code
Bash
cd frontend
npm run build
To preview the production build locally:
code
Bash
npm run preview
🌐 Deployment
Backend Deployment: Hosted on Vercel using backend/vercel.json serverless configuration at https://devmeetupbackend.vercel.app.
Frontend Deployment: Hosted on Vercel, connected to the GitHub repository PiyushPall/DevMeetup-Frontend.
☁️ Deployment Architecture
code
Text
+----------------------------------+ HTTPS / JSON +----------------------------------+
| Vercel Frontend Hosting | ─────────────────────────► | Vercel Serverless Backend API |
| (YOUR_FRONTEND_VERCEL_URL) | ◄───────────────────────── | (devmeetupbackend.vercel.app) |
+----------------------------------+ Bearer JWT Header +----------------------------------+
│
│ Mongoose ODM
▼
+----------------------------------+
| MongoDB Atlas |
| Cloud Database |
+----------------------------------+
📂 Project Structure
code
Text
DevMeetup/
├── backend/
│ ├── src/
│ │ ├── config/
│ │ │ └── database.js # MongoDB connection configuration
│ │ ├── model/
│ │ │ ├── connection.js # Mongoose schema for connection requests
│ │ │ └── user.js # Mongoose schema for developer profiles
│ │ ├── Router/
│ │ │ ├── Auth.js # Authentication routes
│ │ │ ├── Profile.js # User & profile management routes
│ │ │ └── Request.js # Connection request & network routes
│ │ └── utils/
│ │ ├── userAuth.js # JWT verification middleware
│ │ └── validation.js # Request validation utilities
│ ├── .env # Backend environment variables
│ ├── App.js # Express application entry point
│ ├── package.json
│ └── vercel.json # Vercel deployment configuration
│
└── frontend/
├── public/
│ ├── favicon.svg
│ └── icons.svg
├── src/
│ ├── assets/
│ │ ├── hero.png # Hero / preview graphic
│ │ ├── logo.png # Brand logo
│ │ ├── react.svg
│ │ └── vite.svg
│ ├── Components/
│ │ ├── Aside.jsx # Dashboard sidebar navigation
│ │ ├── DashboardLayout.jsx # Authenticated dashboard layout wrapper
│ │ ├── Header.jsx # Top navigation header
│ │ └── Layout.jsx # Root application layout
│ ├── Pages/
│ │ ├── HomePages/
│ │ │ ├── Connection.jsx # Accepted developer connections view
│ │ │ ├── Discover.jsx # Developer discovery feed view
│ │ │ ├── Profile.jsx # Profile view and update form
│ │ │ └── Request.jsx # Incoming & sent connection requests view
│ │ ├── Login.jsx # Developer login page
│ │ └── Signup.jsx # Developer signup page
│ ├── api.js # Axios instance & API helper configuration
│ ├── auth.js # JWT token & auth state management
│ ├── App.css # Component styles
│ ├── App.jsx # Route definitions
│ ├── index.css # Tailwind CSS & global styles
│ └── main.jsx # React root entry point
├── .env # Frontend environment variables
├── index.html
├── package.json
└── vite.config.js # Vite configuration
🧠 What I Learned
Designing and implementing a complete MERN stack application from database schema modeling to responsive UI components.
Managing stateless authentication using JWT (Authorization: Bearer <token>) and securing passwords with bcrypt.
Modelling relational user states in MongoDB & Mongoose for bi-directional connection requests (pending, accepted, rejected).
Structuring a clean frontend architecture with React 19, React Router DOM nested layouts (DashboardLayout.jsx), and centralized Axios API management (src/api.js).
Configuring cross-origin communication (CORS) and deploying decoupled frontend and backend services on Vercel.
🔮 Future Improvements
The following enhancements are planned for future iterations of DevMeetup:
💬 Real-Time Messaging: Direct chat between connected developers using WebSockets / Socket.io.
🔔 Real-Time Notifications: Instant in-app and email alerts for new connection requests and acceptances.
🎯 Skill-Based Recommendations: Smart matching algorithm to prioritize developers with complementary tech stacks.
✅ Profile Verification: GitHub OAuth integration and verified developer badges.
🔎 Advanced Search & Filtering: Filter developers by specific programming languages, experience level, or location.
🤝 Enhanced Networking Features: Project collaboration boards and group meetup channels.
👨‍💻 Author
Piyush Pal
🐙 GitHub: @PiyushPall
💼 LinkedIn: Connect on LinkedIn
🌐 Portfolio: View Portfolio
📄 License
This project is licensed under the MIT License.

<div align="center">
⭐ Support the Project
If you found DevMeetup helpful or interesting, please consider giving the repository a Star ⭐ on GitHub!
![Image](https://img.shields.io/badge/⭐_Star_on_GitHub-181717?style=for-the-badge&logo=github&logoColor=white)
</div>
