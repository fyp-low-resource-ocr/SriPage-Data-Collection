"use client";

import { useState } from "react";
import type { DataCollectionForm } from "../forms/types";
import {
  generateFormDetails,
  saveFormDetails,
  type FormDetailsResponse,
} from "../api/form-details-api";

type FormDetailsState = {
  status: "idle" | "loading" | "ready" | "error";
  saveStatus: "idle" | "saving" | "saved" | "error";
  error: string;
  saveError: string;
  result: FormDetailsResponse | null;
};

export function useFormDetails(form: DataCollectionForm) {
  const [extraInstruction, setExtraInstruction] = useState("");
  const [state, setState] = useState<FormDetailsState>({
    status: "idle",
    saveStatus: "idle",
    error: "",
    saveError: "",
    result: null,
  });

  async function generateDetails() {
    setState((current) => ({
      ...current,
      status: "loading",
      saveStatus: "idle",
      error: "",
      saveError: "",
    }));
    try {
      const result = await generateFormDetails({
        formId: form.id,
        extraInstruction: extraInstruction.trim() || undefined,
      });
      setState({ status: "ready", saveStatus: "idle", error: "", saveError: "", result });
    } catch (error) {
      setState({
        status: "error",
        saveStatus: "idle",
        error: error instanceof Error ? error.message : "Could not prepare form details.",
        saveError: "",
        result: null,
      });
    }
  }

  async function saveDetails() {
    if (!state.result) return;

    setState((current) => ({ ...current, saveStatus: "saving", saveError: "" }));
    try {
      const saved = await saveFormDetails({
        ...state.result,
        extraInstruction: extraInstruction.trim() || undefined,
      });
      setState((current) => ({
        ...current,
        saveStatus: "saved",
        saveError: "",
        result: current.result ? { ...current.result, savedRecordId: saved.savedRecordId } : current.result,
      }));
    } catch (error) {
      setState((current) => ({
        ...current,
        saveStatus: "error",
        saveError: error instanceof Error ? error.message : "Could not save form details.",
      }));
    }
  }

  return {
    extraInstruction,
    setExtraInstruction,
    generateDetails,
    saveDetails,
    isGenerating: state.status === "loading",
    isSaving: state.saveStatus === "saving",
    error: state.error,
    saveError: state.saveError,
    result: state.result,
    status: state.status,
    saveStatus: state.saveStatus,
  };
}
