"use client";

import { useState } from "react";
import type { DataCollectionForm } from "../forms/types";
import { requestSyntheticFormDetails, type FormDetailsResponse } from "../api/form-details-api";

type FormDetailsState = {
  status: "idle" | "loading" | "ready" | "error";
  error: string;
  result: FormDetailsResponse | null;
};

export function useFormDetails(form: DataCollectionForm) {
  const [extraInstruction, setExtraInstruction] = useState("");
  const [state, setState] = useState<FormDetailsState>({
    status: "idle",
    error: "",
    result: null,
  });

  async function generateDetails() {
    setState((current) => ({ ...current, status: "loading", error: "" }));
    try {
      const result = await requestSyntheticFormDetails({
        formId: form.id,
        extraInstruction: extraInstruction.trim() || undefined,
      });
      setState({ status: "ready", error: "", result });
    } catch (error) {
      setState({
        status: "error",
        error: error instanceof Error ? error.message : "Could not prepare form details.",
        result: null,
      });
    }
  }

  return {
    extraInstruction,
    setExtraInstruction,
    generateDetails,
    isGenerating: state.status === "loading",
    error: state.error,
    result: state.result,
    status: state.status,
  };
}
