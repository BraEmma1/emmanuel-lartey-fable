import { closing } from "@/content/home";
import { site } from "@/content/site";
import { Arrow } from "@/components/ui/Arrow";

type Channel = {
  label: string;
  /** Text shown for the link once the detail exists. */
  value: string | null;
  href: string | null;
  /** Plain statement shown while the detail has not been supplied. */
  pending: string;
  download?: boolean;
};

const { email, linkedin, cv } = site.contact;

// A channel only becomes a link once its real value is added to
// `site.contact`. Until then it is plain text: nothing here is clickable
// unless it leads somewhere genuine.
const channels: Channel[] = [
  {
    label: "Email",
    value: email,
    href: email ? `mailto:${email}` : null,
    pending: "To be added",
  },
  {
    label: "LinkedIn",
    value: linkedin ? "View profile" : null,
    href: linkedin,
    pending: "To be added",
  },
  {
    label: "Curriculum vitae",
    value: cv ? "Download PDF" : null,
    href: cv,
    pending: "To be added",
    download: true,
  },
];

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="bg-saffron text-ink"
    >
      <div className="shell section">
        <h2
          id="contact-title"
          className="display max-w-[12ch] text-[clamp(3.25rem,11vw,12rem)] leading-[0.9]"
        >
          {closing.headline}
        </h2>

        <div className="mt-[clamp(3.5rem,8vw,7.5rem)] grid gap-x-6 gap-y-14 border-t border-ink pt-8 lg:grid-cols-12 lg:pt-10">
          <div className="lg:col-span-6">
            <p className="display max-w-[20ch] text-[clamp(1.75rem,2.9vw,2.875rem)] font-medium leading-[1.06]">
              {closing.lead}
            </p>
            <p className="mt-6 max-w-[50ch] text-[1.125rem] leading-[1.55] lg:mt-8">
              {closing.text}
            </p>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <h3 className="meta">Contact details</h3>
            <dl className="mt-5">
              {channels.map((channel) => (
                <div
                  key={channel.label}
                  className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-ink/35 py-5 last:border-b"
                >
                  <dt className="display text-[clamp(1.375rem,1.75vw,1.625rem)] font-medium leading-[1.15] tracking-[-0.02em]">
                    {channel.label}
                  </dt>
                  <dd className="text-[1.0625rem]">
                    {channel.href && channel.value ? (
                      <a
                        href={channel.href}
                        download={channel.download}
                        className="link flex min-h-11 items-center gap-2.5 font-medium hover:decoration-ink"
                      >
                        {channel.value}
                        <Arrow direction="right" />
                      </a>
                    ) : (
                      channel.pending
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
