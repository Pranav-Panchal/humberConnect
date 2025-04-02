"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button, Form } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const isValidHumberEmail = (email: string) => /^n\d{8}@humber\.ca$/i.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidHumberEmail(email)) {
      setError("Only Humber n-ID emails are allowed.");
      return;
    }

    const res = await signIn("credentials", { email, password, redirect: false });

    if (res?.error) {
      setError(res.error);
    } else {
      router.push("/");
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
        <h2 className="text-center fw-bold mb-3">Login</h2>
        {error && <p className="text-danger text-center">{error}</p>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          <Button variant="primary w-100" type="submit">Login</Button>
        </Form>
        <p className="mt-3 text-center">
          Don&apos;t have an account? <Link href="/auth/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
