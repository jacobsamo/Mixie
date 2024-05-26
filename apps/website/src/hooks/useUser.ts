"use client";
import { createClient } from "@/server/supabase/client";
import { useQuery } from "@tanstack/react-query";

const useUser = () => {
  const {data: user} = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const supabase = createClient();
      const {data: {
        user
      }} = await supabase.auth.getUser();
      return user;
    }
  })
  
  const supabase = createClient();
  supabase.auth.getUser();

  return user ?? null
};

export default useUser;
