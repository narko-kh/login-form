import { useState } from "react";
import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import { DarkModeProvider } from "./Contexts/darkModeContext";
import Auth from "./Pages/Auth";
import { useTranslation } from "react-i18next";



function App() {
  const {t, i18n} = useTranslation()
  console.log(i18n);

  return (
    <DarkModeProvider>
      <Routes>
        <Route
          path="/"
          element={
            <Link to="/register" className="text-3xl">
              {t("test")}
            </Link>
          }
        />
        <Route path="/auth" element={<Auth />}>
          <Route path="sign-up" element={<SignUp />} />
          <Route path="sign-in" element={<SignIn />} />
        </Route>
      </Routes>
    </DarkModeProvider>
  );
}

export default App;
