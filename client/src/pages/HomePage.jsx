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
            <span className="kicker">Samaaroh Private Limited</span>
            <h1>
              Your Growth Partner for <br /> Premium Websites, Apps & Software
            </h1>
            <p>
              We build conversion-focused websites, high-performance Android apps, and custom
              software solutions that help your business generate more leads and scale faster.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-primary" to="/contact">
                Book a Free Consultation
              </Link>
              <Link className="btn btn-ghost" to="/services">
                Explore Services
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
