const envVars = Object.freeze({
  supabase: {
    url: process.env.SUPABASE_URL ?? '',
    anonKey: process.env.SUPABASE_ANON_KEY ?? ''
  }
});

export default envVars;
