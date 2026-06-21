import {
  RiGithubFill,
  RiLinkedinFill,
  RiMailFill,
  RiTwitterXFill,
} from "@remixicon/react";
import Link from "next/link";
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

function ContactSection() {
  return (
    <SectionWrapper title="Contact" viewAllHref="/contact">
      <div className="flex flex-col gap-8 md:flex-row md:gap-12">
        <div className="flex-1 space-y-6">
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
          <ContactForm />
        </div>
      </div>
      <div className="mt-8">
        <Link
          href="/contact"
          className="group inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
          Full contact page
          <span className="transition-transform group-hover:translate-x-0.5">
            &rarr;
          </span>
        </Link>
      </div>
    </SectionWrapper>
  );
}

export default ContactSection;
