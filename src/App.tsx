import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorPage, Home, Signup, Login } from "./pages";
import Sidebar from "./components/Sidebar/Sidebar";
const App = () => {
  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
};

export default App;
