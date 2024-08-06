"use client";
import { useEffect, useState } from "react";
import styles from "@/app/sign-up/SignUpForm.module.css";
import Image from "next/image";
import Link from "next/link";

const SignUpForm: React.FC = () => {
  const initialData = {
    name: "",
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialData);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto"; 
    };
  }, []);
  return (
    <>
      <h1 className={styles.logo}>Convey Zone</h1>
      <Image
        src="/SignUpLeft.png"
        width={400}
        height={400}
        alt="Writing Image Left"
        className={styles.writingLeftImg}
      />
      <Image
        src="/SignUpRight.png"
        width={300}
        height={300}
        alt="Writing Image Bottom Right"
        className={styles.writingBottomRight}
      />
      <div className={styles.loginContainer}>
        <h2 className={styles.heading}>Sign Up</h2>
        <form>
          <div className={styles.inputGroup}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
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
              Sign Up
            </button>
            <p>Already have an account?</p>
            <Link href="/login">
              <button className={styles.button}>Login</button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};
export default SignUpForm;
