"use client";

import { useState } from "react";

export default function Home() {
  const [notes, setNotes] = useState("");
  const [items, setItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const extractActionItems = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/extract", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ notes }),
      });

      const data = await res.json();
      setItems(data.items || []);
    } catch (error) {
      console.error("Error extracting items:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#0b0b0b",
        color: "white",
        padding: "40px",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>
        📝 Meeting Notes → Action Items
      </h1>

      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Paste your meeting notes here..."
        style={{
          width: "100%",
          height: "180px",
          padding: "12px",
          fontSize: "15px",
          backgroundColor: "#2b2b2b",
          color: "white",
          border: "1px solid #444",
          borderRadius: "6px",
          marginBottom: "16px",
        }}
      />

      <button
        onClick={extractActionItems}
        disabled={loading || !notes.trim()}
        style={{
          padding: "10px 18px",
          backgroundColor: "#6c63ff",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "14px",
        }}
      >
        {loading ? "Extracting..." : "Extract Action Items"}
      </button>

      <div
        style={{
          marginTop: "30px",
          backgroundColor: "#ffffff",
          color: "#000000",
          padding: "20px",
          borderRadius: "6px",
          minHeight: "120px",
        }}
      >
        {items.length === 0 && (
          <p style={{ opacity: 0.6 }}>
            Extracted action items will appear here.
          </p>
        )}

        {items.length > 0 && (
          <ul>
            {items.map((item, index) => (
              <li key={index} style={{ marginBottom: "8px" }}>
                • {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
