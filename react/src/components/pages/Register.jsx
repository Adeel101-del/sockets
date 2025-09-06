import React, { useState } from "react";
import "../../style/Register.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

export default function Register() {
    const navigate=useNavigate()
    const {setAuth}=useAuth()
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    age: "",
    phone: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAuth(true)
    console.log("signup data:", form);
    navigate("/home")
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit}>
        <h2>Create an Account</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
        />

        {/* Gender Section */}
        <div className="gender-section">
          <label>Gender:</label>
          <div className="gender-options">
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={form.gender === "Male"}
                onChange={handleChange}
                required
              />
              Male
            </label>

            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={form.gender === "Female"}
                onChange={handleChange}
                required
              />
              Female
            </label>

            <label>
              <input
                type="radio"
                name="gender"
                value="Other"
                checked={form.gender === "Other"}
                onChange={handleChange}
                required
              />
              Other
            </label>
          </div>
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
