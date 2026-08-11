"use client";

import type { DataCollectionForm } from "../forms/types";
import { useFormDetails } from "../hooks/use-form-details";
import { DetailsActionPanel } from "./details-action-panel";
import { FormDetailsDisplay } from "./form-details-display";
import { PublicFormsHeader } from "./public-forms-header";

export function PublicFormDetailsPage({ form }: { form: DataCollectionForm }) {
  const details = useFormDetails(form);

  return (
    <main className="public-form-page">
      <PublicFormsHeader />
      <section className="public-form-layout" aria-label="Public form details generator">
        <DetailsActionPanel form={form} details={details} />
        <FormDetailsDisplay form={form} details={details.result} isGenerating={details.isGenerating} />
      </section>
    </main>
  );
}
