import React, { FC, SyntheticEvent, useEffect, useState, useRef } from "react";
import axios from "axios";
import { SiteData } from "../types/site_data";
import { Container, Form, Button } from "react-bootstrap";
import useAuth from "../hooks/useAuth";

import { useSelector } from "react-redux";
import { selectUser } from "../store";

const PageEdit: FC<{ data: SiteData }> = ({ data }) => {
  const user = useSelector(selectUser);
  const [success, setSuccess] = useState<boolean | null>(null);
  const body = useRef<HTMLTextAreaElement>(null);
  const submitEdit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (body.current !== null) {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user}`,
        },
      };
      try {
        const updatedBody = await axios.put(
          `http://localhost:8000/api/site-data/edit/${data?.id}`,
          { text: body.current.value },
          config
        );
        if (updatedBody.status === 200) {
          setSuccess(true);
        } else {
          setSuccess(false);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };
  return (
    <>
      <h4> _ Page Body _</h4>
      <Form className="mt-5" onSubmit={(e: SyntheticEvent) => submitEdit(e)}>
        {data ? (
          <Form.Control
            className="defaultCursor"
            type="text"
            style={{ whiteSpace: "pre-wrap" }}
            as="textarea"
            rows={12}
            defaultValue={data.text}
            ref={body}
          />
        ) : (
          ""
        )}
        <Button type="submit"> SAVE </Button>
        {success === true ? (
          <p style={{ color: "green" }}> Updated </p>
        ) : success === false ? (
          <p style={{ color: "red" }}> Error Updating</p>
        ) : (
          ""
        )}
      </Form>
      <h4 className="mt-5"> _ Links _</h4>
      <Form></Form>
    </>
  );
};
export default PageEdit;
