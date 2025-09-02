import Cookies from "js-cookie";
import ms from "ms";

export const ACCESS_TOKEN_KEY = "accessToken";

export const accessTokenCookie = {
  set: (token: string) => {
    const EXPIRES_IN = import.meta.env?.VITE_JWT_EXPIRES_IN || "1d";
    const EXPIRES_MS = ms(EXPIRES_IN);

    const expiresDate = new Date(Date.now() + EXPIRES_MS);
    Cookies.set(ACCESS_TOKEN_KEY, token, {
      expires: expiresDate, // js-cookie hỗ trợ Date
      sameSite: "Lax",
      path: "/", // nên thêm path để đồng bộ remove
    });
  },
  get: (): string | undefined => {
    return Cookies.get(ACCESS_TOKEN_KEY);
  },
  remove: () => {
    Cookies.remove(ACCESS_TOKEN_KEY, { path: "/" });
  },
};
