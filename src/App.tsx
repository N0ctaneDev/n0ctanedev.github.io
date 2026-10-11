import { useCallback, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { CircularProgress, NavBar } from "./components/neonblade-ui";
import Landing from "./pages/Landing";

function AppShell() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const [showCircle, setShowCircle] = useState(false);

  const onScroll = useCallback(() => {
    const sy = window.scrollY;
    setScrolled(sy > 80);
    setShowCircle(sy > window.innerHeight * 0.02);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    setScrollPct(max > 0 ? Math.round((sy / max) * 100) : 0);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  useEffect(() => {
    const hide = () => {
      const el = document.getElementById("loading-screen");
      if (el) el.classList.add("fade");
      setTimeout(() => {
        if (el) el.remove();
      }, 500);
    };

    const wait = async () => {
      await document.fonts.ready;
      await new Promise((r) => setTimeout(r, 200));
      hide();
    };
    wait();
  }, []);

  return (
    <div className="min-h-dvh bg-neutral-950 text-neutral-100 antialiased">
      <div
        className="navbar-fixed-wrap fixed z-[100]"
        style={{
          overflow: "hidden",
          top: scrolled ? "0.75rem" : 0,
          left: scrolled ? "0.75rem" : 0,
          right: scrolled ? "0.75rem" : 0,
          borderRadius: scrolled ? "24px" : 0,
          boxShadow: scrolled
            ? "0 4px 32px var(--nbr-floating-shadow)"
            : "none",
          transition:
            "width .2s ease-out, left .2s ease-out, right .2s ease-out, top .2s ease-out, border-radius .2s ease-out, box-shadow .2s ease-out",
        }}
      >
        <NavBar
          variant="standard"
          position="static"
          transparency="glass"
          color="cyan"
          logoText="N0"
          items={[
            { label: "Home", href: "#" },
            { label: "Projects", href: "#" },
            { label: "About", href: "#" },
          ]}
        />
      </div>

      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>

      <div
        className="fixed z-50"
        style={{
          bottom: "1.25rem",
          right: "1.25rem",
          opacity: showCircle ? 1 : 0,
          transition: "opacity 0.3s ease",
          pointerEvents: showCircle ? "auto" : "none",
        }}
      >
        <CircularProgress
          value={scrollPct}
          size="sm"
          color="pink"
          glowIntensity="high"
          showValue
        />
      </div>
    </div>
  );
}

export default function App() {
  return <AppShell />;
}
