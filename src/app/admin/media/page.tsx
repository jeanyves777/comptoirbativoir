'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload,
  Trash2,
  Copy,
  Check,
  Film,
  ImageIcon,
  AlertTriangle,
  X,
} from 'lucide-react';

interface MediaFile {
  filename: string;
  url: string;
  size: number;
  type: 'image' | 'video';
  createdAt: string;
}

export default function MediaPage() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [preview, setPreview] = useState<MediaFile | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const token = typeof window !== 'undefined' ? localStorage.getItem('cbi-admin-token') : '';

  const fetchFiles = useCallback(async () => {
    try {
      const res = await fetch('/api/upload', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setFiles(Array.isArray(data) ? data : []);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  const uploadFile = async (file: File) => {
    setUploading(true);
    setUploadProgress(0);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => Math.min(prev + 10, 90));
    }, 200);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (res.ok) {
        setUploadProgress(100);
        setTimeout(() => {
          fetchFiles();
          setUploading(false);
          setUploadProgress(0);
        }, 500);
      } else {
        const data = await res.json();
        alert(data.error || 'Erreur lors du telechargement');
        setUploading(false);
        setUploadProgress(0);
      }
    } catch {
      alert('Erreur lors du telechargement');
      setUploading(false);
      setUploadProgress(0);
    } finally {
      clearInterval(progressInterval);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) uploadFile(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
  };

  const handleDelete = async (filename: string) => {
    try {
      await fetch(`/api/upload?filename=${filename}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      setDeleteConfirm(null);
      fetchFiles();
    } catch {
      // ignore
    }
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(window.location.origin + url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
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
      <div>
        <h1 className="text-2xl font-bold text-white font-[family-name:var(--font-heading)]">
          Medias
        </h1>
        <p className="text-gray-400 mt-1">Gerez vos images et videos</p>
      </div>

      {/* Upload Area */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
          dragOver
            ? 'border-primary bg-primary/5'
            : 'border-dark-lighter hover:border-primary/50 hover:bg-dark-light'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        {uploading ? (
          <div className="space-y-3">
            <div className="w-12 h-12 mx-auto border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            <p className="text-gray-400">Telechargement en cours...</p>
            <div className="max-w-xs mx-auto bg-dark-lighter rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className="text-xs text-gray-500">{uploadProgress}%</p>
          </div>
        ) : (
          <>
            <Upload className="w-10 h-10 text-gray-500 mx-auto mb-3" />
            <p className="text-gray-300 font-medium">
              Glissez un fichier ici ou cliquez pour parcourir
            </p>
            <p className="text-gray-500 text-sm mt-1">
              Images et videos, 10MB maximum
            </p>
          </>
        )}
      </div>

      {/* Files Grid */}
      {files.length === 0 ? (
        <div className="bg-dark-light border border-dark-lighter rounded-xl p-12 text-center">
          <p className="text-gray-500">Aucun fichier telecharge</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <AnimatePresence>
            {files.map((file, i) => (
              <motion.div
                key={file.filename}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.03 }}
                className="group relative bg-dark-light border border-dark-lighter rounded-xl overflow-hidden"
              >
                {/* Thumbnail */}
                <div
                  className="aspect-square relative cursor-pointer"
                  onClick={() => setPreview(file)}
                >
                  {file.type === 'video' ? (
                    <div className="w-full h-full bg-dark-lighter flex items-center justify-center">
                      <Film className="w-10 h-10 text-gray-500" />
                    </div>
                  ) : (
                    <img
                      src={file.url}
                      alt={file.filename}
                      className="w-full h-full object-cover"
                    />
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyUrl(file.url);
                      }}
                      className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                      title="Copier l'URL"
                    >
                      {copiedUrl === file.url ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4 text-white" />
                      )}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteConfirm(file.filename);
                      }}
                      className="p-2 bg-white/10 rounded-lg hover:bg-red-500/20 transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="p-2.5">
                  <p className="text-xs text-gray-400 truncate">{file.filename}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[10px] text-gray-600">{formatSize(file.size)}</span>
                    {file.type === 'video' ? (
                      <Film className="w-3 h-3 text-blue-400" />
                    ) : (
                      <ImageIcon className="w-3 h-3 text-emerald-400" />
                    )}
                  </div>
                </div>

                {/* Delete confirmation */}
                <AnimatePresence>
                  {deleteConfirm === file.filename && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-dark-light/95 flex flex-col items-center justify-center p-3 gap-3"
                    >
                      <AlertTriangle className="w-6 h-6 text-red-400" />
                      <p className="text-xs text-gray-300 text-center">Supprimer ?</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="px-3 py-1 text-xs bg-dark-lighter rounded-lg text-gray-400 hover:text-white"
                        >
                          Non
                        </button>
                        <button
                          onClick={() => handleDelete(file.filename)}
                          className="px-3 py-1 text-xs bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20"
                        >
                          Oui
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Preview Modal */}
      <AnimatePresence>
        {preview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setPreview(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-3xl max-h-[80vh] relative"
            >
              <button
                onClick={() => setPreview(null)}
                className="absolute -top-10 right-0 text-white hover:text-primary"
              >
                <X className="w-6 h-6" />
              </button>
              {preview.type === 'video' ? (
                <video src={preview.url} controls className="max-h-[80vh] rounded-xl" />
              ) : (
                <img
                  src={preview.url}
                  alt={preview.filename}
                  className="max-h-[80vh] rounded-xl"
                />
              )}
              <div className="mt-3 flex items-center justify-between">
                <span className="text-sm text-gray-400">{preview.filename}</span>
                <button
                  onClick={() => copyUrl(preview.url)}
                  className="flex items-center gap-1.5 text-sm text-primary hover:underline"
                >
                  {copiedUrl === preview.url ? (
                    <>
                      <Check className="w-4 h-4" /> Copie !
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" /> Copier l&apos;URL
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
