import React, { FC, SyntheticEvent } from "react";
import { Form } from "react-bootstrap";

import axios from "axios";
import { useTypedSelector } from "../hooks/useTypedSelect";

const Upload: FC<{ setUpload: Function; required: boolean }> = ({
  setUpload,
  required,
}) => {
  const { access_key } = useTypedSelector((state) => state.user);
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${access_key}`,
    },
  };

  const handleUpload = async (files: FileList) => {
    try {
      if (!files) return;
      let fileList = new FormData();

      for (let i = 0; i < files.length; i++) {
        fileList.append("image", files[i]);
      }
      // const { data } = await axios.post("/api/upload", fileList, config);
      const { data } = await axios.post(
        "http://localhost:8000/api/upload",
        fileList,
        config
      );
      setUpload(data.data);
    } catch (err: any) {
      console.error(err);
    }
  };

  const handleChange = (e: SyntheticEvent) => {
    const eleData = (e.target as HTMLInputElement).files;
    if (eleData) {
      handleUpload(eleData);
    }
  };

  return (
    <>
      {required ? (
        <Form.Control
          type="file"
          placeholder="img upload"
          multiple
          required
          onChange={(e) => handleChange(e)}
        />
      ) : (
        <Form.Control
          type="file"
          placeholder="img upload"
          multiple
          onChange={(e) => handleChange(e)}
        />
      )}
    </>
  );
};

export default Upload;
