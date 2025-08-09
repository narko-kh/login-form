import React from "react";
import { useDarkMode } from "../Contexts/darkModeContext";
import { PiSunDuotone } from "react-icons/pi";
import { PiMoonDuotone } from "react-icons/pi";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";

export default function Auth() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const {t, i18n} = useTranslation()

  const handleChangeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
  document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
  document.documentElement.lang = lang;
  };
  
console.log(i18n);

  return (
    <div className={`flex min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className="min-h-screen size-full bg-light-bg dark:bg-dark-bg flex items-center flex-col flex-1 lg:col-span-2">
        <header className="py-6 px-6 w-full">
          <nav className="flex items-center justify-between">
            <div className="flex items-center justify-center gap-2">
              <div
                onClick={() =>
                  i18n.language === "en"
                    ? handleChangeLanguage("fa")
                    : handleChangeLanguage("en")
                }
                className="cursor-pointer flex items-center justify-center size-10 p-2 rounded-full transition-colors duration-150 hover:bg-black/10"
              >
                <img
                  src={
                    i18n.language === "en"
                      ? "https://new-app.fortunamarkets.com/img/countries/IR.png"
                      : "https://new-app.fortunamarkets.com/img/countries/US.png"
                  }
                  alt={
                    i18n.language === "en"
                      ? "Iran"
                      : "Usa"
                  }
                  className="size-full rounded-full bg-black"
                />
              </div>
              {darkMode ? (
                <PiSunDuotone
                  className="size-7 cursor-pointer text-[#D4D4D4]"
                  onClick={toggleDarkMode}
                />
              ) : (
                <PiMoonDuotone
                  className="size-7 cursor-pointer"
                  onClick={toggleDarkMode}
                />
              )}
            </div>
            <img alt="Logo" width="100" className="absolute ltr:right-4 rtl:left-4 top-6 lg:hidden block" src="https://new-app.fortunamarkets.com/img/logo/logo-dark-full.png" />
          </nav>
        </header>
        <main className="min-h-[calc(100vh_-_88px)] p-8 size-full flex items-center justify-center"><Outlet /></main>
      </div>
      <div className="hidden w-full h-screen bg-light-bg dark:bg-dark-bg lg:flex flex-col flex-1 justify-between items-end relative xl:max-w-[520px] 2xl:max-w-[720px]">
        <video className="hidden size-full object-cover rounded-3xl dark:inline" src="https://new-app.fortunamarkets.com/videos/auth-side-bg-dark.mp4" autoPlay loop playsInline preload="auto"></video>
        <video className="dark:hidden size-full object-cover rounded-3xl " src="https://new-app.fortunamarkets.com/videos/auth-side-bg-light.mp4" autoPlay loop playsInline preload="auto"></video>
      </div>
    </div>
  );
}
