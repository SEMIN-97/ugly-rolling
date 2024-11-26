import { useEffect } from "react";

export function useKakaoInit() {
  useEffect(() => {
    if (typeof window.Kakao !== 'undefined') {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(import.meta.env.VITE_KAKAO_JS_KEY)
      }
    }
  }, []);
}