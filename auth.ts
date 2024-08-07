import NextAuth, { CredentialsSignin } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "./app/modals/User";
import { compare } from "bcryptjs";
import dbConnect from "./app/lib/dbConnect";

const authorizeCredentials = async (credentials: any) => {
  let user = null;
  await dbConnect();

  const email = credentials.email;
  const password = credentials.password as string;

  if (!email || !password)
    throw new Error("Please provide both email and password");
  //   // connetion to db
  user = await User.findOne({ email: email });
  if (!user) throw new CredentialsSignin("User not found");

  if (!user.password) throw new CredentialsSignin("Invalid Emial or Password");

  const isMatch = await compare(password, user.password);

  if (!isMatch) throw new CredentialsSignin("Invalid Email or Password");
  return { name: user.name, email: user.email, id: user._id };
};

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: authorizeCredentials,
    }),
  ],
  pages: {
    signIn: "/login",
  },
});
