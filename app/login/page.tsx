"use client";
import { useEffect, useState } from "react";
import styles from "@/app/login/LoginForm.module.css";
import Image from "next/image";
import Link from "next/link";

const LoginForm: React.FC = () => {
  const initialData = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialData);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto'; // Cleanup function to restore scroll
    };
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
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
        <form onSubmit={handleSubmit}>
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
            <button type="submit" className={styles.button}>
              Login
            </button>
            <p>Don't have an account?</p>
            <Link href="/sign-up">
              <button className={styles.button}>Sign up</button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};
export default LoginForm;
