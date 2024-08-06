import { NextRequest, NextResponse } from "next/server";
type Blog = {
  id: number;
  name: string;
  title: string;
  description: string;
  img: string;
};
export async function GET(req: NextRequest) {
  if (req.method === "GET") {
    const blogs: Blog[] = [
      {
        id: 1,
        name: "Hemant",
        title: "First Blog Post",
        description: "This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.",
        img: "",
      },
      {
        id: 2,
        name: "Sargam",
        title: "Second Blog Post",
        description: "This is the second blog post.",
        img: "",
      },
      {
        id: 3,
        name: "Rishabh",
        title: "First Blog Post",
        description: "This is the first blog post.",
        img: "",
      },
      {
        id: 4,
        name: "Ankit",
        title: "Second Blog Post",
        description: "This is the second blog post.",
        img: "",
      },
    ];

    return NextResponse.json(blogs);
  } else {
    return NextResponse.json([]);
  }
}
