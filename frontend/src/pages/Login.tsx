import React, { FC, SyntheticEvent, useRef, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Login: FC = () => {
  const [redirect, setRedirect] = useState<boolean>(false);
  const user = useRef<HTMLInputElement>(null);
  const pass = useRef<HTMLInputElement>(null);

  return (
    <Container style={{ marginTop: "20vh" }}>
      {redirect ? (
        <Navigate to="/" />
      ) : (
        <>
          <h1> Login </h1>

          <Form
            onSubmit={async (event: SyntheticEvent) => {
              event.preventDefault();
              if (user.current !== null && pass.current !== null) {
                try {
                  const data = await axios.post(
                    "http://localhost:8000/api/auth/login",
                    {
                      username: user.current.value,
                      password: pass.current.value,
                    }
                  );
                  localStorage.setItem("access_token", `${data.data.access}`);
                  setRedirect(true);
                } catch (err) {
                  console.error(err);
                }
              }
            }}
          >
            <Form.Control ref={user} type="email" placeholder="username" />
            <Form.Control ref={pass} type="password" placeholder="password" />
            <Button
              className="m-3 main-btn pointer"
              type="submit"
              style={{ backgroundColor: "black" }}
            >
              {" "}
              Log in
            </Button>
          </Form>
        </>
      )}
    </Container>
  );
};

export default Login;
