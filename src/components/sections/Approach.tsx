import { approach } from "@/content/home";

export function Approach() {
  return (
    <section
      id="approach"
      aria-labelledby="approach-title"
      className="on-dark bg-ink text-stone"
    >
      <div className="shell section">
        <h2
          id="approach-title"
          className="display max-w-[15ch] text-[clamp(2.75rem,8.2vw,8.75rem)] leading-[0.93]"
        >
          {approach.headline.lead}{" "}
          <span className="text-saffron">{approach.headline.turn}</span>
        </h2>

        <div className="mt-[clamp(3rem,7vw,6.5rem)] grid gap-x-6 gap-y-6 lg:grid-cols-12">
          {approach.paragraphs.map((paragraph, index) => (
            <p
              key={paragraph}
              className={`max-w-[58ch] text-[1.125rem] leading-[1.55] text-stone/85 lg:col-span-4 ${index === 0 ? "lg:col-start-5" : ""}`}
            >
              {paragraph}
            </p>
          ))}
        </div>

        <ol className="mt-[clamp(3.5rem,7vw,6.5rem)] grid gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
          {approach.steps.map((step, index) => (
            <li key={step.name} className="border-t border-stone/25 pb-8 pt-4">
              <p className="meta text-haze">
                <span className="sr-only">Step </span>
                {index + 1}
              </p>
              <h3 className="display mt-6 text-[clamp(1.75rem,2.6vw,2.5rem)]">
                {step.name}
              </h3>
              <p className="mt-3 max-w-[32ch] text-base text-haze">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
