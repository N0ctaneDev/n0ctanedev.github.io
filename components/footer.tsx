import {
  RiGithubFill,
  RiLinkedinFill,
  RiMailFill,
  RiTwitterXFill,
} from "@remixicon/react";
import config from "@/lib/config";

const socialIcons: Record<string, React.ReactNode> = {
  GitHub: <RiGithubFill className="size-5" />,
  LinkedIn: <RiLinkedinFill className="size-5" />,
  Twitter: <RiTwitterXFill className="size-5" />,
  Email: <RiMailFill className="size-5" />,
};

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} {config.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {config.contacts.map((contact) => (
              <a
                key={contact.platform}
                href={contact.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label={contact.platform}
              >
                {socialIcons[contact.platform] ?? (
                  <span className="text-xs">{contact.platform}</span>
                )}
              </a>
            ))}
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-muted-foreground/60 sm:text-left">
          Built with Next.js &amp; shadcn
        </p>
      </div>
    </footer>
  );
}

export { Footer };
