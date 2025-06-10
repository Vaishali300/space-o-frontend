import React, { useEffect, useMemo, useState, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppState } from "../store/store";
import { ROUTING, SIDEBAR_ITEMS } from "../lib/constants";
import { LocalStorage } from "../utils/localstorage";
import { authAction } from "../features/auth/auth.slice";
import { Loader } from "../components";

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isUserLoggedIn = useSelector(
    (state: AppState) => state.auth.isUserLoggedIn
  );
  const location = useLocation();
  const navigate = useNavigate();

  const pathname = location.pathname;
  const searchParams = location.search;
  const queryParams = searchParams ? searchParams : "";

  const privateRoute = useMemo(() => {
    return (path: string) =>
      SIDEBAR_ITEMS?.some((item) => path.startsWith(item.path));
  }, []);

  useEffect(() => {
    const checkAuthentication = () => {
      setIsLoading(true);

      const accessToken = LocalStorage.getItem("accessToken");
      const isLoggedIn = !!accessToken;

      dispatch(authAction.updateIsLoggedIn(isLoggedIn));

      if (isLoggedIn) {
        if (privateRoute(pathname)) {
          navigate(pathname + queryParams, { replace: true });
        } else {
          navigate(ROUTING.EVENT, { replace: true });
        }
      } else {
        const isUnauthorizedPath = ![
          ROUTING.SIGNIN,
          ROUTING.FORGOT_PASSWORD,
        ].includes(pathname);

        if (pathname.startsWith(ROUTING.RESET_PASSWORD)) {
          navigate(pathname + queryParams, { replace: true });
        } else if (isUnauthorizedPath) {
          navigate(ROUTING.SIGNIN, { replace: true });
        }
      }

      setIsLoading(false);
    };

    checkAuthentication();
  }, [dispatch, pathname, queryParams, isUserLoggedIn, navigate, privateRoute]);

  if (isLoading) {
    return <Loader />;
  }

  return <>{children}</>;
};

export default AuthGuard;
