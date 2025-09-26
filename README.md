# 🏥 Doctor Appointment System

## Overview

The Doctor Appointment System is a full-stack web application designed to streamline the healthcare appointment booking process. It provides a seamless experience for patients to find doctors, book appointments, and get instant healthcare assistance through an AI-powered chatbot. The system supports multiple user roles including patients, doctors, and administrators, each with their own specialized dashboard and functionality.

**Live Demo**: [https://doc-appoinment-system.vercel.app](https://doc-appoinment-system.vercel.app)

### Key Highlights
- **Real-time appointment booking** with conflict detection
- **AI-powered healthcare assistant** (MediBot) using Google Gemini
- **Multi-role authentication** (Patient, Doctor, Admin)
- **Responsive design** with modern UI/UX
- **Secure data handling** with JWT authentication
- **Notification system** for appointment updates

## Core Features

### User Management
- **Patient Registration & Authentication**
  - Secure user registration with email verification
  - JWT-based authentication
  - Password reset functionality
  - User profile management

- **Doctor Registration & Verification**
  - Doctor application system
  - Admin approval workflow
  - Doctor profile management with specialization
  - Experience and fee management

- **Admin Dashboard**
  - User management (patients and doctors)
  - Doctor approval system
  - System analytics and monitoring

### Appointment Management
- **Smart Booking System**
  - Real-time availability checking
  - 1-hour buffer conflict detection
  - Multiple time slot management
  - Appointment status tracking (Pending, Approved, Rejected)

- **Appointment History**
  - Complete appointment history for users
  - Status updates and notifications
  - Rescheduling capabilities

### AI Healthcare Assistant (MediBot)
- **Intelligent Chatbot**
  - Powered by Google Gemini AI
  - Healthcare information assistance
  - Appointment scheduling help
  - General medical guidance
  - Conversation history management

- **Smart Features**
  - Context-aware responses
  - Professional medical disclaimers
  - Fallback error handling
  - Multi-conversation support

### Notification System
- **Real-time Notifications**
  - Appointment confirmations
  - Status updates
  - System announcements
  - Email notifications

### User Interface
- **Modern Design**
  - Responsive layout for all devices
  - Intuitive navigation
  - Professional healthcare theme
  - Accessibility features

## Project Structure

```
Doc_Appointment_System/
├── client/                    # Frontend (React.js)
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── Admin/         # Admin-specific components
│   │   │   ├── Doctor/        # Doctor-specific components
│   │   │   ├── ApplyDoctor.jsx   # Doctor application form
│   │   │   ├── AppointmentPage.jsx # Appointment management
│   │   │   ├── BookingPage.jsx   # Appointment booking
│   │   │   ├── Chatbot.jsx       # AI chatbot interface
│   │   │   ├── HomePage.jsx      # Landing page
│   │   │   ├── Login.jsx         # Authentication
│   │   │   └── Register.jsx      # User registration
│   │   ├── store/             # Redux state management
│   │   ├── utilities/         # Helper functions
│   │   └── photos/            # Static assets
│   ├── package.json              # Frontend dependencies
│   └── vite.config.js           # Vite configuration
│
├── config/                    # Configuration files
│   └── database.js              # MongoDB connection
│
├── controllers/               # Backend controllers
│   ├── admin.controller.js      # Admin operations
│   ├── chatbot.controller.js    # AI chatbot logic
│   ├── doctor.controller.js     # Doctor operations
│   ├── user.controller.js       # User operations
│   └── forgotpassword.controller.js # Password reset
│
├── middleware/                # Custom middleware
│   └── authmiddleware.js        # JWT authentication
│
├── models/                    # Database models
│   ├── appointment.model.js     # Appointment schema
│   ├── conversation.model.js    # Chat conversations
│   ├── doctor.model.js          # Doctor schema
│   ├── message.model.js         # Chat messages
│   └── user.model.js            # User schema
│
├── routes/                    # API routes
│   ├── admin.routes.js          # Admin endpoints
│   ├── chatbot.routes.js        # Chatbot endpoints
│   ├── doctor.routes.js         # Doctor endpoints
│   └── user.routes.js           # User endpoints
│
├── utility/                   # Utility functions
│   ├── ApiError.js              # Error handling
│   ├── ApiResponse.js           # Response formatting
│   └── AsyncHandler.js          # Async error handling
│
├── server.js                    # Main server file
├── package.json                 # Backend dependencies
└── README.md                    # Project documentation
```

### Component Architecture

#### Frontend Components
- **Layout Components**: Header, Footer, MainLayout
- **Authentication**: Login, Register, ProtectedRoute
- **User Management**: User profiles, Admin dashboard
- **Appointment System**: Booking, Management, History
- **AI Chatbot**: Real-time chat interface with conversation history

#### Backend Services
- **Authentication Service**: JWT-based user authentication
- **Appointment Service**: Booking logic with conflict detection
- **AI Service**: Google Gemini integration for chatbot
- **Notification Service**: Real-time updates and email notifications
- **Admin Service**: User and doctor management

#### AI Service Integration
- **Google Gemini AI**: Natural language processing
- **Conversation Management**: Persistent chat history
- **Context Awareness**: Multi-turn conversation support
- **Error Handling**: Graceful fallback responses

## Technologies Used

### Frontend Technologies
- **React.js 18.2.0** - Modern UI library
- **Vite** - Fast build tool and development server
- **Redux Toolkit** - State management
- **React Router DOM** - Client-side routing
- **Ant Design (antd)** - UI component library
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **React Markdown** - Markdown rendering for chatbot
- **Moment.js** - Date and time manipulation

### Backend Technologies
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT (jsonwebtoken)** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **Morgan** - HTTP request logger
- **Nodemailer** - Email service
- **dotenv** - Environment variable management

### AI Service Technologies
- **Google Generative AI** - AI model integration
- **Gemini 1.5 Flash** - Large language model
- **Conversation Management** - Persistent chat storage
- **Context Preservation** - Multi-turn conversation support

### Development Tools
- **Concurrently** - Run multiple npm scripts
- **Nodemon** - Development server auto-restart
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## Setup Instructions

### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **Google Gemini API Key** (for AI chatbot functionality)
- **Email Service** (for notifications - optional)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Doc_Appointment_System
```

### 2. Backend Setup

#### Install Dependencies
```bash
npm install
```

#### Environment Configuration
Create a `.env` file in the root directory:
```env
# Database
MONGODB_URL=mongodb://localhost:27017/doc_appointment_system

# JWT
JWT_SECRET=your_jwt_secret_key_here

# AI Service
GEMINI_API_KEY=your_google_gemini_api_key_here

# Email Service (Optional)
EMAIL_USERNAME=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

#### Start Backend Server
```bash
# Development mode
npm run server

# Production mode
npm start
```

The backend server will run on `http://localhost:5000`

### 3. Frontend Setup

#### Navigate to Client Directory
```bash
cd client
```

#### Install Dependencies
```bash
npm install
```

#### Start Frontend Development Server
```bash
npm start
```

The frontend will run on `http://localhost:5173`

### 4. AI Service Setup

#### Get Google Gemini API Key
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add the key to your `.env` file as `GEMINI_API_KEY`

#### Verify AI Service
- The AI chatbot will automatically work once the API key is configured
- Test the chatbot functionality in the application

### 5. Database Setup

#### Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Update `MONGODB_URL` in `.env` file

#### MongoDB Atlas (Cloud)
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get connection string
4. Update `MONGODB_URL` in `.env` file

### 6. Complete Setup Verification

#### Run Full Application
```bash
# From root directory
npm run dev
```

This will start both backend and frontend simultaneously.

#### Test the Application
1. Open `http://localhost:5173`
2. Register a new user account
3. Test appointment booking
4. Try the AI chatbot functionality
5. Verify all features are working

### 7. Production Deployment

#### Build Frontend
```bash
cd client
npm run build
```

#### Environment Variables for Production
```env
NODE_ENV=production
MONGODB_URL=your_production_mongodb_url
JWT_SECRET=your_production_jwt_secret
GEMINI_API_KEY=your_production_gemini_key
```

## Additional Configuration

### Email Service Setup (Optional)
1. Configure Gmail App Password
2. Update email credentials in `.env`
3. Test email notifications

### Custom Styling
- Modify `client/src/index.css` for global styles
- Update `client/tailwind.config.js` for Tailwind customization
- Customize Ant Design theme in components

### API Endpoints
- **Authentication**: `/api/v1/user/*`
- **Doctor Management**: `/api/v1/doctor/*`
- **Admin Operations**: `/api/v1/admin/*`
- **AI Chatbot**: `/api/v1/chatbot/*`

## API Documentation

### Authentication Endpoints
- `POST /api/v1/user/register` - User registration
- `POST /api/v1/user/login` - User login
- `POST /api/v1/user/forgot-password` - Password reset

### Appointment Endpoints
- `POST /api/v1/user/book-appointment` - Book appointment
- `GET /api/v1/user/user-appointments` - Get user appointments
- `POST /api/v1/doctor/update-status` - Update appointment status

### AI Chatbot Endpoints
- `GET /api/v1/chatbot/conversations` - Get user conversations
- `POST /api/v1/chatbot/conversations` - Create new conversation
- `POST /api/v1/chatbot/messages` - Send message to chatbot

## Contributing

- Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.
