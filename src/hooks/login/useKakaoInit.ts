import { useEffect } from "react";

export function useKakaoInit() {
  useEffect(() => {
    const kakao = (window as any).Kakao;
    if (!kakao || !kakao.isInitialized()) {
      kakao.init(import.meta.env.VITE_KAKAO_JS_KEY);
    }
  }, []);
}
