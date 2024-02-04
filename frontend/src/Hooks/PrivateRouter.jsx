import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { DEFAULT_REDIRECT } from "@/lib/routes";
import { useEffect, useState } from "react"; // Import useState
import Loading from "@/pages/Loading";

export default function PrivateRouter({ children }) {
  const auth = useSelector((state) => state.auth.isAuthenticated);
  const isLoading = useSelector((state) => state.auth.isLoading);

  const [loadingCompleted, setLoadingCompleted] = useState(false);

  useEffect(() => {
    console.log("HERE", isLoading);

    // Check if isLoading has changed from true to false
    if (isLoading === false) {
      setLoadingCompleted(true);
    }
  }, [isLoading]);
  useEffect(() => {
    console.log(auth);
  }, [auth]);

  if (!loadingCompleted) {
    return <Loading />;
  }

  if (auth) {
    return children;
  }

  return <Navigate to={DEFAULT_REDIRECT} />;
}
