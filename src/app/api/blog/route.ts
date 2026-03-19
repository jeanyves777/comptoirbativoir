import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

const JWT_SECRET = process.env.JWT_SECRET || 'cbi-secret-key-2024';
const BLOG_FILE = path.join(process.cwd(), 'content', 'blog.json');

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

function readPosts(): BlogPost[] {
  try {
    if (!fs.existsSync(BLOG_FILE)) return [];
    const data = fs.readFileSync(BLOG_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writePosts(posts: BlogPost[]) {
  const dir = path.dirname(BLOG_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(BLOG_FILE, JSON.stringify(posts, null, 2));
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export async function GET(request: NextRequest) {
  const posts = readPosts();
  const isAdmin = verifyToken(request);

  if (isAdmin) {
    return NextResponse.json(posts);
  }

  const published = posts.filter((p) => p.published);
  return NextResponse.json(published);
}

export async function POST(request: NextRequest) {
  if (!verifyToken(request)) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, excerpt, content, image, author, category, tags, published } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Titre et contenu requis' },
        { status: 400 }
      );
    }

    const posts = readPosts();
    let slug = slugify(title);

    // Ensure unique slug
    let slugCount = 1;
    let finalSlug = slug;
    while (posts.some((p) => p.slug === finalSlug)) {
      finalSlug = `${slug}-${slugCount}`;
      slugCount++;
    }

    const newPost: BlogPost = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
      title,
      slug: finalSlug,
      excerpt: excerpt || '',
      content,
      image: image || '',
      author: author || 'Équipe CBI',
      category: category || 'Général',
      tags: tags || [],
      published: published ?? true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    posts.unshift(newPost);
    writePosts(posts);

    return NextResponse.json(newPost, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
