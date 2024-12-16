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

      const targetPassword = 'Michael123.100#';

      // Check if the password matches 
      const { data: user, error } = await supabase
        .from('client')
        .select('id, "userEmail", "password"')
        .eq('userEmail', userEmail)
        .single();

      // error or no user found
      if (error || !user) {
        console.error('Supabase query error:', error);
        return new Response('User does not exist', {
          status: 401,
          headers: corsHeaders
        });
      }

      const trimmedPassword = password.trim();
      const storedPassword = user.password?.trim();

      // Check if the passwords match 
      if (trimmedPassword !== storedPassword) {
        console.error('Password mismatch for user:', userEmail);
        return new Response('Invalid password', {
          status: 401,
          headers: corsHeaders
        });
      }

      // successful login response
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




