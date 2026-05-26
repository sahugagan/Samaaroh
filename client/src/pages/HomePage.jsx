import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CinematicHeroMedia from "../components/CinematicHeroMedia";
import CTASection from "../components/CTASection";
import FAQ from "../components/FAQ";
import ProcessTimeline from "../components/ProcessTimeline";
import StatsStrip from "../components/StatsStrip";

export default function HomePage() {
  return (
    <div>
      <section className="hero hero-advanced">
        <div className="container hero-grid">
          <motion.div
            className="hero-copy"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="kicker">TUNED PPC ADVERTISING</span>
            <h1>
              Skyrocket Your Leads <br /> with Precision
            </h1>
            <p>
              Your growth partner in paid advertising — strategy, creative, and continuous
              optimization to deliver measurable ROI.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-primary" to="/contact">
                Book a Free Strategy Call
              </Link>
              <Link className="btn btn-ghost" to="/services">
                View Service Plans
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="hero-scene-wrap glass-card"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75 }}
          >
            <CinematicHeroMedia />
          </motion.div>
        </div>
      </section>

      <StatsStrip />
      <ProcessTimeline />
      <FAQ />
      <CTASection />
    </div>
  );
}
