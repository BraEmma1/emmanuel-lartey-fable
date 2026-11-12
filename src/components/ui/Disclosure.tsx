"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";

type DisclosureProps = {
  /**
   * What the control opens, in a few words. Read out after the visible label
   * ("View details: Daily operations") so several controls on one page are
   * told apart.
   */
  context: string;
  /** Always visible. */
  summary: ReactNode;
  /**
   * Hidden on phones until opened. Rendered after the control. Leave it out to
   * hide parts of `summary` in place instead, by giving them the `dz-extra`
   * class: the control then sits after the whole summary.
   */
  children?: ReactNode;
  showLabel?: string;
  hideLabel?: string;
  /** Classes for the wrapper, e.g. `md:contents` or a grid column span. */
  className?: string;
};

/**
 * Progressive disclosure for phones.
 *
 * Everything is rendered, on the server and on the client, so the markup
 * never depends on the screen. Below the tablet breakpoint (see `.dz` in
 * globals.css) the hidden parts are `display: none` until the control is
 * pressed. From the tablet breakpoint up the control is not displayed at all
 * (so it is also out of the accessibility tree) and nothing is hidden: the
 * layout is exactly the page without a disclosure. No media query runs in
 * JavaScript, so there is nothing to mismatch on hydration.
 *
 * A link to something inside the hidden part opens it first.
 */
export function Disclosure({
  context,
  summary,
  children,
  showLabel = "View details",
  hideLabel = "Hide details",
  className = "",
}: DisclosureProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const regionId = useId();
  const hasPanel = children !== undefined && children !== null;

  // A link to something inside the hidden part: open it, then, once it is on
  // screen, bring it into view and move focus to it.
  const arriving = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const reveal = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      const target = id ? document.getElementById(id) : null;
      if (!target || !rootRef.current?.contains(target)) return;
      // Nothing to do unless the target is currently hidden.
      if (target.getClientRects().length > 0) return;

      arriving.current = target;
      setOpen(true);
    };

    reveal();
    window.addEventListener("hashchange", reveal);
    return () => window.removeEventListener("hashchange", reveal);
  }, []);

  useEffect(() => {
    const target = arriving.current;
    if (!open || !target) return;
    arriving.current = null;
    if (
      !target.hasAttribute("tabindex") &&
      !target.matches("a, button, input")
    ) {
      target.setAttribute("tabindex", "-1");
    }
    target.scrollIntoView();
    target.focus({ preventScroll: true });
  }, [open]);

  return (
    <div
      ref={rootRef}
      className={`dz ${className}`}
      data-open={open ? "true" : "false"}
      id={hasPanel ? undefined : regionId}
    >
      {summary}
      <button
        type="button"
        className="dz-trigger meta"
        aria-expanded={open}
        aria-controls={regionId}
        onClick={() => setOpen((value) => !value)}
      >
        <span>
          {open ? hideLabel : showLabel}
          <span className="sr-only">: {context}</span>
        </span>
        <span aria-hidden="true" className="dz-icon" />
      </button>
      {hasPanel ? (
        <div id={regionId} className="dz-panel">
          {children}
        </div>
      ) : null}
    </div>
  );
}
