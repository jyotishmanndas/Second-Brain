import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Layout } from "./components/Layout"
import { SignInPage } from "./pages/Signin-Page"
import { SignUpPage } from "./pages/Signup-Page"
import { Dashboard } from "./pages/Dashboard-Page"
import { InvitePage } from "./pages/Invite-Page"
import { Youtube } from "./pages/youtube"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard />}></Route>
          <Route path="youtube" element={<Youtube />}></Route>
        </Route>

        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/invite/:id" element={<InvitePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
