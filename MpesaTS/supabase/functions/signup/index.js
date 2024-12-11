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
const mod_ts_1 = require("https://deno.land/std@0.81.0/uuid/mod.ts");
const supUrl = Deno.env.get("_SUPABASE_URL");
const supKey = Deno.env.get("_SUPABASE_SERVICE_KEY");
const supabase = (0, supabase_js_1.createClient)(supUrl, supKey);
exports.corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, cache-control',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
};
Deno.serve((req) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: exports.corsHeaders });
    }
    if (req.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405, headers: exports.corsHeaders });
    }
    else {
        try {
            const body = yield req.json();
            const { firstName, lastName, userEmail, userName, password } = body;
            // Validation
            if (!firstName || !lastName || !userEmail || !userName || !password) {
                return new Response('Missing required fields', { status: 400, headers: exports.corsHeaders });
            }
            // Check if user with the same email already exists
            const { data: existingUser, error: checkError } = yield supabase
                .from('client')
                .select('userEmail')
                .eq('userEmail', userEmail)
                .single();
            // If user with the same email already exists
            if (existingUser) {
                return new Response('User with the same email already exists', { status: 409, headers: exports.corsHeaders });
            }
            const newId = mod_ts_1.v4.generate();
            // Create new user
            const { data: newUser, error: signupError } = yield supabase
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
                return new Response(JSON.stringify({ error: signupError.message }), { headers: Object.assign(Object.assign({}, exports.corsHeaders), { 'content-type': 'application/json' }), status: 400 });
            }
            //return created rider
            return new Response(JSON.stringify(newUser), { headers: Object.assign(Object.assign({}, exports.corsHeaders), { 'content-type': 'application/json' }) });
        }
        catch (error) {
            return new Response(JSON.stringify({ error: error.message }), { headers: Object.assign(Object.assign({}, exports.corsHeaders), { 'content-type': 'application/json' }), status: 400 });
        }
    }
}));
