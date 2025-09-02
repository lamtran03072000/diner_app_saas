import axios, { AxiosError, type AxiosInstance } from "axios";
import { accessTokenCookie } from "../../util/cookie";

export class BaseAPIService {
  protected instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_BASE_URL,
      timeout: 60000,
      // headers: {
      //   Authorization: "Bearer " + (accessTokenCookie.get() || ""),
      // },
    });

    this.instance.interceptors.request.use((config) => {
      const token = accessTokenCookie.get();
      if (token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
      } else if (config.headers) {
        // tránh gửi "Bearer " rỗng
        delete (config.headers as any).Authorization;
      }
      return config;
    });

    // Chuẩn hoá response: trả data luôn (thống nhất)
    this.instance.interceptors.response.use(
      (res) => res.data,
      (error: AxiosError) => {
        // Handle 401: clear token + điều hướng (tuỳ yêu cầu)
        if (error.response?.status === 401) {
          accessTokenCookie.remove();
          // Optional: window.location.href = PATH.LOGIN;
        }
        return Promise.reject(error);
      }
    );
  }

  getInstance(): AxiosInstance {
    return this.instance;
  }

  setCommonHeaders(headers: Record<string, string>): void {
    Object.keys(headers).forEach((key) => {
      this.instance.defaults.headers.common[key] = headers[key];
    });
  }

  setLang(lang: string): void {
    this.setCommonHeaders({ Lang: lang });
  }
}
