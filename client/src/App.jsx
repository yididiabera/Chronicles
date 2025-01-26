import React from "react";
import AppRouter from "./routes/AppRouter";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <div>
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
    </div>
  );
};

export default App;
