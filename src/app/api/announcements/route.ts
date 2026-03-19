import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

const JWT_SECRET = process.env.JWT_SECRET || 'cbi-secret-key-2024';
const ANNOUNCEMENTS_FILE = path.join(process.cwd(), 'content', 'announcements.json');

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

function readAnnouncements(): Announcement[] {
  try {
    if (!fs.existsSync(ANNOUNCEMENTS_FILE)) return [];
    const data = fs.readFileSync(ANNOUNCEMENTS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeAnnouncements(announcements: Announcement[]) {
  const dir = path.dirname(ANNOUNCEMENTS_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(ANNOUNCEMENTS_FILE, JSON.stringify(announcements, null, 2));
}

export async function GET() {
  const announcements = readAnnouncements();
  return NextResponse.json(announcements);
}

export async function POST(request: NextRequest) {
  if (!verifyToken(request)) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, message, link, image, active } = body;

    if (!title || !message) {
      return NextResponse.json(
        { error: 'Titre et message requis' },
        { status: 400 }
      );
    }

    const announcements = readAnnouncements();
    const newAnnouncement: Announcement = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
      title,
      message,
      link: link || undefined,
      image: image || undefined,
      active: active ?? true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    announcements.unshift(newAnnouncement);
    writeAnnouncements(announcements);

    return NextResponse.json(newAnnouncement, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  if (!verifyToken(request)) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, title, message, link, image, active } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID requis' }, { status: 400 });
    }

    const announcements = readAnnouncements();
    const index = announcements.findIndex((a) => a.id === id);

    if (index === -1) {
      return NextResponse.json({ error: 'Annonce non trouvée' }, { status: 404 });
    }

    announcements[index] = {
      ...announcements[index],
      ...(title !== undefined && { title }),
      ...(message !== undefined && { message }),
      ...(link !== undefined && { link }),
      ...(image !== undefined && { image }),
      ...(active !== undefined && { active }),
      updatedAt: new Date().toISOString(),
    };

    writeAnnouncements(announcements);
    return NextResponse.json(announcements[index]);
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
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID requis' }, { status: 400 });
    }

    const announcements = readAnnouncements();
    const filtered = announcements.filter((a) => a.id !== id);

    if (filtered.length === announcements.length) {
      return NextResponse.json({ error: 'Annonce non trouvée' }, { status: 404 });
    }

    writeAnnouncements(filtered);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
