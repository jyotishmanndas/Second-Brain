import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Layout } from "./components/Layout"
import { SignInPage } from "./pages/SigninPage"
import { SignUpPage } from "./pages/SignupPage"
import { Dashboard } from "./pages/Dashboard"
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
      </Routes>
    </BrowserRouter>
  )
}

export default App
