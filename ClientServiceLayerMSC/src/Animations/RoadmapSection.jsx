import { useTransform, useSpring, motion, AnimatePresence } from "framer-motion";
import SpringOptions from "../Animations/SpringOptions";

/* ─── Step Data ─────────────────────────────────────────────────────────── */
const STEPS = [
  {
    number: "01",
    name: "Lesson",
    icon: "fa-solid fa-book-open",
    accent: "#7fa8c9",         // dusty blue
    heading: "Absorb at Your Own Pace",
    description:
      "Every lesson is crafted like an editorial magazine spread — structured, distraction-free, and built for deep comprehension rather than rapid consumption. Read, re-read, and let concepts settle naturally.",
  },
  {
    number: "02",
    name: "Quiz",
    icon: "fa-solid fa-pen-fancy",
    accent: "#c98a9e",         // dusty rose
    heading: "Test Your Understanding",
    description:
      "Low-pressure checkpoints placed at the end of each module. These aren't gatekeepers — they are mirrors. They show you exactly where your understanding is solid and where it needs another pass.",
  },
  {
    number: "03",
    name: "Analysis",
    icon: "fa-solid fa-chart-line",
    accent: "#7eb89a",         // sage green
    heading: "Understand Your Learning Curve",
    description:
      "After each quiz, your performance is mapped into clear, photographic analytics. No gamified scores — just honest insight into your retention patterns so you can focus your effort where it counts.",
  },
  {
    number: "04",
    name: "Assignment",
    icon: "fa-solid fa-clipboard-list",
    accent: "#c4935a",         // clay amber
    heading: "Apply to the Real World",
    description:
      "Structured assignments bring theory into practice. Each task is scoped precisely to the lesson it follows, giving you a concrete artifact of your learning journey rather than abstract theory alone.",
  },
  {
    number: "05",
    name: "Mastery",
    icon: "fa-solid fa-award",
    accent: "#b89a5e",         // antique gold
    heading: "Earn Your Certificate",
    description:
      "Complete all five steps and a verified certificate of mastery is yours. Not a participation ribbon — a genuine record of the depth you have committed to. A milestone worth adding to your portfolio.",
  },
];

/* ─── RoadmapSection ─────────────────────────────────────────────────────── */
/**
 * Props:
 *  - scrollYProgress  : the MotionValue from useScroll targeting this section
 */
