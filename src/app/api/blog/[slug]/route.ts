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

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const posts = readPosts();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return NextResponse.json({ error: 'Article non trouvé' }, { status: 404 });
  }

  return NextResponse.json(post);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!verifyToken(request)) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  const { slug } = await params;

  try {
    const body = await request.json();
    const posts = readPosts();
    const index = posts.findIndex((p) => p.slug === slug);

    if (index === -1) {
      return NextResponse.json({ error: 'Article non trouvé' }, { status: 404 });
    }

    const { title, excerpt, content, image, author, category, tags, published } = body;

    // If title changed, regenerate slug
    let newSlug = posts[index].slug;
    if (title && title !== posts[index].title) {
      newSlug = slugify(title);
      let slugCount = 1;
      let finalSlug = newSlug;
      while (posts.some((p, i) => i !== index && p.slug === finalSlug)) {
        finalSlug = `${newSlug}-${slugCount}`;
        slugCount++;
      }
      newSlug = finalSlug;
    }

    posts[index] = {
      ...posts[index],
      ...(title !== undefined && { title }),
      ...(excerpt !== undefined && { excerpt }),
      ...(content !== undefined && { content }),
      ...(image !== undefined && { image }),
      ...(author !== undefined && { author }),
      ...(category !== undefined && { category }),
      ...(tags !== undefined && { tags }),
      ...(published !== undefined && { published }),
      slug: newSlug,
      updatedAt: new Date().toISOString(),
    };

    writePosts(posts);
    return NextResponse.json(posts[index]);
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!verifyToken(request)) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  const { slug } = await params;

  try {
    const posts = readPosts();
    const filtered = posts.filter((p) => p.slug !== slug);

    if (filtered.length === posts.length) {
      return NextResponse.json({ error: 'Article non trouvé' }, { status: 404 });
    }

    writePosts(filtered);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
