"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = () => {
    setInput("");
    setOutput("");
  };

  const handleGenerate = async () => {
    const trimmed = input.trim();
    const normalized = trimmed.toLowerCase();

    if (!normalized) return;

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

    if (normalized.length < 18 || vagueInputs.includes(normalized)) {
      setOutput(
        "Give me a little more to work with so I can actually help.\n\nTry including:\n- what the employee is doing\n- how long it’s been happening\n- how it’s affecting the team or work\n- what you need help saying or deciding"
      );
      return;
    }

    const offTopicKeywords = [
      "lose weight",
      "weight loss",
      "pounds",
      "diet",
      "calories",
      "recipe",
      "cooking",
      "dinner",
      "lunch",
      "workout",
      "gym",
      "exercise",
      "dating",
      "boyfriend",
      "girlfriend",
      "vacation",
      "travel",
      "birthday",
      "party",
      "my kid",
      "my child",
      "parenting",
      "dog",
      "cat",
      "my boss",
      "boss's",
      "boss is",
      "deal with my boss",
    ];

    const isOffTopic = offTopicKeywords.some((word) =>
      normalized.includes(word)
    );

    if (isOffTopic) {
      setOutput(
        "This tool is for real workplace situations like employee issues, team problems, leadership challenges, and manager decisions.\n\nTell me what’s happening with your employee or team and I’ll help you think it through."
      );
      return;
    }

    const personWords = [
      "employee",
      "employees",
      "team",
      "team member",
      "staff",
      "coworker",
      "co-worker",
      "co worker",
      "direct report",
      "new hire",
      "hire",
      "crew",
      "worker",
      "supervisor",
      "manager",
      "boss",
      "someone on my team",
      "person on my team",
      "my employee",
      "my team",
      "my staff",
      "my crew",
      "this guy",
      "this girl",
      "a guy",
      "a girl",
      "i have a guy",
      "i have a girl",
      "i have an employee",
      "i have someone",
      "i have a person",
    ];

    const behaviorWords = [
      "late",
      "leaving",
      "leave",
      "break",
      "breaks",
      "argue",
      "argues",
      "arguing",
      "attitude",
      "struggling",
      "struggle",
      "falling behind",
      "not listening",
      "pushes back",
      "pushing back",
      "underperforming",
      "performance",
      "conflict",
      "feedback",
      "training",
      "onboarding",
      "missed deadline",
      "missing deadlines",
      "shift",
      "schedule",
      "jobsite",
      "site",
      "electric",
      "electricity",
      "safety",
      "customer",
      "customers",
      "stressed",
      "shutting down",
      "gossip",
      "drama",
      "calling out",
      "mistakes",
      "undermining",
    ];

    const hasPerson = personWords.some((word) => normalized.includes(word));
    const hasBehavior = behaviorWords.some((word) => normalized.includes(word));

    const managerPhrase =
      normalized.includes("i have a") ||
      normalized.includes("i have an") ||
      normalized.includes("i've got a") ||
      normalized.includes("ive got a") ||
      normalized.includes("i got a") ||
      normalized.includes("one of my") ||
      normalized.includes("someone on");

    const isManagerSituation = hasPerson || (managerPhrase && hasBehavior);

    if (!isManagerSituation) {
      setOutput(
        "I’m built for workplace situations where you’re managing an employee, team member, coworker, new hire, or crew issue.\n\nTell me what’s happening with the person or team, and I’ll coach you through it."
      );
      return;
    }

    setLoading(true);
    setOutput("");

    try {
      const res = await fetch("/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: trimmed }),
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
    <main className="page">
      <div className="wrap">
        <section className="hero">
          <div className="heroInner">
            <div className="logoBox">
              <Image
                src="/logo.png"
                alt="Work Like a Team logo"
                width={84}
                height={84}
                style={{ objectFit: "contain" }}
              />
            </div>

            <div className="heroText">
              <div className="tag">Work Like a Team</div>
              <h1>Leadership Assistant</h1>
              <p>Real help for messy leader moments.</p>
            </div>
          </div>
        </section>

        <section className="mobileIntro">
          <div className="sideCard">
            <h2>Built for real manager moments</h2>
            <p>
              Use this when someone is late, pushing back, shutting down,
              underperforming, creating tension, or making leadership harder
              than it needs to be.
            </p>
          </div>

          <div className="darkCard mobileValueCard">
            <h2>What you’ll get</h2>
            <div className="benefits mobileBenefits">
              {[
                "What to say",
                "Why it matters",
                "What to watch for",
                "Clear next steps",
              ].map((item) => (
                <div key={item} className="benefit mobileBenefit">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="layout">
          <div className="mainCard">
            <div className="intro">
              Tell me what’s going on with your employee and I’ll help you think
              through what to say and what to do next.
            </div>

            <label htmlFor="situation" className="label">
              What’s happening?
            </label>

            <p className="helper">
              Best results: include what the employee is doing, how long it’s
              been happening, and how it’s affecting the work or team.
            </p>

            <textarea
              id="situation"
              placeholder="Example: My employee keeps leaving the jobsite during his shift, and it’s creating a safety issue."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="textarea"
            />

            <div className="buttons">
              <button
                onClick={handleGenerate}
                disabled={loading || !input.trim()}
                className="primaryButton"
              >
                {loading ? "Working..." : "Coach Me Through It"}
              </button>

              <button onClick={handleReset} className="secondaryButton">
                Ask Another Question
              </button>
            </div>

            {output && <div className="output">{output}</div>}

            {!output && (
              <p className="smallNote">
                Not sure what to type? Describe the person, the behavior, how
                long it has been happening, and how it affects the work.
              </p>
            )}

            <p className="legalNote">
              For legal or HR-specific situations, always check your state laws,
              company policies, or qualified HR/legal guidance.
            </p>
          </div>

          <aside className="sideColumn">
            <div className="sideCard">
              <h2>Built for real manager moments</h2>
              <p>
                Use this when someone is late, pushing back, shutting down,
                underperforming, creating tension, or making leadership harder
                than it needs to be.
              </p>
            </div>

            <div className="darkCard">
              <h2>What you’ll get</h2>
              <div className="benefits">
                {[
                  "What to say",
                  "Why it matters",
                  "What to watch for",
                  "Clear next steps",
                ].map((item) => (
                  <div key={item} className="benefit">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="noteCard">
              <h2>Quick note</h2>
              <p>
                This tool is for workplace issues. If your question is not about
                an employee, team problem, leadership situation, or work-related
                challenge, it’ll point you back to the right kind of prompt.
              </p>
            </div>
          </aside>
        </section>
      </div>

      <style jsx>{`
        .page {
          min-height: 100vh;
          background: linear-gradient(
            180deg,
            #0f4c4c 0%,
            #165f5a 20%,
            #f3f7f6 20%,
            #f3f7f6 100%
          );
          padding: 32px 18px 50px;
          font-family: Arial, sans-serif;
          color: #163434;
        }

        .wrap {
          max-width: 980px;
          margin: 0 auto;
        }

        .hero {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.08),
            rgba(255, 255, 255, 0.02)
          );
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 24px;
          padding: 28px 24px;
          color: #ffffff;
          margin-bottom: 22px;
          box-shadow: 0 14px 40px rgba(0, 0, 0, 0.18);
        }

        .heroInner {
          display: flex;
          align-items: center;
          gap: 18px;
          flex-wrap: wrap;
        }

        .logoBox {
          background-color: rgba(255, 255, 255, 0.12);
          border-radius: 18px;
          padding: 10px;
          display: inline-flex;
        }

        .heroText {
          flex: 1;
          min-width: 260px;
        }

        .tag {
          display: inline-block;
          background-color: #d7fff4;
          color: #0f4c4c;
          font-size: 12px;
          font-weight: 700;
          padding: 6px 10px;
          border-radius: 999px;
          margin-bottom: 10px;
          letter-spacing: 0.3px;
        }

        h1 {
          margin: 0;
          font-size: 36px;
          line-height: 1.1;
          font-weight: 800;
        }

        .heroText p {
          margin: 12px 0 0 0;
          font-size: 20px;
          line-height: 1.35;
          color: #d8f2ee;
          font-weight: 600;
        }

        .layout {
          display: grid;
          grid-template-columns: minmax(0, 1.35fr) minmax(280px, 0.9fr);
          gap: 22px;
          align-items: start;
        }

        .mobileIntro {
          display: none;
        }

        .mainCard,
        .sideCard,
        .darkCard,
        .noteCard {
          box-sizing: border-box;
        }

        .mainCard {
          background-color: #ffffff;
          border-radius: 24px;
          padding: 28px;
          box-shadow: 0 12px 30px rgba(18, 54, 54, 0.08);
          border: 1px solid #d7ebe8;
          min-width: 0;
        }

        .intro {
          background: linear-gradient(135deg, #ecfffb 0%, #e8f7f3 100%);
          border: 1px solid #b7e8dc;
          color: #154846;
          border-radius: 16px;
          padding: 16px 18px;
          margin-bottom: 22px;
          line-height: 1.55;
          font-size: 16px;
        }

        .label {
          display: block;
          font-weight: 800;
          margin-bottom: 10px;
          color: #184846;
          font-size: 24px;
        }

        .helper {
          margin: 0 0 14px 0;
          color: #55706d;
          font-size: 14px;
          line-height: 1.5;
        }

        .textarea {
          width: 100%;
          min-height: 180px;
          padding: 16px;
          font-size: 16px;
          line-height: 1.55;
          border-radius: 16px;
          border: 1px solid #bdd8d3;
          outline: none;
          resize: vertical;
          box-sizing: border-box;
          background-color: #fcfffe;
          color: #163434;
        }

        .buttons {
          margin-top: 12px;
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .primaryButton,
        .secondaryButton {
          padding: 14px 22px;
          border-radius: 10px;
          cursor: pointer;
          font-size: 16px;
          font-weight: 700;
        }

        .primaryButton {
          background: linear-gradient(135deg, #0f766e 0%, #155e75 100%);
          color: #ffffff;
          border: none;
          box-shadow: 0 10px 20px rgba(15, 118, 110, 0.22);
        }

        .primaryButton:disabled {
          background: #7aa9a4;
          cursor: not-allowed;
        }

        .secondaryButton {
          background-color: #ffffff;
          color: #134e4a;
          border: 1px solid #94a3b8;
        }

        .output {
          margin-top: 26px;
          padding: 22px;
          background: linear-gradient(135deg, #f8fbfb 0%, #f4f8f8 100%);
          border-left: 6px solid #0f766e;
          border-radius: 16px;
          white-space: pre-wrap;
          line-height: 1.7;
          font-size: 15px;
          color: #163434;
          box-shadow: inset 0 0 0 1px #e0ecea;
        }

        .smallNote,
        .legalNote {
          font-size: 13px;
          color: #5f7774;
          line-height: 1.6;
        }

        .smallNote {
          margin-top: 18px;
        }

        .legalNote {
          margin-top: 22px;
        }

        .sideColumn {
          display: flex;
          flex-direction: column;
          gap: 18px;
          min-width: 0;
        }

        .sideCard {
          background-color: #ffffff;
          border-radius: 22px;
          padding: 22px;
          box-shadow: 0 12px 30px rgba(18, 54, 54, 0.08);
          border: 1px solid #d7ebe8;
        }

        .sideCard h2,
        .noteCard h2 {
          margin: 0 0 12px 0;
          font-size: 22px;
          color: #184846;
        }

        .sideCard p {
          margin: 0;
          color: #58706d;
          line-height: 1.65;
          font-size: 15px;
        }

        .darkCard {
          background: linear-gradient(180deg, #134e4a 0%, #123f3d 100%);
          border-radius: 22px;
          padding: 22px;
          color: #ffffff;
          box-shadow: 0 14px 30px rgba(18, 54, 54, 0.18);
        }

        .darkCard h2 {
          margin: 0 0 12px 0;
          font-size: 22px;
        }

        .benefits {
          display: grid;
          gap: 12px;
        }

        .benefit {
          background-color: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 14px;
          padding: 12px 14px;
          font-weight: 700;
          color: #e7fbf7;
        }

        .noteCard {
          background-color: #fffaf0;
          border: 1px solid #f4d9a8;
          border-radius: 22px;
          padding: 22px;
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.04);
        }

        .noteCard h2 {
          color: #7a4b00;
        }

        .noteCard p {
          margin: 0;
          color: #7a5a1d;
          line-height: 1.65;
          font-size: 15px;
        }

        @media (max-width: 760px) {
          .page {
            padding: 12px 10px 32px;
            background: linear-gradient(
              180deg,
              #0f4c4c 0%,
              #165f5a 12%,
              #f3f7f6 12%,
              #f3f7f6 100%
            );
          }

          .hero {
            padding: 14px;
            border-radius: 16px;
            margin-bottom: 10px;
          }

          .heroInner {
            gap: 10px;
            align-items: center;
          }

          .logoBox {
            padding: 6px;
            border-radius: 12px;
          }

          .logoBox img {
            width: 64px !important;
            height: 64px !important;
          }

          .heroText {
            min-width: 0;
          }

          .tag {
            font-size: 11px;
            padding: 5px 9px;
            margin-bottom: 6px;
          }

          h1 {
            font-size: 25px;
          }

          .heroText p {
            font-size: 14px;
            margin-top: 6px;
          }

          .mobileIntro {
            display: grid;
            gap: 8px;
            margin-bottom: 10px;
          }

          .layout {
            display: grid;
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .layout .sideColumn {
            display: none;
          }

          .mainCard,
          .sideCard,
          .darkCard,
          .noteCard {
            width: 100%;
            border-radius: 16px;
          }

          .sideCard {
            padding: 14px;
          }

          .sideCard h2 {
            font-size: 20px;
            margin-bottom: 8px;
          }

          .sideCard p {
            font-size: 14px;
            line-height: 1.45;
          }

          .mainCard {
            padding: 16px;
          }

          .mobileValueCard {
            padding: 10px 12px;
            border-radius: 16px;
          }

          .mobileValueCard h2 {
            font-size: 17px;
            margin-bottom: 8px;
          }

          .mobileBenefits {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 6px;
          }

          .mobileBenefit {
            padding: 7px 8px;
            font-size: 13px;
            line-height: 1.2;
            border-radius: 9px;
            text-align: center;
          }

          .intro {
            font-size: 14px;
            padding: 12px;
            border-radius: 12px;
            margin-bottom: 16px;
            line-height: 1.45;
          }

          .label {
            font-size: 21px;
          }

          .textarea {
            min-height: 155px;
            font-size: 16px;
          }

          .buttons {
            flex-direction: column;
          }

          .primaryButton,
          .secondaryButton {
            width: 100%;
          }

          .noteCard {
            padding: 16px;
          }

          .darkCard {
            padding: 14px;
          }
        }
      `}</style>
    </main>
  );
}