/**
 * The hero landscape, drawn rather than photographed.
 *
 * Layered gradients, curved dune paths, a blurred sun bloom, and an
 * feTurbulence grain overlay. Being inline SVG it costs no extra request,
 * scales to any viewport without going soft, and carries no image licensing.
 *
 * Server component — this markup never reaches the client bundle.
 */
export default function DuneScene() {
  return (
    <svg
      className="hero__dunes"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMax slice"
      role="presentation"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#08151a" />
          <stop offset="20%" stopColor="#0e1a21" />
          <stop offset="36%" stopColor="#2e2530" />
          <stop offset="48%" stopColor="#7d3d1e" />
          <stop offset="60%" stopColor="#cf6a2c" />
          <stop offset="72%" stopColor="#ef9a52" />
          <stop offset="100%" stopColor="#f7bd7d" />
        </linearGradient>

        <linearGradient id="ridgeLit" x1="0.2" y1="0" x2="0.78" y2="1">
          <stop offset="0%" stopColor="#ffab5e" />
          <stop offset="18%" stopColor="#ff7e33" />
          <stop offset="42%" stopColor="#ec5518" />
          <stop offset="66%" stopColor="#95350f" />
          <stop offset="85%" stopColor="#33130a" />
          <stop offset="100%" stopColor="#0c0605" />
        </linearGradient>

        <linearGradient id="ridgeMid" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor="#2a1409" />
          <stop offset="55%" stopColor="#0d0705" />
          <stop offset="100%" stopColor="#050403" />
        </linearGradient>

        <radialGradient id="sunGlow" cx="0.74" cy="0.68" r="0.4">
          <stop offset="0%" stopColor="#ffc98d" stopOpacity="0.95" />
          <stop offset="45%" stopColor="#f4823a" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#e86a24" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="crestLight" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffd7a8" stopOpacity="0" />
          <stop offset="30%" stopColor="#ffd7a8" stopOpacity="0.75" />
          <stop offset="70%" stopColor="#ff9445" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#ff9445" stopOpacity="0" />
        </linearGradient>

        <filter id="crestBlur">
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <filter id="softBlur">
          <feGaussianBlur stdDeviation="34" />
        </filter>

        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </defs>

      {/* sky */}
      <rect width="1600" height="900" fill="url(#sky)" />
      <ellipse cx="1180" cy="612" rx="720" ry="300" fill="url(#sunGlow)" filter="url(#softBlur)" />

      {/* far dune shoulder, upper left */}
      <path
        fill="url(#ridgeMid)"
        opacity="0.92"
        d="M0 388 C 220 352 430 318 690 352 C 900 380 1090 470 1330 540 C 1440 572 1525 594 1600 612 L1600 900 L0 900 Z"
      />

      {/* lit dune face */}
      <path
        fill="url(#ridgeLit)"
        d="M0 585 C 300 512 545 408 800 446 C 1055 484 1250 612 1600 668 L1600 900 L0 900 Z"
      />

      {/* crest highlight */}
      <path
        fill="none"
        stroke="url(#crestLight)"
        strokeWidth="3.5"
        filter="url(#crestBlur)"
        d="M0 585 C 300 512 545 408 800 446 C 1055 484 1250 612 1600 668"
      />

      {/* wind-carved striations following the face */}
      <g stroke="#ffcb9a" fill="none" opacity="0.2">
        <path d="M700 468 C 960 512 1180 640 1600 700" strokeWidth="1.6" />
        <path d="M650 512 C 920 560 1150 692 1600 754" strokeWidth="1.3" opacity="0.8" />
        <path d="M590 562 C 875 614 1115 748 1600 810" strokeWidth="1.1" opacity="0.6" />
        <path d="M520 620 C 820 676 1075 808 1600 868" strokeWidth="0.9" opacity="0.42" />
        <path d="M440 686 C 760 744 1030 872 1520 900" strokeWidth="0.8" opacity="0.26" />
      </g>

      {/* foreground dune, dark and low */}
      <path
        fill="#050403"
        d="M0 806 C 280 784 520 754 820 780 C 1120 806 1360 858 1600 872 L1600 900 L0 900 Z"
      />

      <rect
        width="1600"
        height="900"
        filter="url(#grain)"
        opacity="0.19"
        style={{ mixBlendMode: "overlay" }}
      />
    </svg>
  );
}
