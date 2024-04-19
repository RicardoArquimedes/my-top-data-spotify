// vite-env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_CLIENT_ID: string;  // Asegúrate de que el nombre de la variable incluya el prefijo 'VITE_'
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
