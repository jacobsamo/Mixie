"use client";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import CursorBlinker from "./CursorBlinker";
import { useEffect, useState } from "react";

export interface IAnimTextProps {
  delay: number;
}

const texts = [
  "Breakfast?",
  "Lunch?",
  "Dinner?",
  "Dessert?",
  "Brunch?",
  "Afternoon Tea?",
  "Supper?",
];

function getRandomTexts() {
  const randomTexts: string[] = [];
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * texts.length);
    randomTexts.push(texts[randomIndex]);
  }
  return randomTexts;
}

export default function LandingText({ delay }: IAnimTextProps) {
  const [done, setDone] = useState(false);
  const [randomTexts, setRandomTexts] = useState(getRandomTexts());

  const baseText = "Whats for " as string;
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) =>
    baseText.slice(0, latest)
  );

  const textIndex = useMotionValue(0);
  const baseTexts = useTransform(
    textIndex,
    (latest) => randomTexts[latest] || ""
  );
  const textsCount = useMotionValue(0);
  const textsRounded = useTransform(textsCount, (latest) => Math.round(latest));
  const textsDisplayText = useTransform(textsRounded, (latest) =>
    baseTexts.get().slice(0, latest)
  );
  const updatedThisRound = useMotionValue(true);

  useEffect(() => {
    const controls = animate(count, baseText.length, {
      type: "tween",
      delay: delay,
      duration: 1,
      ease: "easeInOut",
      repeat: 0,
      repeatType: "reverse",
      repeatDelay: 1,
    });

    return () => controls.stop();
  }, [delay]);

  useEffect(() => {
    animate(textsCount, 60, {
      type: "tween",
      delay: delay + 1,
      duration: 1,
      ease: "easeIn",
      repeat: Infinity,
      repeatType: "reverse",
      repeatDelay: 1,
      onUpdate(latest) {
        if (updatedThisRound.get() === true && latest > 0) {
          updatedThisRound.set(false);
        } else if (updatedThisRound.get() === false && latest === 0) {
          if (textIndex.get() === randomTexts.length - 1) {
            textIndex.set(0);
            setRandomTexts(getRandomTexts()); // get new random texts
          } else {
            textIndex.set(textIndex.get() + 1);
          }
          updatedThisRound.set(true);
        }
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <h1 className="pb-2 text-step0">
      <motion.span>{displayText}</motion.span>
      <motion.span className="inline">{textsDisplayText}</motion.span>
      <CursorBlinker />
    </h1>
  );
}
