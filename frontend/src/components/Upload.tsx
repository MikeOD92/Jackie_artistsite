import React, { FC, SyntheticEvent } from "react";
import { Form } from "react-bootstrap";

import axios from "axios";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelect";

const Upload: FC<{ setImages: Function }> = ({ setImages }) => {
  const { access_key } = useTypedSelector((state) => state.user);
  const { data } = useTypedSelector((state) => state.upload);

  const { makeUpload } = useActions();

  const handleUpload = (files: FileList) => {
    makeUpload(access_key, files);
    setImages(data);
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
