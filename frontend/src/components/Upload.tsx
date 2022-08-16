import React, { FC, SyntheticEvent } from "react";
import { Form } from "react-bootstrap";

import { useTypedSelector } from "../hooks/useTypedSelect";
import { useActions } from "../hooks/useActions";

const Upload: FC<{ required: boolean }> = ({ required }) => {
  const { makeUpload } = useActions();

  const { access_key } = useTypedSelector((state) => state.user);

  const handleUpload = async (files: FileList) => {
    try {
      if (!files) return;

      makeUpload(access_key, files);
    } catch (error) {
      console.error(error);
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
