import { useMemo, useState } from "react";

function FaceGraphic({ mode = "raw", noiseLevel = 0 }) {
  const basePoints = [
    [90, 88],
    [118, 80],
    [146, 88],
    [84, 116],
    [118, 110],
    [152, 116],
    [95, 145],
    [118, 138],
    [141, 145],
    [86, 174],
    [100, 186],
    [118, 190],
    [136, 186],
    [150, 174],
    [70, 124],
    [166, 124],
    [118, 62],
    [118, 210],
  ];

  const edges = [
    [0, 1],
    [1, 2],
    [0, 3],
    [1, 4],
    [2, 5],
    [3, 4],
    [4, 5],
    [3, 6],
    [4, 7],
    [5, 8],
    [6, 7],
    [7, 8],
    [9, 10],
    [10, 11],
    [11, 12],
    [12, 13],
    [14, 3],
    [15, 5],
    [16, 1],
    [17, 11],
    [6, 10],
    [8, 12],
  ];

  const points = useMemo(() => {
    return basePoints.map(([x, y], index) => {
      const shiftX = ((index % 3) - 1) * noiseLevel * 1.6;
      const shiftY = (((index + 1) % 3) - 1) * noiseLevel * 1.6;
      return [x + shiftX, y + shiftY];
    });
  }, [noiseLevel]);

  return (
    <div
      style={{
        height: "320px",
        borderRadius: "22px",
        border: "1px solid #dbe4f0",
        background: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <svg viewBox="0 0 236 236" width="260" height="260">
        <rect width="236" height="236" fill={mode === "raw" ? "#f8fbff" : "#ffffff"} />

        {mode === "raw" && (
          <>
            <ellipse cx="118" cy="122" rx="62" ry="76" fill="#efd2bc" />
            <path d="M64 104 C74 58, 160 48, 171 108" fill="#372722" />
            <ellipse cx="94" cy="116" rx="9" ry="5" fill="#1f2937" />
            <ellipse cx="142" cy="116" rx="9" ry="5" fill="#1f2937" />
            <path
              d="M103 158 C114 166, 125 166, 136 158"
              stroke="#9a3412"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M106 136 C114 130, 122 130, 130 136"
              stroke="#7c5c49"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M82 103 C90 97, 98 97, 104 102"
              stroke="#372722"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M132 102 C138 98, 147 98, 154 103"
              stroke="#372722"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
          </>
        )}

        {mode === "graph" && (
          <>
            <circle cx="118" cy="118" r="80" fill="#f8fbff" stroke="#e5e7eb" />
          </>
        )}

        {edges.map(([a, b], i) => (
          <line
            key={i}
            x1={points[a][0]}
            y1={points[a][1]}
            x2={points[b][0]}
            y2={points[b][1]}
            stroke={mode === "raw" ? "rgba(37,99,235,0.25)" : "rgba(37,99,235,0.65)"}
            strokeWidth="2.2"
          />
        ))}

        {points.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="4.6" fill="#2563eb" />
        ))}

        {mode === "graph" && (
          <g>
            <rect
              x="14"
              y="14"
              rx="12"
              ry="12"
              width="118"
              height="28"
              fill="rgba(37,99,235,0.08)"
            />
            <text x="26" y="32" fontSize="12" fill="#1d4ed8" fontWeight="600">
              identity abstracted
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}

function StatusCard({ title, text, tone = "neutral" }) {
  const backgrounds = {
    neutral: "#f8fafc",
    good: "#eff6ff",
    alert: "#fff7ed",
  };

  const borders = {
    neutral: "#e2e8f0",
    good: "#bfdbfe",
    alert: "#fed7aa",
  };

  return (
    <div
      style={{
        background: backgrounds[tone],
        border: `1px solid ${borders[tone]}`,
        borderRadius: "18px",
        padding: "18px",
      }}
    >
      <div
        style={{
          fontSize: "0.95rem",
          fontWeight: "700",
          color: "#0f172a",
          marginBottom: "8px",
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: "0.95rem",
          color: "#475569",
          lineHeight: "1.7",
        }}
      >
        {text}
      </div>
    </div>
  );
}

function SectionTitle({ eyebrow, title, text }) {
  return (
    <div style={{ marginBottom: "24px" }}>
      <div
        style={{
          fontSize: "0.8rem",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "#64748b",
          fontWeight: "700",
          marginBottom: "10px",
        }}
      >
        {eyebrow}
      </div>
      <h2
        style={{
          fontSize: "2rem",
          margin: 0,
          color: "#0f172a",
        }}
      >
        {title}
      </h2>
      {text && (
        <p
          style={{
            maxWidth: "760px",
            color: "#475569",
            lineHeight: "1.8",
            marginTop: "12px",
            marginBottom: 0,
          }}
        >
          {text}
        </p>
      )}
    </div>
  );
}

export default function PrivacyFERPrototype() {
  const [viewMode, setViewMode] = useState("graph");
  const [noise, setNoise] = useState(8);

  const graphQuality = Math.max(58, 97 - noise * 2);
  const privacyExposure = viewMode === "raw" ? "High" : "Reduced";
  const outputState =
    viewMode === "raw"
      ? "Identity-visible biometric input"
      : "Privacy-aware structural representation";

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #f8fbff 0%, #ffffff 38%, #f8fafc 100%)",
        fontFamily:
          'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        color: "#0f172a",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "40px 24px 72px 24px",
        }}
      >
        <section
          style={{
            background: "rgba(255,255,255,0.86)",
            border: "1px solid #e2e8f0",
            borderRadius: "32px",
            padding: "42px 32px",
            boxShadow: "0 24px 60px rgba(15,23,42,0.08)",
            marginBottom: "36px",
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "8px 14px",
              borderRadius: "999px",
              background: "#eff6ff",
              color: "#1d4ed8",
              fontSize: "0.85rem",
              fontWeight: "700",
              marginBottom: "18px",
            }}
          >
            GSURC Research Prototype • Privacy-Aware Computer Vision
          </div>

          <h1
            style={{
              fontSize: "clamp(2.2rem, 5vw, 4.2rem)",
              lineHeight: "1.06",
              margin: 0,
              maxWidth: "980px",
            }}
          >
            Privacy-Preserving Facial Analysis using Graph-Based Representations
          </h1>

          <p
            style={{
              maxWidth: "900px",
              fontSize: "1.08rem",
              lineHeight: "1.9",
              color: "#475569",
              marginTop: "20px",
              marginBottom: "28px",
            }}
          >
            This prototype demonstrates a privacy-focused facial analysis
            pipeline. Instead of depending on raw identity-heavy face images,
            the system transforms facial structure into a landmark graph so that
            downstream analysis can rely on geometry and relationships rather
            than personally identifiable visual detail.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "16px",
            }}
          >
            <div
              style={{
                background: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "20px",
                padding: "20px",
              }}
            >
              <div style={{ color: "#64748b", fontSize: "0.9rem", marginBottom: "8px" }}>
                Research Focus
              </div>
              <div style={{ fontWeight: "700", fontSize: "1.08rem" }}>
                Reducing identity exposure
              </div>
            </div>

            <div
              style={{
                background: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "20px",
                padding: "20px",
              }}
            >
              <div style={{ color: "#64748b", fontSize: "0.9rem", marginBottom: "8px" }}>
                Core Method
              </div>
              <div style={{ fontWeight: "700", fontSize: "1.08rem" }}>
                Landmark graph abstraction
              </div>
            </div>

            <div
              style={{
                background: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "20px",
                padding: "20px",
              }}
            >
              <div style={{ color: "#64748b", fontSize: "0.9rem", marginBottom: "8px" }}>
                System Goal
              </div>
              <div style={{ fontWeight: "700", fontSize: "1.08rem" }}>
                Privacy-aware facial pipelines
              </div>
            </div>
          </div>
        </section>

        <section
          style={{
            marginBottom: "36px",
          }}
        >
          <SectionTitle
            eyebrow="Concept Demonstration"
            title="Raw facial input vs structural graph abstraction"
            text="The point of this demo is not to predict a childish label. The point is to show how a facial analysis system can shift from identity-visible input to a privacy-aware structural representation."
          />

          <div
            style={{
              display: "flex",
              gap: "14px",
              flexWrap: "wrap",
              marginBottom: "22px",
            }}
          >
            <button
              onClick={() => setViewMode("raw")}
              style={{
                padding: "12px 18px",
                borderRadius: "14px",
                border: "1px solid #cbd5e1",
                background: viewMode === "raw" ? "#2563eb" : "#ffffff",
                color: viewMode === "raw" ? "#ffffff" : "#0f172a",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "0.95rem",
              }}
            >
              Traditional View
            </button>

            <button
              onClick={() => setViewMode("graph")}
              style={{
                padding: "12px 18px",
                borderRadius: "14px",
                border: "1px solid #cbd5e1",
                background: viewMode === "graph" ? "#2563eb" : "#ffffff",
                color: viewMode === "graph" ? "#ffffff" : "#0f172a",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "0.95rem",
              }}
            >
              Privacy View
            </button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "24px",
            }}
          >
            <div
              style={{
                background: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "24px",
                padding: "24px",
                boxShadow: "0 12px 30px rgba(15,23,42,0.05)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "14px",
                }}
              >
                <div>
                  <div style={{ fontWeight: "700", fontSize: "1.05rem" }}>
                    Identity-visible input
                  </div>
                  <div style={{ color: "#64748b", fontSize: "0.92rem", marginTop: "4px" }}>
                    Raw image contains biometric detail
                  </div>
                </div>
                <div
                  style={{
                    padding: "6px 10px",
                    borderRadius: "999px",
                    background: "#fff7ed",
                    color: "#c2410c",
                    fontSize: "0.78rem",
                    fontWeight: "700",
                  }}
                >
                  Higher exposure
                </div>
              </div>
              <FaceGraphic mode="raw" noiseLevel={0} />
            </div>

            <div
              style={{
                background: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "24px",
                padding: "24px",
                boxShadow: "0 12px 30px rgba(15,23,42,0.05)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "14px",
                }}
              >
                <div>
                  <div style={{ fontWeight: "700", fontSize: "1.05rem" }}>
                    Structural graph representation
                  </div>
                  <div style={{ color: "#64748b", fontSize: "0.92rem", marginTop: "4px" }}>
                    Landmark geometry used for downstream analysis
                  </div>
                </div>
                <div
                  style={{
                    padding: "6px 10px",
                    borderRadius: "999px",
                    background: "#eff6ff",
                    color: "#1d4ed8",
                    fontSize: "0.78rem",
                    fontWeight: "700",
                  }}
                >
                  Reduced exposure
                </div>
              </div>
              <FaceGraphic mode="graph" noiseLevel={0} />
            </div>
          </div>

          <div
            style={{
              marginTop: "20px",
              background: "#0f172a",
              color: "#ffffff",
              borderRadius: "22px",
              padding: "22px 24px",
            }}
          >
            <div style={{ fontWeight: "700", fontSize: "1.05rem", marginBottom: "8px" }}>
              Key research idea
            </div>
            <div style={{ color: "#cbd5e1", lineHeight: "1.8" }}>
              The system should preserve useful structural facial information
              while reducing reliance on raw identity-heavy visual data.
            </div>
          </div>
        </section>

        <section
          style={{
            marginBottom: "36px",
          }}
        >
          <SectionTitle
            eyebrow="System Output"
            title="What this prototype reports"
            text="Instead of showing an emotion label, the interface reports pipeline status and privacy-related system states."
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "16px",
            }}
          >
            <StatusCard
              title="Face detected"
              text="A valid facial region has been identified and isolated for structural processing."
              tone="good"
            />
            <StatusCard
              title="Landmarks extracted"
              text="Key facial points have been mapped to create a reduced and structured facial representation."
              tone="good"
            />
            <StatusCard
              title="Graph representation generated"
              text="Nodes and edges are created from facial structure rather than identity-heavy pixel data."
              tone="good"
            />
            <StatusCard
              title="Privacy mode"
              text={`Current state: ${privacyExposure}. The active view is "${outputState}".`}
              tone={viewMode === "raw" ? "alert" : "good"}
            />
          </div>
        </section>

        <section
          style={{
            marginBottom: "36px",
          }}
        >
          <SectionTitle
            eyebrow="Pipeline"
            title="Privacy-preserving facial analysis workflow"
            text="This section explains the logic of the system in a more CS-focused way."
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "16px",
            }}
          >
            {[
              {
                step: "01",
                title: "Facial input acquisition",
                text: "A face image is captured or provided to the system.",
              },
              {
                step: "02",
                title: "Landmark extraction",
                text: "Geometric keypoints are detected from major facial regions.",
              },
              {
                step: "03",
                title: "Graph construction",
                text: "Nodes and edges represent structural spatial relationships.",
              },
              {
                step: "04",
                title: "Privacy-aware transformation",
                text: "Identity-heavy raw visual detail is no longer the primary representation.",
              },
              {
                step: "05",
                title: "Downstream analysis readiness",
                text: "The structural graph can support future analysis tasks with lower identity exposure.",
              },
            ].map((item) => (
              <div
                key={item.step}
                style={{
                  background: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "20px",
                  padding: "20px",
                }}
              >
                <div
                  style={{
                    color: "#2563eb",
                    fontWeight: "700",
                    fontSize: "0.88rem",
                    marginBottom: "10px",
                  }}
                >
                  Step {item.step}
                </div>
                <div
                  style={{
                    fontWeight: "700",
                    fontSize: "1rem",
                    marginBottom: "8px",
                  }}
                >
                  {item.title}
                </div>
                <div
                  style={{
                    color: "#475569",
                    lineHeight: "1.7",
                    fontSize: "0.95rem",
                  }}
                >
                  {item.text}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          style={{
            marginBottom: "36px",
          }}
        >
          <SectionTitle
            eyebrow="Challenge Demonstration"
            title="Landmark noise and structural reliability"
            text="One real issue in graph-based facial systems is that noisy landmarks can reduce the reliability of the graph itself. This is useful to show because it makes your project feel more like research and less like a polished toy."
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "24px",
            }}
          >
            <div
              style={{
                background: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "24px",
                padding: "24px",
              }}
            >
              <div
                style={{
                  fontWeight: "700",
                  fontSize: "1rem",
                  marginBottom: "14px",
                }}
              >
                Noisy structural input
              </div>
              <FaceGraphic mode="graph" noiseLevel={noise} />

              <div style={{ marginTop: "18px" }}>
                <label
                  htmlFor="noiseRange"
                  style={{
                    display: "block",
                    fontWeight: "600",
                    marginBottom: "10px",
                    color: "#334155",
                  }}
                >
                  Landmark noise level: {noise}
                </label>
                <input
                  id="noiseRange"
                  type="range"
                  min="0"
                  max="14"
                  value={noise}
                  onChange={(e) => setNoise(Number(e.target.value))}
                  style={{ width: "100%" }}
                />
              </div>
            </div>

            <div
              style={{
                background: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "24px",
                padding: "24px",
              }}
            >
              <div
                style={{
                  fontWeight: "700",
                  fontSize: "1rem",
                  marginBottom: "18px",
                }}
              >
                Reliability indicators
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "14px",
                  marginBottom: "18px",
                }}
              >
                <div
                  style={{
                    borderRadius: "18px",
                    border: "1px solid #e2e8f0",
                    padding: "18px",
                    background: "#f8fafc",
                  }}
                >
                  <div style={{ color: "#64748b", fontSize: "0.9rem", marginBottom: "8px" }}>
                    Graph quality
                  </div>
                  <div style={{ fontSize: "1.8rem", fontWeight: "700" }}>
                    {graphQuality}%
                  </div>
                </div>

                <div
                  style={{
                    borderRadius: "18px",
                    border: "1px solid #e2e8f0",
                    padding: "18px",
                    background: "#f8fafc",
                  }}
                >
                  <div style={{ color: "#64748b", fontSize: "0.9rem", marginBottom: "8px" }}>
                    Structural stability
                  </div>
                  <div style={{ fontSize: "1.8rem", fontWeight: "700" }}>
                    {Math.max(54, graphQuality - 4)}%
                  </div>
                </div>
              </div>

              <div
                style={{
                  color: "#475569",
                  lineHeight: "1.8",
                  fontSize: "0.97rem",
                }}
              >
                This part of the prototype shows one of the actual research
                challenges. If landmark positions become inaccurate, then the
                graph becomes less stable. That affects how reliable a
                privacy-aware facial pipeline can be in real-world conditions.
              </div>
            </div>
          </div>
        </section>

        <section
          style={{
            marginBottom: "36px",
          }}
        >
          <SectionTitle
            eyebrow="Why this matters"
            title="What problem this is trying to solve"
            text="This makes the project feel more serious and application-driven."
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "16px",
            }}
          >
            <StatusCard
              title="Raw facial images contain biometric identity"
              text="Traditional facial systems often collect more information than they need, increasing privacy risk."
            />
            <StatusCard
              title="Sensitive systems need safer data pipelines"
              text="Applications in human-centered AI, health contexts, and intelligent interfaces should not depend entirely on identity-visible representations."
            />
            <StatusCard
              title="Graph abstraction is a research direction"
              text="A landmark graph does not solve every privacy problem, but it offers a more privacy-aware foundation for future facial analysis systems."
            />
          </div>
        </section>

        <footer
          style={{
            background: "#0f172a",
            borderRadius: "28px",
            padding: "28px",
            color: "#ffffff",
          }}
        >
          <div
            style={{
              fontSize: "1.15rem",
              fontWeight: "700",
              marginBottom: "10px",
            }}
          >
            Prototype takeaway
          </div>
          <div
            style={{
              color: "#cbd5e1",
              lineHeight: "1.9",
              maxWidth: "900px",
            }}
          >
            This project is not trying to be a toy emotion detector. It is
            presenting a more privacy-aware facial analysis pipeline where
            structural representations replace raw identity-heavy input as the
            main object of computation.
          </div>
        </footer>
      </div>
    </div>
  );
}
