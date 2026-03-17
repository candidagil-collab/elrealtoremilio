import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/landing/Footer";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Calendar, ArrowRight } from "lucide-react";
import SchemaMarkup from "@/components/SchemaMarkup";

interface BlogPost {
  id: string;
  title: string;
  title_es: string;
  slug: string;
  excerpt: string;
  excerpt_es: string;
  image_url: string | null;
  category_id: string | null;
  created_at: string | null;
}

interface BlogCategory {
  id: string;
  name: string;
  name_es: string;
  slug: string;
}

const Blog = () => {
  const { t, language } = useLanguage();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [postsRes, catsRes] = await Promise.all([
        supabase.from("blog_posts").select("id, title, title_es, slug, excerpt, excerpt_es, image_url, category_id, created_at").eq("published", true).order("created_at", { ascending: false }),
        supabase.from("blog_categories").select("*"),
      ]);
      if (postsRes.data) setPosts(postsRes.data);
      if (catsRes.data) setCategories(catsRes.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const filteredPosts = posts.filter((post) => {
    const title = language === "es" ? post.title_es : post.title;
    const excerpt = language === "es" ? post.excerpt_es : post.excerpt;
    const matchesSearch = searchQuery === "" || title.toLowerCase().includes(searchQuery.toLowerCase()) || excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || post.category_id === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryName = (catId: string | null) => {
    if (!catId) return null;
    const cat = categories.find((c) => c.id === catId);
    if (!cat) return null;
    return language === "es" ? cat.name_es : cat.name;
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString(language === "es" ? "es-ES" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: language === "es" ? "Blog - Emilio Sanchez Real Estate" : "Blog - Emilio Sanchez Real Estate",
    description: language === "es" ? t("blog.subtitle") : t("blog.subtitle"),
    url: "https://elrealtoremilio.lovable.app/blog",
  };

  return (
    <div className="min-h-screen bg-background">
      <SchemaMarkup schema={blogSchema} />
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-12 md:pt-36 md:pb-16 bg-secondary/30">
        <div className="container text-center">
          <span className="font-body text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3 block">{t("blog.label")}</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">{t("blog.title")}</h1>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">{t("blog.subtitle")}</p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-border">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t("blog.searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={selectedCategory === null ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(null)}
              >
                {t("blog.allCategories")}
              </Badge>
              {categories.map((cat) => (
                <Badge
                  key={cat.id}
                  variant={selectedCategory === cat.id ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  {language === "es" ? cat.name_es : cat.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-12 md:py-16">
        <div className="container">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-48 w-full rounded-lg" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="font-body text-lg text-muted-foreground">{t("blog.noPosts")}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="group block rounded-xl border border-border bg-card overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  {post.image_url && (
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={post.image_url}
                        alt={language === "es" ? post.title_es : post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    {post.category_id && (
                      <span className="font-body text-xs uppercase tracking-widest text-primary mb-2 block">
                        {getCategoryName(post.category_id)}
                      </span>
                    )}
                    <h2 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {language === "es" ? post.title_es : post.title}
                    </h2>
                    <p className="font-body text-sm text-muted-foreground mb-4 line-clamp-3">
                      {language === "es" ? post.excerpt_es : post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-body text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(post.created_at)}
                      </span>
                      <span className="font-body text-sm text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                        {t("blog.readMore")} <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
