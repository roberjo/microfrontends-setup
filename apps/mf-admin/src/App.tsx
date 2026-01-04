import "./styles.css";
import { useState } from "react";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useLocation,
  useParams
} from "react-router-dom";

function MfeBreadcrumbs() {
  const location = useLocation();
  const parts = location.pathname.split("/").filter(Boolean);
  const trail = [{ label: "Admin", to: "/" }];

  if (parts[0] === "approvals" && parts[1]) {
    trail.push({ label: "Approvals", to: "/" });
    trail.push({ label: parts[1], to: `/approvals/${parts[1]}` });
  }
  if (parts[0] === "users" && parts[1]) {
    trail.push({ label: "Access Directory", to: "/" });
    trail.push({ label: parts[1], to: `/users/${parts[1]}` });
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

const accessRows = [
  {
    user: "j.smith@finserve.com",
    lob: "Retail Banking",
    role: "Analyst",
    status: "Active"
  },
  {
    user: "m.lee@finserve.com",
    lob: "Wealth",
    role: "Advisor",
    status: "Pending"
  },
  {
    user: "a.patel@finserve.com",
    lob: "Insurance",
    role: "Admin",
    status: "Active"
  }
];

function AdminDashboard() {
  const [compactRows, setCompactRows] = useState(false);
  const kpis = [
    { label: "Active Users", value: "1,284", delta: "+3%" },
    { label: "Pending Approvals", value: "18", delta: "-5" },
    { label: "MFA Coverage", value: "96%", delta: "+1.2%" },
    { label: "Policy Exceptions", value: "6", delta: "+1" }
  ];
  const approvals = [
    {
      id: "APR-1021",
      requester: "s.lopez@finserve.com",
      lob: "Wealth",
      role: "Advisor",
      risk: "Low",
      eta: "2h"
    },
    {
      id: "APR-1017",
      requester: "k.patel@finserve.com",
      lob: "Treasury",
      role: "Manager",
      risk: "Medium",
      eta: "4h"
    }
  ];
  const audit = [
    "Role change for j.smith@finserve.com",
    "MFA reset approved for a.patel@finserve.com",
    "Access revoked for contractor m.lee@finserve.com"
  ];

  return (
    <div className="mfe">
      <MfeBreadcrumbs />
      <header className="mfe-header">
        <div>
          <h1>Access Governance</h1>
          <p className="subtitle">
            Review approvals, enforce RBAC policies, and track audit events.
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
            Export Report
          </button>
          <button type="button">New Policy</button>
        </div>
      </header>

      <section className="kpi-grid">
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
            <input id="search" placeholder="User, team, or role" />
          </div>
          <div className="field">
            <label htmlFor="lob">Line of business</label>
            <select id="lob">
              <option>All lines</option>
              <option>Retail Banking</option>
              <option>Wealth</option>
              <option>Treasury</option>
              <option>Insurance</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="role">Role</label>
            <select id="role">
              <option>All roles</option>
              <option>Analyst</option>
              <option>Advisor</option>
              <option>Manager</option>
              <option>Admin</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="status">Status</label>
            <select id="status">
              <option>All statuses</option>
              <option>Active</option>
              <option>Pending</option>
              <option>Revoked</option>
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
        <div className="main-stack">
          <section className="panel">
            <div className="panel-header">
              <h2>Pending Approvals</h2>
              <span className="pill">SLA 24h</span>
            </div>
            <table className={`data-table${compactRows ? " compact" : ""}`}>
              <thead>
                <tr>
                  <th className="col-tight">Request ID</th>
                  <th>Requester</th>
                  <th>LOB</th>
                  <th>Role</th>
                  <th className="col-tight col-status">Risk</th>
                  <th className="col-tight col-number">ETA</th>
                  <th className="col-tight">Action</th>
                </tr>
              </thead>
              <tbody>
                {approvals.map((item) => (
                  <tr key={item.id}>
                    <td className="col-tight">
                      <Link className="link" to={`/approvals/${item.id}`}>
                        {item.id}
                      </Link>
                    </td>
                    <td>{item.requester}</td>
                    <td>{item.lob}</td>
                    <td>{item.role}</td>
                    <td className="col-tight col-status">
                      <span className={`risk ${item.risk.toLowerCase()}`}>
                        {item.risk}
                      </span>
                    </td>
                    <td className="col-tight col-number">{item.eta}</td>
                    <td className="col-tight">
                      <Link className="ghost button-link" to={`/approvals/${item.id}`}>
                        Review
                      </Link>
                      <button type="button">Approve</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="panel">
            <div className="panel-header">
              <h2>Access Directory</h2>
              <button type="button" className="ghost">
                Export
              </button>
            </div>
            <table className={`data-table${compactRows ? " compact" : ""}`}>
              <thead>
                <tr>
                  <th>User</th>
                  <th>LOB</th>
                  <th>Role</th>
                  <th className="col-tight col-status">Status</th>
                  <th className="col-tight">Last Updated</th>
                  <th className="col-tight">Actions</th>
                </tr>
              </thead>
              <tbody>
                {accessRows.map((row) => (
                  <tr key={row.user + row.lob}>
                    <td>
                      <Link className="link" to={`/users/${row.user}`}>
                        {row.user}
                      </Link>
                    </td>
                    <td>{row.lob}</td>
                    <td>{row.role}</td>
                    <td className="col-tight col-status">
                      <span className={`status ${row.status.toLowerCase()}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="col-tight">Today</td>
                    <td className="col-tight">
                      <Link className="ghost button-link" to={`/users/${row.user}`}>
                        View
                      </Link>
                      <button type="button">Revoke</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>

        <aside className="panel audit-panel">
          <div className="panel-header">
            <h3>Audit Highlights</h3>
            <button type="button" className="ghost">
              View Log
            </button>
          </div>
          <ul className="audit-list">
            {audit.map((entry) => (
              <li key={entry}>{entry}</li>
            ))}
          </ul>
          <div className="audit-meta">
            <span>Next audit export in 4h</span>
            <button type="button" className="ghost">
              Export Audit
            </button>
          </div>
        </aside>
      </section>
    </div>
  );
}

function ApprovalDetail() {
  const { id } = useParams();
  return (
    <div className="mfe">
      <MfeBreadcrumbs />
      <header className="mfe-header">
        <div>
          <h1>Approval {id}</h1>
          <p className="subtitle">
            Review request details, risk indicators, and routing.
          </p>
        </div>
        <div className="header-actions">
          <Link className="ghost button-link" to="/">
            Back to approvals
          </Link>
          <button type="button">Approve</button>
        </div>
      </header>
      <section className="panel">
        <div className="panel-header">
          <h2>Request Summary</h2>
          <span className="pill">Medium risk</span>
        </div>
        <div className="detail-grid">
          <div>
            <p className="detail-label">Requester</p>
            <strong>k.patel@finserve.com</strong>
          </div>
          <div>
            <p className="detail-label">Line of Business</p>
            <strong>Treasury</strong>
          </div>
          <div>
            <p className="detail-label">Role</p>
            <strong>Manager</strong>
          </div>
          <div>
            <p className="detail-label">ETA</p>
            <strong>4 hours</strong>
          </div>
        </div>
      </section>
    </div>
  );
}

function UserDetail() {
  const { id } = useParams();
  return (
    <div className="mfe">
      <MfeBreadcrumbs />
      <header className="mfe-header">
        <div>
          <h1>User Access</h1>
          <p className="subtitle">Review access grants and recent activity.</p>
        </div>
        <div className="header-actions">
          <Link className="ghost button-link" to="/">
            Back to directory
          </Link>
          <button type="button">Suspend Access</button>
        </div>
      </header>
      <section className="panel">
        <div className="panel-header">
          <h2>{id}</h2>
          <span className="pill">Active</span>
        </div>
        <div className="detail-grid">
          <div>
            <p className="detail-label">Primary Role</p>
            <strong>Analyst</strong>
          </div>
          <div>
            <p className="detail-label">Line of Business</p>
            <strong>Retail Banking</strong>
          </div>
          <div>
            <p className="detail-label">Last Updated</p>
            <strong>Today</strong>
          </div>
          <div>
            <p className="detail-label">MFA Status</p>
            <strong>Enabled</strong>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/approvals/:id" element={<ApprovalDetail />} />
        <Route path="/users/:id" element={<UserDetail />} />
        <Route path="*" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
