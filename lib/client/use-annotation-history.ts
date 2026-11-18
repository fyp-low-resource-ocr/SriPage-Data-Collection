"use client";

import { useCallback, useReducer, type SetStateAction } from "react";

type History<T> = { present: T; past: T[]; future: T[]; transaction: T | null };
type Action<T> = { type: "set"; value: SetStateAction<T> } | { type: "reset"; value: T } | { type: "undo" | "redo" | "begin" | "end" };

export function reduceHistory<T>(state: History<T>, action: Action<T>): History<T> {
  if (action.type === "reset") return { present: action.value, past: [], future: [], transaction: null };
  if (action.type === "begin") return { ...state, transaction: state.transaction ?? state.present };
  if (action.type === "end") {
    if (state.transaction === null) return state;
    return { ...state, past: state.transaction === state.present ? state.past : [...state.past.slice(-99), state.transaction], transaction: null };
  }
  if (action.type === "undo") {
    if (!state.past.length) return state;
    return { present: state.past[state.past.length - 1], past: state.past.slice(0, -1), future: [state.present, ...state.future], transaction: null };
  }
  if (action.type === "redo") {
    if (!state.future.length) return state;
    return { present: state.future[0], past: [...state.past.slice(-99), state.present], future: state.future.slice(1), transaction: null };
  }
  if (action.type !== "set") return state;
  const present = typeof action.value === "function" ? (action.value as (value: T) => T)(state.present) : action.value;
  if (present === state.present) return state;
  return { ...state, present, past: state.transaction === null ? [...state.past.slice(-99), state.present] : state.past, future: [] };
}

export function useAnnotationHistory<T>(initial: () => T) {
  const [state, dispatch] = useReducer(reduceHistory<T>, undefined, () => ({ present: initial(), past: [], future: [], transaction: null }));
  const set = useCallback((value: SetStateAction<T>) => dispatch({ type: "set", value }), []);
  const reset = useCallback((value: T) => dispatch({ type: "reset", value }), []);
  const undo = useCallback(() => dispatch({ type: "undo" }), []);
  const redo = useCallback(() => dispatch({ type: "redo" }), []);
  const begin = useCallback(() => dispatch({ type: "begin" }), []);
  const end = useCallback(() => dispatch({ type: "end" }), []);
  return { value: state.present, set, reset, undo, redo, begin, end, canUndo: state.past.length > 0, canRedo: state.future.length > 0 };
}
