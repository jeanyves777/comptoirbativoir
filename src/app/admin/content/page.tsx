'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, CheckCircle, Type, FileText, Megaphone, Eye, EyeOff } from 'lucide-react';

interface SiteContent {
  heroTitle: string;
  heroDescription: string;
  announcement: string;
  [key: string]: string;
}

export default function ContentPage() {
  const [content, setContent] = useState<SiteContent>({
    heroTitle: '',
    heroDescription: '',
    announcement: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const token = typeof window !== 'undefined' ? localStorage.getItem('cbi-admin-token') : '';

  useEffect(() => {
    fetch('/api/content')
      .then((r) => r.json())
      .then((data) => setContent(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSuccess(false);

    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(content),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch {
      // ignore
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  const fields = [
    {
      key: 'heroTitle',
      label: 'Titre Hero',
      description: 'Le titre principal affiche en haut de la page d\'accueil',
      icon: Type,
      multiline: false,
    },
    {
      key: 'heroDescription',
      label: 'Description Hero',
      description: 'Le texte descriptif sous le titre hero',
      icon: FileText,
      multiline: true,
    },
    {
      key: 'announcement',
      label: 'Bandeau d\'annonce',
      description: 'Texte affiche dans le bandeau d\'annonce en haut du site (laisser vide pour masquer)',
      icon: Megaphone,
      multiline: false,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white font-[family-name:var(--font-heading)]">
            Contenu du site
          </h1>
          <p className="text-gray-400 mt-1">Modifiez les textes de votre site</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm text-gray-400 hover:text-white border border-dark-lighter hover:border-primary/30 transition-colors"
          >
            {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showPreview ? 'Masquer' : 'Apercu'}
          </button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-dark font-semibold px-5 py-2.5 rounded-lg transition-colors disabled:opacity-50"
          >
            {saving ? (
              <div className="w-4 h-4 border-2 border-dark/30 border-t-dark rounded-full animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            Enregistrer
          </motion.button>
        </div>
      </div>

      {/* Success notification */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-3 rounded-lg text-sm"
          >
            <CheckCircle className="w-4 h-4" />
            Contenu enregistre avec succes !
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content fields */}
      <div className="space-y-6">
        {fields.map((field, i) => (
          <motion.div
            key={field.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-dark-light border border-dark-lighter rounded-xl p-6"
          >
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <field.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-white font-semibold">{field.label}</h3>
                <p className="text-gray-500 text-sm">{field.description}</p>
              </div>
            </div>

            {field.multiline ? (
              <textarea
                value={content[field.key] || ''}
                onChange={(e) =>
                  setContent({ ...content, [field.key]: e.target.value })
                }
                rows={4}
                className="w-full bg-dark border border-dark-lighter rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
              />
            ) : (
              <input
                type="text"
                value={content[field.key] || ''}
                onChange={(e) =>
                  setContent({ ...content, [field.key]: e.target.value })
                }
                className="w-full bg-dark border border-dark-lighter rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Preview */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-dark-light border border-primary/20 rounded-xl p-6">
              <h3 className="text-sm font-medium text-primary mb-4 uppercase tracking-wider">
                Apercu
              </h3>

              {content.announcement && (
                <div className="bg-primary/10 border border-primary/20 rounded-lg px-4 py-2 mb-6 text-center">
                  <p className="text-primary text-sm">{content.announcement}</p>
                </div>
              )}

              <div className="space-y-3">
                <h1 className="text-3xl font-bold text-white font-[family-name:var(--font-heading)]">
                  {content.heroTitle || 'Titre hero...'}
                </h1>
                <p className="text-gray-300 leading-relaxed">
                  {content.heroDescription || 'Description hero...'}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
