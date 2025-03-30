import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Login from "./Pages/Login";
import "antd/dist/reset.css";
import { ConfigProvider } from "antd";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#FAAD14", // 主题颜色
        },
      }}
    >
      <Login />
    </ConfigProvider>
  </StrictMode>,
);
