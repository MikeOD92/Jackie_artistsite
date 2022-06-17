import React, { FC, SyntheticEvent, useRef, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypedSelect";
import axios from "axios";

const UserPage: FC = () => {
  const auth = useAuth();

  const { access_key } = useTypedSelector((state) => state.user);

  const password = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);

  const email = useRef<HTMLInputElement>(null);
  const newUserPass = useRef<HTMLInputElement>(null);

  const [update, setUpdate] = useState<string | null>(null);
  const [register, setRegister] = useState<string | null>(null);

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${access_key}`,
    },
  };

  const changePassword = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (
      password.current?.value !== null &&
      confirmPassword.current?.value !== null &&
      password.current?.value !== confirmPassword.current?.value
    ) {
      setUpdate("Passwords do not match.");
      return;
    }
    if (
      password.current &&
      confirmPassword.current &&
      password.current.value === confirmPassword.current.value
    )
      try {
        const updateResponse = await axios.put(
          "/api/auth/password",
          {
            password: password.current.value,
            password_confirm: confirmPassword.current.value,
          },
          config
        );
        if (updateResponse.status === 200) {
          setUpdate("Password Updated");
        }
      } catch (err: any) {
        console.error(err);
        setUpdate(err.message);
      }
  };

  const newUser = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (email.current && newUserPass.current) {
      try {
        const registerResponse = await axios.post(
          "/api/register",
          {
            email: email.current.value,
            password: newUserPass.current.value,
          },
          config
        );
        if (registerResponse.status === 200) {
          setRegister("Success");
        }
      } catch (err: any) {
        console.error(err);
        setRegister(err.message);
      }
    }
  };

  if (auth === false) {
    return <Navigate to="/" />;
  }
  return (
    <Container style={{ marginTop: "14vh" }}>
      <h1> User Edit Page</h1>

      <h2 className="mt-5">Reset Password</h2>
      <Form
        onSubmit={(e) => {
          changePassword(e);
        }}
      >
        <Form.Label>
          {" "}
          New Password
          <Form.Control type="password" ref={password} />
        </Form.Label>
        <Form.Label>
          {" "}
          Confirm Password
          <Form.Control type="password" ref={confirmPassword} />
        </Form.Label>
        <Button style={{ backgroundColor: "black" }} type="submit">
          Set Password
        </Button>
        {update === "Password Updated" ? (
          <p style={{ color: "green" }}> {update} </p>
        ) : update !== "Password Updated" && update !== null ? (
          <p style={{ color: "red" }}> Update failed: {update}</p>
        ) : (
          ""
        )}
      </Form>

      <h3 className="mt-5">Add New User</h3>
      <Form
        onSubmit={(e) => {
          newUser(e);
        }}
      >
        <Form.Label>
          Email
          <Form.Control type="email" ref={email} />
        </Form.Label>
        <Form.Label>
          Password
          <Form.Control type="password" ref={newUserPass} />
        </Form.Label>
        <Button style={{ backgroundColor: "black" }} type="submit">
          Create New User
        </Button>
        {register === "Success" ? (
          <p style={{ color: "green" }}> User created successfully </p>
        ) : register !== "Success" && register !== null ? (
          <p style={{ color: "red" }}>{register}</p>
        ) : (
          ""
        )}
      </Form>
    </Container>
  );
};

export default UserPage;
