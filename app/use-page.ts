"use client";

import { useEffect, useState } from "react";

// Behaviour for the page: these hooks only add state and class hooks, and the
// motion itself is expressed in app/globals.css.

/**
 * One-shot entrance. Elements marked `data-reveal` get `is-revealed` the first
 * time they enter the viewport and keep it, so text never re-animates on the way
 * back up. The `reveal-ready` class is added by script, which keeps every page
 * readable when script never runs.
 */
export function useReveal(root: string) {
  useEffect(() => {
    const scope = document.querySelector<HTMLElement>(root);
    if (!scope) return;
    scope.classList.add("reveal-ready");

    const targets = Array.from(scope.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (targets.length === 0) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      targets.forEach((target) => target.classList.add("is-revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [root]);
}

/**
 * Which section is currently in view, for nav highlighting. Returns "" above
 * the first section, so the hero does not leave a stale link marked current.
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState("");

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    if (sections.length === 0) return;

    // Read from live geometry: the current section is the last one whose top has
    // passed the reading line. Choosing by intersection ratio instead lets a tall
    // section outrank the short one the reader is actually looking at.
    const sync = () => {
      frame = 0;
      const doc = document.documentElement;
      // The final section is often too short to ever reach the reading line, so
      // the bottom of the document counts as having arrived at it. Only when the
      // page actually scrolls: on a viewport taller than the document, the top
      // and the bottom are the same place.
      const scrolls = doc.scrollHeight > window.innerHeight + 4;
      if (scrolls && window.innerHeight + window.scrollY >= doc.scrollHeight - 2) {
        setActive(sections[sections.length - 1].id);
        return;
      }
      const line = window.innerHeight * 0.3;
      let current = "";
      sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= line) current = section.id;
      });
      setActive(current);
    };

    let frame = 0;
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(sync);
    };

    sync();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [ids]);

  return active;
}
