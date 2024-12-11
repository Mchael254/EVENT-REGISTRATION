"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsHeaders = void 0;
const supabase_js_1 = require("https://esm.sh/@supabase/supabase-js");
const supUrl = Deno.env.get("_SUPABASE_URL");
const supKey = Deno.env.get("_SUPABASE_SERVICE_KEY");
const supabase = (0, supabase_js_1.createClient)(supUrl, supKey);
exports.corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, cache-control',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
};
Deno.serve((req) => __awaiter(void 0, void 0, void 0, function* () {
    //login
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: exports.corsHeaders });
    }
    if (req.method == 'POST') {
        try {
            const body = yield req.json();
            const { userEmail, password } = body;
            // Validate inputs
            if (!userEmail || !password) {
                return new Response('Email and password are required', { status: 400, headers: exports.corsHeaders });
            }
            // Check if the user exists in the database (Supabase query)
            const { data: user, error } = yield supabase
                .from('client')
                .select('id', 'userEmail', 'password')
                .eq('userEmail', userEmail)
                .single();
            // If user does not exist
            if (error || !user) {
                return new Response('Invalid email or password', { status: 401, headers: exports.corsHeaders });
            }
            // Validate password 
            if (user.password !== password) {
                return new Response('Invalid email or password', { status: 401, headers: exports.corsHeaders });
            }
            return new Response(JSON.stringify({ message: 'Login successful', userId: user.id }), { status: 200, headers: Object.assign(Object.assign({}, exports.corsHeaders), { 'Content-Type': 'application/json' }) });
        }
        catch (error) {
            console.error('Error during login:', error);
            return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500, headers: Object.assign(Object.assign({}, exports.corsHeaders), { 'Content-Type': 'application/json' }) });
        }
    }
    return new Response('Method Not Allowed', { status: 405, headers: exports.corsHeaders });
}));
