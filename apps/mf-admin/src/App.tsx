import "./styles.css";
import { useState } from "react";
import { Link, Route, Routes, useLocation, useParams } from "react-router-dom";
import {
  Breadcrumbs,
  KPIGrid,
  Panel,
  PanelHeader,
  PageHeader,
  FilterForm,
  DataTable,
  StatusBadge,
  RiskBadge,
  Pill,
  DetailGrid,
  DetailItem,
  type KPI,
  type BreadcrumbItem,
  type FilterField,
  type TableColumn,
} from "@finserve/shared-ui";

interface Approval {
  id: string;
  requester: string;
  lob: string;
  role: string;
  risk: string;
  eta: string;
}

interface AccessRow {
  user: string;
  lob: string;
  role: string;
  status: string;
}

const kpis: KPI[] = [
  { label: "Active Users", value: "1,284", delta: "+3%" },
  { label: "Pending Approvals", value: "18", delta: "-5" },
  { label: "MFA Coverage", value: "96%", delta: "+1.2%" },
  { label: "Policy Exceptions", value: "6", delta: "+1" },
];

const approvals: Approval[] = [
  {
    id: "APR-1021",
    requester: "s.lopez@finserve.com",
    lob: "Wealth",
    role: "Advisor",
    risk: "Low",
    eta: "2h",
  },
  {
    id: "APR-1017",
    requester: "k.patel@finserve.com",
    lob: "Treasury",
    role: "Manager",
    risk: "Medium",
    eta: "4h",
  },
];

const accessRows: AccessRow[] = [
  { user: "j.smith@finserve.com", lob: "Retail Banking", role: "Analyst", status: "Active" },
  { user: "m.lee@finserve.com", lob: "Wealth", role: "Advisor", status: "Pending" },
  { user: "a.patel@finserve.com", lob: "Insurance", role: "Admin", status: "Active" },
];

const audit = [
  "Role change for j.smith@finserve.com",
  "MFA reset approved for a.patel@finserve.com",
  "Access revoked for contractor m.lee@finserve.com",
];

const filterFields: FilterField[] = [
  { id: "search", label: "Search", type: "text", placeholder: "User, team, or role" },
  {
    id: "lob",
    label: "Line of business",
    type: "select",
    options: [
      { value: "", label: "All lines" },
      { value: "retail", label: "Retail Banking" },
      { value: "wealth", label: "Wealth" },
      { value: "treasury", label: "Treasury" },
      { value: "insurance", label: "Insurance" },
    ],
  },
  {
    id: "role",
    label: "Role",
    type: "select",
    options: [
      { value: "", label: "All roles" },
      { value: "analyst", label: "Analyst" },
      { value: "advisor", label: "Advisor" },
      { value: "manager", label: "Manager" },
      { value: "admin", label: "Admin" },
    ],
  },
  {
    id: "status",
    label: "Status",
    type: "select",
    options: [
      { value: "", label: "All statuses" },
      { value: "active", label: "Active" },
      { value: "pending", label: "Pending" },
      { value: "revoked", label: "Revoked" },
    ],
  },
];

function useAdminBreadcrumbs(): BreadcrumbItem[] {
  const location = useLocation();
  const parts = location.pathname.split("/").filter(Boolean);
  const trail: BreadcrumbItem[] = [{ label: "Admin", to: "/" }];

  if (parts[0] === "approvals" && parts[1]) {
    trail.push({ label: "Approvals", to: "/" });
    trail.push({ label: parts[1], to: `/approvals/${parts[1]}` });
  }
  if (parts[0] === "users" && parts[1]) {
    trail.push({ label: "Access Directory", to: "/" });
    trail.push({ label: parts[1], to: `/users/${parts[1]}` });
  }

  return trail;
}

