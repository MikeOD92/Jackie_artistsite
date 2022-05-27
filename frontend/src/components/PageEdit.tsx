import React, { FC, SyntheticEvent, useEffect, useState, useRef } from "react";
import axios from "axios";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import LinkEdit from "./LinkEdit";
import { SiteData } from "../types/site_data";
import { ExternalLinks } from "../types/external_links";
import { selectUser } from "../store";

const PageEdit: FC<{ data: SiteData }> = ({ data }) => {
  const user = useSelector(selectUser);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [newLinks, setNewLinks] = useState<number>(0);
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
    <div className="mb-5">
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

      {data.name === "CV" ? (
        ""
      ) : (
        <div>
          <h4> _ Links _</h4>
          <Row className="mt-5">
            <Col md={2} style={{ textAlign: "center" }}>
              Title <br />( not displayed )
            </Col>
            <Col md={3} style={{ textAlign: "center" }}>
              Display Text
            </Col>
            <Col md={3} style={{ textAlign: "center" }}>
              URL
            </Col>
            <Col md={4}></Col>
          </Row>
          <Row>
            {data?.links.length > 0
              ? data.links.map((link: ExternalLinks) => {
                  return (
                    <LinkEdit link={link} pageId={data.id} action="update" />
                  );
                })
              : ""}
          </Row>
          <Row>
            {newLinks > 0
              ? [...Array(newLinks)].map((i) => {
                  return <LinkEdit link={null} pageId={data.id} action="new" />;
                })
              : ""}
          </Row>
          <Row>
            <Col md={1}>
              <Button onClick={() => setNewLinks(newLinks + 1)}>+</Button>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};
export default PageEdit;
