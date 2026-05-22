import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const faqs = [
  {
    q: "Do you work with startups on tight budgets?",
    a: "Yes. We specialize in low-cost, high-quality development models designed for early-stage growth.",
  },
  {
    q: "Can you build secure enterprise-scale systems?",
    a: "Absolutely. We build scalable architecture with secure coding practices, validation, and hardening standards.",
  },
  {
    q: "What technologies do you use?",
    a: "We work across MERN, Android native, and custom software stacks based on your business requirements.",
  },
  {
    q: "Do you provide post-launch support?",
    a: "Yes, including monitoring, performance tuning, feature upgrades, and long-term product evolution.",
  },
];

export default function FAQ() {
  const [active, setActive] = useState(0);

  return (
    <section className="section container">
      <div className="section-heading">
        <span className="kicker">FAQ</span>
        <h2>Everything You Need to Know</h2>
      </div>

      <div className="faq-list">
        {faqs.map((item, idx) => {
          const open = active === idx;
          return (
            <div className="faq-item glass-card" key={item.q}>
              <button className="faq-q" onClick={() => setActive(open ? -1 : idx)} type="button">
                <span>{item.q}</span>
                <strong>{open ? "−" : "+"}</strong>
              </button>

              <AnimatePresence initial={false}>
                {open && (
                  <motion.p
                    className="faq-a"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    {item.a}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
