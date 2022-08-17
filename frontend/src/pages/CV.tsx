import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import useAuth from "../hooks/useAuth";
import PageEdit from "../components/PageEdit";
import { SiteData } from "../types/site_data";
import { ExternalLinks } from "../types/external_links";
import { useTypedSelector } from "../hooks/useTypedSelect";

const CV: FC = () => {
  const auth = useAuth();

  const [pageData, setPageData] = useState<SiteData>();

  return (
    <Container
      style={{
        marginTop: "20vh",
        minHeight: "100vh",
      }}
    >
      {auth && pageData ? (
        <PageEdit data={pageData} setData={setPageData} />
      ) : auth && !pageData ? (
        <PageEdit
          data={{
            id: 0,
            name: "CV",
            text: "",
            links: [],
            splash: "",
          }}
          setData={setPageData}
        />
      ) : (
        <>
          {" "}
          <p style={{ whiteSpace: "pre-wrap" }}>
            {" "}
            {pageData ? pageData.text : ""}
          </p>
          {pageData?.links
            ? pageData.links.map((link: ExternalLinks) => {
                return <a href={link.url}>{link.text}</a>;
              })
            : ""}
        </>
      )}
    </Container>
  );
};

export default CV;
