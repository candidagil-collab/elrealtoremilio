import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Calendar } from "lucide-react";
import ContactDialog from "@/components/landing/ContactDialog";
import SchemaMarkup from "@/components/SchemaMarkup";

interface BlogPostData {
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
  created_at: string | null;
  updated_at: string | null;
}

interface BlogCategory {
  id: string;
  name: string;
  name_es: string;
  slug: string;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, language } = useLanguage();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [category, setCategory] = useState<BlogCategory | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      setLoading(true);
      const { data } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();

      if (data) {
        setPost(data);
        if (data.category_id) {
          const { data: catData } = await supabase
            .from("blog_categories")
            .select("*")
            .eq("id", data.category_id)
            .maybeSingle();
          if (catData) setCategory(catData);
        }
      }
      setLoading(false);
    };
    fetchPost();
  }, [slug]);

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString(language === "es" ? "es-ES" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const title = post ? (language === "es" ? post.title_es : post.title) : "";
  const content = post ? (language === "es" ? post.content_es : post.content) : "";
  const excerpt = post ? (language === "es" ? post.excerpt_es : post.excerpt) : "";

  const articleSchema = post
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: title,
        description: excerpt,
        image: post.image_url || undefined,
        datePublished: post.created_at,
        dateModified: post.updated_at,
        author: { "@type": "Person", name: "Emilio Sanchez" },
        publisher: { "@type": "Organization", name: "Emilio Sanchez Real Estate" },
      }
    : null;

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container pt-32 pb-16">
          <Skeleton className="h-8 w-64 mb-4" />
          <Skeleton className="h-64 w-full rounded-lg mb-8" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4 mb-2" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container pt-32 pb-16 text-center">
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">{t("blog.notFound")}</h1>
          <Link to="/blog">
            <Button variant="outline">{t("blog.backToBlog")}</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {articleSchema && <SchemaMarkup schema={articleSchema} />}
      <Navbar />

      <article className="pt-28 md:pt-36 pb-16">
        <div className="container max-w-3xl">
          {/* Back link */}
          <Link to="/blog" className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="h-4 w-4" /> {t("blog.backToBlog")}
          </Link>

          {/* Category & Date */}
          <div className="flex items-center gap-4 mb-4">
            {category && (
              <span className="font-body text-xs uppercase tracking-widest text-primary">
                {language === "es" ? category.name_es : category.name}
              </span>
            )}
            <span className="font-body text-xs text-muted-foreground flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDate(post.created_at)}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">{title}</h1>

          {/* Excerpt */}
          <p className="font-body text-lg text-muted-foreground mb-8">{excerpt}</p>

          {/* Featured image */}
          {post.image_url && (
            <div className="rounded-xl overflow-hidden mb-10">
              <img src={post.image_url} alt={title} className="w-full h-auto object-cover" />
            </div>
          )}

          {/* Content */}
          <div
            className="font-body text-foreground leading-relaxed prose prose-lg max-w-none
              prose-headings:font-display prose-headings:text-foreground
              prose-p:text-muted-foreground prose-p:leading-relaxed
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground
              prose-ul:text-muted-foreground prose-ol:text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          {/* CTA */}
          <div className="mt-16 p-8 rounded-xl bg-secondary/50 text-center">
            <h3 className="font-display text-2xl font-bold text-foreground mb-2">{t("blog.ctaTitle")}</h3>
            <p className="font-body text-muted-foreground mb-6">{t("blog.ctaDesc")}</p>
            <ContactDialog>
              <Button className="font-body rounded-full bg-foreground text-background hover:bg-foreground/90 px-8">
                {t("blog.ctaButton")}
              </Button>
            </ContactDialog>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;
