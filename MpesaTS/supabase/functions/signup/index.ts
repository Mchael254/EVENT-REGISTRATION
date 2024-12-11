
import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js";
import { v4 } from "https://deno.land/std@0.81.0/uuid/mod.ts";


const supUrl = Deno.env.get("_SUPABASE_URL") as string;
const supKey = Deno.env.get("_SUPABASE_SERVICE_KEY") as string;
const supabase = createClient(supUrl, supKey);

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, cache-control',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
}


Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405, headers: corsHeaders });
  } else {
    try {
      const body = await req.json();
      const { firstName, lastName, userEmail, userName, password } = body;

      // Validation
      if (!firstName || !lastName || !userEmail || !userName || !password) {
        return new Response('Missing required fields', { status: 400, headers: corsHeaders });
      }

      // Check if user with the same email already exists
      const { data: existingUser, error: checkError } = await supabase
        .from('client')
        .select('userEmail')
        .eq('userEmail', userEmail)
        .single();

      // If user with the same email already exists
      if (existingUser) {
        return new Response('User with the same email already exists', { status: 409, headers: corsHeaders });
      }

      const newId = v4.generate();

      // Create new user
      const { data: newUser, error: signupError } = await supabase
        .from('client')
        .insert([{
          id: newId, 
          firstName: firstName,
          lastName: lastName,
          userEmail: userEmail,
          userName: userName,
          password: password
        }]);

      //signupError
      if (signupError) {
        return new Response(
          JSON.stringify({ error: signupError.message }),
          { headers: { ...corsHeaders, 'content-type': 'application/json' }, status: 400 }
        );
      }

      //return created rider
      return new Response(
        JSON.stringify(newUser),
        { headers: { ...corsHeaders, 'content-type': 'application/json' } }
      );

    } catch (error) {
      return new Response(
        JSON.stringify({ error: (error as any).message }),
        { headers: { ...corsHeaders, 'content-type': 'application/json' }, status: 400 }
      );

    }

  }


});
