const SUPABASE_URL =
    "https://axnlxpovmzywxxevbxzl.supabase.co/rest/v1/";

const SUPABASE_ANON_KEY =
    "sb_publishable_aDPLD5i9xtAtsl8wxBUHsw_4TySYnqi";

const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_ANON_KEY
    );
