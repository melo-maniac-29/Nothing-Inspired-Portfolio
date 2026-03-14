import { notFound } from "next/navigation";
import fs from "fs/promises";
import path from "path";
import { BlogPostClient } from "./BlogPostClient";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

function isValidPostArray(data: any): data is Array<{ slug: string }> {
  return Array.isArray(data) && data.every(p => typeof p.slug === 'string');
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const postsFile = path.join(process.cwd(), "data/posts.json");
  let postsData: any[] = [];

  try {
    const fileContent = await fs.readFile(postsFile, "utf-8");
    const parsed = JSON.parse(fileContent);
    if (!isValidPostArray(parsed)) {
      throw new Error('Invalid posts data structure');
    }
    postsData = parsed;
  } catch (error) {
    console.error('Failed to read or parse posts.json:', error);
    notFound();
    return;
  }

  const post = postsData.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
    return;
  }

  return <BlogPostClient post={post} />;
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const postsFile = path.join(process.cwd(), "data/posts.json");
  let postsData: any[] = [];

  try {
    const fileContent = await fs.readFile(postsFile, "utf-8");
    const parsed = JSON.parse(fileContent);
    if (!isValidPostArray(parsed)) {
      throw new Error('Invalid posts data structure');
    }
    postsData = parsed;
  } catch (error) {
    console.error('Failed to read or parse posts.json:', error);
    return [];
  }

  return postsData.map((post) => ({ slug: post.slug }));
}