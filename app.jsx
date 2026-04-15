import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  ScanFace,
  Network,
  EyeOff,
  Lock,
  Brain,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Activity,
  Sparkles,
  LineChart,
  Microscope,
  Layers,
  Upload,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";

const emotions = [
  { label: "Happy", value: 84 },
  { label: "Neutral", value: 10 },
  { label: "Surprised", value: 4 },
  { label: "Sad", value: 2 },
];

const landmarks = [
  [90, 90], [118, 82], [146, 90],
  [86, 118], [118, 112], [150, 118],
  [98, 146], [118, 142], [138, 146],
  [84, 174], [102, 186], [118, 190], [134, 186], [152, 174],
  [68, 124], [168, 124], [118, 66], [118, 212],
];

const edges = [
  [0,1],[1,2],[0,3],[1,4],[2,5],
  [3,4],[4,5],[3,6],[4,7],[5,8],
  [6,7],[7,8],[9,10],[10,11],[11,12],[12,13],
  [14,3],[15,5],[16,1],[17,11],
  [6,10],[8,12]
];

function FacePanel({ showIdentity = true, noise = 0, interactive = false }) {
  const adjustedLandmarks = useMemo(() => {
    return landmarks.map(([x, y], idx) => {
      const n = noise * ((idx % 3) - 1) * 3;
      const m = noise * (((idx + 1) % 3) - 1) * 3;
      return [x + n, y + m];
    });
  }, [noise]);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[320px] rounded-[28px] border bg-white shadow-sm overflow-hidden">
      <svg viewBox="0 0 236 236" className="h-full w-full">
        <defs>
          <linearGradient id="bgGrad" x1="0" x2="1">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#eef2ff" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="236" height="236" fill="url(#bgGrad)" />

        {showIdentity && (
          <>
            <ellipse cx="118" cy="120" rx="62" ry="76" fill="#f6d6bf" />
            <path d="M64 105 C74 58, 161 46, 171 109" fill="#3f2d28" />
            <ellipse cx="94" cy="116" rx="9" ry="5" fill="#1f2937" />
            <ellipse cx="142" cy="116" rx="9" ry="5" fill="#1f2937" />
            <path d="M103 158 C114 166, 125 166, 136 158" stroke="#b45309" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M106 136 C114 130, 122 130, 130 136" stroke="#7c5c49" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M82 103 C90 97, 98 97, 104 102" stroke="#3f2d28" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M132 102 C138 98, 147 98, 154 103" stroke="#3f2d28" strokeWidth="4" fill="none" strokeLinecap="round" />
          </>
        )}

        {!showIdentity && (
          <>
            <rect x="0" y="0" width="236" height="236" fill="#ffffff" />
            <circle cx="118" cy="118" r="78" fill="#f8fafc" stroke="#e5e7eb" />
          </>
        )}

        {edges.map(([a, b], i) => (
          <line
            key={i}
            x1={adjustedLandmarks[a][0]}
            y1={adjustedLandmarks[a][1]}
            x2={adjustedLandmarks[b][0]}
            y2={adjustedLandmarks[b][1]}
            stroke={showIdentity ? "rgba(79,70,229,0.35)" : "rgba(79,70,229,0.55)"}
            strokeWidth="2.2"
          />
        ))}

        {adjustedLandmarks.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="4.6" fill="#4f46e5" />
        ))}

        {interactive && !showIdentity && (
          <g>
            <rect x="14" y="14" rx="14" ry="14" width="112" height="30" fill="rgba(79,70,229,0.08)" />
            <text x="28" y="34" fontSize="13" fill="#312e81" fontWeight="600">Identity hidden</text>
          </g>
        )}
      </svg>
    </div>
  );
}

function EmotionBars() {
  return (
    <div className="space-y-4">
      {emotions.map((item) => (
        <div key={item.label} className="space-y-1">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-slate-700">{item.label}</span>
            <span className="text-slate-500">{item.value}%</span>
          </div>
          <Progress value={item.value} className="h-2" />
        </div>
      ))}
    </div>
  );
}

