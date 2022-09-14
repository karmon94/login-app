import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import UserContextProvider from "./app/UserContextProvider";
import Layout from "./components/layout/Layout";
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
                <Layout>
                  <Home />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route path="login" element={<Login />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </UserContextProvider>
    </div>
  );
}

export default App;
