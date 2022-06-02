import React, { FC, SyntheticEvent, useRef, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { selectUser } from "../store";
import { useSelector } from "react-redux";

const UserPage: FC = () => {
  const auth = useAuth();
  const user = useSelector(selectUser);

  const [passwordSuccess, setPasswordSuccess] = useState<boolean | undefined>(
    undefined
  );

  const [newUserSuccess, setNewUserSuccess] = useState<boolean | undefined>(
    undefined
  );

  const password = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);

  const email = useRef<HTMLInputElement>(null);
  const newUserPass = useRef<HTMLInputElement>(null);

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${user}`,
    },
  };

  const changePassword = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (password.current !== null && confirmPassword.current !== null) {
      try {
        const update = await axios.put(
          "http://localhost:8000/api/auth/password",
          {
            password: password.current.value,
            password_confirm: confirmPassword.current.value,
          },
          config
        );
        if (update.status === 200) {
          setPasswordSuccess(true);
        }
      } catch (err) {
        console.error(err);
        setPasswordSuccess(false);
      }
    }
  };

  const newUser = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (email.current !== null && newUserPass.current !== null) {
      try {
        const createdUser = await axios.post(
          "http://localhost:8000/api/register",
          {
            email: email.current.value,
            password: newUserPass.current.value,
          },
          config
        );
        if (createdUser.status === 200) {
          setNewUserSuccess(true);
        }
      } catch (err) {
        console.error(err);
        setNewUserSuccess(false);
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
        {passwordSuccess === true ? (
          <p style={{ color: "green" }}> Password updated successfully </p>
        ) : passwordSuccess === false ? (
          <p style={{ color: "red" }}>
            {" "}
            Update failed, make sure passwords match{" "}
          </p>
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
          Set Password
        </Button>
        {newUserSuccess === true ? (
          <p style={{ color: "green" }}> User created successfully </p>
        ) : newUserSuccess === false ? (
          <p style={{ color: "red" }}>User creation failed</p>
        ) : (
          ""
        )}
      </Form>
    </Container>
  );
};

export default UserPage;
