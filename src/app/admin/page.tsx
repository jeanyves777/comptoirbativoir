'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Megaphone,
  Image,
  FileText,
  Plus,
  Upload,
  Edit3,
  TrendingUp,
  Clock,
} from 'lucide-react';
import Link from 'next/link';

interface Announcement {
  id: string;
  title: string;
  active: boolean;
  createdAt: string;
}

interface MediaFile {
  filename: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('cbi-admin-token');
    Promise.all([
      fetch('/api/announcements').then((r) => r.json()),
      fetch('/api/upload', {
        headers: { Authorization: `Bearer ${token}` },
      }).then((r) => r.json()),
    ])
      .then(([annData, mediaData]) => {
        setAnnouncements(Array.isArray(annData) ? annData : []);
        setMediaFiles(Array.isArray(mediaData) ? mediaData : []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const stats = [
    {
      label: 'Annonces',
      value: announcements.length,
      active: announcements.filter((a) => a.active).length,
      icon: Megaphone,
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      label: 'Medias',
      value: mediaFiles.length,
      icon: Image,
      color: 'text-blue-400',
      bg: 'bg-blue-400/10',
    },
    {
      label: 'Contenu',
      value: 3,
      icon: FileText,
      color: 'text-emerald-400',
      bg: 'bg-emerald-400/10',
    },
  ];

  const quickActions = [
    {
      label: 'Nouvelle annonce',
      href: '/admin/announcements',
      icon: Plus,
      color: 'bg-primary/10 text-primary hover:bg-primary/20',
    },
    {
      label: 'Upload media',
      href: '/admin/media',
      icon: Upload,
      color: 'bg-blue-400/10 text-blue-400 hover:bg-blue-400/20',
    },
    {
      label: 'Modifier contenu',
      href: '/admin/content',
      icon: Edit3,
      color: 'bg-emerald-400/10 text-emerald-400 hover:bg-emerald-400/20',
    },
  ];

  const recentActivity = [
    ...announcements.slice(0, 3).map((a) => ({
      type: 'announcement' as const,
      text: `Annonce: ${a.title}`,
      date: a.createdAt,
    })),
    ...mediaFiles.slice(0, 3).map((f) => ({
      type: 'media' as const,
      text: `Upload: ${f.filename}`,
      date: f.createdAt,
    })),
  ]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white font-[family-name:var(--font-heading)]">
          Tableau de bord
        </h1>
        <p className="text-gray-400 mt-1">
          Bienvenue dans le panneau d&apos;administration CBI
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-dark-light border border-dark-lighter rounded-xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">{stat.label}</p>
                <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
                {'active' in stat && stat.active !== undefined && (
                  <p className="text-xs text-gray-500 mt-1">
                    {stat.active} active{stat.active > 1 ? 's' : ''}
                  </p>
                )}
              </div>
              <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-dark-light border border-dark-lighter rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-white">Actions rapides</h2>
          </div>
          <div className="space-y-3">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${action.color}`}
              >
                <action.icon className="w-5 h-5" />
                <span className="font-medium">{action.label}</span>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-dark-light border border-dark-lighter rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-white">Activite recente</h2>
          </div>
          {recentActivity.length === 0 ? (
            <p className="text-gray-500 text-sm py-4 text-center">
              Aucune activite recente
            </p>
          ) : (
            <div className="space-y-3">
              {recentActivity.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-dark-lighter/50 transition-colors"
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      item.type === 'announcement'
                        ? 'bg-primary/10'
                        : 'bg-blue-400/10'
                    }`}
                  >
                    {item.type === 'announcement' ? (
                      <Megaphone className="w-4 h-4 text-primary" />
                    ) : (
                      <Image className="w-4 h-4 text-blue-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white truncate">{item.text}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(item.date).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
