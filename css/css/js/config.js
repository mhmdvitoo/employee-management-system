const SUPABASE_URL =
    "PUT_YOUR_SUPABASE_URL_HERE";

const SUPABASE_ANON_KEY =
    "PUT_YOUR_SUPABASE_PUBLISHABLE_KEY_HERE";

const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_ANON_KEY
    );
