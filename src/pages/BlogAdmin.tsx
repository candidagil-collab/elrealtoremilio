import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2, Plus, Eye, EyeOff, LogOut } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  title_es: string;
  slug: string;
  excerpt: string;
  excerpt_es: string;
  content: string;
  content_es: string;
  image_url: string | null;
  category_id: string | null;
  published: boolean;
  created_at: string | null;
}

interface BlogCategory {
  id: string;
  name: string;
  name_es: string;
  slug: string;
}

const ADMIN_PASSWORD_KEY = "blog_admin_auth";

const BlogAdmin = () => {
  const { toast } = useToast();
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [creating, setCreating] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: "",
    title_es: "",
    slug: "",
    excerpt: "",
    excerpt_es: "",
    content: "",
    content_es: "",
    image_url: "",
    category_id: "",
    published: false,
  });

  // Simple auth check using edge function
  useEffect(() => {
    const saved = sessionStorage.getItem(ADMIN_PASSWORD_KEY);
    if (saved === "true") setAuthenticated(true);
  }, []);

  const handleLogin = async () => {
    // Call edge function to verify password
    const { data, error } = await supabase.functions.invoke("verify-admin", {
      body: { password },
    });
    if (error || !data?.valid) {
      toast({ title: "Invalid password", variant: "destructive" });
      return;
    }
    sessionStorage.setItem(ADMIN_PASSWORD_KEY, "true");
    setAuthenticated(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem(ADMIN_PASSWORD_KEY);
    setAuthenticated(false);
  };

  const fetchData = async () => {
    // Admin reads all posts (including unpublished) via edge function
    const { data: postsData } = await supabase.functions.invoke("blog-admin", {
      body: { action: "list_posts", password: sessionStorage.getItem(ADMIN_PASSWORD_KEY) === "true" ? password : "" },
    });
    const { data: catsData } = await supabase.from("blog_categories").select("*");
    if (postsData?.posts) setPosts(postsData.posts);
    if (catsData) setCategories(catsData);
  };

  useEffect(() => {
    if (authenticated) fetchData();
  }, [authenticated]);

  const resetForm = () => {
    setForm({ title: "", title_es: "", slug: "", excerpt: "", excerpt_es: "", content: "", content_es: "", image_url: "", category_id: "", published: false });
    setEditing(null);
    setCreating(false);
  };

  const startEdit = (post: BlogPost) => {
    setEditing(post);
    setCreating(false);
    setForm({
      title: post.title,
      title_es: post.title_es,
      slug: post.slug,
      excerpt: post.excerpt,
      excerpt_es: post.excerpt_es,
      content: post.content,
      content_es: post.content_es,
      image_url: post.image_url || "",
      category_id: post.category_id || "",
      published: post.published,
    });
  };

  const startCreate = () => {
    resetForm();
    setCreating(true);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleSave = async () => {
    if (!form.title || !form.slug) {
      toast({ title: "Title and slug are required", variant: "destructive" });
      return;
    }
    setSaving(true);
    const { data, error } = await supabase.functions.invoke("blog-admin", {
      body: {
        action: editing ? "update_post" : "create_post",
        post_id: editing?.id,
        post: {
          ...form,
          category_id: form.category_id || null,
          image_url: form.image_url || null,
        },
      },
    });
    setSaving(false);
    if (error) {
      toast({ title: "Error saving post", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: editing ? "Post updated" : "Post created" });
    resetForm();
    fetchData();
  };

  const handleDelete = async (postId: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    await supabase.functions.invoke("blog-admin", {
      body: { action: "delete_post", post_id: postId },
    });
    toast({ title: "Post deleted" });
    fetchData();
  };

  const handleTogglePublish = async (post: BlogPost) => {
    await supabase.functions.invoke("blog-admin", {
      body: { action: "update_post", post_id: post.id, post: { published: !post.published } },
    });
    toast({ title: post.published ? "Post unpublished" : "Post published" });
    fetchData();
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="font-display text-center">Blog Admin</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="password"
              placeholder="Admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
            <Button onClick={handleLogin} className="w-full">Login</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground">Blog Admin</h1>
          <div className="flex gap-2">
            <Button onClick={startCreate} className="gap-2"><Plus className="h-4 w-4" /> New Post</Button>
            <Button variant="outline" onClick={handleLogout} className="gap-2"><LogOut className="h-4 w-4" /> Logout</Button>
          </div>
        </div>

        {/* Edit/Create Form */}
        {(creating || editing) && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="font-display">{editing ? "Edit Post" : "New Post"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="font-body text-sm text-muted-foreground mb-1 block">Title (EN)</label>
                  <Input value={form.title} onChange={(e) => { setForm({ ...form, title: e.target.value, slug: creating ? generateSlug(e.target.value) : form.slug }); }} />
                </div>
                <div>
                  <label className="font-body text-sm text-muted-foreground mb-1 block">Title (ES)</label>
                  <Input value={form.title_es} onChange={(e) => setForm({ ...form, title_es: e.target.value })} />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="font-body text-sm text-muted-foreground mb-1 block">Slug</label>
                  <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
                </div>
                <div>
                  <label className="font-body text-sm text-muted-foreground mb-1 block">Category</label>
                  <select
                    value={form.category_id}
                    onChange={(e) => setForm({ ...form, category_id: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="">No category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name} / {cat.name_es}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="font-body text-sm text-muted-foreground mb-1 block">Image URL</label>
                <Input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} placeholder="https://..." />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="font-body text-sm text-muted-foreground mb-1 block">Excerpt (EN)</label>
                  <Textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={3} />
                </div>
                <div>
                  <label className="font-body text-sm text-muted-foreground mb-1 block">Excerpt (ES)</label>
                  <Textarea value={form.excerpt_es} onChange={(e) => setForm({ ...form, excerpt_es: e.target.value })} rows={3} />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="font-body text-sm text-muted-foreground mb-1 block">Content (EN) — HTML</label>
                  <Textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={10} />
                </div>
                <div>
                  <label className="font-body text-sm text-muted-foreground mb-1 block">Content (ES) — HTML</label>
                  <Textarea value={form.content_es} onChange={(e) => setForm({ ...form, content_es: e.target.value })} rows={10} />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="rounded" />
                  <span className="font-body text-sm">Published</span>
                </label>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSave} disabled={saving}>{saving ? "Saving..." : "Save"}</Button>
                <Button variant="outline" onClick={resetForm}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Posts List */}
        <div className="space-y-3">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardContent className="flex items-center justify-between py-4 px-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-display font-semibold text-foreground">{post.title}</span>
                    <Badge variant={post.published ? "default" : "secondary"}>
                      {post.published ? "Published" : "Draft"}
                    </Badge>
                  </div>
                  <span className="font-body text-xs text-muted-foreground">/{post.slug}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleTogglePublish(post)} title={post.published ? "Unpublish" : "Publish"}>
                    {post.published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => startEdit(post)}><Pencil className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(post.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </div>
              </CardContent>
            </Card>
          ))}
          {posts.length === 0 && (
            <p className="text-center py-8 font-body text-muted-foreground">No posts yet. Create your first one!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogAdmin;
