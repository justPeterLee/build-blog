"use client";
import axios, { AxiosError } from "axios";
import { useState } from "react";

export function Login() {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState({ email: "", password: "" });

  const handleSubmit = async () => {
    try {
      await axios.post("/api/auth/login", {
        email: user.email,
        password: user.password,
      });

      setError(false);
    } catch (err) {
      setError(true);
      if (err instanceof AxiosError) {
        if (err.message) {
          setErrorMessage(err.message);
        }
      } else {
        setErrorMessage("failed to login");
      }
      console.log(err);
    }
  };

  return (
    <form
      className="relative bg-card rounded-lg p-5 flex flex-col gap-2 shadow"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div className="flex flex-col gap-2 relative">
        <div className="flex flex-col gap-1">
          <label className="text-secondary-text duration-0">username</label>
          <input
            value={user.email}
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
            className="bg-cta-card rounded text-secondary-text px-2 p-1 text-sm outline-none min-w-64"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-secondary-text duration-0">password</label>
          <input
            value={user.password}
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
            className="bg-cta-card rounded text-secondary-text px-2 p-1 text-sm outline-none min-w-64"
          />
        </div>
      </div>

      <div className="w-full flex justify-end mt-3">
        <button className="bg-cta-card hover:bg-cta-active-card rounded p-1 px-3 text-secondary-text text-sm">
          login
        </button>
      </div>
      {error && (
        <p className="text-[#e85367] text-sm absolute bottom-[-25px]">
          *{errorMessage}
        </p>
      )}
    </form>
  );
}
