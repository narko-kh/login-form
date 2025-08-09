import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { PiCheckBold } from "react-icons/pi";
import { CiRead } from "react-icons/ci";
import { CiUnread } from "react-icons/ci";
import { useForm } from "react-hook-form";
import i18n from "i18next";
import Button from "./Button";
import InputField from "./InputField";
import { useTranslation } from "react-i18next";

export default function SignIn() {
  const [loginWay, setLoginWay] = useState("email");
  const [isPasswordReadable, setIsPasswordReadable] = useState(false);
  const [isCountrySelectorOpen, setIsCountrySelectorOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const dropdownRef = useRef(null);
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    trigger,
  } = useForm({
    defaultValues: {
      email: "",
      phoneNumber: "",
      phoneNumberCode: "+1",
      password: "",
    },
  });

  const countryOptions = [
    {
      code: "+1",
      country: "USA",
      flag: "https://new-app.fortunamarkets.com/img/countries/US.png",
    },
    {
      code: "+98",
      country: "IRAN",
      flag: "https://new-app.fortunamarkets.com/img/countries/IR.png",
    },
  ];

  const filteredCountries = countryOptions.filter(
    (option) =>
      option.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      option.code.includes(searchTerm)
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsCountrySelectorOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      setValue("phoneNumberCode", selectedCountry.code);
    }
  }, [selectedCountry, setValue]);

  const onSubmit = async (data) => {
    console.log(data);
    
    try {
      const requestBody = {
        password: data.password,
      };

      if (loginWay === "email") {
        requestBody.email = data.email;
      } else {
        requestBody.phoneNumber = `${data.phoneNumberCode}${data.phoneNumber}`;
      }

      const response = await fetch(
        "https://api-dev.fortunamarkets.org/portal/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      const result = await response.json();
      console.log("Login Response:", result);

      if (response.ok) {
        localStorage.setItem("authToken", result.token);
      } else {
        console.error("Login Failed:", result.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (selectedCountry) {
      setValue("phoneNumberCode", selectedCountry.code);
    }
  }, [selectedCountry, setValue]);

  return (
    <section className="w-full flex items-center justify-center flex-col max-w-[380px] lg:max-w-[450px] -mt-[88px]">
      <div className="flex items-center justify-center flex-col gap-3 leading-normal font-bold text-primary-text-light dark:text-primary-text-dark mb-10">
        <h1 className="text-3xl">{t("signIn.signIn")}</h1>
        <p className="text-sm">{t("signIn.subTitle")}</p>
      </div>
      <div
        style={{
          direction: "ltr",
        }}
        className="w-full relative grid grid-cols-2 mb-6"
      >
        <div
          className={`absolute bottom-0 h-[1px] bg-primary transition-all duration-300 ${
            loginWay === "email" ? "left-0 w-1/2" : "left-1/2 w-1/2"
          }`}
        ></div>
        <button
          type="button"
          onClick={() => {
            setLoginWay("email");
            trigger("email");
          }}
          className={`w-full flex items-center justify-center py-2 text-sm transition-colors duration-300 ${
            loginWay === "email"
              ? "text-primary"
              : "text-dark-gray hover:text-primary-text-light"
          }`}
        >
          {t("signIn.email")}
        </button>
        <button
          type="button"
          onClick={() => {
            setLoginWay("phone");
            trigger(["phoneNumberCode", "phoneNumber"]);
          }}
          className={`w-full flex items-center justify-center py-2 text-sm transition-colors duration-300 ${
            loginWay === "phone"
              ? "text-primary"
              : "text-dark-gray hover:text-primary-text-light"
          }`}
        >
          {t("signIn.phone")}
        </button>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-8"
      >
        {/* Email Field */}
        <InputField
          className={`${
            loginWay === "email"
              ? "opacity-100 visible flex"
              : "opacity-0 invisible hidden"
          }`}
          label={t("signIn.email")}
          title={"email"}
          type={"email"}
          errors={errors}
          register={register}
          placeholder={t("signIn.email")}
          pattern={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}
          patternMessage={t("signIn.invalidEmail")}
          required={loginWay === "email"}
          onChange={(e) => {
            setValue("email", e.target.value);
            trigger("email");
          }}
        />

        {/* Phone Number */}
        <div
          className={`w-full grid-cols-2 gap-2 transition-all duration-150 lg:grid-cols-3 ${
            loginWay === "phone"
              ? "opacity-100 visible grid"
              : "opacity-0 invisible hidden"
          }`}
        >
          <div className={`w-full flex flex-col gap-2`}>
            <label
              htmlFor="phoneNumberCode"
              className="block text-sm font-bold text-dark-gray dark:text-light-gray"
            >
              {t("signIn.phoneNumber")}
            </label>
            <div
              onClick={() => setIsCountrySelectorOpen((prev) => !prev)}
              className={`px-3 py-2 gap-3 cursor-pointer relative flex items-center text-primary-text-light dark:text-primary-text-dark text-sm font-bold transition-all duration-150 h-12 border-[3px] outline-none rounded-xl w-full ${
                errors.phoneNumberCode
                  ? isCountrySelectorOpen
                    ? "!border-primary-red placeholder:!text-primary-red !bg-primary-red/10 dark:!bg-primary-red/15"
                    : "!border-primary-red/[.1%] dark:!border-secondary-dark placeholder:!text-primary-red !bg-primary-red/10 dark:!bg-primary-red/15"
                  : isCountrySelectorOpen
                  ? "border-primary bg-white dark:bg-dark-bg"
                  : "border-secondary-light dark:border-secondary-dark bg-secondary-light dark:bg-secondary-dark"
              }`}
              ref={dropdownRef}
            >
              {selectedCountry?.flag && (
                <img
                  src={selectedCountry.flag}
                  alt={selectedCountry.country}
                  className="rounded-full size-5"
                />
              )}
              <input
                type="text"
                id="phoneNumberCode"
                className={`size-full outline-none !bg-primary-red/[.1%] dark:!bg-primary-red/[.5%] ${
                  errors.phoneNumberCode
                    ? "placeholder:text-primary-red"
                    : "placeholder:text-light-gray dark:placeholder:text-secondary-text"
                } placeholder:text-sm placeholder:font-bold`}
                placeholder="+1"
                {...register("phoneNumberCode", {
                  required:
                    loginWay === "phone"
                      ? `${t("signIn.countryCode")} ${t(
                          "signIn.requiredMessage"
                        )}`
                      : false,
                })}
                value={selectedCountry ? selectedCountry.code : searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                // readOnly
              />
              <i className="text-dark-gray dark:text-light-gray">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                  height="24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </i>
              {filteredCountries.length > 0 && (
                <ul
                  className={`transition-colors duration-150 w-full flex flex-col justify-center gap-1 p-2 overflow-y-auto absolute z-10 left-0 max-h-80 rounded-xl border-[3px] bg-white border-secondary-light dark:border-secondary-dark dark:bg-black shadow-lg ${
                    isCountrySelectorOpen
                      ? "top-[52px] opacity-100 visible"
                      : "-top-[50px] opacity-0 invisible"
                  }`}
                >
                  {filteredCountries.map((country, index) => (
                    <li
                      onClick={() => {
                        setSelectedCountry(country);
                        setSearchTerm("");
                        setValue("phoneNumberCode", country.code);
                      }}
                      key={index}
                      className={`flex items-center justify-between gap-1 rounded-md p-2 transition-colors duration-150 ${
                        country.country === selectedCountry?.country
                          ? "bg-primary/10 text-primary"
                          : "text-dark-gray hover:text-primary-text-light"
                      }`}
                    >
                      <div className="flex items-center gap-1">
                        <img
                          src={country.flag}
                          alt={country.country}
                          className="rounded-full size-5"
                        />
                        <span>{country.code}</span>
                      </div>
                      {country.country === selectedCountry?.country && (
                        <PiCheckBold className="size-[18px] text-primary" />
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <InputField
            className={`self-end lg:col-span-2`}
            title={"phoneNumber"}
            type={"tel"}
            errors={errors}
            register={register}
            placeholder={t("signIn.phoneNumber")}
            pattern={/^[0-9]+$/}
            patternMessage={`${t("signIn.phoneNumber")} ${t(
              "signIn.hasOnlyDigits"
            )}`}
            minLength={5}
            required={loginWay === "phone"}
            onChange={(e) => {
              setValue("phoneNumber", e.target.value);
              trigger("phoneNumber");
            }}
          />
        </div>

        {/* Password */}
        <InputField
          label={t("signIn.password")}
          title={"password"}
          type={"password"}
          errors={errors}
          register={register}
          placeholder={t("signIn.password")}
          minLength={2}
          required
          onChange={(e) => {
            setValue("password", e.target.value);
            trigger("password");
          }}
        />
        <a
          href="#"
          className="text-sm text-primary hover:underline -mb-4 w-max"
        >
          {t("signIn.forgotPassword")}
        </a>
        <Button type="submit">
          {t("signIn.button")}{" "}
          {loginWay === "email" ? t("signIn.email") : t("signIn.phone")}
        </Button>
      </form>
      <p className="text-sm font-light text-dark-gray dark:text-light-gray">
        {t("signIn.linkCaption")}{" "}
        <Link
          to="/auth/sign-up"
          className="font-bold text-primary-text-light hover:underline dark:text-primary-text-dark"
        >
          {t("signIn.signUp")}
        </Link>
      </p>
    </section>
  );
}
