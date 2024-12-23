import { createLazyFileRoute } from '@tanstack/react-router';
import { CommonLayout } from '../layouts/CommonLayout.tsx';
import { useEffect, useRef, useState } from 'react';

export const Route = createLazyFileRoute('/')({
  component: Index
});

function Index() {
  const videoRef = useRef(null);
  const [isShowSplashVideo, setIsShowSplashVideo] = useState<boolean>(true);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(false); // 영상 로드 상태

  const handleVideoLoad = () => {
    console.log('handleVideoLoad');
    setIsVideoLoaded(true);
  };


  useEffect(() => {
    if (isVideoLoaded) {
      const timer = setTimeout(() => {
        setIsFadingOut(true); // 페이드 아웃 시작
      }, 1000); // 1.3초 후 페이드 아웃 시작

      const fadeOutTimer = setTimeout(() => {
        setIsShowSplashVideo(false); // 비디오 제거
      }, 5300); // 페이드 아웃 후 1초 뒤에 비디오를 DOM에서 제거

      // 타이머 정리
      return () => {
        clearTimeout(timer);
        clearTimeout(fadeOutTimer);
      };
    }
  }, [isVideoLoaded]); // 영상이 로드된 후에만 실행

  return (
    <CommonLayout>
      {
        isShowSplashVideo && (
          <div
            className={`splashVideo ${isFadingOut ? 'fade-out' : ''}`}
          >
          <img
            src="/assets/splash.gif"
            onLoad={handleVideoLoad}
            alt=""
          />
          </div>
        )
      }
      <h1>Index Page</h1>
    </CommonLayout>
  );
}