import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Aarav Mehta",
    role: "Founder, FinEdge Startup",
    quote:
      "GrowFast transformed our idea into a secure product in record time. Their execution clarity is world-class.",
  },
  {
    name: "Nisha Kapoor",
    role: "Director, Nexa Retail",
    quote:
      "From backend security to frontend engagement, every detail was optimized for growth and reliability.",
  },
  {
    name: "Raghav Bansal",
    role: "COO, ScaleForge",
    quote:
      "The quality-to-cost ratio is unmatched. We saw immediate improvements in conversions and user trust.",
  },
];

export default function Testimonials() {
  return (
    <section className="section container">
      <div className="section-heading">
        <span className="kicker">Client Voice</span>
        <h2>What Partners Say About Our Impact</h2>
      </div>
      <div className="grid-3">
        {testimonials.map((item, index) => (
          <motion.article
            key={item.name}
            className="glass-card testimonial-card"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <p>“{item.quote}”</p>
            <h3>{item.name}</h3>
            <span>{item.role}</span>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
