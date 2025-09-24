# AttendEase

A full-stack web application for student management, attendance tracking, authentication, and feedback/complaints, built with React, Node.js, Express, and MongoDB.

## Features

- **User Authentication:** Signup, login, email verification, password reset.
- **Student Management:** Add, view, and filter students by grade/section.
- **Attendance Tracking:** Take attendance, view attendance records, and statistics.
- **Feedback & Complaints:** Users can submit feedback or complaints.
- **Email Notifications:** Automated emails for verification, password reset, feedback, and complaints.
- **Cloudinary Integration:** Upload and manage student profile pictures.
- **Protected Routes:** Secure API endpoints using JWT authentication.

## Tech Stack

- **Frontend:** React, Tailwind CSS, Axios, Vite
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Authentication:** JWT, Cookies
- **Email:** SMTP (Brevo/Mailtrap)
- **Image Uploads:** Cloudinary

## Getting Started

### Prerequisites

- Node.js & npm
- MongoDB Atlas account
- Cloudinary account (for image uploads)
- SMTP credentials (Brevo/Mailtrap)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/sih-project.git
   cd sih-project
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   ```
   - Create a `.env` file in `backend/` (see `.env.example` for reference).
   - Start the backend server:
     ```bash
     npm run dev
     ```

3. **Frontend Setup:**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

### Environment Variables

Set the following variables in your `backend/.env` file:

```
MONGODB_URI=your_mongodb_connection_string
PORT=5001
JWT_SECRET=your_jwt_secret
NODE_ENV=development
CLIENT_URL=http://localhost:5173

SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_pass
SENDER_EMAIL=your_sender_email

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_SECRET=your_cloudinary_secret
```

## Folder Structure

```
SIH Project/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── ...
│   ├── .env
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── lib/
│   │   └── ...
│   └── package.json
└── README.md
```

## Usage

- Visit `http://localhost:5173` in your browser.
- Register/login as a user.
- Add students, take attendance, and manage feedback/complaints.

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.
