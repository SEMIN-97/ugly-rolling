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

  useEffect(() => {

    const timer = setTimeout(() => {
      setIsFadingOut(true);
    }, 1000);

    const fadeOutTimer = setTimeout(() => {
      setIsShowSplashVideo(false);
    }, 1300);

    // Cleanup timers
    return () => {
      clearTimeout(timer);
      clearTimeout(fadeOutTimer);
    };
    }, []);
  
  return (
    <CommonLayout>
      {
        isShowSplashVideo && <video ref={videoRef} className={`splashVideo ${isFadingOut ? 'fade-out' : ''}`} src="/assets/videos/loading_screen.mp4" muted autoPlay playsInline></video>
      }
      <h1>Index Page</h1>
    </CommonLayout>
  );
}