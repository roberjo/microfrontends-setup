const tasks = [
  "Collect KYC documents",
  "Review customer income sources",
  "Validate account funding",
  "Confirm beneficiary details"
];

export default function App() {
  return (
    <div className="mfe">
      <header>
        <p className="eyebrow">Retail Banking</p>
        <h1>Customer Onboarding</h1>
        <p>
          Guide new customers through intake, data verification, and account
          creation workflows.
        </p>
      </header>
      <section className="panel">
        <h2>Today’s Tasks</h2>
        <ul>
          {tasks.map((task) => (
            <li key={task}>{task}</li>
          ))}
        </ul>
      </section>
      <section className="panel">
        <h2>Data Review</h2>
        <p>
          Review submitted applications, flag inconsistencies, and request
          missing documents.
        </p>
        <button type="button">Open Review Queue</button>
      </section>
    </div>
  );
}
