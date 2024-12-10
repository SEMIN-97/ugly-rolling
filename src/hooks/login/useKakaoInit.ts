import { useEffect } from "react";

export function useKakaoInit() {
  useEffect(() => {
    if (typeof (window as any).Kakao !== 'undefined') {
      if (!(window as any).Kakao.isInitialized()) {
        (window as any).Kakao.init(import.meta.env.VITE_KAKAO_JS_KEY);
      }
    }
  }, []);
}
