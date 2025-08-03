# Second-Brain

A modern web application for personal knowledge management and content organization. Second-Brain allows users to save, categorize, and manage digital content with an intuitive interface and robust backend system.

## 🚀 Features

- **User Authentication**: Secure signup/signin with JWT tokens
- **Content Management**: Save and organize links, articles, and resources
- **Tagging System**: Categorize content with custom tags
- **Invite System**: Share access with others using invite codes
- **Modern UI**: Beautiful, responsive interface built with React and Tailwind CSS
- **Real-time Updates**: Instant content synchronization
- **Profile Management**: Update user information and preferences

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Hook Form** - Form handling with validation
- **Zod** - Schema validation
- **Axios** - HTTP client
- **Shadcn UI** - Accessible UI components
- **Lucide React** - Beautiful icons

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **TypeScript** - Type-safe development
- **Prisma** - Database ORM
- **PostgreSQL** - Relational database
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Zod** - Schema validation

## 📁 Project Structure

```
Second-Brain/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utility functions
│   └── package.json
├── backend/                 # Node.js backend API
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   └── lib/            # Database and utilities
│   ├── prisma/             # Database schema and migrations
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Second-Brain
   ```

2. **Set up the backend**
   ```bash
   cd backend
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the backend directory:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/secondbrain"
   JWT_SECRET="your-secret-key-here"
   PORT=3001
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start the backend server**
   ```bash
   npm run dev
   ```

6. **Set up the frontend**
   ```bash
   cd ../frontend
   npm install
   ```

7. **Start the frontend development server**
   ```bash
   npm run dev
   ```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

## 📖 Usage

### Authentication
1. Navigate to `/signup` to create a new account
2. Use the invite code provided by an existing user
3. Sign in at `/signin` with your credentials

### Managing Content
1. **Add Content**: Use the "Add Content" button to save new links or resources
2. **Organize**: Add tags to categorize your content
3. **Search**: Filter content by tags or search terms
4. **Edit/Delete**: Manage your saved content through the interface

### Inviting Others
1. Generate invite codes in your profile
2. Share the invite link with others
3. New users can sign up using your invite code

## 🔧 Development

### Backend Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npx prisma studio` - Open database GUI

### Frontend Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Database Management
```bash
# Generate Prisma client
npx prisma generate

# Push schema changes to database
npx prisma db push

# Create a new migration
npx prisma migrate dev --name migration_name

# Reset database
npx prisma migrate reset
```

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- CORS protection
- Input validation with Zod
- Secure cookie handling

## 📝 License

This project is licensed under the ISC License.

## 🆘 Support

If you encounter any issues or have questions, please:
1. Check the existing issues
2. Create a new issue with detailed information
3. Include steps to reproduce the problem

---

Built with ❤️ using modern web technologies 