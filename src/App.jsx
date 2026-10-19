import { NavLink, Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setMenuOpen(false), [location.pathname]);

  return (
    <header className="site-header">
      <div className="nav-wrap container">
        <NavLink to="/" className="brand" aria-label="MusterBox home">
          <span className="brand-mark">M</span>
          <span>MusterBox</span>
        </NavLink>
        <button
          className="menu-toggle"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span><span></span><span></span>
        </button>
        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          <a href="/#modules">Features</a>
          <a href="/#pricing">Pricing</a>
          <NavLink to="/contact">FAQ / Contact</NavLink>
          <NavLink className="button button-primary nav-cta" to="/contact">Book a demo</NavLink>
        </nav>
      </div>
    </header>
  );
}

const modules = [
  { number: "1", title: "Recruit and onboard", text: "Applicant pipeline, document upload and offer letter generation.", color: "mint" },
  { number: "2", title: "Core HR and records", text: "Multi-company hierarchy, asset tracking and a digital document locker.", color: "amber" },
  { number: "3", title: "Workforce and shifts", text: "GPS geofenced punching, overtime rules, gate-passes and visits.", color: "blue" },
  { number: "4", title: "Payroll and taxes", text: "PF, ESI, PT, LWF, income tax computation and Form 16.", color: "coral" },
  { number: "5", title: "Separation and F&F", text: "Resignation approvals, clearances, leave encashment and settlement.", color: "purple" }
];

function PayrollPreview() {
  const rows = [
    ["Attendance locked", "Done", "done"],
    ["PF ECR file", "Ready", "ready"],
    ["ESIC and Professional Tax", "Ready", "ready"],
    ["Payslips", "Pending", "pending"]
  ];
  return (
    <div className="payroll-card">
      <div className="payroll-heading">
        <strong>Payroll run · [MONTH]</strong>
        <span className="status-pill">In progress</span>
      </div>
      <div className="payroll-rows">
        {rows.map(([label, status, type]) => (
          <div className="payroll-row" key={label}>
            <span>{label}</span><strong className={type}>{status}</strong>
          </div>
        ))}
      </div>
      <a className="button button-primary release-button" href="/#pricing">Release payslips</a>
    </div>
  );
}

