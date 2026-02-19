import Signup from "./signup"
// import Home from "./Home"
import Navbar from "./Navbar"
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <div>
      <BrowserRouter basename="/">
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<Navbar />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;