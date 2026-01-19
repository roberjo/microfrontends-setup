import "./styles.css";
import { useState } from "react";
import { Link, Route, Routes, useLocation, useParams } from "react-router-dom";
import {
  Breadcrumbs,
  KPIStrip,
  Panel,
  PanelHeader,
  PageHeader,
  FilterForm,
  DataTable,
  StatusBadge,
  Pill,
  DetailGrid,
  DetailItem,
  type KPI,
  type BreadcrumbItem,
  type FilterField,
  type TableColumn,
} from "@finserve/shared-ui";

interface Application {
  id: string;
  name: string;
  segment: string;
  product: string;
  amount: string;
  status: string;
  owner: string;
  updated: string;
}

interface PipelineStage {
  stage: string;
  count: number;
  pct: number;
}

interface Alert {
  title: string;
  detail: string;
}

const kpis: KPI[] = [
  { label: "Active Applications", value: "128", delta: "+12%" },
  { label: "KYC Exceptions", value: "34", delta: "-4%" },
  { label: "Avg. Cycle Time", value: "2.4 days", delta: "-0.6d" },
  { label: "High-Risk Flags", value: "7", delta: "+2" },
];

const pipeline: PipelineStage[] = [
  { stage: "Intake", count: 58, pct: 72 },
  { stage: "Verification", count: 41, pct: 54 },
  { stage: "Underwriting", count: 19, pct: 38 },
  { stage: "Approval", count: 10, pct: 20 },
];

const alerts: Alert[] = [
  {
    title: "Enhanced due diligence required",
    detail: "3 applications flagged for elevated review.",
  },
  { title: "Missing disclosures", detail: "7 files missing disclosures." },
  { title: "Income verification SLA", detail: "5 cases exceed 48 hours." },
];

const applications: Application[] = [
  {
    id: "APP-2045",
    name: "R. Henderson",
    segment: "Retail",
    product: "Premier Checking",
    amount: "$250,000",
    status: "Verification",
    owner: "A. Rivera",
    updated: "2h ago",
  },
  {
    id: "APP-2044",
    name: "M. Alvarez",
    segment: "Treasury",
    product: "Treasury Plus",
    amount: "$1.2M",
    status: "Underwriting",
    owner: "J. Kim",
    updated: "4h ago",
  },
  {
    id: "APP-2039",
    name: "S. Nakamura",
    segment: "Wealth",
    product: "Wealth Select",
    amount: "$480,000",
    status: "Approval",
    owner: "M. Patel",
    updated: "6h ago",
  },
  {
    id: "APP-2034",
    name: "D. Singh",
    segment: "Retail",
    product: "Starter Checking",
    amount: "$85,000",
    status: "Intake",
    owner: "S. Boyd",
    updated: "1d ago",
  },
];

const filterFields: FilterField[] = [
  { id: "search", label: "Search", type: "text", placeholder: "Applicant, ID, or account" },
  {
    id: "segment",
    label: "Segment",
    type: "select",
    options: [
      { value: "", label: "All segments" },
      { value: "retail", label: "Retail" },
      { value: "wealth", label: "Wealth" },
      { value: "treasury", label: "Treasury" },
    ],
  },
  {
    id: "status",
    label: "Status",
    type: "select",
    options: [
      { value: "", label: "All statuses" },
      { value: "intake", label: "Intake" },
      { value: "verification", label: "Verification" },
      { value: "underwriting", label: "Underwriting" },
      { value: "approval", label: "Approval" },
    ],
  },
  {
    id: "owner",
    label: "Owner",
    type: "select",
    options: [
      { value: "", label: "All owners" },
      { value: "a-rivera", label: "A. Rivera" },
      { value: "j-kim", label: "J. Kim" },
      { value: "m-patel", label: "M. Patel" },
    ],
  },
];

function useOrdersBreadcrumbs(): BreadcrumbItem[] {
  const location = useLocation();
  const parts = location.pathname.split("/").filter(Boolean);
  const trail: BreadcrumbItem[] = [{ label: "Orders", to: "/" }];

  if (parts[0] === "applications" && parts[1]) {
    trail.push({ label: "Applications", to: "/" });
    trail.push({ label: parts[1], to: `/applications/${parts[1]}` });
  }

  return trail;
}

