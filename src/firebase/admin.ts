import * as admin from 'firebase-admin';

/* eslint-disable import/prefer-default-export */
import { credential } from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app';

const serviceAccount = require('./ServiceAccountFile.json');

if (!admin.apps.length) {
 initializeApp({
   credential: credential.cert(serviceAccount),
 });
}

admin.initializeApp();

export const adminSDK = admin;
