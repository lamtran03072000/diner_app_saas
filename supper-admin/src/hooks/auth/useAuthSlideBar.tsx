import React from "react";
import { TeamOutlined } from "@ant-design/icons";

import { useQuery } from "@tanstack/react-query";
import UserService from "../../services/user";
import { SupperAdminRole } from "../../constants/auth";
import { NavLink, useLocation } from "react-router-dom";
import { PATH } from "../../routers";
import { useDispatch, useSelector } from "react-redux";
import { setIsLogin } from "../../store/auth/authSlice";
import type { RootState } from "../../store";
import { accessTokenCookie } from "../../../util/cookie";

type MenuItem = {
  key: string;
  label: string;
  icon: React.ReactNode;
  requiredRoles: string[];
};

const useAuthSlideBar = () => {
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);
  const { data: userInfo } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => UserService.getUserInfo(),
    enabled: isLogin,
  });

  const role = userInfo?.role;

  const rawMenuItems: MenuItem[] = [
    {
      key: "/",
      label: "Công ty",
      icon: (
        <NavLink to={"/"}>
          <TeamOutlined />
        </NavLink>
      ),
      // children: [],
      requiredRoles: [SupperAdminRole.MANAGER],
    },
    {
      key: PATH.ORGANIZATION,
      label: "Tổ chức",
      icon: (
        <NavLink to={PATH.ORGANIZATION}>
          <TeamOutlined />
        </NavLink>
      ),
      requiredRoles: [SupperAdminRole.MANAGER],
      // children: [],
    },
  ];

  const menuItems = rawMenuItems.filter((item) =>
    item.requiredRoles.includes(role ?? "")
  );

  const keyActive = useLocation().pathname;

  return { userInfo, role, menuItems, keyActive };
};

export default useAuthSlideBar;
