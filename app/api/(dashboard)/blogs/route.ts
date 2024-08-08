import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import Blog from "../../../modals/Blog";
import User from "@/app/modals/User";
import { Types } from "mongoose";
// type BlogType = {
//   id: number;
//   name: string;
//   title: string;
//   description: string;
//   img: string;
// };
export const GET = async (req: NextRequest) => {
  if (req.method === "GET") {
    // const { searchParams } = new URL(req.url);
    // const userId = searchParams.get("userId");

    // if (!userId || !Types.ObjectId.isValid(userId)) {
    //   return new NextResponse(JSON.stringify([]), {
    //     //message: "Invalid userId",
    //     status: 400,
    //   });
    // }
    await dbConnect();

    // const user = await User.findById(userId);
    // if (!user) {
    //   return new NextResponse(JSON.stringify([]), {
    //     status: 404, //{ message: "User not found" }
    //   });
    // }

    try {
      // for specific user only
      // const blogs = await Blog.find({user:new Types.ObjectId(userId)});
      const blogs = await Blog.find();
      return new NextResponse(JSON.stringify(blogs), { status: 200 });
    } catch (err: any) {
      return new NextResponse(JSON.stringify([]), { status: 500 });
    }
  } else {
    return NextResponse.json([]);
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    const body = await req.json();
    const { name, title, description, img } = body;

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse(JSON.stringify({ message: "Invalid userId" }), {
        status: 400,
      });
    }

    await dbConnect();
    const user = await User.findById(userId);
    if (!user) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    const newBlog = new Blog({
      user: new Types.ObjectId(userId),
      userPhoto: user.userPhoto,
      name,
      title,
      description,
      img,
    });
    await newBlog.save();
    console.log("New Blog created successfully....In backend", newBlog);
    return new NextResponse(
      JSON.stringify({
        message: "New Blog created successfully",
        Blog: newBlog,
      }),
      { status: 201 }
    );
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ message: "Error in creating user", error: err }),
      { status: 500 }
    );
  }
};

export const PATCH = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { blogId, title, description, img } = body;
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse(JSON.stringify({ message: "Invalid userId" }), {
        status: 400,
      });
    }

    await dbConnect();
    const user = await User.findById(userId);
    if (!user) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    const blog = await Blog.findOne({ _id: blogId, user: userId });
    if (!blog) {
      return new NextResponse(
        JSON.stringify({
          message: "Blog not found or does not belongs to you",
        }),
        { status: 404 }
      );
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      { title, description, img },
      { new: true }
    );

    return new NextResponse(
      JSON.stringify({ message: "Blog updated", blog: updatedBlog }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Error in updating blog", error: error }),
      { status: 500 }
    );
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const blogId = searchParams.get("blogId");

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse(JSON.stringify({ message: "Invalid userId" }), {
        status: 400,
      });
    }
    if (!blogId || !Types.ObjectId.isValid(blogId)) {
      return new NextResponse(JSON.stringify({ message: "Invalid blogId" }), {
        status: 400,
      });
    }

    await dbConnect();
    const user = await User.findById(userId);
    if (!user) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    const blog = await Blog.findOne({ _id: blogId, user: userId });
    if (!blog) {
      return new NextResponse(
        JSON.stringify({
          message: "Blog not found or does not belongs to you",
        }),
        { status: 404 }
      );
    }

    await Blog.findByIdAndDelete(blogId);

    return new NextResponse(JSON.stringify({ message: "Blog deleted" }), {
      status: 204,
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Error in Deleting blog", error: error }),
      { status: 500 }
    );
  }
};
