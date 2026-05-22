import { motion } from "framer-motion";

const steps = [
  {
    title: "Discovery Sprint",
    desc: "Business goals, user journeys, and technical risk mapping in one strategic workshop.",
  },
  {
    title: "Future UI/UX Design",
    desc: "High-conversion interface prototypes with premium brand storytelling.",
  },
  {
    title: "Secure Development",
    desc: "MERN engineering with performance optimization and security-first architecture.",
  },
  {
    title: "Launch + Growth Ops",
    desc: "CI/CD deployment, analytics setup, and post-launch growth optimization.",
  },
];

export default function ProcessTimeline() {
  return (
    <section className="section container">
      <div className="section-heading">
        <span className="kicker">Execution Engine</span>
        <h2>How We Build Products That Scale</h2>
      </div>
      <div className="timeline">
        {steps.map((step, index) => (
          <motion.article
            key={step.title}
            className="timeline-item glass-card"
            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: index * 0.08 }}
          >
            <span className="timeline-index">0{index + 1}</span>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
