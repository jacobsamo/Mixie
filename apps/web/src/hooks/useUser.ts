"use client";
import { createClient } from "@/server/supabase/client";
import { useQuery } from "@tanstack/react-query";

const useUser = () => {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();

      return session?.user;
    },
  });

  return user ?? null;
};

export default useUser;
