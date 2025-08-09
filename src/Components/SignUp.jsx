import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { PiCheckBold } from "react-icons/pi";
import { CiRead } from "react-icons/ci";
import { CiUnread } from "react-icons/ci";
import { useForm } from "react-hook-form";
import i18n from "i18next";
import InputField from "./InputField";
import Button from "./Button";
import { useTranslation } from "react-i18next";

export default function SignUn() {
  const [isCountrySelectorOpen, setIsCountrySelectorOpen] = useState(false);
  const [isPhoneNumberCodeSelectorOpen, setIsPhoneNumberCodeSelectorOpen] =
    useState(false);
  const [isJurisdictionSelectorOpen, setIsJurisdictionCountrySelectorOpen] =
    useState(false);
  const [searchCountry, setSearchCountry] = useState("");
  const [searchPhoneNumberCode, setSearchPhoneNumberCode] = useState("");
  const [searchJurisdiction, setSearchJurisdiction] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedPhoneNumberCode, setSelectedPhoneNumberCode] = useState(null);
  const [selectedJurisdiction, setSelectedJurisdiction] = useState(null);
  const countryDropdownRef = useRef(null);
  const phoneNumberCodeDropdownRef = useRef(null);
  const jurisdictionDropdownRef = useRef(null);

  const [agreements, setAgreements] = useState({
    riskDisclaimer: false,
    termsAndConditions: false
  });
  const {t} = useTranslation()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    trigger,
  } = useForm({
    defaultValues: {
      firstName:"",
      lastName:"",
      email: "",
      country: "",
      phoneNumberCode: "+1",
      phoneNumber: "",
      jurisdiction: "",
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


  const handleAgreementChange = (e) => {
    const { name, checked } = e.target;
    setAgreements(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const filterSelectors = (searchValue) =>
    countryOptions.filter(
      (option) =>
        option.country.toLowerCase().includes(searchValue.toLowerCase()) ||
        option.code.includes(searchValue)
    );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(event.target)
      ) {
        setIsCountrySelectorOpen(false);
      }
      if (
        phoneNumberCodeDropdownRef.current &&
        !phoneNumberCodeDropdownRef.current.contains(event.target)
      ) {
        setIsPhoneNumberCodeSelectorOpen(false);
      }
      if (
        jurisdictionDropdownRef.current &&
        !jurisdictionDropdownRef.current.contains(event.target)
      ) {
        setIsJurisdictionCountrySelectorOpen(false);
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
  };

  useEffect(() => {
    if (selectedCountry) {
      setValue("country", selectedCountry.country);
    }
    if (selectedPhoneNumberCode) {
      setValue("phoneNumberCode", selectedPhoneNumberCode.code);
    }
    if (selectedJurisdiction) {
      setValue("jurisdiction", selectedJurisdiction.country);
    }
  }, [
    selectedCountry,
    selectedPhoneNumberCode,
    selectedJurisdiction,
    setValue,
  ]);

  return (
    <section className="w-full flex items-center justify-center flex-col max-w-[380px] md:max-w-[670px]">
      <div className="flex items-center justify-center flex-col gap-3 leading-normal font-bold text-primary-text-light dark:text-primary-text-dark mb-10">
        <h1 className="text-3xl">{t("signIn.signUp")}</h1>
        <p className="text-sm">{t("signUp.subTitle")}</p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full grid grid-cols-1 gap-8 md:grid-cols-2"
      >
        {/* First Name Field */}
        <InputField
        className={'w-full col-span-1'}
          label={t("signUp.firstName")}
          title={"firstName"}
          type={"text"}
          errors={errors}
          register={register}
          placeholder={t("signUp.firstName")}
          minLength={3}
          required
          onChange={(e) => {
            setValue("firstName", e.target.value);
            trigger("firstName");
          }}
        />
        {/* Last Name Field */}
        <InputField
        className={'w-full col-span-1'}
          label={t("signUp.lastName")}
          title={"lastName"}
          type={"text"}
          errors={errors}
          register={register}
          placeholder={t("signUp.lastName")}
          minLength={3}
          required
          onChange={(e) => {
            setValue("lastName", e.target.value);
            trigger("lastName");
          }}
        />
        {/* Email Field */}
        <InputField
          className={`w-full col-span-1`}
          label={t("signIn.email")}
          title={"email"}
          type={"email"}
          errors={errors}
          register={register}
          placeholder={t("signIn.email")}
          pattern={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}
          patternMessage={"Invalid email address"}
          required
          onChange={(e) => {
            setValue("email", e.target.value);
            trigger("email");
          }}
        />
        {/* Countries */}
        <div className={`w-full col-span-1 flex flex-col gap-2`}>
          <label
            htmlFor="country"
            className="block text-sm font-bold text-dark-gray dark:text-light-gray"
          >
            {t("signUp.country")}
          </label>
          <div
            onClick={() => setIsCountrySelectorOpen((prev) => !prev)}
            className={`px-3 py-2 gap-3 cursor-pointer relative flex items-center text-primary-text-light dark:text-primary-text-dark text-sm font-bold transition-all duration-150 h-12 border-[3px] outline-none rounded-xl w-full ${
  errors.country
    ? isCountrySelectorOpen
      ? "!border-primary-red placeholder:!text-primary-red !bg-primary-red/10 dark:!bg-primary-red/15"
      : "!border-primary-red/[.1%] dark:!border-secondary-dark placeholder:!text-primary-red !bg-primary-red/10 dark:!bg-primary-red/15"
    : isCountrySelectorOpen
    ? "border-primary bg-white dark:bg-dark-bg"
    : "border-secondary-light dark:border-secondary-dark bg-secondary-light dark:bg-secondary-dark"
}`}
            ref={countryDropdownRef}
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
              id="country"
              className={`size-full outline-none !bg-primary-red/[.1%] dark:!bg-primary-red/[.5%] ${errors.country ?'placeholder:text-primary-red' : 'placeholder:text-light-gray dark:placeholder:text-secondary-text'} placeholder:text-sm placeholder:font-bold`}
              placeholder={`${t("signUp.selectWord")}...`}
              {...register("country", {
                required: `${t("signUp.country")} ${t("signIn.requiredMessage")}`,
              })}
              value={selectedCountry ? selectedCountry.country : searchCountry}
              onChange={(e) => setSearchCountry(e.target.value)}
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
            {filterSelectors(searchCountry).length > 0 && (
              <ul
              className={`transition-colors duration-150 w-full flex flex-col justify-center gap-1 p-2 overflow-y-auto absolute z-10 left-0 max-h-80 rounded-xl border-[3px] bg-white border-secondary-light dark:border-secondary-dark dark:bg-black shadow-lg ${
                isCountrySelectorOpen
                  ? "top-[52px] opacity-100 visible"
                  : "-top-[50px] opacity-0 invisible"
              }`}
            >
              {filterSelectors(searchCountry).map((country, index) => (
                <li
                  onClick={() => {
                    setSelectedCountry(country);
                    setSearchCountry("");
                    setValue("country", country.country);
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
                    <span>{country.country}</span>
                  </div>
                  {country.country === selectedCountry?.country && (
                    <PiCheckBold className="size-[18px] text-primary" />
                  )}
                </li>
              ))}
            </ul>
            )}
            
            <p className={`absolute transition-all duration-150 ${i18n.language === 'en' ? 'left-0' : 'right-0'} ${errors.country ? `opacity-100 visible top-[51px]` : 'opacity-0 invisible -top-10'} text-primary-red text-xs font-bold`}>
          {errors.country?.message}
        </p>
          </div>
        </div>

        {/* Phone Number */}
        <div
          className={`w-full col-span-1 grid grid-cols-2 gap-2 transition-all duration-150 md:gap-8 md:col-span-2 xl:grid-cols-4`}
        >
          <div className={`w-full flex flex-col gap-2`}>
            <label
              htmlFor="phoneNumberCode"
              className="block text-sm font-bold text-dark-gray dark:text-light-gray"
            >
              {t("signIn.phoneNumber")}
            </label>
            <div
              onClick={() => setIsPhoneNumberCodeSelectorOpen((prev) => !prev)}
              className={`px-3 py-2 gap-3 cursor-pointer relative flex items-center text-primary-text-light dark:text-primary-text-dark text-sm font-bold transition-all duration-150 h-12 border-[3px] outline-none rounded-xl w-full ${
  errors.phoneNumberCode
    ? isPhoneNumberCodeSelectorOpen
      ? "!border-primary-red placeholder:!text-primary-red !bg-primary-red/10 dark:!bg-primary-red/15"
      : "!border-primary-red/[.1%] dark:!border-secondary-dark placeholder:!text-primary-red !bg-primary-red/10 dark:!bg-primary-red/15"
    : isPhoneNumberCodeSelectorOpen
    ? "border-primary bg-white dark:bg-dark-bg"
    : "border-secondary-light dark:border-secondary-dark bg-secondary-light dark:bg-secondary-dark"
}`}
              ref={phoneNumberCodeDropdownRef}
            >
              {selectedPhoneNumberCode?.flag && (
                <img
                  src={selectedPhoneNumberCode.flag}
                  alt={selectedPhoneNumberCode.country}
                  className="rounded-full size-5"
                />
              )}
              <input
                type="text"
                id="phoneNumberCode"
                className={`size-full outline-none !bg-primary-red/[.1%] dark:!bg-primary-red/[.5%] ${errors.phoneNumberCode ?'placeholder:text-primary-red' : 'placeholder:text-light-gray dark:placeholder:text-secondary-text'} placeholder:text-sm placeholder:font-bold`}
                placeholder="+1"
                {...register("phoneNumberCode", {
                  required: `${t("signIn.countryCode")} ${t("signIn.requiredMessage")}`,
                })}
                value={
                  selectedPhoneNumberCode
                    ? selectedPhoneNumberCode.code
                    : searchPhoneNumberCode
                }
                onChange={(e) => setSearchPhoneNumberCode(e.target.value)}
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
              {filterSelectors(searchPhoneNumberCode).length > 0 && (
              <ul
                className={`transition-colors duration-150 w-full flex flex-col justify-center gap-1 p-2 overflow-y-auto absolute z-10 left-0 max-h-80 rounded-xl border-[3px] bg-white border-secondary-light dark:border-secondary-dark dark:bg-black shadow-lg ${
                  isPhoneNumberCodeSelectorOpen
                    ? "top-[52px] opacity-100 visible"
                    : "-top-[50px] opacity-0 invisible"
                }`}
              >
                {filterSelectors(searchPhoneNumberCode).map(
                  (country, index) => (
                    <li
                      onClick={() => {
                        setSelectedPhoneNumberCode(country);
                        setSearchPhoneNumberCode("");
                        setValue("phoneNumberCode", country.code);
                      }}
                      key={index}
                      className={`flex items-center justify-between gap-1 rounded-md p-2 transition-colors duration-150 ${
                        country.country === selectedPhoneNumberCode?.country
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
                      {country.country === selectedPhoneNumberCode?.country && (
                        <PiCheckBold className="size-[18px] text-primary" />
                      )}
                    </li>
                  )
                )}
              </ul>
              )}
              <p className={`absolute transition-all duration-150 ${i18n.language === 'en' ? 'left-0' : 'right-0'} ${errors.phoneNumberCode ? `opacity-100 visible top-[51px]` : 'opacity-0 invisible -top-10'} text-primary-red text-xs font-bold`}>
          {errors.phoneNumberCode?.message}
        </p>
            </div>
          </div>
          <InputField
            className={`self-end xl:col-span-3`}
            title={"phoneNumber"}
            type={"tel"}
            errors={errors}
            register={register}
            placeholder={t("signIn.phoneNumber")}
            pattern={/^[0-9]+$/}
            patternMessage={`${t("signIn.phoneNumberText")} ${t("signIn.hasOnlyDigits")}`}
            minLength={5}
            required
            onChange={(e) => {
              setValue("phoneNumber", e.target.value);
              trigger("phoneNumber");
            }}
          />
        </div>

        {/* Jurisdiction */}
        <div className={`w-full col-span-1 flex flex-col gap-2`}>
          <label
            htmlFor="country"
            className="block text-sm font-bold text-dark-gray dark:text-light-gray"
          >
            {t("signUp.jurisdiction")}
          </label>
          <div
            onClick={() =>
              setIsJurisdictionCountrySelectorOpen((prev) => !prev)
            }
            className={`px-3 py-2 gap-3 cursor-pointer relative flex items-center text-primary-text-light dark:text-primary-text-dark text-sm font-bold transition-all duration-150 h-12 border-[3px] outline-none rounded-xl w-full ${
  errors.jurisdiction
    ? isJurisdictionSelectorOpen
      ? "!border-primary-red placeholder:!text-primary-red !bg-primary-red/10 dark:!bg-primary-red/15"
      : "!border-primary-red/[.1%] dark:!border-secondary-dark placeholder:!text-primary-red !bg-primary-red/10 dark:!bg-primary-red/15"
    : isJurisdictionSelectorOpen
    ? "border-primary bg-white dark:bg-dark-bg"
    : "border-secondary-light dark:border-secondary-dark bg-secondary-light dark:bg-secondary-dark"
}`}
            ref={jurisdictionDropdownRef}
          >
            {/* {selectedJurisdiction?.flag && (
              <img
                src={selectedJurisdiction.flag}
                alt={selectedJurisdiction.country}
                className="rounded-full size-5"
              />
            )} */}
            <input
              type="text"
              id="jurisdiction"
              className={`size-full outline-none !bg-primary-red/[.1%] dark:!bg-primary-red/[.5%] ${errors.jurisdiction ?'placeholder:text-primary-red' : 'placeholder:text-light-gray dark:placeholder:text-secondary-text'} placeholder:text-sm placeholder:font-bold`}
              placeholder={t("signUp.selectJurisdiction")}
              {...register("jurisdiction", {
                required: `${t("signUp.jurisdiction")} ${t("signIn.requiredMessage")}`,
              })}
              value={
                selectedJurisdiction
                  ? selectedJurisdiction.country
                  : searchJurisdiction
              }
              onChange={(e) => setSearchJurisdiction(e.target.value)}
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
            {filterSelectors(searchJurisdiction).length > 0 && (
            <ul
              className={`transition-colors duration-150 w-full flex flex-col justify-center gap-1 p-2 overflow-y-auto absolute z-10 left-0 max-h-80 rounded-xl border-[3px] bg-white border-secondary-light dark:border-secondary-dark dark:bg-black shadow-lg ${
                isJurisdictionSelectorOpen
                  ? "top-[52px] opacity-100 visible"
                  : "-top-[50px] opacity-0 invisible"
              }`}
            >
              {filterSelectors(searchJurisdiction).map((country, index) => (
                <li
                  onClick={() => {
                    setSelectedJurisdiction(country);
                    setSearchJurisdiction("");
                    setValue("jurisdiction", country.code);
                  }}
                  key={index}
                  className={`flex items-center justify-between gap-1 rounded-md p-2 transition-colors duration-150 ${
                    country.country === selectedJurisdiction?.country
                      ? "bg-primary/10 text-primary"
                      : "text-dark-gray hover:text-primary-text-light"
                  }`}
                >
                  <div className="flex items-center gap-1">
                    {/* <img
                                                src={country.flag}
                                                alt={country.country}
                                                className="rounded-full size-5"
                                              /> */}
                    <span>{country.country}</span>
                  </div>
                  {country.country === selectedJurisdiction?.country && (
                    <PiCheckBold className="size-[18px] text-primary" />
                  )}
                </li>
              ))}
            </ul>
            )}
          <p className={`absolute transition-all duration-150 ${i18n.language === 'en' ? 'left-0' : 'right-0'} ${errors.jurisdiction ? `opacity-100 visible top-[51px]` : 'opacity-0 invisible -top-10'} text-primary-red text-xs font-bold`}>
          {errors.jurisdiction?.message}
        </p>
          </div>
        </div>
        {/* Password */}
        <InputField
        className={'w-full col-span-1'}
          label={t("signIn.password")}
          
          title={"password"}
          type={"password"}
          errors={errors}
          register={register}
          placeholder={t("signIn.password")}
          minLength={8}
          required
          onChange={(e) => {
            setValue("password", e.target.value);
            trigger("password");
          }}
        />
        <div className="grid gap-4 md:col-span-2 md:grid-cols-2 md:gap-8">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="risk-disclaimer"
          name="riskDisclaimer"
          checked={agreements.riskDisclaimer}
          onChange={handleAgreementChange}
          className="h-5 w-5 text-primary rounded focus:ring-primary"
        />
        <label htmlFor="risk-disclaimer" className="w-max text-sm font-medium text-primary">
          <a href="#" className="hover:underline">{t("signUp.riskText")}</a>
        </label>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="terms-conditions"
          name="termsAndConditions"
          checked={agreements.termsAndConditions}
          onChange={handleAgreementChange}
          className="h-5 w-5 text-primary rounded focus:ring-primary"
        />
        <label htmlFor="terms-conditions" className="w-max text-sm font-medium text-primary">
          <a href="#" className="hover:underline">{t("signUp.t&cs")}</a>
        </label>
      </div>
    </div>
        <Button
          type="submit"
          className={'w-full col-span-full'}
        >
          {t("signIn.signUp")}
        </Button>
      </form>
      <p className="-mt-4 mb-3 text-justify text-sm font-light text-dark-gray dark:text-light-gray">{t("signUp.bottomText")}</p>
      <p className="text-sm font-light text-dark-gray dark:text-light-gray">
        {t("signIn.linkCaption")}{" "}
        <Link
          to="/auth/sign-in"
          className="font-bold text-primary-text-light hover:underline dark:text-primary-text-dark"
        >
          {t("signIn.signIn")}
        </Link>
      </p>
    </section>
  );
}
