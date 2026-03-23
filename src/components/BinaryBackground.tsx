import { useEffect, useRef, useCallback, memo } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  opacity: number;
  color: string;
  twinkleSpeed: number;
}

const NeonStarsBackground = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number>();

  const colors = [
    'hsl(200, 100%, 55%)', // primary electric blue
    'hsl(265, 85%, 65%)',  // secondary elegant violet
    'hsl(210, 20%, 98%)'   // foreground white
  ];

  const initStars = useCallback((canvas: HTMLCanvasElement) => {
    const stars: Star[] = [];
    const numStars = Math.floor((canvas.width * canvas.height) / 8000); // Define density

    for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.5,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          opacity: Math.random(),
          color: colors[Math.floor(Math.random() * colors.length)],
          twinkleSpeed: Math.random() * 0.02 + 0.005
        });
    }
    return stars;
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const mouse = mouseRef.current;

    starsRef.current.forEach((star) => {
      // Move star
      star.x += star.vx;
      star.y += star.vy;

      // Wrap around edges
      if (star.x < 0) star.x = canvas.width;
      if (star.x > canvas.width) star.x = 0;
      if (star.y < 0) star.y = canvas.height;
      if (star.y > canvas.height) star.y = 0;

      // Twinkle effect
      star.opacity += star.twinkleSpeed;
      if (star.opacity > 1 || star.opacity < 0.1) {
        star.twinkleSpeed = -star.twinkleSpeed;
      }

      // Mouse interaction (gentle repel and glow increase)
      const dx = mouse.x - star.x;
      const dy = mouse.y - star.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 150;

      let currentOpacity = star.opacity;
      let currentRadius = star.radius;

      if (dist < maxDist) {
        const force = (maxDist - dist) / maxDist;
        star.x -= dx * force * 0.02;
        star.y -= dy * force * 0.02;
        currentOpacity = Math.min(1, star.opacity + force);
        currentRadius = star.radius + force * 2;
      }

      // Draw star
      ctx.beginPath();
      ctx.arc(star.x, star.y, currentRadius, 0, Math.PI * 2);
      ctx.fillStyle = star.color;
      ctx.globalAlpha = currentOpacity;
      
      // Neon glow
      ctx.shadowColor = star.color;
      ctx.shadowBlur = currentRadius * 4;
      
      ctx.fill();
      
      // Reset glow
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
    });

    animationRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      starsRef.current = initStars(canvas);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [initStars, animate]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: 'transparent' }}
    />
  );
});

NeonStarsBackground.displayName = 'BinaryBackground';

export default NeonStarsBackground;
