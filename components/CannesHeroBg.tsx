"use client";

import { useEffect, useRef } from "react";

interface CannesHeroBgProps {
  /** Photo behind the hero:
      - undefined → use the default Cannes photo from CSS (the /cannes page),
      - a path     → use that image,
      - null       → no photo (gradient + glows only). */
  image?: string | null;
}

/** Animated background for the Cannes-style hero: gradient base, low-opacity photo,
    drifting glows + grid (CSS), with a subtle pointer parallax on the fx layer. */
export default function CannesHeroBg({ image }: CannesHeroBgProps = {}) {
  const fxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fx = fxRef.current;
    const hero = fx?.closest(".cn-hero") as HTMLElement | null;
    if (!fx || !hero) return;
    if (
      window.matchMedia("(prefers-reduced-motion:reduce)").matches ||
      window.matchMedia("(hover:none)").matches
    )
      return;

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const r = hero.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        fx.style.transform = `translate(${x * -16}px,${y * -16}px)`;
      });
    };
    const onLeave = () => {
      fx.style.transition = "transform .6s ease";
      fx.style.transform = "";
      window.setTimeout(() => {
        fx.style.transition = "";
      }, 600);
    };

    hero.addEventListener("pointermove", onMove);
    hero.addEventListener("pointerleave", onLeave);
    return () => {
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="cn-bg" aria-hidden="true">
      <div className="base"></div>
      {image !== null && (
        <div className="photo" style={image ? { backgroundImage: `url("${image}")` } : undefined}></div>
      )}
      <div className="fx" ref={fxRef}>
        <div className="glow g1"></div>
        <div className="glow g2"></div>
        <div className="glow g3"></div>
        <div className="grid"></div>
      </div>
      <div className="veil"></div>
    </div>
  );
}
