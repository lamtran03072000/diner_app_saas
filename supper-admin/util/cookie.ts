import Cookies from "js-cookie";

export const ACCESS_TOKEN_KEY = "accessToken";

// Helper function to convert time string to milliseconds
const parseTimeToMs = (timeStr: string): number => {
  const unit = timeStr.slice(-1);
  const value = parseInt(timeStr.slice(0, -1));

  switch (unit) {
    case "s":
      return value * 1000;
    case "m":
      return value * 60 * 1000;
    case "h":
      return value * 60 * 60 * 1000;
    case "d":
      return value * 24 * 60 * 60 * 1000;
    default:
      return 24 * 60 * 60 * 1000; // default to 1 day
  }
};

export const accessTokenCookie = {
  set: (token: string) => {
    const EXPIRES_IN = import.meta.env?.VITE_JWT_EXPIRES_IN || "1d";
    // Convert time string to milliseconds
    const EXPIRES_MS = parseTimeToMs(EXPIRES_IN);

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
