# StudySutra

A full-stack e-learning platform inspired. StudySutra allows students to enroll in courses, track progress, and make payments for premium content, while instructors can create and manage courses, upload videos, and interact with students. The platform features secure authentication, responsive design, and integrates third-party services for payments and media storage.

---

## 🌐 Working Video
[Watch the demo video here](https://github.com/user-attachments/assets/dc3c4b8d-b8bf-49a4-9c05-b92f9063f72f) 

---

## 🚀 Features
- User authentication (JWT, email verification, password reset)
- Role-based dashboards (student/instructor)
- Course management (create, edit, publish, upload videos)
- Enrollment and payment (Razorpay integration)
- Progress tracking
- Profile management (Cloudinary for images)
- Responsive UI (React + Tailwind CSS)
- Email notifications (Nodemailer)

---

## 🛠️ Tech Stack
- **Frontend:** React.js, Redux, React Router, Tailwind CSS, React Icons
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Integrations:** Cloudinary (image upload), Razorpay (payments), Nodemailer (emails), JWT (authentication)
- **Other:** ESLint/Prettier, Git, npm


---

## 🖥️ Project Setup & Installation

### Prerequisites
- Node.js (v14+ recommended)
- npm (v6+)
- MongoDB (local or Atlas)

### 1. Clone the repository
```bash
git clone <repo-url>
cd StudySutra
```

### 2. Backend Setup
```bash
cd backend
npm install
```

#### Create a `.env` file in `backend/` with the following variables:
```
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_password_or_app_password
CLIENT_URL=http://localhost:3000
```

#### Start the backend server:
```bash
npm start
```

### 3. Frontend Setup
```bash
cd ../client
npm install
```

### Install all required frontend dependencies:
```bash
npm install react react-dom react-router-dom redux react-redux @reduxjs/toolkit axios
npm install tailwindcss postcss autoprefixer classnames @headlessui/react @heroicons/react react-hook-form yup react-icons 
npm install chart.js react-chartjs-2 @ramonak/react-progress-bar react-hot-toast jwt-decode
```

#### Start the frontend server:
```bash
npm start
```

The frontend will run on [http://localhost:3000](http://localhost:3000)

---

## ⚙️ Environment Variables
- All sensitive keys and secrets should be stored in `.env` files (not committed to version control).
- See the backend setup section for required variables.

---

## 🧑‍💻 Contribution Guidelines
1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request


---

## 🙏 Acknowledgements
- Inspired by Udemy, Coursera, and the open-source community.
- Built with using MERN stack
