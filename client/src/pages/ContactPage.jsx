import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

const COUNTRY_PHONE_RULES = {
  IN: { label: "India (+91)", code: "+91", digits: 10 },
  US: { label: "United States (+1)", code: "+1", digits: 10 },
  GB: { label: "United Kingdom (+44)", code: "+44", digits: 10 },
  AE: { label: "UAE (+971)", code: "+971", digits: 9 },
  AU: { label: "Australia (+61)", code: "+61", digits: 9 },
};

const initialForm = {
  fullName: "",
  email: "",
  country: "IN",
  phone: "",
  companyName: "",
  service: "Web Development",
  budget: "",
  message: "",
};

const PLAN_QUERY_MAP = {
  "web-growth": {
    category: "Futuristic Web Solutions",
    service: "Web Development",
    packageName: "Growth Pro",
    price: "₹79,999",
    timeline: "4-6 Weeks",
    advance: "45% Advance",
    support: "90 Days Support",
    bestFor: "Growing companies and service brands",
  },
  "mobile-growth": {
    category: "Mobile App Engineering",
    service: "Android Development",
    packageName: "Growth App Suite",
    price: "₹2,19,999",
    timeline: "8-12 Weeks",
    advance: "45% Advance",
    support: "90 Days Support",
    bestFor: "Startups targeting active user growth",
  },
  "software-growth": {
    category: "Custom Software Systems",
    service: "Software Development",
    packageName: "Business Command Pro",
    price: "₹2,89,999",
    timeline: "8-10 Weeks",
    advance: "45% Advance",
    support: "90 Days Support",
    bestFor: "SMEs needing robust internal systems",
  },
  mvp: {
    category: "Mobile App Engineering",
    service: "Android Development",
    packageName: "App Launch Lite",
    price: "₹89,999",
    timeline: "4-6 Weeks",
    advance: "40% Advance",
    support: "30 Days Support",
    bestFor: "MVP apps and pilot launches",
  },
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactPage() {
  const location = useLocation();
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
  const [responseType, setResponseType] = useState("");
  const [errors, setErrors] = useState({});

  const clientErrors = useMemo(() => {
    const next = {};

    if (!form.fullName.trim()) next.fullName = "Full name is required.";
    else if (form.fullName.trim().length < 2) next.fullName = "Name must be at least 2 characters.";

    if (!form.email.trim()) next.email = "Email is required.";
    else if (!emailRegex.test(form.email.trim())) next.email = "Enter a valid email address.";

    if (!form.message.trim()) next.message = "Project details are required.";
    else if (form.message.trim().length < 10)
      next.message = "Project details must be at least 10 characters.";

    const selectedCountry = COUNTRY_PHONE_RULES[form.country] || COUNTRY_PHONE_RULES.IN;
    const phoneDigits = form.phone.replace(/\D/g, "");

    if (form.phone && phoneDigits.length !== selectedCountry.digits) {
      next.phone = `Phone must be exactly ${selectedCountry.digits} digits for ${selectedCountry.label}.`;
    }
    if (form.companyName && form.companyName.length > 120)
      next.companyName = "Company name must be max 120 characters.";
    if (form.budget && form.budget.length > 50) next.budget = "Budget must be max 50 characters.";

    return next;
  }, [form]);

  const onChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const selectedCountry = COUNTRY_PHONE_RULES[form.country] || COUNTRY_PHONE_RULES.IN;
      const digitsOnly = value.replace(/\D/g, "").slice(0, selectedCountry.digits);
      setForm((prev) => ({ ...prev, phone: digitsOnly }));
      setErrors((prev) => ({ ...prev, phone: "" }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const applySelectedPlan = (selectedPlan) => {
    if (!selectedPlan) return;

    const detailsMessage = [
      `Hi Samaaroh team, I am interested in this package:`,
      ``,
      `Category: ${selectedPlan.category}`,
      `Package: ${selectedPlan.packageName}`,
      `Price: ${selectedPlan.price}`,
      `Timeline: ${selectedPlan.timeline}`,
      `Advance: ${selectedPlan.advance}`,
      `Support: ${selectedPlan.support}`,
      `Best For: ${selectedPlan.bestFor}`,
      ``,
      `Please share next steps and a detailed proposal.`,
    ].join("\n");

    setForm((prev) => ({
      ...prev,
      service: selectedPlan.service || prev.service,
      budget: selectedPlan.price || prev.budget,
      message: detailsMessage,
    }));
  };

  useEffect(() => {
    const selectedFromState = location.state?.selectedPlan;
    if (selectedFromState) {
      applySelectedPlan(selectedFromState);
      return;
    }

    const searchParams = new URLSearchParams(location.search);
    const planKey = searchParams.get("plan");
    if (!planKey) return;

    const selectedFromQuery = PLAN_QUERY_MAP[planKey];
    if (selectedFromQuery) applySelectedPlan(selectedFromQuery);
  }, [location.state, location.search]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setResponseMsg("");
    setResponseType("");

    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      setResponseMsg("Please fix validation errors before submitting.");
      setResponseType("error");
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const apiBase = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
      const countryMeta = COUNTRY_PHONE_RULES[form.country] || COUNTRY_PHONE_RULES.IN;
      const payload = {
        ...form,
        phone: form.phone ? `${countryMeta.code}${form.phone}` : "",
      };

      const { data } = await axios.post(`${apiBase}/api/contact`, payload, {
        withCredentials: true,
      });

      setResponseMsg(data.message || "Submitted successfully.");
      setResponseType("success");
      setForm(initialForm);
    } catch (error) {
      const status = error?.response?.status;
      const apiMessage = error?.response?.data?.message;
      const apiErrors = error?.response?.data?.errors;

      if (!error?.response) {
        setResponseMsg(
          "Server unreachable. Please make sure backend is running and try again."
        );
      } else if (Array.isArray(apiErrors) && apiErrors.length) {
        setResponseMsg(apiErrors.join(" "));
      } else if (status >= 500) {
        setResponseMsg("Server error occurred. Please try again after some time.");
      } else if (apiMessage) {
        setResponseMsg(apiMessage);
      } else {
        setResponseMsg("Submission failed. Please check your details and try again.");
      }

      setResponseType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section container">
      <div className="section-heading">
        <span className="kicker">Contact Samaaroh</span>
        <h1>Let’s build a high-converting digital presence for your business</h1>
        <p>
          Share your requirements with us. We will provide a clear roadmap, realistic timeline, and a
          result-oriented execution strategy.
        </p>
      </div>

      <div className="glass-card" style={{ padding: "1rem", marginBottom: "1rem" }}>
        <h3 style={{ marginTop: 0 }}>Office Address</h3>
        <p style={{ marginBottom: "0.6rem", color: "var(--muted)" }}>
          NewGen IEDC plot 46, Knowledge Park 3, Greater Noida, Gautam Buddha Nagar, Uttar Pradesh, 201310
        </p>
        <iframe
          title="Samaaroh Office Location"
          src="https://maps.google.com/maps?q=28.468945951351802,77.48869659549786&t=&z=17&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="320"
          style={{ border: 0, borderRadius: "14px" }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>

      <form className="contact-form glass-card" onSubmit={onSubmit} noValidate>
        <div className="grid-2">
          <div>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={form.fullName}
              onChange={onChange}
            />
            {errors.fullName ? <small className="field-error">{errors.fullName}</small> : null}
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={onChange}
            />
            {errors.email ? <small className="field-error">{errors.email}</small> : null}
          </div>
        </div>

        <div className="grid-2">
          <div>
            <div className="grid-2" style={{ gap: "0.6rem" }}>
              <select name="country" value={form.country} onChange={onChange}>
                {Object.entries(COUNTRY_PHONE_RULES).map(([code, info]) => (
                  <option key={code} value={code}>
                    {info.label}
                  </option>
                ))}
              </select>

              <input
                type="text"
                name="phone"
                placeholder={`Phone (${COUNTRY_PHONE_RULES[form.country].digits} digits)`}
                value={form.phone}
                onChange={onChange}
              />
            </div>
            {errors.phone ? <small className="field-error">{errors.phone}</small> : null}
          </div>
          <div>
            <input
              type="text"
              name="companyName"
              placeholder="Company Name"
              value={form.companyName}
              onChange={onChange}
            />
            {errors.companyName ? <small className="field-error">{errors.companyName}</small> : null}
          </div>
        </div>

        <div className="grid-2">
          <select name="service" value={form.service} onChange={onChange}>
            <option>Android Development</option>
            <option>Software Development</option>
            <option>Web Development</option>
            <option>Other</option>
          </select>
          <div>
            <input
              type="text"
              name="budget"
              placeholder="Budget (optional)"
              value={form.budget}
              onChange={onChange}
            />
            {errors.budget ? <small className="field-error">{errors.budget}</small> : null}
          </div>
        </div>

        <div>
          <textarea
            name="message"
            rows="6"
            placeholder="Project details..."
            value={form.message}
            onChange={onChange}
          />
          {errors.message ? <small className="field-error">{errors.message}</small> : null}
        </div>

        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Get Free Proposal"}
        </button>

        {responseMsg ? (
          <p className={`form-message ${responseType === "error" ? "error" : "success"}`}>
            {responseMsg}
          </p>
        ) : null}
      </form>
    </section>
  );
}