function Home() {
  return (
    <>
      <main>
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="eyebrow-badge">Built for Indian enterprises</span>
              <h1>HR, attendance and payroll, <span>without the spreadsheets.</span></h1>
              <p className="hero-description">
                One platform for statutory compliance, GPS mobile punch-in, automated PF and ESIC, and employee self-service across all your companies.
              </p>
              <div className="hero-actions">
                <NavLink className="button button-primary" to="/contact">Schedule a walkthrough</NavLink>
                <a className="button button-outline" href="#pricing">View pricing</a>
              </div>
              <div className="hero-checks">
                <span>✓ PF, ESIC, PT and LWF</span>
                <span>✓ GPS attendance</span>
                <span>✓ Multi-company</span>
              </div>
            </div>
            <PayrollPreview />
          </div>
        </section>

        <section className="lifecycle section" id="modules">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">Complete employee lifecycle</span>
              <h2>From the first offer letter to the final settlement</h2>
            </div>
            <div className="module-grid">
              {modules.map((item) => (
                <article className={`module-card ${item.color}`} key={item.number}>
                  <span className="number-badge">{item.number}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="pricing section" id="pricing">
          <div className="container">
            <div className="section-heading pricing-heading">
              <span className="eyebrow">Pricing</span>
              <h2>Plans that scale with your workforce</h2>
              <p>Prices in INR per employee per month. Annual billing saves [X]%. </p>
            </div>
            <div className="pricing-grid">
              <PricingCard title="Starter" subtitle="For growing teams and single offices" price="₹1000" features={["Core HR and employee directory", "GPS mobile attendance punch", "Leave requests via self-service", "Standard payroll and payslips"]} button="Get started" />
              <PricingCard featured title="Professional" subtitle="Complete HRMS with statutory automation" price="₹2000" features={["Everything in Starter", "PF, ESIC, PT and LWF slabs", "EPF ECR file export", "Gate-pass and overtime module"]} button="Start free trial" />
              <PricingCard title="Enterprise" subtitle="For holding groups and large plants" price="Custom" unit="tailored quote" features={["Everything in Professional", "Parent-child company switcher", "Custom ERP and biometric integrations", "Dedicated account manager and SLA"]} button="Contact sales" />
            </div>
          </div>
        </section>

        <section className="demo-banner">
          <div className="container">
            <h2>See it running on your own data</h2>
            <p>Book a walkthrough and we will show you the modules that matter to your team.</p>
            <NavLink className="button button-light" to="/contact">Book a demo</NavLink>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function PricingCard({ title, subtitle, price, unit = "/ user / month", features, button, featured }) {
  return (
    <article className={featured ? "price-card featured" : "price-card"}>
      <div className="price-title-row">
        <h3>{title}</h3>
        {featured && <span className="popular">Most popular</span>}
      </div>
      <p className="price-subtitle">{subtitle}</p>
      <div className="price"><strong>{price}</strong><span>{unit}</span></div>
      <ul>{features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
      <NavLink className={featured ? "button button-light price-button" : "button button-outline price-button"} to="/contact">{button}</NavLink>
    </article>
  );
}

function Contact() {
  const [formStatus, setFormStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const submission = Object.fromEntries(formData.entries());
    submission._subject = "MusterBox contact form submission";

    setFormStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("https://formsubmit.co/ajax/praharlab@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(submission)
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Your message could not be sent. Please try again.");
      }

      setFormStatus("success");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Your message could not be sent. Please try again.");
      setFormStatus("error");
    }
  }

  return (
    <>
      <main className="contact-page">
        <section className="contact-hero">
          <div className="container">
            <span className="eyebrow">Contact us</span>
            <h1>Let's talk about your team.</h1>
            <p>Book a demo, ask about pricing, or get help choosing the right plan. We usually reply within one business day.</p>
          </div>
        </section>
        <section className="contact-content">
          <div className="container contact-grid">
            <aside className="contact-details">
              <div><h3>Email</h3><p>
                praharlab@gmail.com</p></div>
              <div><h3>Phone</h3><p>8237243124</p></div>
              <div><h3>Office</h3><p>Ace Abode Kiwale Pune</p></div>
              <div></div>
            </aside>
            <form className="contact-form" onSubmit={handleSubmit}>
              {formStatus === "success" ? (
                <div className="success-message" role="status">
                  <span className="success-icon">✓</span>
                  <h2>Thanks for reaching out!</h2>
                  <p>Your message has been submitted to our inbox. We usually reply within one business day.</p>
                  <button className="button button-outline" type="button" onClick={() => setFormStatus("idle")}>Send another message</button>
                </div>
              ) : (
                <>
                  <label>Full name (optional)<input name="name" autoComplete="name" /></label>
                  <label>Work email (optional)<input name="email" type="email" autoComplete="email" /></label>
                  <label>Company (optional)<input name="company" autoComplete="organization" /></label>
                  <label>Company size (optional)
                    <select name="companySize" defaultValue="">
                      <option value="">Select company size (optional)</option>
                      <option>1–50 employees</option>
                      <option>51–200 employees</option>
                      <option>201–500 employees</option>
                      <option>501–1,000 employees</option>
                      <option>1,000+ employees</option>
                    </select>
                  </label>
                  <label>How can we help? (optional)<textarea name="message" rows="5" /></label>
                  {formStatus === "error" && <p role="alert">{errorMessage}</p>}
                  <button className="button button-primary submit-button" type="submit" disabled={formStatus === "sending"}>
                    {formStatus === "sending" ? "Sending..." : "Send message"}
                  </button>
                </>
              )}
            </form>
          </div>
        </section>
      </main>
      <Footer compact />
    </>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div><h3>MusterBox</h3><p>HR, attendance and payroll for Indian enterprises.</p></div>
        <div><h4>Modules</h4><a href="/#modules">Core HR</a><a href="/#modules">Attendance</a><a href="/#modules">Payroll</a></div>
        <div><h4>Quick links</h4><a href="/#pricing">Pricing</a><NavLink to="/contact">Book a demo</NavLink><NavLink to="/contact">Contact</NavLink></div>
        <div><h4>Contact</h4><a href="mailto:hello@musterbox.in">[YOUR EMAIL]</a><a href="tel:+910000000000">[YOUR PHONE]</a></div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}
