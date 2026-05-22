import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const services = [
  {
    title: "Website Development",
    desc: "Premium, fast, and conversion-focused websites that build trust and increase qualified inquiries.",
    outcomes: ["More inbound leads", "Strong brand credibility", "Fast mobile-first performance"],
  },
  {
    title: "Android App Development",
    desc: "Scalable Android applications with smooth user experience, secure integrations, and production-ready architecture.",
    outcomes: ["Higher user engagement", "Reliable app performance", "Future-ready scalability"],
  },
  {
    title: "Custom Software Development",
    desc: "Tailored software systems, dashboards, and workflow automation tools that improve productivity and operational control.",
    outcomes: ["Less manual effort", "Better visibility and control", "Long-term business efficiency"],
  },
];

const useCaseOptions = ["Startup", "SME", "Enterprise"];

const pricingCategories = [
  {
    title: "Futuristic Web Solutions",
    subtitle: "High-performance web platforms for brands that want speed, trust, and conversion.",
    note: "Web pricing may vary depending on integrations, multilingual setup, and custom animation scope.",
    packages: [
      {
        name: "Launch Starter",
        price: "Starting from ₹29,999",
        advance: "40% Advance",
        timeline: "2-3 Weeks",
        support: "30 Days Support",
        bestFor: "Local businesses and personal brands",
        featured: false,
        features: [
          "Up to 6 Responsive Pages",
          "Conversion-focused UI",
          "Lead Form + WhatsApp CTA",
          "Basic On-Page SEO",
          "Analytics Setup",
          "Performance Optimization",
        ],
      },
      {
        name: "Growth Pro",
        price: "Starting from ₹79,999",
        advance: "45% Advance",
        timeline: "4-6 Weeks",
        support: "90 Days Support",
        bestFor: "Growing companies and service brands",
        featured: true,
        features: [
          "Dynamic CMS Website",
          "Advanced Landing Funnels",
          "Blog / Case Study Engine",
          "Speed + Core Web Vitals Tuning",
          "Schema + Technical SEO Setup",
          "Admin-ready Lead Dashboard",
        ],
      },
      {
        name: "Scale Enterprise Web",
        price: "Starting ₹1,99,999",
        advance: "50% Advance",
        timeline: "6-10 Weeks",
        support: "180 Days Priority Support",
        bestFor: "Funded startups and enterprise rollouts",
        featured: false,
        features: [
          "Custom Architecture + RBAC",
          "API Integrations + Automations",
          "Multi-location / Multi-brand setup",
          "Security Hardening Layer",
          "Cloud Deployment + Monitoring",
          "CI/CD-ready release flow",
        ],
      },
    ],
  },
  {
    title: "Custom Software Systems",
    subtitle: "Business software that removes operational chaos and improves decision velocity.",
    note: "Final estimates are based on workflow depth, user roles, and third-party system integrations.",
    packages: [
      {
        name: "Ops Core",
        price: "Starting from ₹1,24,999",
        advance: "40% Advance",
        timeline: "4-6 Weeks",
        support: "45 Days Support",
        bestFor: "Teams replacing manual spreadsheet workflows",
        featured: false,
        features: [
          "Custom Admin Panel",
          "User Roles + Login Security",
          "Process Automation Basics",
          "Business Reports + Export",
          "Database Design + Setup",
          "Production Deployment",
        ],
      },
      {
        name: "Business Command Pro",
        price: "Starting from ₹2,89,999",
        advance: "45% Advance",
        timeline: "8-10 Weeks",
        support: "90 Days Support",
        bestFor: "SMEs needing robust internal systems",
        featured: true,
        features: [
          "Multi-module workflow engine",
          "Approval Pipelines",
          "Audit Logs + Activity Tracking",
          "Custom KPI Dashboards",
          "Cloud Backup + Restore",
          "Performance and Security Tuning",
        ],
      },
      {
        name: "Enterprise Automation Stack",
        price: "Starting ₹5,99,999",
        advance: "50% Advance",
        timeline: "10-16 Weeks",
        support: "Dedicated SLA Support",
        bestFor: "Complex operations with scale requirements",
        featured: false,
        features: [
          "ERP/CRM-level architecture",
          "Cross-system API orchestration",
          "High-volume data handling",
          "Advanced access governance",
          "Scalable microservice-ready design",
          "Long-term evolution roadmap",
        ],
      },
    ],
  },
  {
    title: "Mobile App Engineering",
    subtitle: "Modern, scalable app products designed for engagement, retention, and growth.",
    note: "App cost depends on platform coverage, real-time features, and product complexity.",
    packages: [
      {
        name: "App Launch Lite",
        price: "Starting from ₹89,999",
        advance: "40% Advance",
        timeline: "4-6 Weeks",
        support: "30 Days Support",
        bestFor: "MVP apps and pilot launches",
        featured: false,
        features: [
          "Android App (Core flows)",
          "Authentication + Profile",
          "Firebase / API Integration",
          "Push Notifications (basic)",
          "Store-ready build support",
          "Crash and performance baseline",
        ],
      },
      {
        name: "Growth App Suite",
        price: "Starting from ₹2,19,999",
        advance: "45% Advance",
        timeline: "8-12 Weeks",
        support: "90 Days Support",
        bestFor: "Startups targeting active user growth",
        featured: true,
        features: [
          "Android + iOS (single codebase)",
          "Payment + Subscription flows",
          "Real-time notifications",
          "Admin control dashboard",
          "Behavior analytics integration",
          "Release lifecycle guidance",
        ],
      },
      {
        name: "Advanced Product App",
        price: "Starting ₹4,49,999",
        advance: "50% Advance",
        timeline: "12-18 Weeks",
        support: "Priority Product Support",
        bestFor: "Scale-stage products with complex journeys",
        featured: false,
        features: [
          "Custom UX system + microinteractions",
          "High-scale backend integration",
          "Advanced security and compliance setup",
          "Feature flag and rollout framework",
          "Observability + quality pipelines",
          "Post-launch growth optimization",
        ],
      },
    ],
  },
];

