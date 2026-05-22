export default function SecurityPage() {
  return (
    <section className="section container">
      <div className="section-heading">
        <span className="kicker">Security</span>
        <h1>Security Practices</h1>
        <p>
          We follow secure development and operational practices to help keep your information safe.
        </p>
      </div>

      <div className="glass-card" style={{ padding: "1.25rem" }}>
        <p>
          We implement input validation, controlled API handling, and access management for internal systems.
          Security best practices are applied throughout planning, development, and deployment.
        </p>
        <p>
          If you notice a potential security issue, please report it to{" "}
          <a href="mailto:contact@smaaroh.co.in">contact@smaaroh.co.in</a>.
        </p>
      </div>
    </section>
  );
}
