import type { RevealDelay } from "./Reveal";

type Props = {
  num?: string;
  children: React.ReactNode;
  delay?: RevealDelay;
};

/** Tracked mono section label, optionally numbered. */
export default function Eyebrow({ num, children, delay }: Props) {
  return (
    <p className="eyebrow" data-reveal="" data-reveal-delay={delay}>
      {num ? <span className="eyebrow__num">{num}</span> : null}
      {children}
    </p>
  );
}
