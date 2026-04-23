"use client";

import Image from "next/image";
import { useState } from "react";


export default function Home() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const examples = [
    "An employee is always late and it’s affecting the rest of the team.",
    "Two team members aren’t getting along and it’s creating tension.",
    "A strong employee has a bad attitude and it’s bringing the team down.",
  ];

  const handleGenerate = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setOutput("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input }),
      });

      const data = await res.json();
      setOutput(data.result || "Something went wrong. Please try again.");
    } catch {
      setOutput("Something went wrong while generating guidance. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setInput("");
    setOutput("");
  };

  const useExample = (text: string) => {
    setInput(text);
    setOutput("");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f7faf9",
        padding: "40px 20px",
        fontFamily: "Arial, sans-serif",
        color: "#102a2a",
      }}
    >
      <div
        style={{
          maxWidth: "860px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          padding: "32px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          borderTop: "8px solid #0f766e",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "18px" }}>
          <Image
            src="/logo.png"
            alt="Work Like a Team logo"
            width={110}
            height={110}
            style={{ objectFit: "contain" }}
          />
          <h1
            style={{
              margin: "12px 0 0 0",
              fontSize: "30px",
              color: "#134e4a",
            }}
          >
            Work Like a Team Leadership Assistant
          </h1>
          <p
            style={{
              margin: "10px 0 0 0",
              color: "#3f5f5c",
              fontSize: "16px",
            }}
          >
            Practical guidance for real workplace situations.
          </p>
        </div>

        <div
          style={{
            backgroundColor: "#ecfdf5",
            border: "1px solid #99f6e4",
            color: "#134e4a",
            borderRadius: "12px",
            padding: "14px 16px",
            marginBottom: "20px",
            lineHeight: "1.5",
          }}
        >
          Describe a real employee or team issue. This tool helps managers think through
          what to say, why it matters, what to watch for, and what to do next.
        </div>

        <label
          htmlFor="situation"
          style={{
            display: "block",
            fontWeight: 700,
            marginBottom: "10px",
            color: "#134e4a",
          }}
        >
          What’s happening?
        </label>

        <textarea
          id="situation"
          placeholder="Example: My employee is always late, and the rest of the team is starting to notice."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            width: "100%",
            minHeight: "170px",
            padding: "14px",
            fontSize: "15px",
            lineHeight: "1.5",
            borderRadius: "12px",
            border: "1px solid #bfd8d5",
            outline: "none",
            resize: "vertical",
            boxSizing: "border-box",
          }}
        />

        <div style={{ marginTop: "16px" }}>
          <p
            style={{
              margin: "0 0 10px 0",
              fontWeight: 700,
              color: "#134e4a",
            }}
          >
            Try one of these:
          </p>

          <div style={{ display: "grid", gap: "10px" }}>
            {examples.map((example, index) => (
              <button
                key={index}
                onClick={() => useExample(example)}
                style={{
                  textAlign: "left",
                  padding: "12px 14px",
                  backgroundColor: "#f0fdfa",
                  border: "1px solid #99f6e4",
                  borderRadius: "10px",
                  cursor: "pointer",
                  color: "#134e4a",
                  fontSize: "14px",
                }}
              >
                {example}
              </button>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            marginTop: "22px",
          }}
        >
          <button
            onClick={handleGenerate}
            disabled={loading || !input.trim()}
            style={{
              padding: "14px 22px",
              backgroundColor: loading || !input.trim() ? "#7aa9a4" : "#0f766e",
              color: "#ffffff",
              border: "none",
              borderRadius: "10px",
              cursor: loading || !input.trim() ? "not-allowed" : "pointer",
              fontSize: "16px",
              fontWeight: 700,
            }}
          >
            {loading ? "Working..." : "Get Guidance"}
          </button>

          <button
            onClick={handleReset}
            style={{
              padding: "14px 22px",
              backgroundColor: "#ffffff",
              color: "#134e4a",
              border: "1px solid #94a3b8",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: 700,
            }}
          >
            Ask Another Question
          </button>
        </div>

        {output && (
          <div
            style={{
              marginTop: "28px",
              padding: "22px",
              backgroundColor: "#f8fafc",
              borderLeft: "6px solid #0f766e",
              borderRadius: "12px",
              whiteSpace: "pre-wrap",
              lineHeight: "1.65",
              fontSize: "15px",
            }}
          >
            {output}
          </div>
        )}

        <p
          style={{
            marginTop: "22px",
            fontSize: "13px",
            color: "#58706d",
            lineHeight: "1.5",
          }}
        >
          For legal or HR-specific situations, always check your state laws, company
          policies, or qualified HR/legal guidance.
        </p>
      </div>
    </div>
  );
}