import "./styles.css";
import { useState } from "react";
import { Link, Route, Routes, useLocation, useParams } from "react-router-dom";

function MfeBreadcrumbs() {
  const location = useLocation();
  const parts = location.pathname.split("/").filter(Boolean);
  const trail = [{ label: "Orders", to: "/" }];
  if (parts[0] === "applications" && parts[1]) {
    trail.push({ label: "Applications", to: "/" });
    trail.push({ label: parts[1], to: `/applications/${parts[1]}` });
  }

  return (
    <div className="mfe-breadcrumbs">
      {trail.map((item, index) => (
        <span key={`${item.to}-${index}`}>
          {index > 0 && <span className="crumb-sep">/</span>}
          {index < trail.length - 1 ? (
            <Link className="crumb-link" to={item.to}>
              {item.label}
            </Link>
          ) : (
            <span className="crumb-current">{item.label}</span>
          )}
        </span>
      ))}
    </div>
  );
}

function OrdersDashboard() {
  const [compactRows, setCompactRows] = useState(false);
  const kpis = [
    { label: "Active Applications", value: "128", delta: "+12%" },
    { label: "KYC Exceptions", value: "34", delta: "-4%" },
    { label: "Avg. Cycle Time", value: "2.4 days", delta: "-0.6d" },
    { label: "High-Risk Flags", value: "7", delta: "+2" }
  ];
  const pipeline = [
    { stage: "Intake", count: 58, pct: 72 },
    { stage: "Verification", count: 41, pct: 54 },
    { stage: "Underwriting", count: 19, pct: 38 },
    { stage: "Approval", count: 10, pct: 20 }
  ];
  const alerts = [
    {
      title: "Enhanced due diligence required",
      detail: "3 applications flagged for elevated review."
    },
    { title: "Missing disclosures", detail: "7 files missing disclosures." },
    { title: "Income verification SLA", detail: "5 cases exceed 48 hours." }
  ];
  const applications = [
    {
      id: "APP-2045",
      name: "R. Henderson",
      segment: "Retail",
      product: "Premier Checking",
      amount: "$250,000",
      status: "Verification",
      owner: "A. Rivera",
      updated: "2h ago"
    },
    {
      id: "APP-2044",
      name: "M. Alvarez",
      segment: "Treasury",
      product: "Treasury Plus",
      amount: "$1.2M",
      status: "Underwriting",
      owner: "J. Kim",
      updated: "4h ago"
    },
    {
      id: "APP-2039",
      name: "S. Nakamura",
      segment: "Wealth",
      product: "Wealth Select",
      amount: "$480,000",
      status: "Approval",
      owner: "M. Patel",
      updated: "6h ago"
    },
    {
      id: "APP-2034",
      name: "D. Singh",
      segment: "Retail",
      product: "Starter Checking",
      amount: "$85,000",
      status: "Intake",
      owner: "S. Boyd",
      updated: "1d ago"
    }
  ];

  return (
    <div className="mfe">
      <MfeBreadcrumbs />
      <header className="mfe-header">
        <div>
          <h1>Customer Onboarding</h1>
          <p className="subtitle">
            Track applications, validate customer data, and prioritize reviews.
          </p>
        </div>
        <div className="header-actions">
          <button
            type="button"
            className="ghost"
            aria-pressed={compactRows}
            onClick={() => setCompactRows((current) => !current)}
          >
            {compactRows ? "Comfortable rows" : "Compact rows"}
          </button>
          <button type="button" className="ghost">
            Export Queue
          </button>
          <button type="button">New Application</button>
        </div>
      </header>

      <section className="kpi-strip">
        {kpis.map((kpi) => (
          <article key={kpi.label} className="kpi-card">
            <p className="kpi-label">{kpi.label}</p>
            <div className="kpi-row">
              <span className="kpi-value">{kpi.value}</span>
              <span className="kpi-delta">{kpi.delta}</span>
            </div>
          </article>
        ))}
      </section>

      <section className="panel form-panel">
        <form className="filter-form">
          <div className="field">
            <label htmlFor="search">Search</label>
            <input id="search" placeholder="Applicant, ID, or account" />
          </div>
          <div className="field">
            <label htmlFor="segment">Segment</label>
            <select id="segment">
              <option>All segments</option>
              <option>Retail</option>
              <option>Wealth</option>
              <option>Treasury</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="status">Status</label>
            <select id="status">
              <option>All statuses</option>
              <option>Intake</option>
              <option>Verification</option>
              <option>Underwriting</option>
              <option>Approval</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="owner">Owner</label>
            <select id="owner">
              <option>All owners</option>
              <option>A. Rivera</option>
              <option>J. Kim</option>
              <option>M. Patel</option>
            </select>
          </div>
          <div className="form-actions">
            <button type="button" className="ghost">
              Reset
            </button>
            <button type="submit">Apply Filters</button>
          </div>
        </form>
      </section>

      <section className="content-split">
        <article className="panel">
          <div className="panel-header">
            <h2>Application Queue</h2>
            <button type="button" className="ghost">
              Export
            </button>
          </div>
          <table className={`data-table${compactRows ? " compact" : ""}`}>
            <thead>
              <tr>
                <th className="col-tight">Application ID</th>
                <th>Applicant</th>
                <th>Segment</th>
                <th>Product</th>
                <th className="col-tight col-money">Amount</th>
                <th className="col-tight col-status">Status</th>
                <th>Owner</th>
                <th className="col-tight">Updated</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id}>
                  <td className="col-tight">
                    <Link className="link" to={`/applications/${app.id}`}>
                      {app.id}
                    </Link>
                  </td>
                  <td>{app.name}</td>
                  <td>{app.segment}</td>
                  <td>{app.product}</td>
                  <td className="col-tight col-money">{app.amount}</td>
                  <td className="col-tight col-status">
                    <span className={`status ${app.status.toLowerCase()}`}>
                      {app.status}
                    </span>
                  </td>
                  <td>{app.owner}</td>
                  <td className="col-tight">{app.updated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>

        <aside className="side-stack">
          <article className="panel">
            <div className="panel-header">
              <h3>Pipeline Stages</h3>
              <span className="pill">Live</span>
            </div>
            <div className="pipeline">
              {pipeline.map((stage) => (
                <div key={stage.stage} className="pipeline-row">
                  <div className="pipeline-label">
                    <span>{stage.stage}</span>
                    <strong>{stage.count}</strong>
                  </div>
                  <div className="progress">
                    <span style={{ width: `${stage.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="panel alert-panel">
            <div className="panel-header">
              <h3>Risk & Compliance</h3>
              <span className="pill">Priority</span>
            </div>
            <div className="alert-list">
              {alerts.map((alert) => (
                <div key={alert.title} className="alert">
                  <strong>{alert.title}</strong>
                  <p>{alert.detail}</p>
                </div>
              ))}
            </div>
          </article>
        </aside>
      </section>
    </div>
  );
}

function ApplicationDetail() {
  const { id } = useParams();
  const compactRows = false;
  return (
    <div className="mfe">
      <MfeBreadcrumbs />
      <header className="mfe-header">
        <div>
          <h1>Application {id}</h1>
          <p className="subtitle">
            Review applicant details, verification status, and required actions.
          </p>
        </div>
        <div className="header-actions">
          <Link className="ghost button-link" to="/">
            Back to queue
          </Link>
          <button type="button">Request Documents</button>
        </div>
      </header>
      <section className="panel">
        <div className="panel-header">
          <h2>Applicant Summary</h2>
          <span className="pill">Verification</span>
        </div>
        <div className="detail-grid">
          <div>
            <p className="detail-label">Primary Contact</p>
            <strong>R. Henderson</strong>
          </div>
          <div>
            <p className="detail-label">Segment</p>
            <strong>Retail</strong>
          </div>
          <div>
            <p className="detail-label">Requested Product</p>
            <strong>Premier Checking</strong>
          </div>
          <div>
            <p className="detail-label">Requested Amount</p>
            <strong>$250,000</strong>
          </div>
        </div>
      </section>
      <section className="panel">
        <div className="panel-header">
          <h2>Verification Checklist</h2>
        </div>
        <table className={`data-table${compactRows ? " compact" : ""}`}>
          <thead>
            <tr>
              <th>Requirement</th>
              <th className="col-tight col-status">Status</th>
              <th>Owner</th>
              <th className="col-tight">Updated</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>KYC Documents</td>
              <td className="col-tight col-status">
                <span className="status verification">In Review</span>
              </td>
              <td>A. Rivera</td>
              <td className="col-tight">2h ago</td>
            </tr>
            <tr>
              <td>Income Verification</td>
              <td className="col-tight col-status">
                <span className="status intake">Requested</span>
              </td>
              <td>J. Kim</td>
              <td className="col-tight">4h ago</td>
            </tr>
            <tr>
              <td>Funding Source</td>
              <td className="col-tight col-status">
                <span className="status approval">Complete</span>
              </td>
              <td>M. Patel</td>
              <td className="col-tight">Yesterday</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<OrdersDashboard />} />
      <Route path="/applications/:id" element={<ApplicationDetail />} />
      <Route path="*" element={<OrdersDashboard />} />
    </Routes>
  );
}
