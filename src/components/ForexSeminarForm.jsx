import React, { useState } from "react";
import "./ForexSeminarForm.css";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzcxbbjMQawEQ9iuXg-1_Fq-6r81HHq6SkGfx9MFhSD-m3xY1nxiLBYSLdxuja5bmEyrg/exec";

const ForexSeminarForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    countryCode: "",
    phone: "",
    segments: [],
    investment: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckbox = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      segments: prev.segments.includes(value)
        ? prev.segments.filter((v) => v !== value)
        : [...prev.segments, value],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify({
          ...formData,
          segments: formData.segments.join(", "),
        }),
      });

      const result = await response.json();

      if (result.status === "success") {
        alert("Successfully submitted!");
        setFormData({
          firstName: "",
          lastName: "",
          countryCode: "",
          phone: "",
          segments: [],
          investment: "",
        });
      } else {
        alert("⚠️ Submission failed, try again.");
      }
    } catch (err) {
      alert("⚠️ Error submitting form.");
    }
  };

  return (
    <div className="page-wrapper">
      <div className="form-card">
        <div className="logo-box">
          <img src="/logo.jpeg" alt="The Trading Tribe" />
        </div>

        <h1>Forex Trading Seminar</h1>
        <p className="subtitle">
          Get Signals & Market Insights from a Market Veteran <br />
          with 6+ Years of Expertise
        </p>

        <form onSubmit={handleSubmit}>
          <h3>Customer Details</h3>

          <div className="row">
            <div className="field">
              <label>First Name *</label>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label>Last Name *</label>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="field small">
              <label>Country Code *</label>
              <input
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label>WhatsApp Number *</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="field">
            <label>Segments *</label>
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  value="Gold"
                  checked={formData.segments.includes("Gold")}
                  onChange={handleCheckbox}
                />{" "}
                Gold
              </label>

              <label>
                <input
                  type="checkbox"
                  value="Forex"
                  checked={formData.segments.includes("Forex")}
                  onChange={handleCheckbox}
                />{" "}
                Forex
              </label>

              <label>
                <input
                  type="checkbox"
                  value="Crypto"
                  checked={formData.segments.includes("Crypto")}
                  onChange={handleCheckbox}
                />{" "}
                Crypto
              </label>
            </div>
          </div>

          <div className="field">
            <label>Investment Range *</label>
            <select
              name="investment"
              value={formData.investment}
              onChange={handleChange}
              required
            >
              <option value="">Please Select</option>
              <option>$300 - $500</option>
              <option>$500 - $1000</option>
              <option>More than $1000</option>
            </select>
          </div>

          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForexSeminarForm;
