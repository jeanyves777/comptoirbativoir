'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Megaphone,
  Image,
  FileText,
  BookOpen,
  ExternalLink,
  LogOut,
  Menu,
  X,
  Zap,
} from 'lucide-react';
import LoginPage from './login/page';

const navItems = [
  { href: '/admin', label: 'Tableau de bord', icon: LayoutDashboard },
  { href: '/admin/announcements', label: 'Annonces', icon: Megaphone },
  { href: '/admin/blog', label: 'Blog', icon: BookOpen },
  { href: '/admin/media', label: 'Medias', icon: Image },
  { href: '/admin/content', label: 'Contenu', icon: FileText },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem('cbi-admin-token');
    setAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('cbi-admin-token');
    setAuthenticated(false);
  };

  // Loading state
  if (authenticated === null) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  // Not authenticated - show login
  if (!authenticated) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-dark flex">
      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-dark-light border-r border-dark-lighter transform transition-transform duration-200 lg:transform-none ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-dark-lighter">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="font-bold text-white text-sm font-[family-name:var(--font-heading)]">
                  CBI Admin
                </h2>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider">
                  Panneau de gestion
                </p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== '/admin' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-gray-400 hover:text-white hover:bg-dark-lighter/50'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="ml-auto w-1.5 h-1.5 rounded-full bg-primary"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Bottom actions */}
          <div className="px-3 py-4 border-t border-dark-lighter space-y-1">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-dark-lighter/50 transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
              Voir le site
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-red-400 hover:bg-red-500/5 transition-colors w-full"
            >
              <LogOut className="w-5 h-5" />
              Deconnexion
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-dark/80 backdrop-blur-lg border-b border-dark-lighter px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden lg:block" />
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary text-xs font-bold">A</span>
              </div>
              <span className="text-sm text-gray-400 hidden sm:block">Admin</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-8">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
