import { ReactNode, createContext, useState, useEffect } from "react";
import { ResponseModel, useToastErrorHandler, baseUrl } from "@/hooks/useApi";
import axios, { AxiosError } from "axios";

type User = {
  name: string;
  email: string;
  picture: string;
};

type AuthContext = {
  status: "loading" | "authenticated" | "unauthenticated";
  user: User | null;
  googleCallback: (token: string) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContext>({
  status: "loading",
  user: null,
  googleCallback: async () => {},
  logout: () => {},
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const [status, setStatus] = useState<
    "loading" | "authenticated" | "unauthenticated"
  >("loading");

  const errorHandler = useToastErrorHandler();

  const googleCallback = async (token: string) => {
    await axios.post<ResponseModel>(
      baseUrl + "/auth/google/callback",
      { token },
      { withCredentials: true }
    );

    const user = await axios.get<ResponseModel>(
      baseUrl + "/auth/user/profile",
      { withCredentials: true }
    );

    setUser(user.data.data!);
    setStatus("authenticated");
  };

  const logout = () => {
    axios
      .delete<ResponseModel>(baseUrl + "/auth/logout", {
        withCredentials: true,
      })
      .then(() => {
        setUser(null);
        setStatus("unauthenticated");
      })
      .catch((err) => errorHandler(err));
  };

  useEffect(() => {
    axios
      .get<ResponseModel<User>>(baseUrl + "/auth/user/profile", {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.data);
        setStatus("authenticated");
      })
      .catch((err: AxiosError<ResponseModel>) => {
        if (err.response?.status === 401) {
          console.log("refreshing token");
          axios
            .get<ResponseModel>(baseUrl + "/auth/refresh", {
              withCredentials: true,
            })
            .then(() => {
              axios
                .get<ResponseModel<User>>(baseUrl + "/auth/user/profile", {
                  withCredentials: true,
                })
                .then((res) => {
                  setUser(res.data.data);
                  setStatus("authenticated");
                })
                .catch(() => {
                  setStatus("unauthenticated");
                });
            })
            .catch(() => {
              logout();
            });

          return;
        }

        logout();
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{
        status,
        user,
        googleCallback,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