function OrdersDashboard() {
  const [compactRows, setCompactRows] = useState(false);
  const breadcrumbs = useOrdersBreadcrumbs();

  const columns: TableColumn<Application>[] = [
    {
      key: "id",
      header: "Application ID",
      className: "col-tight",
      render: (row) => (
        <Link className="link" to={`/applications/${row.id}`}>
          {row.id}
        </Link>
      ),
    },
    { key: "name", header: "Applicant" },
    { key: "segment", header: "Segment" },
    { key: "product", header: "Product" },
    { key: "amount", header: "Amount", className: "col-tight col-money" },
    {
      key: "status",
      header: "Status",
      className: "col-tight col-status",
      render: (row) => <StatusBadge status={row.status} />,
    },
    { key: "owner", header: "Owner" },
    { key: "updated", header: "Updated", className: "col-tight" },
  ];

  return (
    <div className="mfe">
      <Breadcrumbs items={breadcrumbs} />
      <PageHeader
        title="Customer Onboarding"
        subtitle="Track applications, validate customer data, and prioritize reviews."
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
              Export Queue
            </button>
            <button type="button">New Application</button>
          </>
        }
      />

      <KPIStrip kpis={kpis} />

      <Panel className="form-panel">
        <FilterForm fields={filterFields} />
      </Panel>

      <section className="content-split">
        <Panel>
          <PanelHeader
            title="Application Queue"
            actions={
              <button type="button" className="ghost">
                Export
              </button>
            }
          />
          <DataTable
            columns={columns}
            rows={applications}
            keyField="id"
            compact={compactRows}
          />
        </Panel>

        <aside className="side-stack">
          <Panel>
            <PanelHeader title="Pipeline Stages" titleLevel="h3" badge={<Pill>Live</Pill>} />
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
          </Panel>

          <Panel className="alert-panel">
            <PanelHeader title="Risk & Compliance" titleLevel="h3" badge={<Pill>Priority</Pill>} />
            <div className="alert-list">
              {alerts.map((alert) => (
                <div key={alert.title} className="alert">
                  <strong>{alert.title}</strong>
                  <p>{alert.detail}</p>
                </div>
              ))}
            </div>
          </Panel>
        </aside>
      </section>
    </div>
  );
}

function ApplicationDetail() {
  const { id } = useParams();
  const breadcrumbs = useOrdersBreadcrumbs();

  const checklistData = [
    { req: "KYC Documents", status: "In Review", owner: "A. Rivera", updated: "2h ago" },
    { req: "Income Verification", status: "Requested", owner: "J. Kim", updated: "4h ago" },
    { req: "Funding Source", status: "Complete", owner: "M. Patel", updated: "Yesterday" },
  ];

  return (
    <div className="mfe">
      <Breadcrumbs items={breadcrumbs} />
      <PageHeader
        title={`Application ${id}`}
        subtitle="Review applicant details, verification status, and required actions."
        actions={
          <>
            <Link className="ghost button-link" to="/">
              Back to queue
            </Link>
            <button type="button">Request Documents</button>
          </>
        }
      />
      <Panel>
        <PanelHeader title="Applicant Summary" badge={<Pill>Verification</Pill>} />
        <DetailGrid>
          <DetailItem label="Primary Contact" value="R. Henderson" />
          <DetailItem label="Segment" value="Retail" />
          <DetailItem label="Requested Product" value="Premier Checking" />
          <DetailItem label="Requested Amount" value="$250,000" />
        </DetailGrid>
      </Panel>
      <Panel>
        <PanelHeader title="Verification Checklist" />
        <table className="data-table">
          <thead>
            <tr>
              <th>Requirement</th>
              <th className="col-tight col-status">Status</th>
              <th>Owner</th>
              <th className="col-tight">Updated</th>
            </tr>
          </thead>
          <tbody>
            {checklistData.map((item) => (
              <tr key={item.req}>
                <td>{item.req}</td>
                <td className="col-tight col-status">
                  <StatusBadge status={item.status} />
                </td>
                <td>{item.owner}</td>
                <td className="col-tight">{item.updated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
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
