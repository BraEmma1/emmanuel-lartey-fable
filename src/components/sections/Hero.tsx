import { site } from "@/content/site";
import { Arrow } from "@/components/ui/Arrow";
import { AssetFrame } from "@/components/ui/AssetFrame";

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-name" className="hero-section">
      <div className="hero">
        <div className="hero-grid">
          <h1 id="hero-name" className="hero-name wide">
            <span>{site.firstName}</span>
            <span>{site.lastName}</span>
          </h1>

          {/* Fixed 4:5 frame. A real photograph drops in via `site.portrait`. */}
          <AssetFrame
            kind="Portrait"
            ratio="4:5"
            label={`Professional photograph of ${site.name}`}
            src={site.portrait}
            sizes="(min-width: 48rem) 30vw, 60vw"
            priority
            className="hero-portrait aspect-[4/5]"
          />

          <p className="hero-role">
            <span>{site.title}</span>
            <span className="sr-only"> | </span>
            <span>{site.field}</span>
          </p>

          <p className="hero-positioning display text-[clamp(1.875rem,3vw,3.375rem)] leading-[1.04]">
            {site.positioning}
          </p>

          <p className="hero-description max-w-[44ch] text-[1.125rem] leading-[1.55] text-ink/80">
            {site.intro}
          </p>

          <div className="hero-cta flex flex-wrap items-center gap-x-7 gap-y-3">
            <a
              href="#work"
              className="flex h-13 items-center gap-3 bg-ink px-6 max-sm:w-full max-sm:justify-between text-base font-medium text-stone transition-colors duration-200 hover:bg-saffron hover:text-ink"
            >
              Explore My Work
              <Arrow />
            </a>
            <a
              href="#experience"
              className="link flex h-13 items-center text-base font-medium"
            >
              View Experience
            </a>
            {site.contact.cv ? (
              <a
                href={site.contact.cv}
                download
                className="link flex h-13 items-center text-base font-medium"
              >
                Download CV
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
