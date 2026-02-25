import { notFound } from "next/navigation";
import postsData from "@/data/posts.json";
import { BlogPostClient } from "./BlogPostClient";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = postsData.find(p => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return <BlogPostClient post={post} />;
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  return postsData.map((post) => ({
    slug: post.slug,
  }));
}