import React, { FC, SyntheticEvent, useState, useRef } from "react";
import axios from "axios";
import { Form, Button, Row, Col, Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import LinkEdit from "./LinkEdit";
import { SiteData } from "../types/site_data";
import { ExternalLinks } from "../types/external_links";

import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelect";

import Upload from "./Upload";

const PageEdit: FC<{ data: SiteData }> = ({ data }) => {
  // const user = useSelector(selectUser);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [newLinks, setNewLinks] = useState<number>(0);
  const body = useRef<HTMLTextAreaElement>(null);
  const [splash, setSplash] = useState<string>("");

  const { editPageData } = useActions();
  const { access_key } = useTypedSelector((state) => state.user);

  const submitEdit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (body.current !== null) {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${access_key}`,
        },
      };
      if (data.id === 0) {
        try {
          const updatedBody = await axios.post(
            `/api/site-data/create`,
            { name: data.name, text: body.current.value, splash: splash[0] },
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
      } else {
        try {
          editPageData(
            access_key,
            data.id.toString(),
            body.current.value,
            splash
          );
        } catch (err) {
          console.error(err);
        }
      }
    } else return;
  };

  return (
    <div className="mb-5 mt-5">
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
        {data.name === "about" ? (
          <>
            <Form.Label className="mt-3">Splash Image</Form.Label>
            <Upload setUpload={setSplash} />
            <Row className="p-3">
              <Col md={2}>
                {splash !== "" ? (
                  <Image fluid src={splash} />
                ) : (
                  <Image fluid src={data.splash} />
                )}
              </Col>
            </Row>
          </>
        ) : (
          ""
        )}

        <Button style={{ backgroundColor: "black" }} type="submit">
          {" "}
          SAVE{" "}
        </Button>
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
              ? data.links.map((link: ExternalLinks, i) => {
                  return (
                    <LinkEdit
                      key={`${link.title} ${i}`}
                      link={link}
                      pageId={data.id}
                      action="update"
                      // setData={setData}
                    />
                  );
                })
              : ""}
          </Row>
          <Row>
            {newLinks > 0
              ? [...Array(newLinks)].map((i) => {
                  return (
                    <LinkEdit
                      link={null}
                      pageId={data.id}
                      action="new"
                      // setData={setData}
                    />
                  );
                })
              : ""}
          </Row>
          <Row>
            <Col md={2}>
              <Button
                style={{ backgroundColor: "black" }}
                className="m-2"
                onClick={() => setNewLinks(newLinks + 1)}
              >
                +
              </Button>

              <Button
                style={{ backgroundColor: "black" }}
                className="m-2"
                onClick={() => setNewLinks(newLinks - 1)}
              >
                -
              </Button>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default PageEdit;
