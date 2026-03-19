import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

const JWT_SECRET = process.env.JWT_SECRET || 'cbi-secret-key-2024';
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

const ALLOWED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml',
  'video/mp4',
  'video/webm',
  'video/ogg',
];

function verifyToken(request: NextRequest): boolean {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) return false;
  try {
    jwt.verify(authHeader.split(' ')[1], JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  if (!verifyToken(request)) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'Aucun fichier fourni' }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Type de fichier non supporté. Images et vidéos uniquement.' },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: 'Fichier trop volumineux. Maximum 10MB.' },
        { status: 400 }
      );
    }

    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    }

    const ext = path.extname(file.name) || '.bin';
    const timestamp = Date.now();
    const random = Math.random().toString(36).slice(2, 8);
    const filename = `${timestamp}-${random}${ext}`;
    const filepath = path.join(UPLOAD_DIR, filename);

    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filepath, buffer);

    const url = `/uploads/${filename}`;

    return NextResponse.json({
      url,
      filename,
      originalName: file.name,
      size: file.size,
      type: file.type,
    });
  } catch {
    return NextResponse.json({ error: 'Erreur lors du téléchargement' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  if (!verifyToken(request)) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  try {
    if (!fs.existsSync(UPLOAD_DIR)) {
      return NextResponse.json([]);
    }

    const files = fs.readdirSync(UPLOAD_DIR).map((filename) => {
      const filepath = path.join(UPLOAD_DIR, filename);
      const stats = fs.statSync(filepath);
      const ext = path.extname(filename).toLowerCase();
      const isVideo = ['.mp4', '.webm', '.ogg'].includes(ext);

      return {
        filename,
        url: `/uploads/${filename}`,
        size: stats.size,
        type: isVideo ? 'video' : 'image',
        createdAt: stats.birthtime.toISOString(),
      };
    });

    files.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json(files);
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!verifyToken(request)) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');

    if (!filename) {
      return NextResponse.json({ error: 'Nom de fichier requis' }, { status: 400 });
    }

    const filepath = path.join(UPLOAD_DIR, filename);

    if (!fs.existsSync(filepath)) {
      return NextResponse.json({ error: 'Fichier non trouvé' }, { status: 404 });
    }

    fs.unlinkSync(filepath);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
