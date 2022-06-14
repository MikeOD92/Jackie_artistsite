import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import { SiteData } from "../types/site_data";
import { Container } from "react-bootstrap";
import useAuth from "../hooks/useAuth";
import PageEdit from "../components/PageEdit";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelect";

const CV: FC = () => {
  const auth = useAuth();
  const { getPageData } = useActions();
  const pageData = useTypedSelector((state) => state.siteData);

  const [data, setData] = useState<SiteData>();

  useEffect(() => {
    if (data) return;
    getPageData("CV");
    setData(pageData.data);
  }, [data, pageData.data, getPageData]);

  return (
    <Container
      style={{
        marginTop: "20vh",
        minHeight: "100vh",
      }}
    >
      {auth && data ? (
        <PageEdit data={data} setData={setData} />
      ) : auth && !data ? (
        <PageEdit
          data={{
            id: 0,
            name: "CV",
            text: "",
            links: [],
            splash: "",
          }}
          setData={setData}
        />
      ) : (
        <>
          {" "}
          <p style={{ whiteSpace: "pre-wrap" }}> {data ? data.text : ""}</p>
          {data?.links
            ? data.links.map((link) => {
                return <a href={link.url}>{link.text}</a>;
              })
            : ""}
        </>
      )}
    </Container>
  );
};

export default CV;
