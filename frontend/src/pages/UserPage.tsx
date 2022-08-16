import React, { FC, SyntheticEvent, useRef, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypedSelect";
import { useActions } from "../hooks/useActions";

const UserPage: FC = () => {
  const auth = useAuth();

  const { access_key } = useTypedSelector((state) => state.user);
  const register = useTypedSelector((state) => state.register);
  const update = useTypedSelector((state) => state.update);

  const { createUser, updatePassword } = useActions();

  const password = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);

  const email = useRef<HTMLInputElement>(null);
  const newUserPass = useRef<HTMLInputElement>(null);

  const changePassword = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (password.current && confirmPassword.current) {
      updatePassword(
        password.current.value,
        confirmPassword.current.value,
        access_key
      );
    }
  };

  const newUser = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (email.current && newUserPass.current) {
      createUser(email.current.value, newUserPass.current.value, access_key);
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
        {update.success === "Success" ? (
          <p style={{ color: "green" }}>{update.success}</p>
        ) : update.error ? (
          <p style={{ color: "red" }}>Update failed: {update.error}</p>
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
        {register.success === "Success" ? (
          <p style={{ color: "green" }}> User created successfully </p>
        ) : register.error ? (
          <p style={{ color: "red" }}>{register.error}</p>
        ) : (
          ""
        )}
      </Form>
    </Container>
  );
};

export default UserPage;
