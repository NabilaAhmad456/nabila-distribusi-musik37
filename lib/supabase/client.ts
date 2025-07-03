import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Database interfaces
export interface Artist {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
  bio?: string;
  phone?: string;
  total_streams: number;
  total_revenue: number;
  created_at: string;
  updated_at: string;
}

export interface Song {
  id: string;
  artist_id: string;
  title: string;
  album?: string;
  genre: string;
  artwork_url?: string;
  audio_url?: string;
  release_date: string;
  streams: number;
  revenue: number;
  status: "pending" | "approved" | "live" | "rejected";
  created_at: string;
}

export interface StreamData {
  id: string;
  song_id: string;
  platform: string;
  streams: number;
  revenue: number;
  date: string;
}

export interface WithdrawalRequest {
  id: string;
  artist_id: string;
  amount: number;
  status: "pending" | "processing" | "completed" | "rejected";
  bank_name: string;
  account_number: string;
  account_name: string;
  notes?: string;
  created_at: string;
  processed_at?: string;
}

// Auth helpers
export const getCurrentUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signUp = async (
  email: string,
  password: string,
  userData: Partial<Artist>,
) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData,
    },
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};
