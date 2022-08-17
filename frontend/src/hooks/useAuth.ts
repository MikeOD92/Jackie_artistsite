import { useState, useEffect } from "react";
import { useTypedSelector } from "../hooks/useTypedSelect";

const useAuth = () => {
  const user = useTypedSelector((state) => state.user);
  const [auth, setAuth] = useState<boolean>();

  useEffect(() => {
    if (user.access_key !== "") {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [user]);

  return auth;
};

export default useAuth;
