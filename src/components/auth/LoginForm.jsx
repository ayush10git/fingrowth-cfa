"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    setError(null); // Clear previous errors

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: formData, // Passing FormData instead of JSON
      });

      const data = await response.json();

      if (response.ok && data.authtoken) {
        localStorage.setItem("authToken", data.authtoken);
        router.push("/dashboard/analytics");
      } else {
        throw new Error(data.error || "Invalid credentials");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-center text-xl font-semibold mb-4">Login</h2>
        {error && <p className="text-red-500 text-center mb-2">{error}</p>}
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />

          <button
            className={`w-full p-2 rounded-md text-white ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"
            }`}
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}
