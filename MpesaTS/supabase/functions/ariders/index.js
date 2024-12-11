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
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: exports.corsHeaders });
    }
    // const data = { hello: "world" }
    let { data: riders, error } = yield supabase
        .from('client')
        .select('*');
    if (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            headers: Object.assign(Object.assign({}, exports.corsHeaders), { 'content-type': 'application/json' }),
            status: 400,
        });
    }
    // Return the response with CORS headers
    return new Response(JSON.stringify(riders), { headers: Object.assign(Object.assign({}, exports.corsHeaders), { 'content-type': 'application/json' }) });
}));
