import { useState, useEffect } from "react";

const useTimer = () => {
  const [timeLeft, setTimeLeft] = useState(60); // 初始时间设置为 60 秒
  const [timerActive, setTimerActive] = useState(false); // 定时器是否正在运行
  const [disabled, setDisabled] = useState(false); // 返回数据，用于控制按钮

  // 启动定时器
  const startTimer = () => {
    setDisabled(true);
    setTimerActive(true);
    setTimeLeft(60); // 每次启动时重置为 60 秒
  };

  // 定时器计时
  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      // 清理定时器
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setDisabled(false); // 时间到时取消禁用按钮
      setTimerActive(false); // 停止定时器
    }
  }, [timeLeft, timerActive]);

  return { timeLeft, startTimer, disabled };
};

export default useTimer;
