import { useState } from "react";

export default function PrivacyFERPrototype() {
  const [mode, setMode] = useState("graph");

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "40px",
        textAlign: "center",
        background: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ fontSize: "2.2rem", marginBottom: "10px" }}>
        Privacy-Preserving Facial Expression Recognition
      </h1>
      <h2 style={{ fontSize: "1.3rem", fontWeight: "normal", color: "#334155" }}>
        Using Graph Neural Networks
      </h2>

      <p
        style={{
          maxWidth: "750px",
          margin: "20px auto 30px auto",
          fontSize: "1.05rem",
          lineHeight: "1.7",
          color: "#475569",
        }}
      >
        This prototype shows how facial expression recognition can work without
        depending on full facial images. Instead of using raw face data, the
        system focuses on facial landmarks and graph-based relationships to
        preserve privacy while still identifying emotion patterns.
      </p>

      <div style={{ marginBottom: "30px" }}>
        <button
          onClick={() => setMode("raw")}
          style={{
            marginRight: "12px",
            padding: "12px 18px",
            borderRadius: "12px",
            border: "1px solid #cbd5e1",
            background: mode === "raw" ? "#2563eb" : "white",
            color: mode === "raw" ? "white" : "#0f172a",
            cursor: "pointer",
            fontSize: "0.95rem",
          }}
        >
          Raw Image Mode
        </button>

        <button
          onClick={() => setMode("graph")}
          style={{
            padding: "12px 18px",
            borderRadius: "12px",
            border: "1px solid #cbd5e1",
            background: mode === "graph" ? "#2563eb" : "white",
            color: mode === "graph" ? "white" : "#0f172a",
            cursor: "pointer",
            fontSize: "0.95rem",
          }}
        >
          Graph Mode (Privacy)
        </button>
      </div>

      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "24px",
        }}
      >
        <div
          style={{
            background: "white",
            borderRadius: "20px",
            padding: "24px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 8px 24px rgba(15, 23, 42, 0.06)",
          }}
        >
          <h3>Traditional View</h3>
          <div
            style={{
              height: "260px",
              borderRadius: "16px",
              border: "1px solid #cbd5e1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#f8fafc",
              marginTop: "16px",
            }}
          >
            Face Image (Identity Visible)
          </div>
          <p style={{ marginTop: "16px", color: "#475569", lineHeight: "1.6" }}>
            Standard facial expression systems often rely on full face images,
            which can reveal identity and create privacy concerns.
          </p>
        </div>

        <div
          style={{
            background: "white",
            borderRadius: "20px",
            padding: "24px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 8px 24px rgba(15, 23, 42, 0.06)",
          }}
        >
          <h3>Proposed View</h3>
          <div
            style={{
              height: "260px",
              borderRadius: "16px",
              border: "1px solid #cbd5e1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#f8fafc",
              marginTop: "16px",
            }}
          >
            {mode === "raw"
              ? "Face Image (Identity Visible)"
              : "Landmark Graph (Identity Hidden)"}
          </div>
          <p style={{ marginTop: "16px", color: "#475569", lineHeight: "1.6" }}>
            In the privacy-aware version, the model learns from facial landmark
            structure instead of full visual identity information.
          </p>
        </div>
      </div>

      <div
        style={{
          marginTop: "32px",
          background: "white",
          maxWidth: "900px",
          marginInline: "auto",
          borderRadius: "20px",
          padding: "28px",
          border: "1px solid #e2e8f0",
          boxShadow: "0 8px 24px rgba(15, 23, 42, 0.06)",
        }}
      >
        <h3>Detected Emotion</h3>
        <p style={{ fontSize: "1.5rem", margin: "12px 0", fontWeight: "bold" }}>
          😊 Happy (84%)
        </p>
        <p style={{ color: "#475569", lineHeight: "1.7" }}>
          The main idea is that the system should still recognize the emotion
          while reducing the amount of identity-specific information being used.
        </p>
      </div>

      <div
        style={{
          marginTop: "32px",
          background: "white",
          maxWidth: "900px",
          marginInline: "auto",
          borderRadius: "20px",
          padding: "28px",
          border: "1px solid #e2e8f0",
          boxShadow: "0 8px 24px rgba(15, 23, 42, 0.06)",
          textAlign: "left",
        }}
      >
        <h3>Why This Matters</h3>
        <p style={{ color: "#475569", lineHeight: "1.8" }}>
          Facial expression recognition is useful in areas like human-computer
          interaction, adaptive learning, and mental health tools. But when
          these systems rely on raw facial images, they can also expose identity.
          This project explores a safer approach by using graph neural networks
          on facial landmarks, so emotion-related information can still be
          analyzed without depending as much on personally identifiable data.
        </p>
      </div>
    </div>
  );
}
