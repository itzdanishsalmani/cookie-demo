import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Signin } from "./components/Signin"
import { Users } from "./components/Users"

function App() {
return (
  <div>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Signin /> } />
        <Route path="/users" element={ <Users /> } />
      </Routes>
    </BrowserRouter>

  </div>
)

}

export default App
