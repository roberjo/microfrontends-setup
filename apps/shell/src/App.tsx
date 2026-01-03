import { useEffect, useMemo, useState } from "react";

const navItems = [
  { label: "Retail Banking", key: "retail" },
  { label: "Wealth", key: "wealth" },
  { label: "Insurance", key: "insurance" },
  { label: "Treasury", key: "treasury" },
  { label: "Products", key: "products" },
  { label: "Admin", key: "admin" }
];

const quickActions = ["Notifications", "Settings"];

function App() {
  const [theme, setTheme] = useState("light");
  const [active, setActive] = useState("retail");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const activeLabel = useMemo(
    () => navItems.find((item) => item.key === active)?.label ?? "",
    [active]
  );

  return (
    <div className="shell">
      <aside className="shell-nav">
        <div className="brand">
          <div className="brand-mark" />
          <div>
            <div className="brand-title">FinServe Portal</div>
            <div className="brand-subtitle">Microfrontends POC</div>
          </div>
        </div>
        <nav className="nav-list">
          {navItems.map((item) => (
            <button
              key={item.key}
              className={item.key === active ? "nav-item active" : "nav-item"}
              onClick={() => setActive(item.key)}
              type="button"
            >
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      <div className="shell-main">
        <header className="shell-topbar">
          <div className="search">
            <input placeholder="Search customers, accounts, or products" />
          </div>
          <div className="topbar-actions">
            {quickActions.map((action) => (
              <button key={action} type="button" className="topbar-button">
                {action}
              </button>
            ))}
            <button
              type="button"
              className="topbar-button"
              onClick={() =>
                setTheme((current) => (current === "light" ? "dark" : "light"))
              }
            >
              {theme === "light" ? "Dark" : "Light"} Mode
            </button>
            <div className="avatar">JD</div>
          </div>
        </header>

        <main className="shell-content">
          <section className="hero">
            <p className="eyebrow">Line of Business</p>
            <h1>{activeLabel}</h1>
            <p className="subtitle">
              This space renders the selected microfrontend. Configure remote URLs
              with environment variables to load live MFEs.
            </p>
            <div className="hero-actions">
              <button type="button" className="primary">
                Open {activeLabel} Workspace
              </button>
              <button type="button" className="secondary">
                Review Access
              </button>
            </div>
          </section>
          <section className="cards">
            <div className="card">
              <h3>Access Snapshot</h3>
              <p>2 pending access requests and 4 role changes to review.</p>
            </div>
            <div className="card">
              <h3>Onboarding Pipeline</h3>
              <p>12 customers in KYC review, 3 awaiting documents.</p>
            </div>
            <div className="card">
              <h3>Product Insights</h3>
              <p>Compare annuity providers and update rate of return tables.</p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