function AdminDashboard() {
  const [compactRows, setCompactRows] = useState(false);
  const breadcrumbs = useAdminBreadcrumbs();

  const approvalColumns: TableColumn<Approval>[] = [
    {
      key: "id",
      header: "Request ID",
      className: "col-tight",
      render: (row) => (
        <Link className="link" to={`/approvals/${row.id}`}>
          {row.id}
        </Link>
      ),
    },
    { key: "requester", header: "Requester" },
    { key: "lob", header: "LOB" },
    { key: "role", header: "Role" },
    {
      key: "risk",
      header: "Risk",
      className: "col-tight col-status",
      render: (row) => <RiskBadge risk={row.risk} />,
    },
    { key: "eta", header: "ETA", className: "col-tight col-number" },
    {
      key: "actions",
      header: "Action",
      className: "col-tight",
      render: (row) => (
        <>
          <Link className="ghost button-link" to={`/approvals/${row.id}`}>
            Review
          </Link>
          <button type="button">Approve</button>
        </>
      ),
    },
  ];

  const accessColumns: TableColumn<AccessRow>[] = [
    {
      key: "user",
      header: "User",
      render: (row) => (
        <Link className="link" to={`/users/${row.user}`}>
          {row.user}
        </Link>
      ),
    },
    { key: "lob", header: "LOB" },
    { key: "role", header: "Role" },
    {
      key: "status",
      header: "Status",
      className: "col-tight col-status",
      render: (row) => <StatusBadge status={row.status} />,
    },
    { key: "updated", header: "Last Updated", className: "col-tight" },
    {
      key: "actions",
      header: "Actions",
      className: "col-tight",
      render: (row) => (
        <>
          <Link className="ghost button-link" to={`/users/${row.user}`}>
            View
          </Link>
          <button type="button">Revoke</button>
        </>
      ),
    },
  ];

  const accessRowsWithUpdated = accessRows.map((row) => ({ ...row, updated: "Today" }));

  return (
    <div className="mfe">
      <Breadcrumbs items={breadcrumbs} />
      <PageHeader
        title="Access Governance"
        subtitle="Review approvals, enforce RBAC policies, and track audit events."
        actions={
          <>
            <button
              type="button"
              className="ghost"
              aria-pressed={compactRows}
              onClick={() => setCompactRows((c) => !c)}
            >
              {compactRows ? "Comfortable rows" : "Compact rows"}
            </button>
            <button type="button" className="ghost">
              Export Report
            </button>
            <button type="button">New Policy</button>
          </>
        }
      />

      <KPIGrid kpis={kpis} />

      <Panel className="form-panel">
        <FilterForm fields={filterFields} />
      </Panel>

      <section className="content-split">
        <div className="main-stack">
          <Panel>
            <PanelHeader title="Pending Approvals" badge={<Pill>SLA 24h</Pill>} />
            <DataTable
              columns={approvalColumns}
              rows={approvals}
              keyField="id"
              compact={compactRows}
            />
          </Panel>

          <Panel>
            <PanelHeader
              title="Access Directory"
              actions={
                <button type="button" className="ghost">
                  Export
                </button>
              }
            />
            <DataTable
              columns={accessColumns}
              rows={accessRowsWithUpdated}
              keyField="user"
              compact={compactRows}
            />
          </Panel>
        </div>

        <aside className="panel audit-panel">
          <PanelHeader
            title="Audit Highlights"
            titleLevel="h3"
            actions={
              <button type="button" className="ghost">
                View Log
              </button>
            }
          />
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
  const breadcrumbs = useAdminBreadcrumbs();

  return (
    <div className="mfe">
      <Breadcrumbs items={breadcrumbs} />
      <PageHeader
        title={`Approval ${id}`}
        subtitle="Review request details, risk indicators, and routing."
        actions={
          <>
            <Link className="ghost button-link" to="/">
              Back to approvals
            </Link>
            <button type="button">Approve</button>
          </>
        }
      />
      <Panel>
        <PanelHeader title="Request Summary" badge={<Pill>Medium risk</Pill>} />
        <DetailGrid>
          <DetailItem label="Requester" value="k.patel@finserve.com" />
          <DetailItem label="Line of Business" value="Treasury" />
          <DetailItem label="Role" value="Manager" />
          <DetailItem label="ETA" value="4 hours" />
        </DetailGrid>
      </Panel>
    </div>
  );
}

function UserDetail() {
  const { id } = useParams();
  const breadcrumbs = useAdminBreadcrumbs();

  return (
    <div className="mfe">
      <Breadcrumbs items={breadcrumbs} />
      <PageHeader
        title="User Access"
        subtitle="Review access grants and recent activity."
        actions={
          <>
            <Link className="ghost button-link" to="/">
              Back to directory
            </Link>
            <button type="button">Suspend Access</button>
          </>
        }
      />
      <Panel>
        <PanelHeader title={id || "User"} badge={<Pill>Active</Pill>} />
        <DetailGrid>
          <DetailItem label="Primary Role" value="Analyst" />
          <DetailItem label="Line of Business" value="Retail Banking" />
          <DetailItem label="Last Updated" value="Today" />
          <DetailItem label="MFA Status" value="Enabled" />
        </DetailGrid>
      </Panel>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="/approvals/:id" element={<ApprovalDetail />} />
      <Route path="/users/:id" element={<UserDetail />} />
      <Route path="*" element={<AdminDashboard />} />
    </Routes>
  );
}
