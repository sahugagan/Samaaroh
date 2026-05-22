import { Link } from "react-router-dom";

const footerLinks = {
  Company: [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Services", to: "/services" },
    { label: "Contact", to: "/contact" },
  ],
  Services: [
    {
      label: "Web Development",
      to: "/contact?plan=web-growth",
      state: {
        selectedPlan: {
          category: "Futuristic Web Solutions",
          service: "Web Development",
          packageName: "Growth Pro",
          price: "₹79,999",
          timeline: "4-6 Weeks",
          advance: "45% Advance",
          support: "90 Days Support",
          bestFor: "Growing companies and service brands",
        },
      },
    },
    {
      label: "Android Development",
      to: "/contact?plan=mobile-growth",
      state: {
        selectedPlan: {
          category: "Mobile App Engineering",
          service: "Android Development",
          packageName: "Growth App Suite",
          price: "₹2,19,999",
          timeline: "8-12 Weeks",
          advance: "45% Advance",
          support: "90 Days Support",
          bestFor: "Startups targeting active user growth",
        },
      },
    },
    {
      label: "Software Development",
      to: "/contact?plan=software-growth",
      state: {
        selectedPlan: {
          category: "Custom Software Systems",
          service: "Software Development",
          packageName: "Business Command Pro",
          price: "₹2,89,999",
          timeline: "8-10 Weeks",
          advance: "45% Advance",
          support: "90 Days Support",
          bestFor: "SMEs needing robust internal systems",
        },
      },
    },
    {
      label: "MVP for Startups",
      to: "/contact?plan=mvp",
      state: {
        selectedPlan: {
          category: "Mobile App Engineering",
          service: "Android Development",
          packageName: "App Launch Lite",
          price: "₹89,999",
          timeline: "4-6 Weeks",
          advance: "40% Advance",
          support: "30 Days Support",
          bestFor: "MVP apps and pilot launches",
        },
      },
    },
  ],
};

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-premium glass-card">
          <div className="footer-head">
            <div className="footer-brand">
              <img className="footer-logo" src="/media/samaaroh-logo.png" alt="Samaaroh Private Limited logo" />
              <span className="kicker">Private Limited</span>
              <h3>Digital experiences that feel premium and perform beautifully.</h3>
              <p>
                We craft modern web experiences, cinematic brand presentations, and high-quality digital
                execution for long-term business growth.
              </p>
            </div>

            <div className="footer-cta-group">
              <Link to="/contact" className="btn btn-primary">
                Book Free Consultation
              </Link>
              <a href="mailto:contact@smaaroh.co.in" className="btn btn-ghost">
                contact@samaaroh.co.in
              </a>
            </div>
          </div>

          <div className="footer-grid">
            {Object.entries(footerLinks).map(([section, links]) => (
              <div key={section} className="footer-col">
                <h4>{section}</h4>
                <div className="footer-link-list">
                  {links.map((item) => (
                    <Link key={item.label} to={item.to} state={item.state}>
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            <div className="footer-col footer-contact-col">
              <h4>Contact</h4>
              <p>
                <a href="tel:+917607316881">+91 7607316881</a>
              </p>
              <p>
                India · NewGen IEDC Plot 46, Knowledge Park 3, Greater Noida, Gautam Buddha Nagar, Uttar
                Pradesh, 201310
              </p>
              <p>Mon - Sat · 10:00 AM to 7:00 PM</p>
            </div>
          </div>

          <div className="footer-bottom-clean">
            <p>© {new Date().getFullYear()} Samaaroh Private Limited. All rights reserved.</p>
            <div className="footer-mini-links">
              <Link to="/privacy">Privacy</Link>
              <Link to="/terms">Terms</Link>
              <Link to="/security">Security</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
