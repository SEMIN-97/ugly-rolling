import { FC, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import styles from './DraggableOrnament.module.scss';

interface DraggableOrnamentProp {
  boundaryWidth: number;
  boundaryHeight: number;
  children: ReactNode;
}

export const DraggableOrnament: FC<DraggableOrnamentProp> = ({
  boundaryWidth,
  boundaryHeight,
  children
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const startPosition = useRef({ x: 0, y: 0 });

  const handleMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;

    const moveX = "clientX" in e ? e.clientX : e.touches[0].clientX;
    const moveY = "clientY" in e ? e.clientY : e.touches[0].clientY;

    const newX = moveX - startPosition.current.x;
    const newY = moveY - startPosition.current.y;

    setPosition({
      x: Math.max(0, Math.min(newX, boundaryWidth - (elementRef.current?.offsetWidth || 0))),
      y: Math.max(0, Math.min(newY, boundaryHeight - (elementRef.current?.offsetHeight || 0))),
    });
  }, [boundaryHeight, boundaryWidth, isDragging]);

  const handleStartMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    const startX = e.clientX;
    const startY = e.clientY;

    startPosition.current = {x: startX - position.x, y: startY - position.y};
  };

  const handleStartTouch = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    const startX = e.touches[0].clientX;
    const startY = e.touches[0].clientY;

    startPosition.current = { x: startX - position.x, y: startY - position.y };
  };

  const handleEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    const preventScroll = (e: TouchEvent) => e.preventDefault();

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleMove, { passive: false });
    window.addEventListener("mouseup", handleEnd);
    window.addEventListener("touchend", handleEnd);
    document.body.addEventListener("touchmove", preventScroll, { passive: false });

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchend", handleEnd);
      document.body.removeEventListener("touchmove", preventScroll);
    };
  }, [handleMove, handleEnd]);

  return (
    <div
      className={styles.newOrnament}
      ref={elementRef}
      onMouseDown={handleStartMouse}
      onTouchStart={handleStartTouch}
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      { children }
    </div>
  );
};