import { useAuthByToken } from "./hooks/useAuthByToken";
import { useEffect } from "react";
import { Routes } from "./routes/Routes";

import "./App.css";

export function App() {
  const { loading, fetchByToken } = useAuthByToken();

  useEffect(() => {
    fetchByToken();
  }, []);

  if (loading !== false) {
    return <div className="app-loading">loading...</div>;
  }

  return <Routes />;

}