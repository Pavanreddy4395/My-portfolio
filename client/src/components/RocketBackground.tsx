import { useEffect, useRef } from "react";

export function RocketBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const canvasEl: HTMLCanvasElement = canvas;
    const context: CanvasRenderingContext2D = ctx;

    const previousBodyBackground = document.body.style.background;
    document.body.style.background = "#0a0f1c";

    canvasEl.width = window.innerWidth;
    canvasEl.height = window.innerHeight;

    type Particle = {
      x: number;
      y: number;
      dx: number;
      dy: number;
      life: number;
    };

    const mouse = { x: 0, y: 0 };
    let particles: Particle[] = [];

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const onResize = () => {
      canvasEl.width = window.innerWidth;
      canvasEl.height = window.innerHeight;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", onResize);

    class Rocket {
      x: number;
      y: number;
      speed: number;
      size: number;
      active: boolean;

      constructor() {
        this.x = -20;
        this.y = Math.random() * canvasEl.height;
        this.speed = 3 + Math.random() * 2;
        this.size = 2;
        this.active = true;
      }

      draw() {
        context.fillStyle = "#FFFFF0";
        //8b5cf6
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
      }

      explode() {
        for (let i = 0; i < 15; i++) {
          particles.push({
            x: this.x,
            y: this.y,
            dx: (Math.random() - 0.5) * 6,
            dy: (Math.random() - 0.5) * 6,
            life: 40,
          });
        }
      }

      update() {
        if (!this.active) return;

        this.x += this.speed;

        // Hover break
        if (
          Math.abs(mouse.x - this.x) < this.size &&
          Math.abs(mouse.y - this.y) < this.size
        ) {
          this.active = false;
          this.explode();
        }

        if (this.x > canvasEl.width + 20) {
          this.x = -20;
        }

        this.draw();
      }
    }

    let rockets: Rocket[] = [];

    const spawnRocket = () => {
      rockets.push(new Rocket());
    };

    const spawnIntervalId = window.setInterval(spawnRocket, 700);

    function updateParticles() {
      particles.forEach((p, i) => {
        p.x += p.dx;
        p.y += p.dy;
        p.life--;

        context.fillStyle = `rgba(139,92,246,${p.life / 40})`;
        context.fillRect(p.x, p.y, 3, 3);

        if (p.life <= 0) particles.splice(i, 1);
      });
    }

    let rafId = 0;

    function animate() {
      context.clearRect(0, 0, canvasEl.width, canvasEl.height);

      rockets.forEach((r) => r.update());
      updateParticles();

      rafId = window.requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      window.clearInterval(spawnIntervalId);
      window.cancelAnimationFrame(rafId);
      rockets = [];
      particles = [];
      document.body.style.background = previousBodyBackground;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "block",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
