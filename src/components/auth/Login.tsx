import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router";

interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError("");
    // alert(import.meta.env.API_BASE_URL);
    try {
      const response = await fetch("http://localhost:8002/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        setError(data.message || "Login failed. Please try again.");
      } else {
        // Save user data to localStorage (or context/global state)
        localStorage.setItem("user", JSON.stringify(data.data.user));

        // Navigate to the dashboard
        navigate("/dashboard");
      }
    } catch (err) {
      setLoading(false);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-700">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 bg-gray-50 border rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 bg-gray-50 border rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
              placeholder="Your secure password"
              required
            />
          </div>
          {error && <div className="mb-4 text-sm text-red-500">{error}</div>}
          <button
            type="submit"
            className={`w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
