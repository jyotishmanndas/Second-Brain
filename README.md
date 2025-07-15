# 🧠 Second Brain

Second Brain is a productivity web application that helps users capture and manage content from YouTube and Twitter. Users can store, tag, and revisit valuable content in a centralized dashboard, making it their personal second brain.

## ✨ Features

### 🖥️ Client Features

| Feature              | Description                                                                 |
|----------------------|-----------------------------------------------------------------------------|
| **Authentication**   | Signup, Signin, and Change Password with JWT-based secure access.           |
| **Content Management**| Add, view, edit, delete, and filter content by type (Tweets, Videos, etc.) |
| **Responsive UI**    | Mobile-first design using TailwindCSS.                                      |
| **Toast Notifications** | Feedback using `react-hot-toast`.                                         |
| **Dynamic Sidebar**  | Navigate between Dashboard, Videos, Tweets, and Profile.                    |
| **Content Sharing**  | Generate sharable links for your content.                                   |
| **Copy to Clipboard**| Easily copy links with visual feedback.                                     |
| **Edit Functionality** | Edit content with pre-filled form values.                                 |
| **No Content Page**  | Placeholder UI when no data is present.                                     |
| **Profile Page**     | View and update profile information and password.                           |
| **Shared Page**      | View shared content from others.                                            |
| **Tabs & Dialogs**   | Modern interface for easy interaction.                                      |
| **Form Validation**  | Frontend validation for robust user input.                                  |
| **Loading States**   | Feedback during async operations.                                           |
| **Error Handling**   | Friendly error messaging and fallback UI.                                   |
| **Mobile Navigation**| Optimized layout for mobile devices.                                        |

### 🔧 Server Features

| Feature              | Description                                                                 |
|----------------------|-----------------------------------------------------------------------------|
| **Authentication**   | JWT-based authentication.                                                   |
| **Content API**      | CRUD operations for content.                                                |
| **Validation**       | Input validation using [Zod](https://zod.dev).                              |
| **Database**         | MongoDB for content and user storage.                                       |
| **Error Handling**   | Consistent error messaging and logging.                                     |
| **Sharing API**      | Generate and toggle shareable content links.                                |
| **Change Password**  | Secure route for updating passwords.                                        |
| **CORS Support**     | Configurable cross-origin access for frontend.                              |

---

## 🗂️ Project Structure

### Client

```
frontend/
├── public/
├── src/
│   ├── components/   # UI components (Navbar, Sidebar, UI, forms, modal)
│   ├── lib/          # Utility functions
│   ├── hooks/          # Custom hooks
│   ├── pages/        # Page components (Dashboard, Tweets, Videos, Invite)

```

### Server

```
backend/
├── prisma/           # DB connection
├── src/
│   ├── controllers/   # Route controllers    
│   ├── middleware/    # JWT utilities
│   ├── routes/       # Express routes
│   ├── zod.ts          # validation
```

---
## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.x
- Docker
- npm

---

## 🐳 Setup Prisma with Docker

1. **Clone the Repository**
   ```bash
   git clone https://github.com/jyotishmanndas/Second-Brain.git
   cd Second-Brain
   
 ```
 docker run -d \
 --name second-brain \
  -p 5432:5432 \
  -e POSTGRES_PASSWORD= password \
  postgres
```
2. Create `.env` file in the backend directory:
```
DATABASE_URL="postgresql://postgres:password@5432/postgres"
JWT_SECRET="your_secret_key"
```

