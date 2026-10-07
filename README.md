# DevMeetup Frontend

React + Vite + Tailwind frontend connected to the existing DevMeetup Express backend.

## Run

1. Start the backend on port 3000.
2. Copy `.env.example` to `.env` if you want to change the API URL.
3. Run:

```bash
npm install
npm run dev
```

Default API URL: `http://localhost:3000`

## Backend endpoints used

- POST `/user/signup`
- POST `/user/login`
- GET `/user/users`
- GET `/user/profile`
- GET `/user/user/:id`
- PATCH `/user/updateProfile`
- PATCH `/user/user/:id` (backend-supported; public profile flow uses GET and own editing uses updateProfile)
- DELETE `/user/user/:id`
- POST `/user/sendRequest/:toUserId`
- PATCH `/user/acceptRequest/:id/:status`
- GET `/user/view/allRequest`
- GET `/user/view/request/:id`

The frontend does not modify the backend. Authenticated requests automatically send the stored JWT as `Authorization: Bearer <token>`.
