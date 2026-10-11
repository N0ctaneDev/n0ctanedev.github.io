import { useCallback, useEffect, useRef, useState } from "react";
import {
  Crosshair,
  GlitchText,
  Hexagons,
} from "../components/neonblade-ui";

const BASE_FS = 100;

export default function Landing() {
  const boxRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [topFS, setTopFS] = useState(0);
  const [bottomFS, setBottomFS] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  const compute = useCallback(() => {
    const box = boxRef.current;
    const top = topRef.current;
    const bottom = bottomRef.current;
    if (!box || !top || !bottom) return;

    const boxW = box.clientWidth;
    const topW = top.scrollWidth;
    const bottomW = bottom.scrollWidth;

    if (topW > 0 && bottomW > 0) {
      setTopFS(Math.round(BASE_FS * (boxW / topW)));
      setBottomFS(Math.round(BASE_FS * (boxW / bottomW)));
    }
  }, []);

  useEffect(() => {
    compute();
    const box = boxRef.current;
    if (!box) return;
    const ro = new ResizeObserver(compute);
    ro.observe(box);
    return () => ro.disconnect();
  }, [compute]);

  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener("mousemove", onMouse, { passive: true });
    return () => window.removeEventListener("mousemove", onMouse);
  }, []);

  const textVisible = topFS > 0 && bottomFS > 0;

  return (
    <div className="relative overflow-hidden">
      <div className="relative min-h-svh">
        <img
          src="/backgrounds/hero-dark.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            transform: `translate(${(mousePos.x - 0.5) * 20}px, ${(mousePos.y - 0.5) * 20}px)`,
            transition: "transform 0.15s ease-out",
          }}
        />
        <div className="absolute inset-0 bg-neutral-950/30" />

        <Hexagons
          hexColor="transparent"
          hexBorderColor="rgba(0,243,255,0.15)"
          hexSize={40}
          borderWidth={1}
          hoverEffect={false}
          borderGlowEffect
          borderGlowColor="#00f3ff"
          borderGlowRadius={10}
          overlay
        />

        <div className="relative z-10 flex min-h-svh items-center justify-center p-4">
          <div
            ref={boxRef}
            className="relative"
            style={{
              width: "clamp(47dvw, 600px, 97dvw)",
            }}
          >
            <div
              ref={topRef}
              aria-hidden
              className="absolute left-0 top-0"
              style={{
                opacity: 0,
                pointerEvents: "none",
                fontFamily: "var(--font-circuit-forem)",
                fontWeight: 900,
                lineHeight: 1,
                whiteSpace: "nowrap",
                fontSize: BASE_FS,
              }}
            >
              <div className="flex" style={{ gap: "0.2em", alignItems: "center" }}>
                <span>I</span>
                <img
                  src="/images/N0ctane-sitting.png"
                  alt=""
                  style={{ height: BASE_FS * 1.08, width: "auto" }}
                />
                <span>AM</span>
              </div>
            </div>
            <div
              ref={bottomRef}
              aria-hidden
              className="absolute left-0 top-0"
              style={{
                opacity: 0,
                pointerEvents: "none",
                fontFamily: "var(--font-circuit-forem)",
                fontWeight: 900,
                lineHeight: 1,
                whiteSpace: "nowrap",
                fontSize: BASE_FS,
              }}
            >
              N0ctane
            </div>

            <div
              style={{
                opacity: textVisible ? 1 : 0,
                transition: "opacity 0.3s ease",
              }}
            >
              <div
                className="flex"
                style={{
                  gap: "0.2em",
                  alignItems: "center",
                  fontSize: topFS || BASE_FS,
                  fontFamily: "var(--font-circuit-forem)",
                  fontWeight: 900,
                  lineHeight: 1,
                  whiteSpace: "nowrap",
                }}
              >
                <span>I</span>
                <img
                  src="/images/N0ctane-sitting.png"
                  alt=""
                  style={{ height: (topFS || BASE_FS) * 1.08, width: "auto" }}
                />
                <span>AM</span>
              </div>
              <div
                style={{
                  fontSize: bottomFS || BASE_FS,
                  fontFamily: "var(--font-circuit-forem)",
                  fontWeight: 900,
                  lineHeight: 1,
                  whiteSpace: "nowrap",
                }}
              >
                <GlitchText
                  text="N0ctane"
                  mode="active"
                  colorA="cyan"
                  colorB="cyan"
                  neon
                  neonFlicker
                >
                  N0ctane
                </GlitchText>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="min-h-[200dvh] bg-neutral-950 p-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-4xl font-bold tracking-tight text-white">
            Projects
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex h-48 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900"
              >
                <p className="text-lg text-neutral-500">
                  Project {i + 1}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Crosshair
        color="cyan"
        outerSize={28}
        innerSize={16}
        crosshairSize={5}
        crosshairGap={2}
        glowIntensity="low"
      />
    </div>
  );
}
