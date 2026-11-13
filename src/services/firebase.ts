/**
 * MINDORA — Configuração do Firebase Authentication e Firestore
 *
 * Para ativar o Firebase real em produção:
 * 1. Acede à consola do Firebase (https://console.firebase.google.com/)
 * 2. Cria um projeto e ativa o "Firebase Authentication" (Email/Password e Google)
 * 3. Cria a base de dados "Cloud Firestore" em modo produção
 * 4. Regista uma Web App e copia as variáveis para o teu ficheiro .env:
 *    - VITE_FIREBASE_API_KEY
 *    - VITE_FIREBASE_AUTH_DOMAIN
 *    - VITE_FIREBASE_PROJECT_ID
 *    - VITE_FIREBASE_STORAGE_BUCKET
 *    - VITE_FIREBASE_MESSAGING_SENDER_ID
 *    - VITE_FIREBASE_APP_ID
 *
 * A MINDORA deteta automaticamente se estas variáveis estão presentes.
 * Se ainda não estiverem configuradas, o sistema ativa com segurança o
 * "Modo Local Seguro com Demonstração", garantindo registo, login, recuperação
 * e persistência isolada por utilizador sem interromper o funcionamento.
 */

export interface FirebaseAppConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

export const firebaseConfig: FirebaseAppConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || ''
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId &&
  firebaseConfig.apiKey !== 'MY_FIREBASE_API_KEY'
);
