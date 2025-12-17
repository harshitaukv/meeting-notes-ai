"use client";

import { useState } from "react";

export default function Home() {
  const [notes, setNotes] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleExtract() {
    setLoading(true);
    setResult("");

    const res = await fetch("/api/extract", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notes }),
    });

    const data = await res.json();
    setResult(data.actions || data.error);
    setLoading(false);
  }

  return (
    <main style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>📝 Meeting Notes → Action Items</h1>

      <textarea
        placeholder="Paste meeting notes here..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        style={{ width: "100%", height: "150px", marginTop: "20px" }}
      />

      <button
        onClick={handleExtract}
        disabled={loading}
        style={{ marginTop: "15px", padding: "10px 20px" }}
      >
        {loading ? "Extracting..." : "Extract Action Items"}
      </button>

      {result && (
        <pre style={{ marginTop: "20px", background: "#f4f4f4", padding: "15px" }}>
          {result}
        </pre>
      )}
    </main>
  );
}
