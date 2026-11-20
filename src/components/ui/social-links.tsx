import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
} from "@/components/ui/social-icons";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

const socialItems = [
  { href: site.socials.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
  { href: site.socials.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: site.socials.facebook, label: "Facebook", Icon: FacebookIcon },
  { href: site.socials.youtube, label: "YouTube", Icon: YoutubeIcon },
];

export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {socialItems.map(({ href, label, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="inline-flex size-10 items-center justify-center border border-white/15 text-offwhite/70 transition-colors duration-300 hover:border-sage hover:text-sage"
          >
            <Icon className="size-4" />
          </a>
        </li>
      ))}
    </ul>
  );
}
