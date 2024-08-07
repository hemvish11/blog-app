"use client";
import { verifyToken } from "@/app/utils/jwt";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token"); // Replace with your storage method
    console.log("Entering in the private route");
    if (!token) {
      router.push("/login");
      console.log("Token absent");
    } else {
      console.log("Decoding token in the private route", token);

      const decoded = verifyToken(token);
      if (!decoded) {
        console.log("Token is not validddddddd in the private route");
        router.push("/login");
      } else {
        console.log("Token is valid in the private route");
      }
    }
  }, []);

  return children;
};
