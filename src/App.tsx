import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorPage, Home } from "./pages";
import Sidebar from "./components/Sidebar/Sidebar";
const App = () => {
  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
};

export default App;
