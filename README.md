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

second-brain/
├── frontend/ # React Client (Vite-based)
│ ├── public/
│ └── src/
│ ├── components/ # UI components (Navbar, Sidebar, Forms, etc.)
│ ├── lib/ # Utility functions
│ ├── hooks/ # Custom React hooks
│ ├── pages/ # Page components (Dashboard, Tweets, Videos, etc.)
│
├── backend/ # Node.js Server (Express)
│ ├── prisma/ # Prisma DB Client Setup
│ └── src/
│ ├── controllers/ # Route logic and controller functions
│ ├── middleware/ # JWT utilities, authentication checks
│ ├── routes/ # Express route definitions
│ ├── zod/ # Zod validation schemas

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
   
   docker run -d \
  --name second-brain \
  -p 5432:5432 \
  -e POSTGRES_PASSWORD= password \
  postgres

