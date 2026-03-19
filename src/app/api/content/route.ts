import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

const JWT_SECRET = process.env.JWT_SECRET || 'cbi-secret-key-2024';
const CONTENT_FILE = path.join(process.cwd(), 'content', 'site-content.json');

interface SiteContent {
  heroTitle: string;
  heroDescription: string;
  announcement: string;
  [key: string]: string;
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

function readContent(): SiteContent {
  try {
    if (!fs.existsSync(CONTENT_FILE)) {
      return {
        heroTitle: "Spécialiste en travaux d'électricité Industrielle",
        heroDescription: "Le COMPTOIR DES BATISSEURS IVOIRIENS met au service des professionnels son savoir-faire et sa forte expérience dans le domaine des installations électriques.",
        announcement: "",
      };
    }
    const data = fs.readFileSync(CONTENT_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return {
      heroTitle: "Spécialiste en travaux d'électricité Industrielle",
      heroDescription: "Le COMPTOIR DES BATISSEURS IVOIRIENS met au service des professionnels son savoir-faire et sa forte expérience dans le domaine des installations électriques.",
      announcement: "",
    };
  }
}

function writeContent(content: SiteContent) {
  const dir = path.dirname(CONTENT_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(CONTENT_FILE, JSON.stringify(content, null, 2));
}

export async function GET() {
  const content = readContent();
  return NextResponse.json(content);
}

export async function PUT(request: NextRequest) {
  if (!verifyToken(request)) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const currentContent = readContent();
    const updatedContent = { ...currentContent, ...body };
    writeContent(updatedContent);
    return NextResponse.json(updatedContent);
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
