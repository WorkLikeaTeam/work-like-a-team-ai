"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleGenerate = async () => {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input }),
    });

    const data = await res.json();
    setOutput(data.result);
  };

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Work Like a Team Leadership Assistant</h1>

      <textarea
        placeholder="Describe your employee situation..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{
          width: "100%",
          height: "150px",
          marginTop: "20px",
          padding: "12px",
          fontSize: "14px",
        }}
      />

      <button
        onClick={handleGenerate}
        style={{
          marginTop: "20px",
          padding: "14px 22px",
          backgroundColor: "#0f172a",
          color: "#ffffff",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "600",
        }}
      >
        Get Guidance
      </button>

      <div
        style={{
          marginTop: "30px",
          whiteSpace: "pre-wrap",
          lineHeight: "1.5",
        }}
      >
        {output}
      </div>
    </div>
  );
}