import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "../store";

const useAuth = () => {
  const user = useSelector(selectUser);
  const [auth, setAuth] = useState<boolean>();

  useEffect(() => {
    const validate = async () => {
      const data = await axios.post("/api/token/verify/", {
        token: user,
      });
      if (data.status === 200) {
        setAuth(true);
      }
    };
    if (user !== "") {
      validate();
      return;
    } else {
      setAuth(false);
    }
  }, [user]);

  return auth;
};

export default useAuth;
