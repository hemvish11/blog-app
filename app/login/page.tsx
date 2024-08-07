"use client";
import { useEffect, useState } from "react";
import styles from "@/app/login/LoginForm.module.css";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import { login, setError } from "@/store/slices/users/authSlice";
import { useRouter } from "next/navigation";

const LoginForm: React.FC = () => {
  const initialData = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialData);
  const dispatch = useAppDispatch();
  const { token, error } = useAppSelector((state) => state.auth);
  const router = useRouter();

  const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto"; // Cleanup function to restore scroll
    };
  }, []);

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData) return;

    if (!validateEmail(formData.email)) {
      dispatch(setError("Please enter a valid email."));
      return;
    }
    if (!validatePassword(formData.password)) {
      dispatch(
        setError(
          "Please enter a valid password (8 characters, at least one uppercase, one lowercase, one number, and one special character)."
        )
      );
      return;
    }

    try {
      await dispatch(login(formData));
      const token = localStorage.getItem("token");
      console.log("Tokennnnnnn: " + token);
      if (token) {
        setFormData(initialData);
        dispatch(setError(""));
        // await sleep(1000);
        router.push("/home");
      }
    } catch (error) {
      console.error("Failed to loggin user:", error);
      dispatch(setError("Failed to loggin user."));
    }
  };


  return (
    <>
      <h1 className={styles.logo}>Convey Zone</h1>
      <Image
        src="/LoginLeft.png"
        width={300}
        height={300}
        alt="Writing Image Left"
        className={styles.writingLeftImg}
      />
      <Image
        src="/LoginRight.png"
        width={400}
        height={400}
        alt="Writing Image Right"
        className={styles.writingRightImg}
      />
      <Image
        src="/LoginBottomLeft.png"
        width={400}
        height={400}
        alt="Writing Image Bottom Left"
        className={styles.writingBottomLeft}
      />
      <div className={styles.loginContainer}>
        <h2 className={styles.heading}>Login</h2>
        <form onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.buttonsContainer}>
            <div className={styles.accountExists}>
              <p>Don't have an account?</p>
              <Link href="/sign-up">
                <span className={styles.login}>Sign up</span>
              </Link>
            </div>
            <button type="submit" className={styles.button}>
              {/* {status === "loading" ? "Logging in..." : "Login"} */}
              Login
            </button>
            {error && <p className={styles.error}>{error}</p>}
          </div>
        </form>
      </div>
    </>
  );
};
export default LoginForm;
