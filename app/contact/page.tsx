import {
  RiGithubFill,
  RiLinkedinFill,
  RiMailFill,
  RiTwitterXFill,
} from "@remixicon/react";
import type { ReactNode } from "react";
import { ContactForm } from "@/components/contact-form";
import { SectionWrapper } from "@/components/section-wrapper";
import config from "@/lib/config";

const iconMap: Record<string, ReactNode> = {
  GitHub: <RiGithubFill className="size-5" />,
  LinkedIn: <RiLinkedinFill className="size-5" />,
  Twitter: <RiTwitterXFill className="size-5" />,
  Email: <RiMailFill className="size-5" />,
};

export default function ContactPage() {
  return (
    <SectionWrapper title="Contact" description="Get in touch">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <p className="text-sm text-muted-foreground">
            Have a project in mind or just want to say hello? Fill out the form
            and I'll get back to you as soon as possible.
          </p>
          <ContactForm />
        </div>
        <div className="space-y-8">
          <div>
            <h3 className="mb-3 text-sm font-medium text-foreground">
              Social Links
            </h3>
            <div className="flex flex-wrap gap-4">
              {config.contacts.map((contact) => (
                <a
                  key={contact.platform}
                  href={contact.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {iconMap[contact.platform]}
                  {contact.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-medium text-foreground">
              Location
            </h3>
            <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-4 text-sm text-muted-foreground">
              <span>Remote / Worldwide</span>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
