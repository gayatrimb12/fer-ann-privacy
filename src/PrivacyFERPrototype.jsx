import { useState } from "react";

export default function PrivacyFERPrototype() {
  const [mode, setMode] = useState("graph");

  return (
    <div style={{ fontFamily: "Arial", padding: "40px", textAlign: "center" }}>
      
      <h1>Privacy-Preserving Facial Expression Recognition</h1>
      <h3>Using Graph Neural Networks</h3>

      <p style={{ maxWidth: "600px", margin: "20px auto" }}>
        This prototype demonstrates how facial expression recognition can work
        without using full facial images. Instead, it uses facial landmarks
        to preserve privacy while still detecting emotions.
      </p>

      {/* BUTTONS */}
      <div style={{ margin: "20px" }}>
        <button onClick={() => setMode("raw")} style={{ marginRight: "10px" }}>
          Raw Image Mode
        </button>
        <button onClick={() => setMode("graph")}>
          Graph Mode (Privacy)
        </button>
      </div>

      {/* VISUAL */}
      <div
        style={{
          width: "250px",
          height: "250px",
          margin: "auto",
          border: "1px solid black",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {mode === "raw" ? (
          <p>Face Image (Identity Visible)</p>
        ) : (
          <p>Landmark Graph (Identity Hidden)</p>
        )}
      </div>

      {/* RESULT */}
      <div style={{ marginTop: "30px" }}>
        <h3>Detected Emotion: 😊 Happy (84%)</h3>
      </div>

      {/* EXPLANATION */}
      <div style={{ marginTop: "40px", maxWidth: "600px", marginInline: "auto" }}>
        <h3>Why This Matters</h3>
        <p>
          Traditional systems use full facial images, which can expose identity.
          This approach focuses only on facial structure, making it safer and
          more suitable for real-world applications like mental health tools
          and AI assistants.
        </p>
      </div>

    </div>
  );
}
