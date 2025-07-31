import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const { userInfo, token, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (!userInfo || !token || !isAuthenticated) {
      router.push("/");
    }
  }, [userInfo, token, isAuthenticated, router]);

  if (!userInfo || !token || !isAuthenticated) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
