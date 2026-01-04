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

export default function App() {
  return (
    <div className="mfe">
      <header>
        <p className="eyebrow">Admin</p>
        <h1>Access Management</h1>
        <p>Grant, revoke, and review line of business access in one place.</p>
      </header>

      <section className="panel">
        <div className="filters">
          <input placeholder="Filter by user" />
          <input placeholder="Filter by LOB" />
          <input placeholder="Filter by role" />
        </div>
      </section>

      <section className="panel">
        <h2>Current Access</h2>
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>LOB</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {accessRows.map((row) => (
              <tr key={row.user + row.lob}>
                <td>{row.user}</td>
                <td>{row.lob}</td>
                <td>{row.role}</td>
                <td>{row.status}</td>
                <td>
                  <button type="button" className="ghost">
                    View
                  </button>
                  <button type="button">Revoke</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
