interface SiteLogoIconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function SiteLogoIcon({ size = 28, className, style }: SiteLogoIconProps) {
  // Unique gradient ID per render instance to avoid SVG defs collision
  const gradId = `fireGrad-${Math.random().toString(36).substr(2, 5)}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={`url(#${gradId})`}
      stroke="none"
      className={className}
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
        flexShrink: 0,
        filter: 'drop-shadow(0 2px 6px rgba(255, 100, 0, 0.35))',
        ...style,
      }}
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#ff3300" />
          <stop offset="45%" stopColor="#ff8800" />
          <stop offset="100%" stopColor="#ffdd00" />
        </linearGradient>
      </defs>
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  );
}
