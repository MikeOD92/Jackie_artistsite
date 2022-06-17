import React, { FC, SyntheticEvent, useEffect, useState, useRef } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import axios, { AxiosResponse } from "axios";
import { ExternalLinks } from "../types/external_links";

import { SiteData } from "../types/site_data";
import { useTypedSelector } from "../hooks/useTypedSelect";

const LinkEdit: FC<{
  link: ExternalLinks | null;
  pageId: Number;
  action: string;
  setData: Function;
}> = ({ link, pageId, action, setData }) => {
  const { access_key } = useTypedSelector((state) => state.user);

  const title = useRef<HTMLInputElement>(null);
  const text = useRef<HTMLInputElement>(null);
  const url = useRef<HTMLInputElement>(null);

  const [saved, setSaved] = useState<boolean | null>(null);

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${access_key}`,
    },
  };

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      if (
        title?.current !== null &&
        text?.current !== null &&
        url?.current !== null
      ) {
        const update: AxiosResponse<ExternalLinks> | null =
          action === "update" && link !== null
            ? await axios.put(
                `/api/external-links/edit/${link.id}`,
                {
                  page: pageId,
                  title: title.current.value,
                  text: text.current.value,
                  url: url.current.value,
                },
                config
              )
            : action === "new"
            ? await axios.post(
                `/api/external-links`,
                {
                  page: pageId,
                  title: title.current.value,
                  text: text.current.value,
                  url: url.current.value,
                },
                config
              )
            : null;

        if (update !== null && update.status === 200) {
          setSaved(true);
        } else {
          setSaved(false);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };
  const submitDelete = async (e: SyntheticEvent, id: Number) => {
    e.preventDefault();
    const deletedLink = await axios.delete(
      `/api/external-links/edit/${id}`,
      config
    );
    if (deletedLink.status === 200 && link) {
      const fetchData = await axios.get("/api/site-data");
      const pageData = fetchData.data.filter(
        (item: SiteData) => item.id === link.page
      );
      setData(pageData[0]);
    }
  };
  return (
    <Form className="mt-3" onSubmit={(e: SyntheticEvent) => submit(e)}>
      <Row>
        <Col md={2}>
          <Form.Control
            className="defaultCursor"
            type="string"
            ref={title}
            defaultValue={link ? link.title : ""}
            required
          />
        </Col>
        <Col md={3}>
          <Form.Control
            className="defaultCursor"
            type="string"
            ref={text}
            defaultValue={link ? link.text : ""}
          />
        </Col>
        <Col md={3}>
          <Form.Control
            className="defaultCursor"
            type="string"
            ref={url}
            defaultValue={link ? link.url : ""}
            required
          />
        </Col>
        <Col md={4}>
          <Row>
            <Col md={6}>
              <Button style={{ backgroundColor: "black" }} type="submit">
                {" "}
                Save{" "}
              </Button>
              {link ? (
                <Button
                  onClick={(e: SyntheticEvent) => submitDelete(e, link.id)}
                  variant="outline-danger"
                  style={{ marginLeft: "2vw" }}
                >
                  X
                </Button>
              ) : (
                ""
              )}
            </Col>
            <Col md={6}>
              {saved === true ? (
                <p style={{ color: "green" }}>Updated</p>
              ) : saved === false ? (
                <p style={{ color: "red" }}>Update Failed</p>
              ) : (
                ""
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};

export default LinkEdit;
