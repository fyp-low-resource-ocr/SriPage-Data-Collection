import "server-only";

import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

function cleanEnvValue(value: string | undefined) {
  return value?.trim().replace(/^['"]+/, "").replace(/['"]+$/, "");
}

function getFirebasePrivateKey() {
  const privateKey = cleanEnvValue(process.env.FIREBASE_PRIVATE_KEY);
  return privateKey?.replace(/\\n/g, "\n");
}

export function getPublicDataCollectionFirebaseApp() {
  const existingApp = getApps()[0];
  if (existingApp) return existingApp;

  const projectId = cleanEnvValue(process.env.FIREBASE_PROJECT_ID);
  const clientEmail = cleanEnvValue(process.env.FIREBASE_CLIENT_EMAIL);
  const privateKey = getFirebasePrivateKey();

  if (!projectId || !clientEmail || !privateKey) {
    const missing = [
      !projectId && "FIREBASE_PROJECT_ID",
      !clientEmail && "FIREBASE_CLIENT_EMAIL",
      !privateKey && "FIREBASE_PRIVATE_KEY",
    ].filter(Boolean).join(", ");

    throw new Error(`Firebase Admin is not configured. Missing: ${missing}.`);
  }

  return initializeApp({
    credential: cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  });
}

export function getPublicDataCollectionFirestore() {
  return getFirestore(getPublicDataCollectionFirebaseApp());
}
