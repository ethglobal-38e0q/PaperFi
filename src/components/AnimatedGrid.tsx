import { useEffect, useRef } from 'react';

export const AnimatedGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    const gridSize = 50;
    const perspective = 600;
    let offsetY = 0;
    const speed = 1.2;

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const vanishingY = canvas.height * 0.4;

      const rows = 40;
      const cols = 20;

      for (let i = -5; i < rows; i++) {
        for (let j = -cols; j <= cols; j++) {
          const x = j * gridSize;
          const y = i * gridSize - offsetY;

          const z = Math.max(y, 1);
          const scale = perspective / (perspective + z);

          if (scale <= 0 || scale > 2) continue;

          const projX = centerX + x * scale;
          const projY = vanishingY + y * scale;

          const distance = Math.abs(z) / 1000;
          const alpha = Math.max(0, Math.min(0.25, (1 - distance) * scale * 0.4));

          if (j < cols) {
            const nextX = (j + 1) * gridSize;
            const nextZ = Math.max(y, 1);
            const nextScale = perspective / (perspective + nextZ);
            const nextProjX = centerX + nextX * nextScale;
            const nextProjY = vanishingY + y * nextScale;

            ctx.strokeStyle = `rgba(147, 51, 234, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(projX, projY);
            ctx.lineTo(nextProjX, nextProjY);
            ctx.stroke();
          }

          if (i < rows - 1) {
            const downY = (i + 1) * gridSize - offsetY;
            const downZ = Math.max(downY, 1);
            const downScale = perspective / (perspective + downZ);
            const downProjX = centerX + x * downScale;
            const downProjY = vanishingY + downY * downScale;

            ctx.strokeStyle = `rgba(147, 51, 234, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(projX, projY);
            ctx.lineTo(downProjX, downProjY);
            ctx.stroke();
          }
        }
      }
    };

    let animationId: number;
    const animate = () => {
      offsetY = (offsetY + speed) % gridSize;
      drawGrid();
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};
