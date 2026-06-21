import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
      <div className="mx-auto max-w-md px-4 text-center">
        <h1 className="mb-4 text-7xl font-bold neon-text-glow md:text-8xl">
          404
        </h1>
        <p className="mb-8 text-sm text-muted-foreground">
          Page not found. The page you're looking for doesn't exist or has been
          moved.
        </p>
        <Link href="/" className={buttonVariants({ variant: "default" })}>
          Go home
        </Link>
      </div>
    </section>
  );
}
