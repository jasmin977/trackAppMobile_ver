import React from "react";

import AuthProvider from "./context/AuthContext";
import SocketProvider from "./context/socketProvider";

import AppNav from "./navigation/AppNav";

export default function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <AppNav />
      </SocketProvider>
    </AuthProvider>
  );
}
