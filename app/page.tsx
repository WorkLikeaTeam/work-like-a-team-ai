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

  const handleReset = () => {
    setInput("");
    setOutput("");
  };

  const useExample = (text: string) => {
    setInput(text);
    setOutput("");
  };

  const handleGenerate = async () => {
    const trimmed = input.trim().toLowerCase();

    if (!trimmed) return;

    const vagueInputs = [
      "help",
      "i need help",
      "employee issue",
      "team issue",
      "work issue",
      "problem employee",
      "what do i do",
      "manager help",
    ];

    if (trimmed.length < 18 || vagueInputs.includes(trimmed)) {
      setOutput(
        "Give me a little more to work with so I can actually help.\n\nTry including:\n- what the employee is doing\n- how long it’s been happening\n- how it’s affecting the team or work\n- what you need help saying or deciding"
      );
      return;
    }

    const offTopicKeywords = [
      "boyfriend",
      "girlfriend",
      "dating",
      "weight loss",
      "lose weight",
      "dinner",
      "recipe",
      "poem",
      "birthday",
      "my kid",
      "my child",
      "parenting",
      "dog",
      "cat",
      "vacation",
    ];

    const isOffTopic = offTopicKeywords.some((word) => trimmed.includes(word));

    if (isOffTopic) {
      setOutput(
        "This tool is built for real workplace situations like employee issues, team conflict, leadership challenges, and performance concerns.\n\nTell me what’s going on at work and I’ll help you think it through."
      );
      return;
    }

    const workWords = [
      "employee",
      "team",
      "manager",
      "coworker",
      "boss",
      "work",
      "job",
      "staff",
      "guy",
      "person",
      "worker",
      "crew",
      "people",
      "break",
      "breaks",
      "leaving",
      "leave",
      "late",
      "schedule",
      "shift",
      "attendance",
      "performance",
      "conflict",
      "feedback",
      "electricity",
      "electrician",
      "site",
      "jobsite",
    ];

    const isWorkRelated = workWords.some((word) => trimmed.includes(word));

    if (!isWorkRelated) {
      setOutput(
        "I’m built for workplace situations like employee issues, team challenges, and leadership problems.\n\nTell me what’s happening at work and I’ll coach you through it."
      );
      return;
    }

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

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #0f4c4c 0%, #165f5a 20%, #f3f7f6 20%, #f3f7f6 100%)",
        padding: "32px 18px 50px",
        fontFamily: "Arial, sans-serif",
        color: "#163434",
      }}
    >
      <div style={{ maxWidth: "980px", margin: "0 auto" }}>
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "24px",
            padding: "28px 24px",
            color: "#ffffff",
            marginBottom: "22px",
            boxShadow: "0 14px 40px rgba(0,0,0,0.18)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "18px",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                backgroundColor: "rgba(255,255,255,0.12)",
                borderRadius: "18px",
                padding: "10px",
                display: "inline-flex",
              }}
            >
              <Image
                src="/logo.png"
                alt="Work Like a Team logo"
                width={84}
                height={84}
                style={{ objectFit: "contain" }}
              />
            </div>

            <div style={{ flex: 1, minWidth: "260px" }}>
              <div
                style={{
                  display: "inline-block",
                  backgroundColor: "#d7fff4",
                  color: "#0f4c4c",
                  fontSize: "12px",
                  fontWeight: 700,
                  padding: "6px 10px",
                  borderRadius: "999px",
                  marginBottom: "10px",
                  letterSpacing: "0.3px",
                }}
              >
                Work Like a Team
              </div>

              <h1
                style={{
                  margin: 0,
                  fontSize: "36px",
                  lineHeight: 1.1,
                  fontWeight: 800,
                }}
              >
                Leadership Assistant
              </h1>

              <p
                style={{
                  margin: "12px 0 0 0",
                  fontSize: "20px",
                  lineHeight: 1.35,
                  color: "#d8f2ee",
                  fontWeight: 600,
                }}
              >
                Real help for messy leader moments.
              </p>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.3fr 0.9fr",
            gap: "22px",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "24px",
              padding: "28px",
              boxShadow: "0 12px 30px rgba(18, 54, 54, 0.08)",
              border: "1px solid #d7ebe8",
            }}
          >
            <div
              style={{
                background:
                  "linear-gradient(135deg, #ecfffb 0%, #e8f7f3 100%)",
                border: "1px solid #b7e8dc",
                color: "#154846",
                borderRadius: "16px",
                padding: "16px 18px",
                marginBottom: "22px",
                lineHeight: 1.55,
                fontSize: "16px",
              }}
            >
              Tell me what’s going on with your employee and I’ll help you think
              through what to say and what to do next.
            </div>

            <label
              htmlFor="situation"
              style={{
                display: "block",
                fontWeight: 800,
                marginBottom: "10px",
                color: "#184846",
                fontSize: "24px",
              }}
            >
              What’s happening?
            </label>

            <p
              style={{
                margin: "0 0 14px 0",
                color: "#55706d",
                fontSize: "14px",
                lineHeight: 1.5,
              }}
            >
              Best results: include what the employee is doing, how long it’s
              been happening, and how it’s affecting the work or team.
            </p>

            <textarea
              id="situation"
              placeholder="Example: My employee is always late, and the rest of the team is starting to notice."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{
                width: "100%",
                minHeight: "180px",
                padding: "16px",
                fontSize: "16px",
                lineHeight: "1.55",
                borderRadius: "16px",
                border: "1px solid #bdd8d3",
                outline: "none",
                resize: "vertical",
                boxSizing: "border-box",
                backgroundColor: "#fcfffe",
              }}
            />

            <div
              style={{
                marginTop: "12px",
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={handleGenerate}
                disabled={loading || !input.trim()}
                style={{
                  padding: "14px 22px",
                  background:
                    loading || !input.trim()
                      ? "#7aa9a4"
                      : "linear-gradient(135deg, #0f766e 0%, #155e75 100%)",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "10px",
                  cursor: loading || !input.trim() ? "not-allowed" : "pointer",
                  fontSize: "16px",
                  fontWeight: 700,
                  boxShadow: "0 10px 20px rgba(15,118,110,0.22)",
                }}
              >
                {loading ? "Working..." : "Coach Me Through It"}
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
                  marginTop: "26px",
                  padding: "22px",
                  background:
                    "linear-gradient(135deg, #f8fbfb 0%, #f4f8f8 100%)",
                  borderLeft: "6px solid #0f766e",
                  borderRadius: "16px",
                  whiteSpace: "pre-wrap",
                  lineHeight: "1.7",
                  fontSize: "15px",
                  color: "#163434",
                  boxShadow: "inset 0 0 0 1px #e0ecea",
                }}
              >
                {output}
              </div>
            )}

            {!output && (
              <div style={{ marginTop: "22px" }}>
                <p
                  style={{
                    margin: "0 0 12px 0",
                    fontWeight: 800,
                    color: "#184846",
                    fontSize: "20px",
                  }}
                >
                  Try one of these:
                </p>

                <div style={{ display: "grid", gap: "12px" }}>
                  {examples.map((example, index) => (
                    <button
                      key={index}
                      onClick={() => useExample(example)}
                      style={{
                        textAlign: "left",
                        padding: "14px 16px",
                        background:
                          "linear-gradient(135deg, #f2fffb 0%, #ebf9f6 100%)",
                        border: "1px solid #9be7d3",
                        borderRadius: "14px",
                        cursor: "pointer",
                        color: "#174846",
                        fontSize: "15px",
                        fontWeight: 600,
                      }}
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <p
              style={{
                marginTop: "22px",
                fontSize: "13px",
                color: "#5f7774",
                lineHeight: 1.6,
              }}
            >
              For legal or HR-specific situations, always check your state laws,
              company policies, or qualified HR/legal guidance.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "18px",
            }}
          >
            <div
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "22px",
                padding: "22px",
                boxShadow: "0 12px 30px rgba(18, 54, 54, 0.08)",
                border: "1px solid #d7ebe8",
              }}
            >
              <h2
                style={{
                  margin: "0 0 12px 0",
                  fontSize: "22px",
                  color: "#184846",
                }}
              >
                Built for real manager moments
              </h2>
              <p
                style={{
                  margin: 0,
                  color: "#58706d",
                  lineHeight: 1.65,
                  fontSize: "15px",
                }}
              >
                Use this when someone is late, pushing back, shutting down,
                underperforming, creating tension, or making leadership harder
                than it needs to be.
              </p>
            </div>

            <div
              style={{
                background:
                  "linear-gradient(180deg, #134e4a 0%, #123f3d 100%)",
                borderRadius: "22px",
                padding: "22px",
                color: "#ffffff",
                boxShadow: "0 14px 30px rgba(18, 54, 54, 0.18)",
              }}
            >
              <h2
                style={{
                  margin: "0 0 12px 0",
                  fontSize: "22px",
                }}
              >
                What you’ll get
              </h2>

              <div style={{ display: "grid", gap: "12px" }}>
                {[
                  "What to say",
                  "Why it matters",
                  "What to watch for",
                  "Clear next steps",
                ].map((item) => (
                  <div
                    key={item}
                    style={{
                      backgroundColor: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "14px",
                      padding: "12px 14px",
                      fontWeight: 700,
                      color: "#e7fbf7",
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                backgroundColor: "#fffaf0",
                border: "1px solid #f4d9a8",
                borderRadius: "22px",
                padding: "22px",
                boxShadow: "0 10px 24px rgba(0,0,0,0.04)",
              }}
            >
              <h2
                style={{
                  margin: "0 0 12px 0",
                  fontSize: "22px",
                  color: "#7a4b00",
                }}
              >
                Quick note
              </h2>
              <p
                style={{
                  margin: 0,
                  color: "#7a5a1d",
                  lineHeight: 1.65,
                  fontSize: "15px",
                }}
              >
                This tool is for workplace issues. If your question is not about
                an employee, team problem, leadership situation, or work-related
                challenge, it’ll point you back to the right kind of prompt.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
