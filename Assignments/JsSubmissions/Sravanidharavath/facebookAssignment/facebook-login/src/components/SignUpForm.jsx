import React, { useState } from "react";
import axios from "axios";
import "./SignUpForm.css";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    surname: "",
    dob: "",
    gender: "",
    contact: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/signup", formData);
      alert("Sign-up data submitted successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Error saving data.");
    }
  };

  return (
    <div className="signup-container">
      <h1 className="facebook-title">facebook</h1>
      <div className="signup-box">
        <h2>Create a new account</h2>
        <p>It's quick and easy.</p>
        <form onSubmit={handleSubmit}>
          <div className="name-fields">
            <input type="text" name="firstName" placeholder="First name" onChange={handleChange} required />
            <input type="text" name="surname" placeholder="Surname" onChange={handleChange} required />
          </div>

          <div className="dateofbirth">Date of Birth</div>
          <input type="date" name="dob" onChange={handleChange} required />

          <div className="gender">Gender</div>
          <div className="gender-options">
            <label><input type="radio" name="gender" value="Female" onChange={handleChange} /> Female</label>
            <label><input type="radio" name="gender" value="Male" onChange={handleChange} /> Male</label>
            <label><input type="radio" name="gender" value="Custom" onChange={handleChange} /> Custom</label>
          </div>

          <input type="text" name="contact" placeholder="Mobile number or email address" onChange={handleChange} required />
          <input type="password" name="password" placeholder="New password" onChange={handleChange} required />

          <p className="para">People who use our service may have uploaded your contact information to Facebook.<a href="#">Learn more.</a></p>
          <br/>
          <p className="para1">By clicking Sign Up, you agree to our <a href="#">Terms, Privacy Policy</a> and <a href="#">Cookies Policy</a>. You may receive SMS notifications from us and can opt out at any time.</p>

          <button type="submit" className="signup-btn">Sign Up</button>
          <p className="login-link">
            <a href="#">Already have an account?</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
