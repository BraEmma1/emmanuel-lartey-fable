import Link from "next/link";
import { navItems } from "@/content/navigation";
import { site } from "@/content/site";
import { MobileMenu } from "./MobileMenu";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/15 bg-stone">
      <a
        href="#content"
        className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:left-(--gutter) focus-visible:top-3 focus-visible:z-10 focus-visible:bg-ink focus-visible:px-4 focus-visible:py-2 focus-visible:text-stone"
      >
        Skip to content
      </a>
      <div className="shell flex h-(--header-h) items-center justify-between">
        <Link
          href="/#top"
          className="wide flex h-11 items-center whitespace-nowrap text-[0.9375rem] uppercase tracking-normal max-[22.5rem]:text-[0.8125rem]"
        >
          {site.name}
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="link flex h-11 items-center text-[0.9375rem] font-medium decoration-transparent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <MobileMenu items={navItems} />
      </div>
    </header>
  );
}
