import Link from "next/link";
import { navItems } from "@/content/navigation";
import { site } from "@/content/site";
import { Arrow } from "@/components/ui/Arrow";

export function SiteFooter() {
  return (
    <footer className="on-dark bg-ink text-stone">
      <div className="shell grid gap-y-10 py-12 lg:grid-cols-12 lg:gap-x-6 lg:py-16">
        <div className="lg:col-span-5">
          <p className="wide text-lg uppercase tracking-normal">{site.name}</p>
          <p className="mt-2 max-w-[34ch] text-base text-haze">
            {site.role}
          </p>
        </div>

        <nav aria-label="Footer" className="lg:col-span-5">
          <ul className="grid grid-cols-2 gap-x-6 sm:grid-cols-3">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="link flex h-11 items-center text-base decoration-transparent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-2 lg:justify-self-end">
          <a
            href="#top"
            className="link flex h-11 items-center gap-2.5 text-base decoration-transparent"
          >
            Back to top
            <Arrow direction="up" />
          </a>
        </div>

        <p className="border-t border-stone/20 pt-6 text-sm text-haze lg:col-span-12">
          © {site.copyrightYear} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
