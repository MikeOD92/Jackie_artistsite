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
    // basiclly instead of validating the access token on the front end we just look to see if there is one,
    // if it is there then we have access to admin pages and let server validate on form submission.
    // i'll have to test
  }, [user]);

  return auth;
};

export default useAuth;
