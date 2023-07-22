import * as admin from 'firebase-admin';

/* eslint-disable import/prefer-default-export */
import { credential } from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app';
import type { ServiceAccount } from 'firebase-admin';


/*
const serviceAccount = {
  type: process.env.TYPE || "mock",
  project_id: process.env.PROJECT_ID  || "mock",
  private_key_id: process.env.PRIVATE_KEY_ID || "mock",
  private_key: process.env.PRIVATE_KEY?.replace(/\\n/g || "mock", '\n')  || "mock",
  client_email: process.env.CLIENT_EMAIL || "mock",
  client_id: process.env.CLIENT_ID || "mock",
  auth_uri: process.env.AUTH_URI || "mock",
  token_uri: process.env.TOKEN_URI || "mock", 
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL  || "mock", 
  client_x509_cert_url: process.env.CLIENT_X509_CERT_URL  || "mock",
  universe_domain: process.env.UNIVERSE_DOMAIN || "mock",
}

*/
//const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT_JSON || "mock");

if (!admin.apps.length) {
 initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.PROJECT_ID,
    clientEmail: process.env.CLIENT_EMAIL,
    privateKey: process.env.PRIVATE_KEY?.replace(/\\n/g, "\n"),
  }),
 });
}


export const adminSDK = admin;
