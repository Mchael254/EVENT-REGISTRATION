import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js";

const supUrl = Deno.env.get("_SUPABASE_URL") as string;
const supKey = Deno.env.get("_SUPABASE_SERVICE_KEY") as string;
const supabase = createClient(supUrl, supKey);

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, cache-control',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
}


Deno.serve(async (req) => {
  //login
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (req.method == 'POST') {
    try {
      const body = await req.json();
      const { userEmail, password } = body;

      // Validate inputs
      if (!userEmail || !password) {
        return new Response('Email and password are required', { status: 400, headers: corsHeaders });
      }

      // Check if the user exists in the database (Supabase query)
      const { data: user, error } = await supabase
        .from('client')
        .select('id', 'userEmail', 'password')
        .eq('userEmail', userEmail)
        .single();

      // If user does not exist
      if (error || !user) {
        return new Response('Invalid email or password', { status: 401, headers: corsHeaders });
      }

      // Validate password 
      if (user.password !== password) {
        return new Response('Invalid email or password', { status: 401, headers: corsHeaders });
      }

      return new Response(
        JSON.stringify({ message: 'Login successful', userId: user.id }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );

    } catch (error) {
      console.error('Error during login:', error);
      return new Response(
        JSON.stringify({ error: 'Internal Server Error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );

    }
  }

  return new Response('Method Not Allowed', { status: 405, headers: corsHeaders });


})


