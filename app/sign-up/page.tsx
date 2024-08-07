"use client";
import { useEffect, useState } from "react";
import styles from "@/app/sign-up/SignUpForm.module.css";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import { addUser, setError } from "@/store/slices/users/userSlice";
import { useRouter } from "next/navigation";

const SignUpForm: React.FC = () => {
  const initialData = {
    name: "",
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialData);
  const { status, error } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const validateName = (name: string) => {
    const nameRegex = /^[a-zA-Z]+([a-zA-Z ]*[a-zA-Z]+)*$/;
    return nameRegex.test(name);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleAddUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData) return;

    if (!validateName(formData.name)) {
      dispatch(setError("Please enter a valid name."));
      return;
    }
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
      await dispatch(addUser(formData));
      setFormData(initialData);
      dispatch(setError(""));
      router.push("/login");
    } catch (error) {
      console.error("Failed to add user:", error);
    }
  };

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
        <form onSubmit={handleAddUser}>
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
            <div className={styles.accountExists}>
              <p>Already have an account?</p>
              <Link href="/login">
                <span className={styles.login}>Login</span>
              </Link>
            </div>
            <button type="submit" className={styles.button}>
              {status === "loading" ? "Adding..." : "Sign Up"}
            </button>
            {error && <p className={styles.error}>{error}</p>}
          </div>
        </form>
      </div>
    </>
  );
};
export default SignUpForm;
