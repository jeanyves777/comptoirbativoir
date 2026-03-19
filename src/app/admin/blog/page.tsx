'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Edit3,
  Trash2,
  X,
  Save,
  ToggleLeft,
  ToggleRight,
  Calendar,
  Tag,
  Upload,
  AlertTriangle,
  BookOpen,
  Eye,
  EyeOff,
  Image as ImageIcon,
} from 'lucide-react';

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

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    image: '',
    author: 'Équipe CBI',
    category: '',
    tags: '',
    published: true,
  });

  const token = typeof window !== 'undefined' ? localStorage.getItem('cbi-admin-token') : '';

  const fetchPosts = useCallback(async () => {
    try {
      const res = await fetch('/api/blog', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setPosts(Array.isArray(data) ? data : []);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  function slugify(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  const openNew = () => {
    setEditing(null);
    setForm({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      image: '',
      author: 'Équipe CBI',
      category: '',
      tags: '',
      published: true,
    });
    setShowForm(true);
  };

  const openEdit = (post: BlogPost) => {
    setEditing(post);
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      image: post.image,
      author: post.author,
      category: post.category,
      tags: post.tags.join(', '),
      published: post.published,
    });
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.title || !form.content) return;
    setSaving(true);

    try {
      const tagsArray = form.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      if (editing) {
        const res = await fetch(`/api/blog/${editing.slug}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: form.title,
            excerpt: form.excerpt,
            content: form.content,
            image: form.image,
            author: form.author,
            category: form.category,
            tags: tagsArray,
            published: form.published,
          }),
        });

        if (res.ok) {
          setShowForm(false);
          fetchPosts();
        }
      } else {
        const res = await fetch('/api/blog', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: form.title,
            excerpt: form.excerpt,
            content: form.content,
            image: form.image,
            author: form.author,
            category: form.category,
            tags: tagsArray,
            published: form.published,
          }),
        });

        if (res.ok) {
          setShowForm(false);
          fetchPosts();
        }
      }
    } catch {
      // ignore
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (slug: string) => {
    try {
      await fetch(`/api/blog/${slug}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      setDeleteConfirm(null);
      fetchPosts();
    } catch {
      // ignore
    }
  };

  const togglePublished = async (post: BlogPost) => {
    try {
      await fetch(`/api/blog/${post.slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ published: !post.published }),
      });
      fetchPosts();
    } catch {
      // ignore
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setForm((prev) => ({ ...prev, image: data.url }));
      }
    } catch {
      // ignore
    } finally {
      setUploading(false);
    }
  };

  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white font-[family-name:var(--font-heading)]">
            Blog
          </h1>
          <p className="text-gray-400 mt-1">Gerez les articles du blog</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={openNew}
          className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-dark font-semibold px-4 py-2.5 rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          Nouvel article
        </motion.button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-dark-light border border-dark-lighter rounded-xl p-4">
          <p className="text-gray-500 text-xs uppercase tracking-wider">Total</p>
          <p className="text-2xl font-bold text-white mt-1">{posts.length}</p>
        </div>
        <div className="bg-dark-light border border-dark-lighter rounded-xl p-4">
          <p className="text-gray-500 text-xs uppercase tracking-wider">Publies</p>
          <p className="text-2xl font-bold text-emerald-400 mt-1">
            {posts.filter((p) => p.published).length}
          </p>
        </div>
        <div className="bg-dark-light border border-dark-lighter rounded-xl p-4">
          <p className="text-gray-500 text-xs uppercase tracking-wider">Brouillons</p>
          <p className="text-2xl font-bold text-orange-400 mt-1">
            {posts.filter((p) => !p.published).length}
          </p>
        </div>
      </div>

      {/* List */}
      <AnimatePresence mode="popLayout">
        {sortedPosts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-dark-light border border-dark-lighter rounded-xl p-12 text-center"
          >
            <BookOpen className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-500">Aucun article pour le moment</p>
            <button onClick={openNew} className="text-primary hover:underline mt-2 text-sm">
              Creer le premier article
            </button>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {sortedPosts.map((post, i) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ delay: i * 0.05 }}
                className="bg-dark-light border border-dark-lighter rounded-xl p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-4 flex-1 min-w-0">
                    {/* Thumbnail */}
                    {post.image && (
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-dark-lighter shrink-0 hidden sm:block">
                        <img
                          src={post.image}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-white font-semibold truncate">{post.title}</h3>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${
                            post.published
                              ? 'bg-emerald-500/10 text-emerald-400'
                              : 'bg-orange-500/10 text-orange-400'
                          }`}
                        >
                          {post.published ? 'Publie' : 'Brouillon'}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mt-1 line-clamp-1">{post.excerpt}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 flex-wrap">
                        <span className="flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          {post.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(post.createdAt).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => togglePublished(post)}
                      className="p-2 rounded-lg text-gray-400 hover:text-primary hover:bg-primary/5 transition-colors"
                      title={post.published ? 'Passer en brouillon' : 'Publier'}
                    >
                      {post.published ? (
                        <Eye className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <EyeOff className="w-5 h-5" />
                      )}
                    </button>
                    <button
                      onClick={() => openEdit(post)}
                      className="p-2 rounded-lg text-gray-400 hover:text-primary hover:bg-primary/5 transition-colors"
                    >
                      <Edit3 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(post.slug)}
                      className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/5 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Delete confirmation */}
                <AnimatePresence>
                  {deleteConfirm === post.slug && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 pt-4 border-t border-dark-lighter flex items-center justify-between">
                        <div className="flex items-center gap-2 text-red-400 text-sm">
                          <AlertTriangle className="w-4 h-4" />
                          Supprimer cet article ?
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="px-3 py-1.5 text-sm text-gray-400 hover:text-white rounded-lg hover:bg-dark-lighter transition-colors"
                          >
                            Annuler
                          </button>
                          <button
                            onClick={() => handleDelete(post.slug)}
                            className="px-3 py-1.5 text-sm bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                          >
                            Confirmer
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center p-4 overflow-y-auto"
            onClick={() => setShowForm(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-dark-light border border-dark-lighter rounded-2xl w-full max-w-2xl p-6 my-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-white">
                  {editing ? 'Modifier l\'article' : 'Nouvel article'}
                </h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Titre *
                  </label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      setForm({
                        ...form,
                        title,
                        slug: editing ? form.slug : slugify(title),
                      });
                    }}
                    className="w-full bg-dark border border-dark-lighter rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    placeholder="Titre de l'article"
                  />
                </div>

                {/* Slug */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Slug
                  </label>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    className="w-full bg-dark border border-dark-lighter rounded-lg px-4 py-2.5 text-gray-400 placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm"
                    placeholder="genere-automatiquement"
                    readOnly={!editing}
                  />
                </div>

                {/* Excerpt */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Extrait
                  </label>
                  <textarea
                    value={form.excerpt}
                    onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                    rows={2}
                    className="w-full bg-dark border border-dark-lighter rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                    placeholder="Resume de l'article"
                  />
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Contenu *
                  </label>
                  <textarea
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    rows={8}
                    className="w-full bg-dark border border-dark-lighter rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-y"
                    placeholder="Contenu complet de l'article..."
                  />
                </div>

                {/* Category & Author - side by side */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">
                      Categorie
                    </label>
                    <input
                      type="text"
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full bg-dark border border-dark-lighter rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                      placeholder="ex: Maintenance"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">
                      Auteur
                    </label>
                    <input
                      type="text"
                      value={form.author}
                      onChange={(e) => setForm({ ...form, author: e.target.value })}
                      className="w-full bg-dark border border-dark-lighter rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                      placeholder="Auteur"
                    />
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Tags (separes par des virgules)
                  </label>
                  <input
                    type="text"
                    value={form.tags}
                    onChange={(e) => setForm({ ...form, tags: e.target.value })}
                    className="w-full bg-dark border border-dark-lighter rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    placeholder="maintenance, energie, climatisation"
                  />
                </div>

                {/* Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Image
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={form.image}
                      onChange={(e) => setForm({ ...form, image: e.target.value })}
                      className="flex-1 bg-dark border border-dark-lighter rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                      placeholder="/uploads/image.jpg"
                    />
                    <label className="flex items-center gap-2 bg-dark border border-dark-lighter hover:border-primary/50 text-gray-400 hover:text-primary px-4 py-2.5 rounded-lg cursor-pointer transition-colors shrink-0">
                      {uploading ? (
                        <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                      ) : (
                        <Upload className="w-4 h-4" />
                      )}
                      <span className="text-sm hidden sm:inline">Upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                  {form.image && (
                    <div className="mt-2 relative h-32 rounded-lg overflow-hidden bg-dark-lighter">
                      <img
                        src={form.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* Published toggle */}
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-300">Publier</label>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, published: !form.published })}
                    className="text-primary"
                  >
                    {form.published ? (
                      <ToggleRight className="w-8 h-8" />
                    ) : (
                      <ToggleLeft className="w-8 h-8 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-dark-lighter">
                <button
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2.5 text-sm text-gray-400 hover:text-white rounded-lg hover:bg-dark-lighter transition-colors"
                >
                  Annuler
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSave}
                  disabled={saving || !form.title || !form.content}
                  className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-dark font-semibold px-5 py-2.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? (
                    <div className="w-4 h-4 border-2 border-dark/30 border-t-dark rounded-full animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  {editing ? 'Modifier' : 'Creer'}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
