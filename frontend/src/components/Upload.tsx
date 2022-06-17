import React, { FC, SyntheticEvent } from "react";
import { Form } from "react-bootstrap";

import axios from "axios";
import { useTypedSelector } from "../hooks/useTypedSelect";

const Upload: FC<{ setUpload: Function }> = ({ setUpload }) => {
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
      const { data } = await axios.post("/api/upload", fileList, config);
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
      <Form.Control
        type="file"
        placeholder="img upload"
        required
        multiple
        onChange={(e) => handleChange(e)}
      />
    </>
  );
};

export default Upload;
