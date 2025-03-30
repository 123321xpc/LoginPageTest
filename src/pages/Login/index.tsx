import React, { useEffect } from "react";
import styles from "./index.module.css";
import { Button, Flex, Form, Input } from "antd";
import { loginFormRules } from "./rules.ts";
import { LoginFormValuesType } from "./types.ts";
import { useLogin } from "./hooks/useLogin.ts";
import useTimer from "./hooks/useTimer.ts";

/**
 * 登录页面
 * @constructor
 */
const Login: React.FC = () => {
  const [loginForm] = Form.useForm<LoginFormValuesType>();
  const { handleLogin, loading, data } = useLogin();
  const { disabled, timeLeft, startTimer } = useTimer();

  // 登录失败3次，则开启倒计时
  useEffect(() => {
    if (data && data.errorCnt >= 3) {
      startTimer();
    }
  }, [data?.errorCnt]);

  return (
    <Flex vertical align="center" justify="center" className={styles.container}>
      <h1 style={{ marginTop: "20vh", marginBottom: "5vh" }}>登录页面</h1>
      <Form
        form={loginForm}
        labelCol={{ span: 6 }}
        onFinish={() => handleLogin(loginForm.getFieldsValue())}
      >
        <Form.Item<LoginFormValuesType>
          label="用户名"
          name="username"
          rules={loginFormRules.usernameRules}
        >
          <Input />
        </Form.Item>

        <Form.Item<LoginFormValuesType>
          label="密&nbsp;&nbsp;&nbsp;&nbsp;码"
          name="password"
          rules={loginFormRules.passwordRules}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={loading}
            disabled={disabled}
          >
            {disabled ? `已登录失败3次，请${timeLeft}秒后重试` : "登录"}
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};

export default Login;
