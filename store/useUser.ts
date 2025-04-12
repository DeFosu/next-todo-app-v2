import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthError, User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
}

const supabase = createClient();

export const useUser = create<UserState>()(
  persist(
    (set) => {
      const handleAuthAction = async (
        action: () => Promise<void>,
        onSuccess?: () => void
      ) => {
        set({ loading: true, error: null });
        try {
          await action();
          onSuccess?.();
        } catch (err) {
          const errorMessage =
            err instanceof AuthError
              ? err.message
              : err instanceof Error
              ? err.message
              : "Unknown error";
          set({ error: errorMessage });
        } finally {
          set({ loading: false });
        }
      };

      return {
        user: null,
        loading: false,
        error: null,

        signIn: async (email, password) => {
          await handleAuthAction(async () => {
            const { data, error } = await supabase.auth.signInWithPassword({
              email,
              password,
            });
            if (error) throw error;
            set({ user: data.user });
          });
        },

        signUp: async (email, password) => {
          await handleAuthAction(async () => {
            const { data, error } = await supabase.auth.signUp({
              email,
              password,
            });
            if (error) throw error;
            set({ user: data.user });
          });
        },

        signOut: async () => {
          await handleAuthAction(async () => {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            set({ user: null });
          });
        },

        signInWithGoogle: async () => {
          await handleAuthAction(async () => {
            const { data, error } = await supabase.auth.signInWithOAuth({
              provider: "google",
              options: {
                redirectTo: `${window.location.origin}/callback`,
                queryParams: {
                  access_type: "offline",
                  prompt: "consent",
                },
              },
            });
            if (error) throw error;

            // Wait for the session to be available
            const {
              data: { session },
              error: sessionError,
            } = await supabase.auth.getSession();
            if (sessionError) throw sessionError;

            if (session?.user) {
              set({ user: session.user });
            }
          });
        },
      };
    },
    {
      name: "user-storage",
      partialize: (state) => ({ user: state.user }),
    }
  )
);
