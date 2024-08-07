import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import User from "@/app/modals/User";
import bcrypt from "bcryptjs";
import { Types } from "mongoose";
import { generateToken } from "@/app/utils/jwt";

const ObjectId = require("mongoose").Types.ObjectId;

export const GET = async (req: NextRequest) => {
  console.log("Route.ts");

  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const password = searchParams.get("password");

  await dbConnect();

  if (!email || !password) {
    return new NextResponse(
      JSON.stringify({ message: "Email and password are required" }),
      {
        status: 400,
      }
    );
  }

  try {
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return new NextResponse(JSON.stringify({ message: "User Not found" }), {
        status: 400,
      });
    }
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (isMatch) {
      const token = generateToken({ _id: existingUser._id });
      console.log("Route Token: ", token);

      return new NextResponse(JSON.stringify({ message: "Logged In", token }), {
        status: 200,
      });
    } else {
      return new NextResponse(JSON.stringify({ message: "Wrong Password" }), {
        status: 401,
      });
    }
  } catch (err: any) {
    return new NextResponse(JSON.stringify([]), { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const { name, email, password } = await req.json();

    await dbConnect();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new NextResponse(
        JSON.stringify({ message: "User already exists" }),
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 9);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    return new NextResponse(JSON.stringify({ message: "User is created" }), {
      status: 201,
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Error in creating user", error }),
      { status: 500 }
    );
  }
};

export const PATCH = async (req: NextRequest) => {
  try {
    const user = await req.json();
    const { userId, newEmail } = user;
    await dbConnect();

    if (!userId || !newEmail) {
      return new NextResponse(
        JSON.stringify({ message: "Botht id and username are required" }),
        { status: 400 }
      );
    }

    if (!Types.ObjectId.isValid(userId)) {
      return new NextResponse(JSON.stringify({ message: "Invalid userId" }), {
        status: 400,
      });
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: new ObjectId(userId) },
      { email: newEmail },
      { new: true }
    );
    if (!updatedUser) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 400,
      });
    }

    return new NextResponse(
      JSON.stringify({
        message: "User updated successfully",
        user: updatedUser,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Error in updating user", error }),
      { status: 500 }
    );
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    await dbConnect();
    if (!userId) {
      return new NextResponse(
        JSON.stringify({ message: "userId is required" }),
        { status: 400 }
      );
    }
    if (!Types.ObjectId.isValid(userId)) {
      return new NextResponse(JSON.stringify({ message: "Invalid userId" }), {
        status: 400,
      });
    }
    const deletedUser = await User.findByIdAndDelete(
      new Types.ObjectId(userId)
    );
    if (!deletedUser) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 400,
      });
    }
    return new NextResponse(
      JSON.stringify({
        message: "User deleted successfully",
        user: deletedUser,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "User not found", user: null }),
      { status: 400 }
    );
  }
};
