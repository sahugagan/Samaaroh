import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const storyBlocks = [
  {
    title: "Growth-Focused Strategy",
    text: "We begin every project by aligning with your business goals, then create a practical roadmap designed for measurable growth.",
  },
  {
    title: "Premium Brand Presence",
    text: "Our websites and apps are not only visually polished but also conversion-focused, helping visitors become qualified leads.",
  },
  {
    title: "Reliable Tech Execution",
    text: "With secure coding standards, scalable architecture, and disciplined delivery, we build digital products that perform long term.",
  },
];

const milestones = [
  { value: "120+", label: "Projects delivered successfully" },
  { value: "40+", label: "Business partners served" },
  { value: "98%", label: "Client satisfaction & retention" },
];

export default function AboutPage() {
  return (
    <section className="section container about-cinematic">
      <motion.div
        className="about-hero glass-card"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="kicker">About Samaaroh Private Limited</span>
        <h1>We build digital products that elevate your brand and accelerate business growth.</h1>
        <p>
          Samaaroh Private Limited helps startups, founders, and growing companies launch modern websites,
          mobile apps, and custom software with clear strategy, efficient execution, and measurable outcomes.
        </p>
        <div className="hero-actions">
          <Link className="btn btn-primary" to="/contact">
            Book a Growth Consultation
          </Link>
          <Link className="btn btn-ghost" to="/services">
            Explore Our Services
          </Link>
        </div>
      </motion.div>

      <div className="grid-3">
        {storyBlocks.map((block, idx) => (
          <motion.article
            key={block.title}
            className="glass-card story-card"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
          >
            <h3>{block.title}</h3>
            <p>{block.text}</p>
          </motion.article>
        ))}
      </div>

      <div className="about-metrics glass-card">
        {milestones.map((item) => (
          <article key={item.label}>
            <h2>{item.value}</h2>
            <p>{item.label}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
