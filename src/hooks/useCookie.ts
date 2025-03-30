import Cookies from "js-cookie";

/**
 * 存储cookie的hooks
 */
export const useCookie = () => {
  const setCookie = (key: string, value: any, expires: number = 20) => {
    const time = expires / (24 * 60);
    const target = JSON.stringify(value);
    Cookies.set(key, target, { expires: time });
  };

  const getCookie = (key: string) => {
    return JSON.parse(Cookies.get(key) || "null");
  };

  const removeCookie = (key: string) => {
    Cookies.remove(key);
  };

  return { setCookie, getCookie, removeCookie };
};
