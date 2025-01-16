const envVars = Object.freeze({
  hostURL: process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
  supabase: {
    url: process.env.SUPABASE_URL ?? '',
    anonKey: process.env.SUPABASE_ANON_KEY ?? ''
  }
});

export default envVars;
