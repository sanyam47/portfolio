import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaCopy, FaCheck } from "react-icons/fa";
import emailjs from "@emailjs/browser";

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [copiedField, setCopiedField] = useState(null);

  const contactDetails = [
    {
      icon: <FaEnvelope />,
      label: "Email Me",
      value: "sanyam4747@gmail.com",
    },
    {
      icon: <FaMapMarkerAlt />,
      label: "Location",
      value: "Rajasthan, India",
    },
  ];

  const handleCopy = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // Fallback to simulation mode if keys are not set up
    if (!serviceId || !templateId || !publicKey || serviceId.includes("here")) {
      console.warn("EmailJS keys are not configured in your .env file. Falling back to simulation mode.");
      setTimeout(() => {
        setIsSubmitting(false);
        setShowToast(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setShowToast(false), 4000);
      }, 1500);
      return;
    }

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      to_email: "sanyam4747@gmail.com",
    };

    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then(
        () => {
          setIsSubmitting(false);
          setShowToast(true);
          setFormData({ name: "", email: "", subject: "", message: "" });
          setTimeout(() => setShowToast(false), 4000);
        },
        (error) => {
          console.error("EmailJS failed to send email:", error);
          setIsSubmitting(false);
          alert("Failed to send message. Please try copy-pasting the email directly.");
        }
      );
  };



  return (
    <section
      id="contact"
      className="max-w-7xl mx-auto px-6 py-24 md:py-32 relative bg-[#0c0a09]"
    >
      {/* Decorative Glow */}
      <div className="absolute left-0 top-1/2 w-80 h-80 bg-amber-600/3 blur-[120px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-20 space-y-4">
        <div className="text-amber-500 font-bold uppercase tracking-wider text-sm">
          / Reach Out
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-white">
          Let's Connect
        </h2>
        <p className="text-zinc-400 max-w-2xl mx-auto">
          Interested in working together or want to chat about AI &amp; IoT projects? Fill out the form or email me directly.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-12 items-start">
        {/* Left Info Column */}
        <div className="lg:col-span-5 space-y-6">
          <h3 className="text-2xl font-bold text-white mb-6">
            Contact Info
          </h3>

          <div className="space-y-4">
            {contactDetails.map((detail, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-6 bg-[#141210]/45 border border-zinc-900/60 rounded-2xl backdrop-blur-xl"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-zinc-950 border border-zinc-800 text-amber-500 p-4 rounded-xl text-lg">
                    {detail.icon}
                  </div>
                  <div>
                    <span className="text-zinc-500 text-xs font-semibold uppercase tracking-wider">
                      {detail.label}
                    </span>
                    <p className="text-zinc-300 font-medium text-sm md:text-base">
                      {detail.value}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleCopy(detail.value, detail.label)}
                  className="text-zinc-400 hover:text-amber-500 bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 p-2.5 rounded-lg transition"
                  title="Copy to Clipboard"
                >
                  {copiedField === detail.label ? (
                    <FaCheck className="text-green-500" />
                  ) : (
                    <FaCopy />
                  )}
                </button>
              </div>
            ))}
          </div>

          <div className="p-6 bg-amber-950/15 border border-amber-500/20 rounded-2xl">
            <h4 className="font-bold text-amber-400 mb-2">
              Looking for Collaboration?
            </h4>
            <p className="text-zinc-400 text-sm leading-relaxed">
              I am open to internships, remote roles, and interesting freelance projects in Full Stack Web, IoT Robotics, and Machine Learning integration.
            </p>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="lg:col-span-7 bg-[#141210]/45 border border-zinc-900/60 rounded-3xl p-8 md:p-10 backdrop-blur-xl">
          <h3 className="text-2xl font-bold text-white mb-6">
            Send Message
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="flex flex-col space-y-2">
                <label className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your Name"
                  className={`bg-zinc-950 border text-zinc-200 text-sm rounded-xl p-4 focus:outline-none focus:border-amber-500 transition-all ${
                    errors.name ? "border-red-500/60" : "border-zinc-800/80"
                  }`}
                />
                {errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}
              </div>

              {/* Email */}
              <div className="flex flex-col space-y-2">
                <label className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your.email@example.com"
                  className={`bg-zinc-950 border text-zinc-200 text-sm rounded-xl p-4 focus:outline-none focus:border-amber-500 transition-all ${
                    errors.email ? "border-red-500/60" : "border-zinc-800/80"
                  }`}
                />
                {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
              </div>
            </div>

            {/* Subject */}
            <div className="flex flex-col space-y-2">
              <label className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                Subject
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="How can I help you?"
                className={`bg-zinc-950 border text-zinc-200 text-sm rounded-xl p-4 focus:outline-none focus:border-amber-500 transition-all ${
                  errors.subject ? "border-red-500/60" : "border-zinc-800/80"
                }`}
              />
              {errors.subject && <span className="text-red-500 text-xs">{errors.subject}</span>}
            </div>

            {/* Message */}
            <div className="flex flex-col space-y-2">
              <label className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                Message
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell me about your project..."
                rows={5}
                className={`bg-zinc-950 border text-zinc-200 text-sm rounded-xl p-4 focus:outline-none focus:border-amber-500 transition-all ${
                  errors.message ? "border-red-500/60" : "border-zinc-800/80"
                }`}
              />
              {errors.message && <span className="text-red-500 text-xs">{errors.message}</span>}
            </div>

            {/* Submit Button */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700 text-white font-bold p-4 rounded-xl shadow-lg shadow-amber-650/10 transition disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Send Message <FaPaperPlane />
                </>
              )}
            </motion.button>
          </form>
        </div>
      </div>

      {/* Floating Animated Toast Feedback Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 bg-zinc-900 border border-red-500/30 text-white rounded-2xl px-6 py-4 flex items-center gap-3 shadow-2xl shadow-red-500/10"
          >
            <div className="bg-red-500/10 text-amber-500 p-2.5 rounded-xl">
              <FaCheck />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">Message Transmitted!</h4>
              <p className="text-zinc-400 text-xs mt-0.5">Thank you, I will get back to you shortly.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Contact;