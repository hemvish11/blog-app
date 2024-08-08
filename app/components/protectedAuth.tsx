"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import {
  setUserId,
  setUserName,
  setUserPhoto,
} from "@/store/slices/users/authSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ClimbingBoxLoader } from "react-spinners";
import styles from "./ProtectedStyles.module.css";

const protectedAuth = (WrappedComponent: React.ComponentType<any>) => {
  const Wrapper: React.FC<any> = (props) => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { token } = useAppSelector((state) => state.auth);
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
            dispatch(setUserId(data.userId));
            dispatch(setUserPhoto(data.userId));
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
        setLoading(false);
      }
    }, [token, router]);

    if (loading) {
      return (
        <div className={styles.processing}>
          <ClimbingBoxLoader color="#36d7b7" size={25} speedMultiplier={2} />
        </div>
      );
    }

    if (error) {
      router.push("/")
      return <div className={styles.processing}>Error: {error}</div>;
    }

    if (!token) {
      router.push("/")
      return <div className={styles.processing}>Access Denied</div>;
    }

    return <WrappedComponent {...props} data={data} />;
  };

  return Wrapper;
};

export default protectedAuth;
