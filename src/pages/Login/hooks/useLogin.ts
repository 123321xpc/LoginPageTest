import { LoginFormValuesType, LoginRespType } from "../types.ts";
import { useState } from "react";
import { USER_COOKIE_KEY } from "../constants.ts";
import { useCookie } from "../../../hooks/useCookie.ts";
import { message } from "antd";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<LoginRespType>();
  const { setCookie, removeCookie } = useCookie();
  // 登录错误次数
  const [errorCnt, setErrorCnt] = useState(0);

  /**
   * 登录:模拟http请求
   * @param params
   */
  const handleLogin = async (params: LoginFormValuesType) => {
    setLoading(true);
    console.log("登录中...");

    // 模拟http请求
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (params.username === "admin" && params.password === "admin") {
          const user = {
            username: "test",
            phone: "1234567890",
            email: "test@test.com",
          };
          resolve(user);
        } else {
          reject("用户名或密码错误");
        }
      }, 1000);
    })
      .then((res: any) => {
        // 登录成功,存储cookie
        setData({
          user: res,
          errorCnt: 0,
        });
        // 登录成功,错误次数重置为0
        setErrorCnt(0);
        removeCookie(USER_COOKIE_KEY);
        setCookie(USER_COOKIE_KEY, res);
        message.success("登录成功");
      })
      .catch((err: any) => {
        // 登录失败,错误次数+1
        setData({
          user: undefined,
          errorCnt: errorCnt + 1,
        });

        if (errorCnt >= 2) {
          setErrorCnt(0);
        } else {
          setErrorCnt(errorCnt + 1);
        }
        message.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    loading,
    data,
    handleLogin,
  };
};
