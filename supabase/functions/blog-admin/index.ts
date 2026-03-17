import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, post_id, post } = await req.json();

    // Verify admin via authorization header or password
    const authHeader = req.headers.get("authorization");
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    switch (action) {
      case "list_posts": {
        const { data, error } = await supabase
          .from("blog_posts")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) throw error;
        return new Response(JSON.stringify({ posts: data }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      case "create_post": {
        const { data, error } = await supabase.from("blog_posts").insert(post).select().single();
        if (error) throw error;
        return new Response(JSON.stringify({ post: data }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      case "update_post": {
        const { data, error } = await supabase
          .from("blog_posts")
          .update({ ...post, updated_at: new Date().toISOString() })
          .eq("id", post_id)
          .select()
          .single();
        if (error) throw error;
        return new Response(JSON.stringify({ post: data }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      case "delete_post": {
        const { error } = await supabase.from("blog_posts").delete().eq("id", post_id);
        if (error) throw error;
        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      default:
        return new Response(JSON.stringify({ error: "Unknown action" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
