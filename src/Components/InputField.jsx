import i18n from "i18next";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { CiRead, CiUnread } from "react-icons/ci";

export default function InputField({
  className,
  type,
  label,
  placeholder,
  title,
  onChange,
  errors,
  register,
  minLength,
  pattern,
  patternMessage,
  required,
}) {
  const [isPasswordReadable, setIsPasswordReadable] = useState(false);
  const { t } = useTranslation();
  return (
    <div
      className={`relative w-full flex flex-col gap-2 transition-all duration-150 ${className}`}
    >
      {label && (
        <label
          htmlFor={title}
          className="block text-sm font-bold text-dark-gray dark:text-light-gray"
        >
          {label}
        </label>
      )}
      <input
        type={
          type === "password"
            ? isPasswordReadable
              ? "text"
              : "password"
            : type
        }
        id={title}
        className={`text-primary-text-light dark:text-primary-text-dark text-sm font-bold transition-all duration-150 flex items-center h-12 px-3 py-2 placeholder:text-sm placeholder:font-bold placeholder:text-light-gray dark:placeholder:text-secondary-text border-[3px] outline-none rounded-xl focus:border-primary dark:focus:border-primary w-full bg-secondary-light border-secondary-light dark:border-secondary-dark dark:bg-secondary-dark focus:!bg-white dark:focus:!bg-dark-bg ${
          errors[title]
            ? "focus:!border-primary-red dark:focus:!border-primary-red placeholder:!text-primary-red !bg-primary-red/10 dark:!bg-primary-red/15"
            : ""
        }`}
        placeholder={placeholder}
        {...register(title, {
          required: required
            ? `${label ? label : placeholder} ${t("signIn.requiredMessage")}`
            : required,
          pattern: {
            value: pattern,
            message: patternMessage,
          },
          minLength: {
            value: minLength,
            message: `${label || t("signIn.phoneNumber")} ${t(
              "signIn.charLimit"
            )} ${minLength} ${t("signIn.characters")}`,
          },
        })}
        onChange={onChange}
      />
      <p
        className={`absolute transition-all duration-150 ${
          errors[title]
            ? `opacity-100 visible ${label ? "top-20" : "top-14"}`
            : "opacity-0 invisible -top-10"
        } text-primary-red text-xs font-bold`}
      >
        {errors[title]?.message}
      </p>

      {type === "password" && (
        <div
          className={`absolute bottom-3 ${
            i18n.language === "en" ? "right-3" : "left-3"
          }`}
        >
          {isPasswordReadable ? (
            <CiUnread
              onClick={() => setIsPasswordReadable((prev) => !prev)}
              className="cursor-pointer size-5 font-bold text-dark-gray dark:text-light-gray"
            />
          ) : (
            <CiRead
              onClick={() => setIsPasswordReadable((prev) => !prev)}
              className="cursor-pointer size-5 font-bold text-dark-gray dark:text-light-gray"
            />
          )}
        </div>
      )}
    </div>
  );
}
