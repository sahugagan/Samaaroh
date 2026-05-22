import { motion } from "framer-motion";

const stats = [
  { value: "120+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "35%", label: "Avg. Cost Saving" },
  { value: "24/7", label: "Support Readiness" },
];

export default function StatsStrip() {
  return (
    <section className="stats-strip container">
      {stats.map((stat, index) => (
        <motion.article
          key={stat.label}
          className="stat-card glass-card"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: index * 0.1, duration: 0.55 }}
        >
          <h3>{stat.value}</h3>
          <p>{stat.label}</p>
        </motion.article>
      ))}
    </section>
  );
}
