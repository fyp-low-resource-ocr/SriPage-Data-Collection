import { describe, expect, it } from "vitest";
import { reduceHistory } from "./use-annotation-history";

const initial = () => ({ present: [1], past: [] as number[][], future: [] as number[][], transaction: null as number[] | null });

describe("annotation history", () => {
  it("groups pointer updates into one undo step and supports redo", () => {
    let state = reduceHistory(initial(), { type: "begin" });
    state = reduceHistory(state, { type: "set", value: [2] });
    state = reduceHistory(state, { type: "set", value: [3] });
    state = reduceHistory(state, { type: "end" });
    expect(state.past).toEqual([[1]]);
    state = reduceHistory(state, { type: "undo" });
    expect(state.present).toEqual([1]);
    state = reduceHistory(state, { type: "redo" });
    expect(state.present).toEqual([3]);
  });

  it("clears redo history after an edit following undo", () => {
    let state = reduceHistory(initial(), { type: "set", value: [2] });
    state = reduceHistory(state, { type: "undo" });
    state = reduceHistory(state, { type: "set", value: (current) => [...current, 4] });
    expect(state.future).toEqual([]);
    expect(reduceHistory(state, { type: "redo" }).present).toEqual([1, 4]);
  });

  it("does not record a pointer interaction with no changes", () => {
    let state = reduceHistory(initial(), { type: "begin" });
    state = reduceHistory(state, { type: "end" });
    expect(state.past).toEqual([]);
  });
});
