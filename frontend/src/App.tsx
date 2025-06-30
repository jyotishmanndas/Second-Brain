import { BrowserRouter, Route, Routes } from "react-router-dom"
import { SignInPage } from "./pages/signinPage"
import { SignUpPage } from "./pages/signupPage"


function App() {

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignInPage />}></Route>
          <Route path="/signup" element={<SignUpPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )

}

export default App
