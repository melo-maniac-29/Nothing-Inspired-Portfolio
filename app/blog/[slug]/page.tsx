import { notFound } from "next/navigation";
import fs from "fs/promises";
import path from "path";
import { BlogPostClient } from "./BlogPostClient";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const postsFile = path.join(process.cwd(), "data/posts.json");
  const postsData = JSON.parse(await fs.readFile(postsFile, "utf-8"));

  const post = postsData.find((p: any) => p.slug === params.slug);

  if (!post) {
    notFound();
    return;
  }

  return <BlogPostClient post={post} />;
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const postsFile = path.join(process.cwd(), "data/posts.json");
  const postsData = JSON.parse(await fs.readFile(postsFile, "utf-8"));

  return postsData.map((post: any) => ({
    slug: post.slug,
  }));
}