"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [emailError, setEmailError] = useState("");
  const router = useRouter();

  // Validate Humber email format
  const isValidHumberEmail = (email: string) => /^n\d{8}@humber\.ca$/i.test(email.trim());

  const handleEmailBlur = () => {
    if (!isValidHumberEmail(email)) {
      setEmailError("Email must be in n01234567@humber.ca format");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidHumberEmail(email)) {
      setFormError("Only valid Humber n-ID emails are allowed (e.g. n01234567@humber.ca)");
      return;
    }

    try {
      await axios.post("/api/auth/signup", { name, email, password });
      router.push("/auth/login");
    } catch (err) {
      setFormError("Signup failed, please try again.");
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundImage: "url('/img/campus-bg.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center"
      }}
    >
      <div className="card p-4 shadow-lg rounded-4 bg-white bg-opacity-90" style={{ width: "100%", maxWidth: "420px" }}>
        <div className="text-center mb-3">
          <Image src="/img/HClogo.png" alt="Humber Logo" width={100} height={100} />
        </div>
        <h2 className="text-center fw-bold mb-3">Sign Up</h2>
        {formError && <p className="text-danger text-center">{formError}</p>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Humber Email (n-ID)</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(""); // Clear on change
              }}
              onBlur={handleEmailBlur}
              isInvalid={!!emailError}
              required
            />
            {emailError && <div className="text-danger small mt-1">{emailError}</div>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </Form.Group>

          <Button variant="success w-100" type="submit">
            Sign Up
          </Button>
        </Form>

        <p className="mt-3 text-center">
          Already have an account? <Link href="/auth/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
