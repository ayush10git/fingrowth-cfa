"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleLogin = async () => {
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      const response = await fetch(
        "http://hqz209bb9k9kmqnlmstwc2y6ry12zt.sdpl.in.net/auth/login",
        {
          method: "POST",
          body: formData,
          redirect: "follow",
        }
      );

      const data = await response.json();

      if (response.ok && data.authtoken) {
        localStorage.setItem("authToken", data.authtoken);
        router.push("/dashboard/analytics");
      } else {
        console.error(
          "Login failed: Invalid credentials or missing auth token"
        );
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-center text-xl font-semibold mb-4">Login</h2>
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="w-full p-2 bg-blue-500 text-white rounded-md"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