const executionPath = [
  {
    step: "01",
    title: "Strategy Discovery Call",
    desc: "We define your goals, user journey, and core outcomes. You receive a solution direction within 24-48 hours.",
  },
  {
    step: "02",
    title: "Scope Freeze + Proposal",
    desc: "Final modules, timeline, and commercials are documented clearly. No ambiguity before development begins.",
  },
  {
    step: "03",
    title: "Advance Payment Activation",
    desc: "Project slot is reserved after agreed advance is received. Team allocation and kickoff timeline are locked.",
  },
  {
    step: "04",
    title: "Design + Development Sprints",
    desc: "Execution runs in milestone sprints with periodic previews, review checkpoints, and quality gates.",
  },
  {
    step: "05",
    title: "QA, UAT, and Launch",
    desc: "We run multi-level testing, complete UAT support, and deploy on production with handover documentation.",
  },
  {
    step: "06",
    title: "Support + Scale",
    desc: "Post-launch support window starts with optimization, bug fixes, and scale planning assistance.",
  },
];

export default function ServicesPage() {
  const [billingView, setBillingView] = useState("one-time");
  const [useCase, setUseCase] = useState("SME");

  const recommendationMap = useMemo(
    () => ({
      Startup: ["Launch Starter", "Ops Core", "App Launch Lite"],
      SME: ["Growth Pro", "Business Command Pro", "Growth App Suite"],
      Enterprise: ["Scale Enterprise Web", "Enterprise Automation Stack", "Advanced Product App"],
    }),
    []
  );

  const isRecommended = (pkgName) => recommendationMap[useCase]?.includes(pkgName);

  return (
    <section className="section container">
      <div className="section-heading">
        <span className="kicker">Samaaroh Services</span>
        <h1>High-Impact Digital Services for Business Growth</h1>
        <p>
          We go beyond development and deliver strategic digital solutions that improve visibility,
          increase lead flow, and strengthen long-term growth.
        </p>
      </div>

      <div className="grid-3">
        {services.map((service, idx) => (
          <motion.article
            key={service.title}
            className="glass-card service-card"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
          >
            <h3>{service.title}</h3>
            <p>{service.desc}</p>
            <ul>
              {service.outcomes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>

      <section className="pricing-section">
        <div className="section-heading">
          <span className="kicker">Transparent Pricing</span>
          <h2>Professional Packages Designed for Growth</h2>
          <p>
            Choose a package that matches your business stage. Every engagement includes strategic planning,
            quality engineering, and delivery support.
          </p>
        </div>

        <div className="pricing-urgency glass-card">
          <p>
            <strong>Limited onboarding window:</strong> Only 3 new project slots this month for quality-focused delivery.
          </p>
        </div>

        <div className="pricing-controls glass-card">
          <div className="pricing-toggle">
            <button
              type="button"
              className={billingView === "one-time" ? "active" : ""}
              onClick={() => setBillingView("one-time")}
            >
              One-time Project Pricing
            </button>
            <button
              type="button"
              className={billingView === "milestone" ? "active" : ""}
              onClick={() => setBillingView("milestone")}
            >
              Milestone Billing View
            </button>
          </div>

          <div className="use-case-chips">
            {useCaseOptions.map((option) => (
              <button
                key={option}
                type="button"
                className={useCase === option ? "active" : ""}
                onClick={() => setUseCase(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="pricing-trust-row">
          <span>⚡ Fast Kickoff</span>
          <span>🔒 Security-first Build</span>
          <span>📈 KPI-focused Delivery</span>
          <span>🛠️ Post-launch Support</span>
        </div>

        {pricingCategories.map((category) => (
          <div key={category.title} className="pricing-category glass-card">
            <div className="pricing-category-head">
              <h3>{category.title}</h3>
              <p>{category.subtitle}</p>
            </div>

            <div className="pricing-packages">
              {category.packages.map((pkg) => (
                <article
                  key={pkg.name}
                  className={`pricing-card ${pkg.featured ? "recommended" : ""} ${isRecommended(pkg.name) ? "usecase-recommended" : ""}`}
                >
                  <div className="pricing-badge-row">
                    {pkg.featured ? <span className="pricing-badge">Most Popular</span> : null}
                    {isRecommended(pkg.name) ? (
                      <span className="pricing-badge secondary">Recommended for {useCase}</span>
                    ) : null}
                  </div>
                  <h4>{pkg.name}</h4>
                  <p className="pricing-price">{pkg.price}</p>
                  <div className="pricing-meta">
                    <span>{pkg.timeline}</span>
                    <span>{pkg.advance}</span>
                    <span>{pkg.support}</span>
                  </div>
                  <p className="pricing-best-for">{pkg.bestFor}</p>
                  <ul className="pricing-feature-list">
                    {pkg.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                  <Link
                    className="btn btn-primary pricing-cta"
                    to="/contact"
                    state={{
                      selectedPlan: {
                        category: category.title,
                        service: category.title.includes("Web")
                          ? "Web Development"
                          : category.title.includes("Mobile")
                            ? "Android Development"
                            : "Software Development",
                        packageName: pkg.name,
                        price: pkg.price,
                        timeline: pkg.timeline,
                        advance: pkg.advance,
                        support: pkg.support,
                        bestFor: pkg.bestFor,
                      },
                    }}
                  >
                    Get Proposal
                  </Link>
                </article>
              ))}
            </div>

            <div className="pricing-comparison">
              <h4>Quick Comparison</h4>
              <div className="pricing-comparison-grid">
                {category.packages.map((pkg) => (
                  <article key={`${pkg.name}-compare`} className="comparison-card">
                    <h5>{pkg.name}</h5>
                    <p>{pkg.price}</p>
                    <span>{pkg.timeline}</span>
                    <span>{pkg.support}</span>
                  </article>
                ))}
              </div>
            </div>

            <p className="pricing-note">
              {billingView === "milestone"
                ? "Milestone billing: Advance + sprint-linked payout schedule."
                : category.note}
            </p>
          </div>
        ))}
      </section>

      <section className="pricing-process glass-card">
        <div className="section-heading">
          <span className="kicker">After Plan Approval</span>
          <h2>What Happens Next</h2>
          <p>
            A transparent execution path so you know exactly how your project moves from idea to launch.
          </p>
        </div>
        <div className="pricing-process-grid">
          {executionPath.map((item) => (
            <article key={item.step} className="process-step-card">
              <span className="process-step-no">{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="pricing-terms glass-card">
        <div className="section-heading">
          <span className="kicker">Payment & Commercial Terms</span>
          <h2>Advance, Milestones, and Delivery Commitments</h2>
        </div>
        <ul className="pricing-terms-list">
          <li>
            <strong>Starter Plans:</strong> 40% advance, 40% on mid milestone, 20% before go-live handover.
          </li>
          <li>
            <strong>Growth/Professional Plans:</strong> 45% advance, 35% after core module completion, 20% on final delivery.
          </li>
          <li>
            <strong>Enterprise Plans:</strong> 50% advance, milestone-based billing (typically 3-5 stages) as per signed SOW.
          </li>
          <li>
            <strong>Revision Scope:</strong> UI/content revisions are included within agreed cycle; additional scope is handled through change requests.
          </li>
          <li>
            <strong>Invoices & Compliance:</strong> GST invoice and formal documentation are provided for every payment milestone.
          </li>
          <li>
            <strong>Post-launch Support:</strong> Included as per selected package; AMC / retainer support can be added for long-term growth.
          </li>
        </ul>
      </section>

      <div className="section cta-inline glass-card">
        <h2>Need a custom package for your business?</h2>
        <p>
          Share your requirements and we will provide a clear timeline, practical roadmap, and
          execution plan tailored to your goals.
        </p>
        <Link className="btn btn-primary" to="/contact">
          Request a Proposal
        </Link>
      </div>
    </section>
  );
}
