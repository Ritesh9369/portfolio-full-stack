import { useState } from "react";
import confetti from "canvas-confetti"; // 🎉
import "../styles/Contact.css";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorToast, setErrorToast] = useState("");

  const validators = {
    name: (v) => v.length >= 3 || "Name must be at least 3 characters",
    email: (v) =>
      /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v) ||
      "Enter a valid email address",
    phone: (v) =>
      /^[6-9][0-9]{9}$/.test(v) ||
      "Mobile number must be 10 digits & start with 6, 7, 8 or 9",
    message: (v) => v.length >= 10 || "Message must be at least 10 characters"
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone" && !/^\d*$/.test(value)) return;

    setForm({ ...form, [name]: value });

    setErrors({
      ...errors,
      [name]: validators[name](value) === true ? "" : validators[name](value)
    });
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newErrors = {};
    Object.keys(validators).forEach((key) => {
      if (validators[key](form[key]) !== true)
        newErrors[key] = validators[key](form[key]);
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/contact/send`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form)
        }
      );

      if (res.ok) {
        setSent(true);
        setForm({ name: "", email: "", phone: "", message: "" });

        confetti({
          particleCount: 200,
          spread: 80,
          startVelocity: 40,
          origin: { y: 0.25 }
        });

        setTimeout(() => setSent(false), 3000);
      } else {
        showError("⚠ Something went wrong! Try again.");
      }
    } catch {
      showError("⚠ Server error! Try again later.");
    } finally {
      setLoading(false);
    }
  };

  const showError = (msg) => {
    setErrorToast(msg);
    setTimeout(() => setErrorToast(""), 3000);
  };

  return (
    <section id="contact" className="section section-animate delay-3">
      <h2 className="section__title">Contact</h2>
      <p className="section__subtitle">
        Let’s talk about internships, junior roles or freelance projects.
      </p>

      <div className="card contact__card glow-card">
        {sent && (
          <div className="toast-float success-float">
            ✨ Message Delivered Successfully!
          </div>
        )}
        {errorToast && (
          <div className="toast-float error-float">{errorToast}</div>
        )}

        {/* LEFT */}
        <div className="contact__info">
          <h3 className="contact__heading">Quick details</h3>
          <ul className="contact__list">
            <li>
              📍 <strong>Location:</strong> Thane, Mumbai (Kalwa)
            </li>
            <li>
              📧 <strong>Email:</strong>
              <a href="mailto:chauhanritesh774@gmail.com">
                chauhanritesh774@gmail.com
              </a>
            </li>
            <li>
              💼 <strong>LinkedIn:</strong>
              <a
                target="_blank"
                href="https://www.linkedin.com/in/ritesh-chauhan-21835b254"
              >
                linkedin.com/in/ritesh-chauhan
              </a>
            </li>
            <li>
              💻 <strong>GitHub:</strong>
              <a target="_blank" href="https://github.com/Ritesh9369">
                github.com/Ritesh9369
              </a>
            </li>
          </ul>
        </div>

        {/* RIGHT */}
        <div className="contact__form-wrapper">
          <h3 className="contact__heading">Send a message</h3>

          <form className="contact__form" onSubmit={sendMessage}>
            {["name", "email", "phone", "message"].map((field) => (
              <div className="contact__field" key={field}>
                <label className="contact__label">
                  {field === "phone"
                    ? "Mobile Number"
                    : field.charAt(0).toUpperCase() + field.slice(1)}
                </label>

                {field !== "message" ? (
                  <input
                    type={field === "email" ? "email" : "text"}
                    name={field}
                    className={`contact__input ${
                      errors[field]
                        ? "invalid-field"
                        : form[field]
                        ? "valid-field"
                        : ""
                    }`}
                    value={form[field]}
                    onChange={handleChange}
                    maxLength={field === "phone" ? 10 : undefined}
                    placeholder={
                      field === "name"
                        ? "Enter your full name"
                        : field === "email"
                        ? "example@gmail.com"
                        : "10-digit mobile number"
                    }
                  />
                ) : (
                  <textarea
                    name="message"
                    rows={3}
                    className={`contact__textarea ${
                      errors[field]
                        ? "invalid-field"
                        : form[field]
                        ? "valid-field"
                        : ""
                    }`}
                    value={form[field]}
                    onChange={handleChange}
                    placeholder="Write your message..."
                  ></textarea>
                )}

                {errors[field] && <p className="error-text">{errors[field]}</p>}
              </div>
            ))}

            <button type="submit" className="btn-primary contact-btn">
              {loading ? <span className="spinner"></span> : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
