import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section className="section container">
      <motion.div
        className="cta-panel glass-card"
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.55 }}
      >
        <div>
          <span className="kicker">Ready to Scale with Samaaroh?</span>
          <h2>Make the right decision today and start growing faster.</h2>
          <p>
            If you need a website, app, or software solution that delivers real business outcomes,
            our team is ready to support you from strategy through launch.
          </p>
        </div>
        <div className="hero-actions">
          <Link className="btn btn-primary" to="/contact">
            Book a Free Strategy Call
          </Link>
          <Link className="btn btn-ghost" to="/services">
            View Service Plans
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
