import { Route, Routes } from "react-router-dom";
import "./App.css";
import UserContextProvider from "./app/UserContextProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";

function App() {
  return (
    <div className="app-container">
      <UserContextProvider>
        <Routes>
          <Route
            path="home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route path="login" element={<Login />} />
        </Routes>
      </UserContextProvider>
    </div>
  );
}

export default App;
