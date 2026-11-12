type PageIntroProps = {
  title: string;
  statement: string;
};

/** Opens an inner page: one oversized heading and a supporting statement. */
export function PageIntro({ title, statement }: PageIntroProps) {
  return (
    <section
      aria-labelledby="page-title"
      className="shell pb-[clamp(3rem,6vw,5rem)] pt-[clamp(3rem,7vw,6.5rem)]"
    >
      <div className="grid items-end gap-x-6 gap-y-8 lg:grid-cols-12">
        <h1
          id="page-title"
          className="display text-[clamp(3.25rem,10vw,10.5rem)] leading-[0.88] lg:col-span-8"
        >
          {title}
        </h1>
        <p className="display max-w-[24ch] text-[clamp(1.375rem,2vw,2rem)] font-medium leading-[1.14] tracking-[-0.025em] lg:col-span-4 lg:pb-[0.5em]">
          {statement}
        </p>
      </div>
    </section>
  );
}
