'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Calendar,
  User,
  ArrowLeft,
  BookOpen,
  Tag,
  Clock,
  Share2,
  Check,
  LinkIcon,
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  category: string;
  tags: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [copied, setCopied] = useState(false);

  const fetchPost = useCallback(async () => {
    try {
      const res = await fetch(`/api/blog/${slug}`);
      if (!res.ok) {
        setNotFound(true);
        return;
      }
      const data = await res.json();
      setPost(data);

      // Fetch related posts
      const allRes = await fetch('/api/blog');
      const allPosts: BlogPost[] = await allRes.json();
      const related = allPosts
        .filter((p) => p.slug !== slug && p.category === data.category)
        .slice(0, 3);
      setRelatedPosts(related);
    } catch {
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  function readingTime(content: string) {
    const words = content.split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return `${minutes} min de lecture`;
  }

  function renderContent(content: string) {
    // Split content into paragraphs and handle markdown-like formatting
    return content.split('\n').map((line, i) => {
      const trimmed = line.trim();
      if (!trimmed) return <br key={i} />;
      if (trimmed.startsWith('- ')) {
        return (
          <li key={i} className="ml-4 text-gray-300 leading-relaxed">
            {trimmed.slice(2)}
          </li>
        );
      }
      return (
        <p key={i} className="text-gray-300 leading-relaxed mb-4">
          {trimmed}
        </p>
      );
    });
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-dark flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </main>
        <Footer />
      </>
    );
  }

  if (notFound || !post) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-dark flex items-center justify-center">
          <div className="text-center">
            <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">Article non trouve</h1>
            <p className="text-gray-400 mb-6">
              L&apos;article que vous recherchez n&apos;existe pas ou a ete supprime.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 bg-primary text-dark font-semibold px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour au blog
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-dark">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-b from-dark-light to-dark pt-32 pb-16">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-[120px]" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary rounded-full blur-[150px]" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-primary text-sm mb-8 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Retour au blog
              </Link>

              <span className="inline-block bg-primary/10 text-primary text-sm font-medium px-4 py-1.5 rounded-full mb-4">
                {post.category}
              </span>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-[family-name:var(--font-heading)] mb-6 leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  {post.author}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  {formatDate(post.createdAt)}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  {readingTime(post.content)}
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {/* Featured image */}
              {post.image && (
                <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden mb-10 bg-dark-lighter">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* Article body */}
              <article className="prose-custom">
                <div className="bg-dark-light border border-dark-lighter rounded-2xl p-6 md:p-10">
                  {renderContent(post.content)}
                </div>
              </article>

              {/* Tags & Share */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-8 pt-8 border-t border-dark-lighter">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1.5 text-sm text-gray-400 bg-dark-light border border-dark-lighter px-3 py-1.5 rounded-lg"
                    >
                      <Tag className="w-3.5 h-3.5 text-primary" />
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-primary bg-dark-light border border-dark-lighter px-4 py-2 rounded-lg transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400">Lien copie!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4" />
                      Partager
                    </>
                  )}
                </button>
              </div>

              {/* Author card */}
              <div className="mt-8 bg-dark-light border border-dark-lighter rounded-2xl p-6 flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <User className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <p className="text-white font-semibold">{post.author}</p>
                  <p className="text-gray-400 text-sm">
                    Publie le {formatDate(post.createdAt)}
                    {post.updatedAt !== post.createdAt &&
                      ` - Mis a jour le ${formatDate(post.updatedAt)}`}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <section className="container mx-auto px-4 pb-20">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-heading)] mb-8">
                Articles similaires
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((related, i) => (
                  <motion.div
                    key={related.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * i }}
                  >
                    <Link href={`/blog/${related.slug}`} className="group block">
                      <div className="bg-dark-light border border-dark-lighter rounded-xl overflow-hidden hover:border-primary/30 transition-all">
                        <div className="relative h-40 bg-dark-lighter">
                          {related.image ? (
                            <Image
                              src={related.image}
                              alt={related.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <BookOpen className="w-8 h-8 text-gray-700" />
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <span className="text-xs text-primary font-medium">
                            {related.category}
                          </span>
                          <h3 className="text-white font-semibold text-sm mt-1 group-hover:text-primary transition-colors line-clamp-2">
                            {related.title}
                          </h3>
                          <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                            <Calendar className="w-3 h-3" />
                            {formatDate(related.createdAt)}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
