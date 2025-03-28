import React, { useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const callApi = async () => {
    setLoading(true);
    setResult("");
    try {
      const res = await fetch("https://your-api-id.execute-api.YOUR-REGION.amazonaws.com/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();
      setResult(data.generated_sql || "No SQL returned.");
    } catch (err) {
      setResult("Error: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif", maxWidth: 800, margin: "auto" }}>
      <h1>NL ➝ SQL Generator</h1>
      <textarea
        rows={4}
        style={{ width: "100%", marginBottom: "1rem" }}
        placeholder="Type your question here..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <br />
      <button onClick={callApi} disabled={loading}>
        {loading ? "Generating..." : "Generate SQL"}
      </button>

      {result && (
        <pre style={{ marginTop: "1rem", backgroundColor: "#f3f3f3", padding: "1rem", borderRadius: "8px" }}>
          {result}
        </pre>
      )}
    </div>
  );
}

export default App;
