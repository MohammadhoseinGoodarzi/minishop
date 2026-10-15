interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_FEATURE_FEATURED: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
