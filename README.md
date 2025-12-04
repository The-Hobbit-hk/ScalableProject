# Scalable Web App with Authentication & Dashboard

A modern, full-stack web application built with Next.js and Express.js, featuring JWT-based authentication, a premium dark-themed UI with glassmorphism effects, and complete CRUD functionality.

![Next.js](https://img.shields.io/badge/Next.js-15.5.7-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.1-blue?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=flat-square&logo=node.js)
![Express](https://img.shields.io/badge/Express-5.2.1-lightgrey?style=flat-square&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green?style=flat-square&logo=mongodb)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1.17-38B2AC?style=flat-square&logo=tailwind-css)

## 🌟 Features

### Authentication & Security
- **JWT-based Authentication** - Secure token-based auth system
- **Password Hashing** - bcrypt encryption for user passwords
- **Protected Routes** - Middleware-based route protection
- **Session Management** - Persistent login with localStorage

### User Interface
- **Premium Dark Theme** - Modern glassmorphism design
- **Responsive Layout** - Mobile-first, works on all devices
- **Smooth Animations** - Micro-interactions and transitions
- **Gradient Accents** - Beautiful blue-to-purple gradients
- **Custom Scrollbars** - Styled scrollbars for better UX

### Core Functionality
- **User Registration & Login** - Complete auth flow
- **Profile Management** - Update name, email, and password
- **CRUD Operations** - Create, Read, Update, Delete items
- **Search & Filter** - Real-time search across items
- **Dashboard** - Centralized item management

## 🏗️ Project Structure

```
zonal-zenith/
├── client/                    # Next.js Frontend
│   ├── src/
│   │   ├── app/              # App Router pages
│   │   │   ├── dashboard/    # Dashboard page
│   │   │   ├── login/        # Login page
│   │   │   ├── signup/       # Signup page
│   │   │   ├── profile/      # Profile page
│   │   │   ├── layout.tsx    # Root layout
│   │   │   ├── page.tsx      # Landing page
│   │   │   └── globals.css   # Global styles
│   │   ├── components/       # React components
│   │   │   ├── Navbar.tsx    # Navigation bar
│   │   │   ├── ItemForm.tsx  # Item creation form
│   │   │   └── ItemList.tsx  # Item display grid
│   │   ├── context/          # React Context
│   │   │   └── AuthContext.tsx
│   │   ├── lib/              # Utilities
│   │   │   └── api.ts        # Axios instance
│   │   └── types/            # TypeScript types
│   │       └── index.ts
│   ├── postcss.config.js     # PostCSS config
│   ├── tailwind.config.js    # Tailwind config
│   ├── tsconfig.json         # TypeScript config
│   └── package.json
│
├── server/                    # Express Backend
│   ├── controllers/          # Route handlers
│   │   ├── authController.js
│   │   └── itemController.js
│   ├── middleware/           # Custom middleware
│   │   └── authMiddleware.js
│   ├── models/               # Mongoose models
│   │   ├── User.js
│   │   └── Item.js
│   ├── routes/               # API routes
│   │   ├── auth.js
│   │   └── items.js
│   ├── index.js              # Server entry point
│   ├── .env                  # Environment variables
│   └── package.json
│
├── .gitignore
└── README.md
```

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 15.5.7 (App Router)
- **UI Library**: React 19.2.1
- **Styling**: Tailwind CSS 4.1.17
- **HTTP Client**: Axios 1.13.2
- **Form Handling**: React Hook Form 7.68.0
- **Icons**: Lucide React 0.555.0
- **Language**: TypeScript 5.9.3

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express 5.2.1
- **Database**: MongoDB (Mongoose 8.20.1)
- **Authentication**: JSON Web Tokens (jsonwebtoken 9.0.2)
- **Password Hashing**: bcryptjs 3.0.3
- **Security**: Helmet 8.1.0, CORS 2.8.5
- **Environment**: dotenv 17.2.3
- **Dev Tool**: Nodemon 3.1.11

## 📦 Installation

### Prerequisites
- Node.js 18 or higher
- MongoDB (local or cloud instance)
- npm or yarn

### 1. Clone the Repository
```bash
git clone <repository-url>
cd zonal-zenith
```

### 2. Backend Setup
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/webapp
JWT_SECRET=your_super_secret_key_change_in_production
```

### 3. Frontend Setup
```bash
cd ../client
npm install
```

## 🎯 Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```
Backend will run on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```
Frontend will run on `http://localhost:3000`

### Production Mode

**Backend:**
```bash
cd server
npm start
```

**Frontend:**
```bash
cd client
npm run build
npm start
```

## 🔑 API Endpoints

### Authentication Routes
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/signup` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/me` | Get current user | Yes |
| PUT | `/api/auth/profile` | Update user profile | Yes |

### Item Routes
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/items` | Get all user items | Yes |
| POST | `/api/items` | Create new item | Yes |
| PUT | `/api/items/:id` | Update item | Yes |
| DELETE | `/api/items/:id` | Delete item | Yes |

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3B82F6) to Purple (#9333EA) gradient
- **Background**: Dark slate (#0F172A)
- **Foreground**: Light slate (#F8FAFC)
- **Accents**: Blue-400, Purple-500, Pink-400

### Components
- **Glassmorphism Cards**: `backdrop-blur-12px` with semi-transparent backgrounds
- **Gradient Buttons**: Blue-to-purple gradients with hover effects
- **Input Fields**: Dark slate with blue focus rings
- **Icons**: Lucide React icon set

## 🔒 Security Features

1. **Password Encryption**: All passwords are hashed using bcrypt with salt rounds
2. **JWT Tokens**: Secure token-based authentication with 30-day expiry
3. **Protected Routes**: Middleware validates tokens on protected endpoints
4. **CORS Protection**: Configured CORS headers
5. **Helmet.js**: Security headers for Express app
6. **Input Validation**: Server-side validation for all inputs

## 📱 Pages & Features

### Landing Page (`/`)
- Hero section with gradient text
- Feature highlights
- Call-to-action buttons

### Login Page (`/login`)
- Email and password fields
- Form validation
- Error handling
- Link to signup

### Signup Page (`/signup`)
- Name, email, and password fields
- Password strength validation
- Auto-login after registration

### Dashboard (`/dashboard`)
- Search bar for filtering items
- Item creation form
- Grid display of items
- Edit and delete actions
- Item count badge

### Profile Page (`/profile`)
- View current user info
- Update name and email
- Change password
- Success/error notifications

## 🧪 Testing the Application

### Manual Testing Flow

1. **Registration**:
   - Navigate to `/signup`
   - Create a new account
   - Verify auto-redirect to dashboard

2. **Login**:
   - Logout and go to `/login`
   - Login with credentials
   - Verify token storage

3. **CRUD Operations**:
   - Create a new item
   - Edit the item
   - Search for items
   - Delete the item

4. **Profile Update**:
   - Go to `/profile`
   - Update user information
   - Verify changes persist

## 🚀 Scaling Considerations

### Frontend Scaling
- **Code Splitting**: Next.js automatic code splitting
- **Image Optimization**: Next.js Image component
- **Static Generation**: Use ISR for static pages
- **CDN Deployment**: Deploy to Vercel/Netlify
- **State Management**: Consider Redux for complex state

### Backend Scaling
- **Database Indexing**: Add indexes on frequently queried fields
- **Caching**: Implement Redis for session/data caching
- **Load Balancing**: Use PM2 or Nginx for multiple instances
- **Database Sharding**: Horizontal scaling for MongoDB
- **Microservices**: Split into auth, items, and user services
- **API Rate Limiting**: Implement rate limiting middleware

### Infrastructure
- **Containerization**: Docker for consistent deployments
- **Orchestration**: Kubernetes for container management
- **Monitoring**: Add logging (Winston) and monitoring (Prometheus)
- **CI/CD**: GitHub Actions for automated testing and deployment

## 📄 Environment Variables

### Server (.env)
```env
PORT=5000                                    # Server port
MONGO_URI=mongodb://localhost:27017/webapp  # MongoDB connection string
JWT_SECRET=your_secret_key                  # JWT signing secret
```

### Client (Optional)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000   # Backend API URL
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod`
- Check connection string in `.env`
- Verify network access if using MongoDB Atlas

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

### Tailwind Styles Not Applying
- Clear `.next` folder: `rm -rf client/.next`
- Restart dev server
- Check `postcss.config.js` configuration

## 📝 License

This project is open source and available under the MIT License.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or support, please open an issue in the repository.

---

**Built with ❤️ using Next.js, Express, and MongoDB**
