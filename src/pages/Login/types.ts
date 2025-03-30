import { UserType } from "../../types/user.ts";

/**
 * 表单提交数据类型
 */
export type LoginFormValuesType = {
  username: string;
  password: string;
};

/**
 * 登录请求数据类型
 */
export type LoginReqType = LoginFormValuesType;

/**
 * 登录响应数据类型
 */
export type LoginRespType = {
  user: UserType;
  errorCnt: number; // 登录失败次数
};
