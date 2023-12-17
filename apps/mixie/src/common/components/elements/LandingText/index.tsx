import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import CursorBlinker from "./CursorBlinker";

export default function TextAnim() {
  const baseText = "Dear Hiring Manager, ";
  const count = useMotionValue(0);

  return (
    <span className="">
      <motion.span>
          
      </motion.span>
      <CursorBlinker />
    </span>
  );
}