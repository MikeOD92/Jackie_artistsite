import { useState, useEffect } from "react";
import axios from "axios";
import { useTypedSelector } from "../hooks/useTypedSelect";

const useAuth = () => {
  const user = useTypedSelector((state) => state.user);
  const [auth, setAuth] = useState<boolean>();

  useEffect(() => {
    const validate = async () => {
      const data = await axios.post("/api/token/verify/", {
        token: user.access_key,
      });
      if (data.status === 200) {
        setAuth(true);
      }
    };
    if (user.access_key !== "") {
      validate();
      return;
    } else {
      setAuth(false);
    }
  }, [user]);

  return auth;
};

export default useAuth;