function FlowCard({ icon: Icon, title, text }) {
  return (
    <motion.div whileHover={{ y: -4 }} className="rounded-[24px] border bg-white p-5 shadow-sm">
      <div className="mb-4 inline-flex rounded-2xl bg-slate-100 p-3">
        <Icon className="h-5 w-5 text-slate-700" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-slate-900">{title}</h3>
      <p className="text-sm leading-6 text-slate-600">{text}</p>
    </motion.div>
  );
}

export default function PrivacyPreservingFERPrototype() {
  const [noise, setNoise] = useState([15]);
  const [mode, setMode] = useState("graph");

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900">
      <section className="relative overflow-hidden border-b bg-white/80 backdrop-blur">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.14),transparent_28%),radial-gradient(circle_at_top_left,rgba(14,165,233,0.10),transparent_25%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-14 md:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
          <div>
            <Badge className="mb-5 rounded-full px-4 py-1 text-sm">GSURC Research Prototype • Privacy-Aware AI</Badge>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 md:text-6xl"
            >
              Privacy-Preserving Facial Expression Recognition using Graph Neural Networks
            </motion.h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              A prototype that shows how emotion recognition can work without relying on raw facial images. Instead of learning identity-heavy pixels, the system focuses on facial landmark relationships through graph-based representations.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" className="rounded-2xl px-6">
                Explore Prototype <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-2xl px-6">
                View Research Flow
              </Button>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <Card className="rounded-[22px] border-white/60 shadow-sm">
                <CardContent className="p-5">
                  <div className="mb-2 flex items-center gap-2 text-sm text-slate-500"><Shield className="h-4 w-4" /> Privacy Goal</div>
                  <div className="text-xl font-semibold">Reduce identity exposure</div>
                </CardContent>
              </Card>
              <Card className="rounded-[22px] border-white/60 shadow-sm">
                <CardContent className="p-5">
                  <div className="mb-2 flex items-center gap-2 text-sm text-slate-500"><Network className="h-4 w-4" /> Core Method</div>
                  <div className="text-xl font-semibold">Landmark graph learning</div>
                </CardContent>
              </Card>
              <Card className="rounded-[22px] border-white/60 shadow-sm">
                <CardContent className="p-5">
                  <div className="mb-2 flex items-center gap-2 text-sm text-slate-500"><Brain className="h-4 w-4" /> Research Focus</div>
                  <div className="text-xl font-semibold">Expression without identity</div>
                </CardContent>
              </Card>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
          >
            <Card className="rounded-[30px] border-white/70 bg-white/90 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl">Live concept demo</CardTitle>
                <CardDescription>Compare identity-heavy input with a privacy-aware graph representation.</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="comparison" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 rounded-2xl">
                    <TabsTrigger value="comparison" className="rounded-2xl">Side-by-side</TabsTrigger>
                    <TabsTrigger value="analysis" className="rounded-2xl">Emotion output</TabsTrigger>
                  </TabsList>

                  <TabsContent value="comparison" className="mt-6 space-y-5">
                    <div className="grid gap-5 md:grid-cols-2">
                      <div>
                        <div className="mb-3 flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-slate-900">Traditional input</p>
                            <p className="text-xs text-slate-500">Raw face image reveals identity</p>
                          </div>
                          <Badge variant="outline" className="rounded-full">Identity visible</Badge>
                        </div>
                        <FacePanel showIdentity />
                      </div>
                      <div>
                        <div className="mb-3 flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-slate-900">Proposed input</p>
                            <p className="text-xs text-slate-500">Graph of facial landmarks only</p>
                          </div>
                          <Badge className="rounded-full">Privacy-aware</Badge>
                        </div>
                        <FacePanel showIdentity={false} interactive />
                      </div>
                    </div>

                    <div className="rounded-[24px] border bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                      The key idea is not to remove emotion information. It is to remove unnecessary identity-specific visual details while keeping the facial structure needed for expression analysis.
                    </div>
                  </TabsContent>

                  <TabsContent value="analysis" className="mt-6">
                    <div className="grid gap-6 md:grid-cols-[0.95fr_1.05fr]">
                      <FacePanel showIdentity={mode === "raw"} interactive={mode === "graph"} />
                      <div className="space-y-5">
                        <div className="flex flex-wrap gap-3">
                          <Button
                            variant={mode === "raw" ? "default" : "outline"}
                            className="rounded-2xl"
                            onClick={() => setMode("raw")}
                          >
                            Raw Image Mode
                          </Button>
                          <Button
                            variant={mode === "graph" ? "default" : "outline"}
                            className="rounded-2xl"
                            onClick={() => setMode("graph")}
                          >
                            Graph Mode
                          </Button>
                        </div>
                        <EmotionBars />
                        <div className="rounded-[24px] border bg-slate-50 p-4">
                          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-900">
                            <Activity className="h-4 w-4" /> Model takeaway
                          </div>
                          <p className="text-sm leading-6 text-slate-600">
                            In graph mode, the system still captures expression patterns while exposing far less identifiable facial information.
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="mb-8 flex items-end justify-between gap-6 flex-wrap">
          <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-[0.18em] text-slate-500">Why this matters</p>
            <h2 className="text-3xl font-semibold tracking-tight">What problem is this prototype trying to solve?</h2>
          </div>
          <Badge variant="outline" className="rounded-full px-4 py-1 text-sm">Computer Vision • Privacy-Aware ML • Graph Learning</Badge>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <FlowCard
            icon={EyeOff}
            title="Raw images expose identity"
            text="Most facial expression systems work directly on full face images. That means the same data used for emotion prediction can also reveal who the person is."
          />
          <FlowCard
            icon={Shield}
            title="Sensitive applications need safer pipelines"
            text="In areas like mental health tools, adaptive learning, and human-centered AI, users may not feel comfortable sharing full facial images."
          />
          <FlowCard
            icon={Network}
            title="Graph structure can keep the useful part"
            text="Facial landmarks preserve geometric expression patterns. A GNN can learn from those relationships without relying on detailed visual identity cues."
          />
        </div>
      </section>

      <section className="border-y bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10">
          <div className="mb-10">
            <p className="mb-2 text-sm font-medium uppercase tracking-[0.18em] text-slate-500">System design</p>
            <h2 className="text-3xl font-semibold tracking-tight">Prototype pipeline</h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-4">
            {[
              { icon: Upload, title: "Input", text: "User uploads an image or uses a sample expression." },
              { icon: ScanFace, title: "Landmark Extraction", text: "Key facial points are detected from the face." },
              { icon: Network, title: "Graph Conversion", text: "Nodes and edges are formed from facial landmarks." },
              { icon: Brain, title: "GNN Inference", text: "The graph is used to predict emotion with less identity exposure." },
            ].map((step, idx) => (
              <div key={step.title} className="relative">
                <Card className="h-full rounded-[24px] shadow-sm">
                  <CardContent className="p-6">
                    <div className="mb-4 inline-flex rounded-2xl bg-slate-100 p-3">
                      <step.icon className="h-5 w-5 text-slate-700" />
                    </div>
                    <div className="mb-2 text-sm text-slate-500">Step {idx + 1}</div>
                    <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
                    <p className="text-sm leading-6 text-slate-600">{step.text}</p>
                  </CardContent>
                </Card>
                {idx < 3 && (
                  <ArrowRight className="absolute -right-3 top-1/2 hidden h-6 w-6 -translate-y-1/2 text-slate-300 lg:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <Card className="rounded-[28px] shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Microscope className="h-5 w-5" /> What makes this different?</CardTitle>
              <CardDescription>This prototype is designed to communicate the research idea, not just the output.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-6 text-slate-600">
              <div className="flex gap-3 rounded-2xl border p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-slate-900" />
                <p>It clearly compares traditional identity-heavy FER with a privacy-aware graph-based pipeline.</p>
              </div>
              <div className="flex gap-3 rounded-2xl border p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-slate-900" />
                <p>It uses a landmark graph visual so viewers immediately understand what information is kept and what information is removed.</p>
              </div>
              <div className="flex gap-3 rounded-2xl border p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-slate-900" />
                <p>It frames the research around privacy, representation learning, and real-world trust instead of only prediction accuracy.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[28px] shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><AlertTriangle className="h-5 w-5" /> Current challenge simulation</CardTitle>
              <CardDescription>Noise in facial landmarks can hurt expression recognition quality.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-[0.95fr_1.05fr]">
                <FacePanel showIdentity={false} noise={noise[0]} interactive />
                <div className="space-y-5">
                  <div>
                    <div className="mb-3 flex items-center justify-between text-sm">
                      <span className="font-medium text-slate-900">Landmark noise level</span>
                      <span className="text-slate-500">{noise[0]}%</span>
                    </div>
                    <Slider value={noise} max={40} step={5} onValueChange={setNoise} />
                  </div>
                  <div className="rounded-[24px] border bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                    This section shows one of the real challenges in graph-based FER. If the landmark points are noisy, incomplete, or incorrectly detected, the graph becomes less reliable and the emotion prediction can degrade.
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border p-4">
                      <div className="mb-1 text-sm text-slate-500">Estimated graph quality</div>
                      <div className="text-2xl font-semibold">{Math.max(52, 96 - noise[0])}%</div>
                    </div>
                    <div className="rounded-2xl border p-4">
                      <div className="mb-1 text-sm text-slate-500">Estimated confidence</div>
                      <div className="text-2xl font-semibold">{Math.max(48, 91 - noise[0])}%</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="border-y bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10">
          <div className="mb-10">
            <p className="mb-2 text-sm font-medium uppercase tracking-[0.18em] text-slate-500">Applications and future work</p>
            <h2 className="text-3xl font-semibold tracking-tight">Where this can go next</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {[
              {
                icon: Lock,
                title: "Privacy-first mental health tools",
                text: "Emotion-aware systems may become easier to trust when they avoid storing identity-heavy facial data.",
              },
              {
                icon: Layers,
                title: "Federated or on-device inference",
                text: "Future versions can combine graph representations with privacy-enhancing methods that keep data local.",
              },
              {
                icon: LineChart,
                title: "Robust research expansion",
                text: "The prototype can be extended to benchmark noise sensitivity, distribution shifts, and fairness across datasets.",
              },
            ].map((item) => (
              <Card key={item.title} className="rounded-[26px] shadow-sm">
                <CardContent className="p-6">
                  <div className="mb-4 inline-flex rounded-2xl bg-slate-100 p-3">
                    <item.icon className="h-5 w-5 text-slate-700" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm leading-6 text-slate-600">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="mx-auto max-w-7xl px-6 py-10 md:px-10">
        <div className="flex flex-col gap-4 rounded-[28px] border bg-slate-950 px-6 py-7 text-slate-100 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-1 flex items-center gap-2 text-sm text-slate-300"><Sparkles className="h-4 w-4" /> Research poster companion prototype</div>
            <h3 className="text-xl font-semibold">Built to help viewers understand the idea fast</h3>
            <p className="mt-1 text-sm text-slate-400">A polished concept demo for GSURC, research showcases, and future conference conversations.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" className="rounded-2xl">Deploy on Vercel</Button>
            <Button variant="outline" className="rounded-2xl border-slate-700 bg-transparent text-white hover:bg-slate-900">Customize Content</Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
