import Link from "next/link";
import { Button } from "@/components/ui/button";
import config from "@/lib/config";

function HeroSection() {
  return (
    <section
      className="relative flex flex-col items-center justify-center px-4 py-24 text-center"
      style={{
        backgroundImage:
          "radial-gradient(circle, var(--color-border) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }}
    >
      <div className="relative z-10 flex flex-col items-center gap-6">
        <h1 className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-4xl font-bold text-transparent neon-text-glow md:text-5xl lg:text-6xl">
          {config.hero.greeting}
        </h1>
        <p className="text-lg text-muted-foreground">{config.tagline}</p>
        <div className="h-px w-[120px] animate-[pulse_3s_ease-in-out_infinite] bg-gradient-to-r from-primary via-secondary to-transparent" />
        <Link href={config.hero.cta.href}>
          <Button
            variant="outline"
            className="border-primary/50 transition-all duration-300 hover:shadow-[0_0_12px_color-mix(in_oklab,var(--color-primary)_30%,transparent)] hover:bg-primary/10"
          >
            {config.hero.cta.label}
          </Button>
        </Link>
      </div>
    </section>
  );
}

export default HeroSection;
