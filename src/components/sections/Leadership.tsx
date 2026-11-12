import { leadership } from "@/content/home";

export function Leadership() {
  const { reports, team, practices, recruitment } = leadership;

  return (
    <section
      id="leadership"
      aria-labelledby="leadership-title"
      className="on-dark bg-ink text-stone"
    >
      <div className="shell section">
        <div className="grid items-end gap-x-6 gap-y-8 lg:grid-cols-12">
          <h2
            id="leadership-title"
            className="display section-title lg:col-span-7"
          >
            Leadership
          </h2>
          <p className="max-w-[52ch] text-[1.125rem] leading-[1.55] text-stone/85 lg:col-span-5 lg:pb-3">
            {leadership.lead}
          </p>
        </div>

        <div className="mt-[clamp(3rem,7vw,6rem)] grid gap-x-6 gap-y-16 border-t border-stone/25 pt-8 lg:grid-cols-12 lg:pt-10">
          {/* The team: the headline figure, then who it is made of. */}
          <div className="lg:col-span-7">
            <h3 className="flex items-end gap-x-[0.06em]">
              <span className="wide text-[clamp(9rem,24vw,24rem)] leading-[0.74] text-saffron">
                {reports.count}
              </span>
              <span className="display pb-[0.1em] text-[clamp(2rem,5.2vw,5.25rem)] leading-[0.92]">
                {reports.label.split(" ").map((word) => (
                  <span key={word} className="block">
                    {word}
                  </span>
                ))}
              </span>
            </h3>

            <ul className="mt-10 lg:mt-14">
              {team.map((member) => (
                <li
                  key={member.role}
                  className="display border-t border-stone/20 py-4 text-[clamp(1.5rem,2.5vw,2.375rem)] leading-[1.1] last:border-b"
                >
                  <span className="text-saffron">{member.count}</span>{" "}
                  {member.role}
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-[50ch] text-base text-haze">
              {reports.context}
            </p>
          </div>

          {/* How the team is run, and who chose it. */}
          <div className="lg:col-span-4 lg:col-start-9">
            <h3 className="meta text-haze">Management processes I introduced</h3>
            <ol className="mt-5">
              {practices.map((practice, index) => (
                <li
                  key={practice}
                  className="flex gap-5 border-t border-stone/20 py-5 last:border-b"
                >
                  <span aria-hidden="true" className="meta pt-1 text-haze">
                    {index + 1}
                  </span>
                  <span className="display text-[clamp(1.375rem,1.75vw,1.625rem)] font-medium leading-[1.15] tracking-[-0.02em]">
                    {practice}
                  </span>
                </li>
              ))}
            </ol>

            <h3 className="meta mt-14 text-haze">Recruitment</h3>
            <p className="display mt-5 text-[clamp(1.75rem,2.5vw,2.375rem)] leading-[1.08] text-saffron">
              {recruitment}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
