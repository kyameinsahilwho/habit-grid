import { useState, useMemo, useEffect, useRef } from 'react';
import * as LucideIcons from 'lucide-react';
import { LucideIcon } from './LucideIcon';

interface IconPickerProps {
  onSelect: (iconName: string) => void;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLElement | null>;
}

const defaultIcons = [
  { name: 'Droplet', title: 'Water' },
  { name: 'Dumbbell', title: 'Workout' },
  { name: 'BookOpen', title: 'Read' },
  { name: 'Brain', title: 'Meditation' },
  { name: 'Apple', title: 'Diet' },
  { name: 'Camera', title: 'Progress Pic' },
  { name: 'Bed', title: 'Sleep' },
  { name: 'Flame', title: 'Streak/Intensity' },
  { name: 'Smile', title: 'Mood' },
  { name: 'Coffee', title: 'Coffee/Tea' },
  { name: 'DollarSign', title: 'Savings/Money' },
  { name: 'Laptop', title: 'Work/Coding' },
  { name: 'Heart', title: 'Self-Care' },
  { name: 'Bike', title: 'Cardio/Bike' },
  { name: 'Sparkles', title: 'Clean/Beauty' },
  { name: 'Music', title: 'Instrument/Music' },
  { name: 'Paintbrush', title: 'Creativity/Art' },
  { name: 'Scale', title: 'Weight' },
  { name: 'Ban', title: 'Quit Bad Habit' },
  { name: 'CheckSquare', title: 'Checklist' },
  { name: 'Activity', title: 'Health' },
  { name: 'Compass', title: 'Focus' },
  { name: 'PenTool', title: 'Journaling' },
  { name: 'GraduationCap', title: 'Learning' },
  { name: 'Sun', title: 'Morning Routine' },
  { name: 'Moon', title: 'Night Routine' },
  { name: 'SmilePlus', title: 'Gratitude' },
  { name: 'Utensils', title: 'Meal Prep' },
  { name: 'Trees', title: 'Outdoors/Nature' }
];

// Get all icon keys once
const allIconKeys = Object.keys(LucideIcons).filter(
  (key) =>
    typeof (LucideIcons as any)[key] === 'function' ||
    (typeof (LucideIcons as any)[key] === 'object' && (LucideIcons as any)[key] !== null)
);

export function IconPicker({ onSelect, onClose, triggerRef }: IconPickerProps) {
  const [search, setSearch] = useState('');
  const popoverRef = useRef<HTMLDivElement>(null);

  // Filter icons based on search query
  const iconsToRender = useMemo(() => {
    if (!search) {
      return defaultIcons;
    }
    const query = search.toLowerCase();
    const matches = allIconKeys
      .filter((name) => name.toLowerCase().includes(query))
      .sort()
      .slice(0, 100);
    return matches.map((name) => ({ name, title: name }));
  }, [search]);

  // Handle click outside to close popover
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose, triggerRef]);

  // Position popover relative to the trigger element
  const [position, setPosition] = useState<React.CSSProperties>({ display: 'none' });

  useEffect(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

      setPosition({
        position: 'absolute',
        top: `${rect.bottom + scrollTop + 6}px`,
        left: `${Math.min(window.innerWidth - 280, rect.left + scrollLeft)}px`,
        zIndex: 1000,
      });
    }
  }, [triggerRef]);

  return (
    <div ref={popoverRef} className="icon-popover" style={position}>
      <div className="icon-search-container">
        <input
          type="text"
          placeholder="Search icons (e.g. star, heart)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          autoFocus
          autoComplete="off"
        />
      </div>
      <div className="icon-list">
        {iconsToRender.length === 0 ? (
          <div style={{ gridColumn: 'span 5', textAlign: 'center', color: 'var(--text-muted)', fontSize: '11px', padding: '10px 0', width: '100%' }}>
            No icons found
          </div>
        ) : (
          iconsToRender.map((item) => (
            <span
              key={item.name}
              title={item.title}
              onClick={() => {
                onSelect(item.name);
                onClose();
              }}
            >
              <LucideIcon name={item.name} size={18} />
            </span>
          ))
        )}
      </div>
    </div>
  );
}
