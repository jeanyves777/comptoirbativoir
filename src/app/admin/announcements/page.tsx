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
  Link as LinkIcon,
  Image,
  AlertTriangle,
} from 'lucide-react';

interface Announcement {
  id: string;
  title: string;
  message: string;
  link?: string;
  image?: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Announcement | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: '',
    message: '',
    link: '',
    image: '',
    active: true,
  });

  const token = typeof window !== 'undefined' ? localStorage.getItem('cbi-admin-token') : '';

  const fetchAnnouncements = useCallback(async () => {
    try {
      const res = await fetch('/api/announcements');
      const data = await res.json();
      setAnnouncements(Array.isArray(data) ? data : []);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);

  const openNew = () => {
    setEditing(null);
    setForm({ title: '', message: '', link: '', image: '', active: true });
    setShowForm(true);
  };

  const openEdit = (ann: Announcement) => {
    setEditing(ann);
    setForm({
      title: ann.title,
      message: ann.message,
      link: ann.link || '',
      image: ann.image || '',
      active: ann.active,
    });
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.title || !form.message) return;
    setSaving(true);

    try {
      const method = editing ? 'PUT' : 'POST';
      const body = editing ? { ...form, id: editing.id } : form;

      const res = await fetch('/api/announcements', {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setShowForm(false);
        fetchAnnouncements();
      }
    } catch {
      // ignore
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/announcements?id=${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      setDeleteConfirm(null);
      fetchAnnouncements();
    } catch {
      // ignore
    }
  };

  const toggleActive = async (ann: Announcement) => {
    try {
      await fetch('/api/announcements', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: ann.id, active: !ann.active }),
      });
      fetchAnnouncements();
    } catch {
      // ignore
    }
  };

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
            Annonces
          </h1>
          <p className="text-gray-400 mt-1">Gerez les annonces du site</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={openNew}
          className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-dark font-semibold px-4 py-2.5 rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          Nouvelle annonce
        </motion.button>
      </div>

      {/* List */}
      <AnimatePresence mode="popLayout">
        {announcements.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-dark-light border border-dark-lighter rounded-xl p-12 text-center"
          >
            <p className="text-gray-500">Aucune annonce pour le moment</p>
            <button onClick={openNew} className="text-primary hover:underline mt-2 text-sm">
              Creer la premiere annonce
            </button>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {announcements.map((ann, i) => (
              <motion.div
                key={ann.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ delay: i * 0.05 }}
                className="bg-dark-light border border-dark-lighter rounded-xl p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <h3 className="text-white font-semibold truncate">{ann.title}</h3>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          ann.active
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : 'bg-gray-500/10 text-gray-500'
                        }`}
                      >
                        {ann.active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mt-1 line-clamp-2">{ann.message}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      {ann.link && (
                        <span className="flex items-center gap-1">
                          <LinkIcon className="w-3 h-3" />
                          {ann.link}
                        </span>
                      )}
                      {ann.image && (
                        <span className="flex items-center gap-1">
                          <Image className="w-3 h-3" />
                          Image
                        </span>
                      )}
                      <span>
                        {new Date(ann.createdAt).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => toggleActive(ann)}
                      className="p-2 rounded-lg text-gray-400 hover:text-primary hover:bg-primary/5 transition-colors"
                      title={ann.active ? 'Desactiver' : 'Activer'}
                    >
                      {ann.active ? (
                        <ToggleRight className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <ToggleLeft className="w-5 h-5" />
                      )}
                    </button>
                    <button
                      onClick={() => openEdit(ann)}
                      className="p-2 rounded-lg text-gray-400 hover:text-primary hover:bg-primary/5 transition-colors"
                    >
                      <Edit3 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(ann.id)}
                      className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/5 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Delete confirmation */}
                <AnimatePresence>
                  {deleteConfirm === ann.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 pt-4 border-t border-dark-lighter flex items-center justify-between">
                        <div className="flex items-center gap-2 text-red-400 text-sm">
                          <AlertTriangle className="w-4 h-4" />
                          Supprimer cette annonce ?
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="px-3 py-1.5 text-sm text-gray-400 hover:text-white rounded-lg hover:bg-dark-lighter transition-colors"
                          >
                            Annuler
                          </button>
                          <button
                            onClick={() => handleDelete(ann.id)}
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowForm(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-dark-light border border-dark-lighter rounded-2xl w-full max-w-lg p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-white">
                  {editing ? 'Modifier l\'annonce' : 'Nouvelle annonce'}
                </h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Titre *
                  </label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full bg-dark border border-dark-lighter rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    placeholder="Titre de l'annonce"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Message *
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={3}
                    className="w-full bg-dark border border-dark-lighter rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                    placeholder="Contenu de l'annonce"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Lien (optionnel)
                  </label>
                  <input
                    type="url"
                    value={form.link}
                    onChange={(e) => setForm({ ...form, link: e.target.value })}
                    className="w-full bg-dark border border-dark-lighter rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Image URL (optionnel)
                  </label>
                  <input
                    type="text"
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    className="w-full bg-dark border border-dark-lighter rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    placeholder="/uploads/image.jpg"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-300">Active</label>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, active: !form.active })}
                    className="text-primary"
                  >
                    {form.active ? (
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
                  disabled={saving || !form.title || !form.message}
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
