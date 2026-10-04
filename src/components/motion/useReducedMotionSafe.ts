"use client";

import { useReducedMotion } from "framer-motion";
import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/**
 * `useReducedMotion` that is false on the server and during hydration, so the first
 * client render matches the server HTML. It flips to the user's preference right after.
 */
export function useReducedMotionSafe() {
  const hydrated = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const reduce = useReducedMotion();
  return hydrated && !!reduce;
}
