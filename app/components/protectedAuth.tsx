"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import { setUserName } from "@/store/slices/users/authSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const protectedAuth = (WrappedComponent: React.ComponentType<any>) => {
  const Wrapper: React.FC<any> = (props) => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const {token} = useAppSelector((state)=> state.auth)
    const router = useRouter();
    const dispatch = useAppDispatch();

    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await fetch("/api/protected", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (res.ok) {
            const data = await res.json();
            console.log("Protected response", data);
            dispatch(setUserName(data.name));
            setData(data);
          } else {
            const error = await res.json();
            setError(error.message);
            console.error(error.message);
            router.push("/login"); // Redirect to login if not authenticated

          }
        } catch (err) {
          console.error("An error occurred:", err);
          setError("An unexpected error occurred.");
        } finally {
          setLoading(false);
        }
      };

      if (token) {
        fetchData();
      } else {
        setLoading(false); // Stop loading if no token
      }
    }, [token, router]);

    if (loading) {
      return <div>Loading...</div>; // Or a loading spinner
    }

    if (error) {
      return <div>Error: {error}</div>; // Show error message
    }

    if (!token) {
      return <div>Access Denied</div>; // Or a redirect component
    }

    return <WrappedComponent {...props} data={data} />;
  };

  return Wrapper;
};

export default protectedAuth;
