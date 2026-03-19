'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Search,
  Calendar,
  User,
  ArrowRight,
  BookOpen,
  Tag,
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

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Tous');

  const fetchPosts = useCallback(async () => {
    try {
      const res = await fetch('/api/blog');
      const data = await res.json();
      setPosts(Array.isArray(data) ? data : []);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const categories = ['Tous', ...Array.from(new Set(posts.map((p) => p.category)))];

  const filtered = posts.filter((post) => {
    const matchesCategory = activeCategory === 'Tous' || post.category === activeCategory;
    const matchesSearch =
      !search ||
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

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

  return (
    <>
      <Header />
      <main className="min-h-screen bg-dark">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-b from-dark-light to-dark pt-32 pb-20">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-[120px]" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary rounded-full blur-[150px]" />
          </div>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-medium px-4 py-1.5 rounded-full mb-6">
                <BookOpen className="w-4 h-4" />
                Blog & Actualites
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-[family-name:var(--font-heading)] mb-4">
                Notre <span className="text-primary">Blog</span>
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Retrouvez nos articles, conseils et actualites sur la maintenance industrielle,
                la climatisation et les solutions energetiques.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filters */}
        <section className="container mx-auto px-4 -mt-6 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-dark-light border border-dark-lighter rounded-2xl p-4 md:p-6"
          >
            <div className="flex flex-col md:flex-row gap-4 items-center">
              {/* Search */}
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Rechercher un article..."
                  className="w-full bg-dark border border-dark-lighter rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>

              {/* Category tabs */}
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                      activeCategory === cat
                        ? 'bg-primary text-dark'
                        : 'bg-dark border border-dark-lighter text-gray-400 hover:text-white hover:border-gray-600'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Posts grid */}
        <section className="container mx-auto px-4 py-16">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl text-gray-400 font-semibold mb-2">
                Aucun article trouve
              </h3>
              <p className="text-gray-500">
                Essayez de modifier vos criteres de recherche.
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filtered.map((post, i) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <Link href={`/blog/${post.slug}`} className="group block">
                    <div className="bg-dark-light border border-dark-lighter rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300 h-full flex flex-col">
                      {/* Image */}
                      <div className="relative h-56 overflow-hidden bg-dark-lighter">
                        {post.image ? (
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <BookOpen className="w-12 h-12 text-gray-700" />
                          </div>
                        )}
                        <div className="absolute top-4 left-4">
                          <span className="bg-primary text-dark text-xs font-bold px-3 py-1 rounded-full">
                            {post.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {formatDate(post.createdAt)}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="w-3.5 h-3.5" />
                            {post.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <BookOpen className="w-3.5 h-3.5" />
                            {readingTime(post.content)}
                          </span>
                        </div>

                        <h2 className="text-xl font-bold text-white group-hover:text-primary transition-colors mb-3 font-[family-name:var(--font-heading)] line-clamp-2">
                          {post.title}
                        </h2>

                        <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                          {post.excerpt}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="flex items-center gap-1 text-xs text-gray-500 bg-dark px-2 py-1 rounded-md"
                            >
                              <Tag className="w-3 h-3" />
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-2 text-primary text-sm font-semibold group-hover:gap-3 transition-all">
                          Lire la suite
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
