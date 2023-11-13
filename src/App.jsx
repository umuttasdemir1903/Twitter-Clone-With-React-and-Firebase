import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/authPage";
import FeedPage from "./pages/FeedPage";
import ProtectedRoute from "./pages/ProtectedRoute";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          
          {/* Korumalı Route */}
          <Route element={<ProtectedRoute />}>
            <Route path="/feed" element={<FeedPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
