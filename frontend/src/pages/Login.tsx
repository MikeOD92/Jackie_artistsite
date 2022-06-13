import React, { FC, useRef } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypedSelect";
import { useActions } from "../hooks/useActions";

const Login: FC = () => {
  const { login } = useActions();

  const user = useRef<HTMLInputElement>(null);
  const pass = useRef<HTMLInputElement>(null);

  const { access_key, error } = useTypedSelector((state) => state.user);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user.current && pass.current) {
      login(user.current.value, pass.current.value);
    }
  };

  return (
    <Container style={{ marginTop: "20vh" }}>
      <Row>
        <Col />
        {access_key ? (
          <Navigate to="/" />
        ) : (
          <Col style={{ alignSelf: "center" }} md={6}>
            <h1> Login </h1>

            <Form onSubmit={onSubmit}>
              <Form.Control ref={user} type="email" placeholder="email" />
              <Form.Control ref={pass} type="password" placeholder="password" />
              {error ? (
                <p className="mt-3" style={{ color: "red" }}>
                  {" "}
                  {error}
                </p>
              ) : (
                ""
              )}
              <Button
                className="m-3 main-btn"
                type="submit"
                style={{ backgroundColor: "black" }}
              >
                {" "}
                Log in
              </Button>
            </Form>
          </Col>
        )}
        <Col />
      </Row>
    </Container>
  );
};

export default Login;
