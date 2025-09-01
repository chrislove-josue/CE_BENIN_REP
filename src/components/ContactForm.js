// ContactForm.js
import React, { useState } from "react";

const ContactForm = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message envoyé !");
    // TODO: envoyer les données vers un backend ou email
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "500px", margin: "auto" }}>
      <input name="name" placeholder="Nom" value={form.name} onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <textarea name="message" placeholder="Message" value={form.message} onChange={handleChange} required />
      <button type="submit">Envoyer</button>
    </form>
  );
};

export default ContactForm;
