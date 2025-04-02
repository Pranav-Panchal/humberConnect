'use client'

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { Form, Button, Tab, Tabs, Container, Row, Col, Card } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import axios from "axios"; // Add axios import

const AuthPage: React.FC = () => {
  const [key, setKey] = useState<"login" | "signup">("login");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "", // Only for Sign Up
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Prevent multiple submissions
  const router = useRouter(); // Initialize Next.js router

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return; // Prevent multiple submissions
    setIsSubmitting(true);

    const url = key === "login" ? "/api/auth/login" : "/api/auth/signup"; // Use different URLs for login and signup

    try {
      const response = await axios.post(url, formData);
      console.log("✅ Response from server:", response.data);

      // Save both the token and the user's name to localStorage on successful login/signup
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userName", response.data.name);  // Store the user's name

      router.push("/"); // Redirect to Home page after login/signup
    } catch (err) {
      setError("❌ Something went wrong! Please try again.");
      console.error("❌ Login/Signup Error:", err);
    } finally {
      setIsSubmitting(false); // Re-enable the button once the request is complete
    }
  };

  return (
    <div className="auth-container">
      <nav className="auth-navbar">
        <div className="container d-flex justify-content-between align-items-center">
          <Link href="/">
            <div className="auth-logo">
              <Image src="/img/HClogo.svg" alt="Humber Logo" width={120} height={50} priority />
            </div>
          </Link>
        </div>
      </nav>

      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Row>
          <Col>
            <Card className="p-4 shadow-lg" style={{ width: "25rem" }}>
              <Tabs activeKey={key} onSelect={(k) => setKey(k as "login" | "signup")} className="mb-3">
                <Tab eventKey="login" title="Login">
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100" disabled={isSubmitting}>
                      {isSubmitting ? "Logging in..." : "Login"}
                    </Button>
                  </Form>
                </Tab>

                <Tab eventKey="signup" title="Sign Up">
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter full name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Create a password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    <Button variant="success" type="submit" className="w-100" disabled={isSubmitting}>
                      {isSubmitting ? "Signing up..." : "Sign Up"}
                    </Button>
                  </Form>
                </Tab>
              </Tabs>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AuthPage;
