import React, { useState } from "react";
import "./ForexSeminarForm.css";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwqrc53xYqWeCWafompWzF5Xcz6f-D0MDYFBtLFjpU2MR2veW2tpKV6BDF71p1NlY47Hg/exec";

const ForexSeminarForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    countryCode: "",
    phone: "",
    segments: [],
    investment: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
    setIsSubmitting(true);

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
        alert("✅ Form submitted successfully!");

        setFormData({
          name: "",
          countryCode: "",
          phone: "",
          segments: [],
          investment: "",
        });
      } else {
        alert("⚠️ Submission failed");
      }
    } catch (error) {
      alert("❌ Error submitting form");
    } finally {
      setIsSubmitting(false);
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
              <label>Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="field small">
              <label>Country Code *</label>
              <input
                type="text"
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label>WhatsApp Number *</label>
              <input
                type="text"
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
                /> Gold
              </label>

              <label>
                <input
                  type="checkbox"
                  value="Forex"
                  checked={formData.segments.includes("Forex")}
                  onChange={handleCheckbox}
                /> Forex
              </label>

              <label>
                <input
                  type="checkbox"
                  value="Crypto"
                  checked={formData.segments.includes("Crypto")}
                  onChange={handleCheckbox}
                /> Crypto
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

          <button
            type="submit"
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Submit"}
          </button>
        </form>

      </div>
    </div>
  );
};

export default ForexSeminarForm;
