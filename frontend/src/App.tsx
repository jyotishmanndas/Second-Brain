import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Layout } from "./components/Layout"
import { SignInPage } from "./pages/SigninPage"
import { SignUpPage } from "./pages/SignupPage"
import { Dashboard } from "./pages/Dashboard"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
