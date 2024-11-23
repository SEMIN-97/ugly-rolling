import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL; // TODO: 배포시 vercel 대시보드에 추가 필요
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY; // TODO: 배포시 vercel 대시보드에 추가 필요

export const supabase = createClient(supabaseUrl, supabaseKey);