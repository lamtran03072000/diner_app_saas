import { useMutation } from "@tanstack/react-query";
import AuthService from "../../services/auth";
import type { LoginRequest, LoginResponse } from "../../types/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { accessTokenCookie } from "../../../util/cookie";
import { PATH } from "../../routers";
import { setIsLogin } from "../../store/auth/authSlice";
import { useDispatch } from "react-redux";
export const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mutate: loginAccount } = useMutation({
    mutationFn: (data: LoginRequest) => AuthService.login(data),
    onSuccess: async (data: LoginResponse) => {
      const { accessToken } = data;

      //
      dispatch(setIsLogin(true));
      accessTokenCookie.set(accessToken);

      navigate(PATH.ORGANIZATION);
      toast.success("Đăng nhập thành công");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Tài khoản hoặc mật khẩu không đúng");
    },
  });

  return { loginAccount };
};
