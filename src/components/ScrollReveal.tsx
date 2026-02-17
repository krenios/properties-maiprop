import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

interface Props {
  children: ReactNode;
  className?: string;
  /** Use "stagger" to animate children sequentially */
  variant?: "fadeUp" | "stagger";
}

export const ScrollReveal = ({ children, className, variant = "fadeUp" }: Props) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-60px" }}
    variants={variant === "stagger" ? staggerContainer : fadeUp}
    className={className}
  >
    {children}
  </motion.div>
);

/** Wrap individual items inside a stagger container */
export const RevealItem = ({ children, className }: { children: ReactNode; className?: string }) => (
  <motion.div variants={fadeUp} className={className}>
    {children}
  </motion.div>
);
