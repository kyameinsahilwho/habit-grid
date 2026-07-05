import * as LucideIcons from 'lucide-react';

interface LucideIconProps {
  name: string;
  className?: string;
  size?: number;
  style?: React.CSSProperties;
}

export function LucideIcon({ name, className, size = 16, style }: LucideIconProps) {
  // Safe resolver for Icon components
  const IconComponent = (LucideIcons as any)[name];

  if (!IconComponent) {
    // Fallback if icon isn't found
    const Fallback = LucideIcons.HelpCircle;
    return <Fallback className={className} size={size} style={style} />;
  }

  return <IconComponent className={className} size={size} style={style} />;
}
