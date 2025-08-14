
// @ts-ignore
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
// @ts-ignore
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

serve(async (req: Request) => {
    try {
        const { userId } = await req.json();
        console.log("Incoming userId:", userId);

        if (!userId) {
            console.error("Missing userId in request body");
            return new Response(JSON.stringify({ error: "Missing userId" }), {
                status: 400,
            });
        }

        const supabaseAdmin = createClient(
            // @ts-ignore
            Deno.env.get("DATABASE_URL")!,
            // @ts-ignore
            Deno.env.get("SERVICE_ROLE_KEY")!
        );

        // @ts-ignore
        console.log("Has URL?", !!Deno.env.get("EXPO_SUPABASE_URL"));
        // @ts-ignore
        console.log("Has Service Role Key?", !!Deno.env.get("SERVICE_ROLE_KEY"));

        const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);

        if (error) {
            console.error("Supabase delete error:", error);
            return new Response(JSON.stringify({ error: error.message }), {
                status: 400,
            });
        }

        console.log("User deleted successfully:", userId);
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (err) {
        console.error("Function crashed:", err);
        return new Response(JSON.stringify({ error: String(err) }), {
            status: 500,
        });
    }
});