function RoadmapSection({ scrollYProgress }) {
  // Map 0→1 scroll progress to 0→4 (5 steps) with a slight lead-in
  const rawStep = useTransform(scrollYProgress, [0.05, 0.95], [0, 4]);
  const stepProgress = useSpring(rawStep, { stiffness: 80, damping: 20, mass: 0.5 });

  return (
    <div className="roadmap-wrapper">
      <div className="home-container roadmap-container">
        <div className="roadmap-split">
      {/* ── LEFT: vertical step list ────────────────────────── */}
      <div className="roadmap-left">
        <p className="roadmap-eyebrow">How it works</p>
        <div className="roadmap-steps">
          {STEPS.map((step, idx) => (
            <RoadmapStepNode
              key={step.number}
              step={step}
              idx={idx}
              stepProgress={stepProgress}
              isLast={idx === STEPS.length - 1}
            />
          ))}
        </div>
      </div>

      {/* ── RIGHT: crossfade detail panel ───────────────────── */}
      <div className="roadmap-right">
        {STEPS.map((step, idx) => (
          <RoadmapDetail
            key={step.number}
            step={step}
            idx={idx}
            stepProgress={stepProgress}
          />
        ))}
      </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Individual step node (left column) ─────────────────────────────────── */
function RoadmapStepNode({ step, idx, stepProgress, isLast }) {
  const isFirst = idx === 0;
  const isLastStep = idx === STEPS.length - 1;

  const activeWeight = useTransform(
    stepProgress,
    isFirst
      ? [-1, 0, 0.35, 0.7]
      : isLastStep
      ? [idx - 0.7, idx - 0.35, idx, idx + 1]
      : [idx - 0.7, idx - 0.35, idx + 0.35, idx + 0.7],
    isFirst
      ? [1, 1, 1, 0]
      : isLastStep
      ? [0, 1, 1, 1]
      : [0, 1, 1, 0],
    { clamp: true }
  );

  const opacity = useTransform(activeWeight, [0, 1], [0.25, 1]);
  const scale = useTransform(activeWeight, [0, 1], [0.92, 1]);

  const boxShadow = useTransform(
    activeWeight,
    [0, 1],
    [
      "0 0 0 0px transparent, 0 0 0px 0px transparent",
      `0 0 0 2px ${step.accent}55, 0 0 22px 4px ${step.accent}44`,
    ]
  );

  const borderColor = useTransform(
    activeWeight,
    [0, 1],
    ["rgba(255, 255, 255, 0.15)", step.accent]
  );

  // Fill the connector so it completes BEFORE the next step activates
  const fillFraction = useTransform(stepProgress, [idx + 0.1, idx + 0.4], [0, 1], {
    clamp: true,
  });

  return (
    <div className="roadmap-step-row">
      {/* Node + connector column */}
      <div className="roadmap-node-col">
        {/* Icon circle */}
        <motion.div
          className="roadmap-node"
          style={{
            opacity,
            scale,
            boxShadow,
            borderColor,
            "--accent": step.accent,
          }}
        >
          <i className={step.icon} style={{ color: step.accent }} />
        </motion.div>

        {/* Dashed connector below the node */}
        {!isLast && (
          <div className="roadmap-connector">
            {/* Static dashed bg */}
            <div className="roadmap-connector-bg" />
            {/* Filled progress overlay */}
            <motion.div
              className="roadmap-connector-fill"
              style={{
                scaleY: fillFraction,
                backgroundColor: step.accent,
              }}
            />
          </div>
        )}
      </div>

      {/* Step text */}
      <motion.div className="roadmap-step-text" style={{ opacity, scale }}>
        <span className="roadmap-step-number" style={{ color: step.accent }}>
          {step.number}
        </span>
        <span className="roadmap-step-name">{step.name}</span>
      </motion.div>
    </div>
  );
}

/* ─── Right panel: crossfading detail for each step ─────────────────────── */
function RoadmapDetail({ step, idx, stepProgress }) {
  const isFirst = idx === 0;
  const isLast = idx === STEPS.length - 1;

  const opacity = useTransform(
    stepProgress,
    isFirst
      ? [-1, 0, 0.35, 0.7]
      : isLast
      ? [idx - 0.7, idx - 0.35, idx, idx + 1]
      : [idx - 0.7, idx - 0.35, idx + 0.35, idx + 0.7],
    isFirst
      ? [1, 1, 1, 0]
      : isLast
      ? [0, 1, 1, 1]
      : [0, 1, 1, 0],
    { clamp: true }
  );

  const translateY = useTransform(
    stepProgress,
    isFirst
      ? [-1, 0, 0.35, 0.7]
      : isLast
      ? [idx - 0.7, idx - 0.35, idx, idx + 1]
      : [idx - 0.7, idx - 0.35, idx + 0.35, idx + 0.7],
    isFirst
      ? [0, 0, 0, -20]
      : isLast
      ? [20, 0, 0, 0]
      : [20, 0, 0, -20],
    { clamp: true }
  );

  const filter = useTransform(
    stepProgress,
    isFirst
      ? [-1, 0, 0.35, 0.7]
      : isLast
      ? [idx - 0.7, idx - 0.35, idx, idx + 1]
      : [idx - 0.7, idx - 0.35, idx + 0.35, idx + 0.7],
    isFirst
      ? ["blur(0px)", "blur(0px)", "blur(0px)", "blur(8px)"]
      : isLast
      ? ["blur(8px)", "blur(0px)", "blur(0px)", "blur(0px)"]
      : ["blur(8px)", "blur(0px)", "blur(0px)", "blur(8px)"],
    { clamp: true }
  );

  const pointerEvents = useTransform(opacity, (v) => (v > 0.2 ? "auto" : "none"));

  return (
    <motion.div
      className="roadmap-detail"
      style={{
        opacity,
        translateY,
        filter,
        pointerEvents,
        "--accent": step.accent,
      }}
    >
      <div className="roadmap-detail-icon">
        <i className={step.icon} />
      </div>
      <span className="roadmap-detail-step">
        Step {step.number}
      </span>
      <h3 className="roadmap-detail-heading">{step.heading}</h3>
      <p className="roadmap-detail-desc">{step.description}</p>
      <div className="roadmap-detail-pill" style={{ background: `${step.accent}22`, color: step.accent }}>
        {step.name}
      </div>
    </motion.div>
  );
}

export default RoadmapSection;
