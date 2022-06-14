import React, { FC, SyntheticEvent } from "react";
import { Form } from "react-bootstrap";

import axios from "axios";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelect";

const Upload: FC<{ setImages: Function }> = ({ setImages }) => {
  const { access_key } = useTypedSelector((state) => state.user);

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${access_key}`,
    },
  };

  const upload = async (files: FileList) => {
    if (!files) return;
    let data = new FormData();

    for (let i = 0; i < files.length; i++) {
      data.append("image", files[i]);
    }
    const uploaded = await axios.post("/api/upload", data, config);
    setImages((uploads: string[]) => [...uploads, ...uploaded.data.data]);
  };

  const handleChange = (e: SyntheticEvent) => {
    const data = (e.target as HTMLInputElement).files;
    if (data !== null) {
      upload(data);
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
