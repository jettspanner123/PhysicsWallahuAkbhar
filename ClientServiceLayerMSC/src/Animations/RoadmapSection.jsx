import { useTransform, useSpring, motion, AnimatePresence } from "framer-motion";
import SpringOptions from "../Animations/SpringOptions";

/* ─── Step Data ─────────────────────────────────────────────────────────── */
const STEPS = [
  {
    number: "01",
    name: "Lesson",
    icon: "fa-solid fa-book-open",
    accent: "#4f8fff",         // blue
    heading: "Absorb at Your Own Pace",
    description:
      "Every lesson is crafted like an editorial magazine spread — structured, distraction-free, and built for deep comprehension rather than rapid consumption. Read, re-read, and let concepts settle naturally.",
  },
  {
    number: "02",
    name: "Quiz",
    icon: "fa-solid fa-pen-fancy",
    accent: "#ff5fcb",         // pink
    heading: "Test Your Understanding",
    description:
      "Low-pressure checkpoints placed at the end of each module. These aren't gatekeepers — they are mirrors. They show you exactly where your understanding is solid and where it needs another pass.",
  },
  {
    number: "03",
    name: "Analysis",
    icon: "fa-solid fa-chart-line",
    accent: "#36f5a0",         // green
    heading: "Understand Your Learning Curve",
    description:
      "After each quiz, your performance is mapped into clear, photographic analytics. No gamified scores — just honest insight into your retention patterns so you can focus your effort where it counts.",
  },
  {
    number: "04",
    name: "Assignment",
    icon: "fa-solid fa-clipboard-list",
    accent: "#f5a623",         // gold/amber
    heading: "Apply to the Real World",
    description:
      "Structured assignments bring theory into practice. Each task is scoped precisely to the lesson it follows, giving you a concrete artifact of your learning journey rather than abstract theory alone.",
  },
  {
    number: "05",
    name: "Mastery",
    icon: "fa-solid fa-award",
    accent: "#c8a84b",         // gold
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
  );
}

/* ─── Individual step node (left column) ─────────────────────────────────── */
function RoadmapStepNode({ step, idx, stepProgress, isLast }) {
  // Active when stepProgress is within ±0.55 of this step's index
  const opacity = useTransform(stepProgress, (v) => {
    const dist = Math.abs(v - idx);
    return dist < 0.55 ? 1 : 0.25;
  });

  const scale = useTransform(stepProgress, (v) => {
    const dist = Math.abs(v - idx);
    return dist < 0.55 ? 1 : 0.92;
  });

  // Fill fraction for the dashed connector below this node (0→1)
  const fillFraction = useTransform(stepProgress, [idx, idx + 1], [0, 1], {
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
            "--accent": step.accent,
            boxShadow: useTransform(stepProgress, (v) => {
              const dist = Math.abs(v - idx);
              return dist < 0.55
                ? `0 0 0 2px ${step.accent}55, 0 0 22px 4px ${step.accent}44`
                : "none";
            }),
            borderColor: useTransform(stepProgress, (v) => {
              const dist = Math.abs(v - idx);
              return dist < 0.55 ? step.accent : "rgba(255,255,255,0.15)";
            }),
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
  const opacity = useTransform(stepProgress, (v) => {
    const dist = Math.abs(v - idx);
    return dist < 0.55 ? 1 : 0;
  });

  const translateY = useTransform(stepProgress, (v) => {
    const dist = v - idx; // negative = hasn't arrived yet, positive = passed
    if (Math.abs(dist) < 0.55) return 0;
    return dist < 0 ? 24 : -24;
  });

  return (
    <motion.div
      className="roadmap-detail"
      style={{ opacity, translateY, "--accent": step.accent }}
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
