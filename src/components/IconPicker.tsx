import { useState, useMemo, useEffect, useRef } from 'react';
import * as LucideIcons from 'lucide-react';
import { LucideIcon } from './LucideIcon';

interface IconPickerProps {
  onSelect: (iconName: string) => void;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLElement | null>;
}

// Categorized icon sets
const iconCategories: Record<string, { name: string; title: string }[]> = {
  All: [],
  Health: [
    { name: 'Droplet', title: 'Water' },
    { name: 'Dumbbell', title: 'Workout' },
    { name: 'Apple', title: 'Diet' },
    { name: 'Salad', title: 'Veggies' },
    { name: 'Bed', title: 'Sleep' },
    { name: 'Scale', title: 'Weight' },
    { name: 'Heart', title: 'Self-Care' },
    { name: 'Activity', title: 'Health' },
    { name: 'Thermometer', title: 'Temp' },
    { name: 'Pill', title: 'Meds' },
    { name: 'Bike', title: 'Cardio' },
    { name: 'Footprints', title: 'Steps' },
  ],
  Mind: [
    { name: 'Brain', title: 'Meditation' },
    { name: 'BookOpen', title: 'Read' },
    { name: 'PenTool', title: 'Journal' },
    { name: 'GraduationCap', title: 'Learn' },
    { name: 'Smile', title: 'Mood' },
    { name: 'SmilePlus', title: 'Gratitude' },
    { name: 'Sun', title: 'Morning' },
    { name: 'Moon', title: 'Night' },
    { name: 'Compass', title: 'Focus' },
    { name: 'Lightbulb', title: 'Ideas' },
  ],
  Lifestyle: [
    { name: 'Coffee', title: 'Coffee' },
    { name: 'Flame', title: 'Streak' },
    { name: 'Camera', title: 'Progress' },
    { name: 'Music', title: 'Music' },
    { name: 'Paintbrush', title: 'Art' },
    { name: 'Laptop', title: 'Work' },
    { name: 'DollarSign', title: 'Money' },
    { name: 'TreePine', title: 'Outdoors' },
    { name: 'Utensils', title: 'Meals' },
    { name: 'Sparkles', title: 'Grooming' },
    { name: 'Ban', title: 'Quit' },
    { name: 'CheckSquare', title: 'Task' },
  ],
};

// Flatten all to the "All" category (deduplicated)
const allIconsFlatUniq: { name: string; title: string }[] = [];
const seen = new Set<string>();
for (const cat of Object.values(iconCategories)) {
  for (const icon of cat) {
    if (!seen.has(icon.name)) {
      seen.add(icon.name);
      allIconsFlatUniq.push(icon);
    }
  }
}
iconCategories['All'] = allIconsFlatUniq;

// Get all icon keys once for search
const allIconKeys = Object.keys(LucideIcons).filter(
  (key) =>
    typeof (LucideIcons as any)[key] === 'function' ||
    (typeof (LucideIcons as any)[key] === 'object' && (LucideIcons as any)[key] !== null)
);

export function IconPicker({ onSelect, onClose, triggerRef }: IconPickerProps) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const popoverRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // Filter icons based on search query or active category
  const iconsToRender = useMemo(() => {
    if (search.trim()) {
      const query = search.toLowerCase();
      const searchMatches = allIconKeys
        .filter((name) => name.toLowerCase().includes(query))
        .sort((a, b) => {
          // Exact start match first
          const aStarts = a.toLowerCase().startsWith(query);
          const bStarts = b.toLowerCase().startsWith(query);
          if (aStarts && !bStarts) return -1;
          if (!aStarts && bStarts) return 1;
          return a.localeCompare(b);
        })
        .slice(0, 60);
      return searchMatches.map((name) => ({ name, title: name.replace(/([A-Z])/g, ' $1').trim() }));
    }
    return iconCategories[activeCategory] || iconCategories['All'];
  }, [search, activeCategory]);

  // Handle click outside to close
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

  // Position popover relative to trigger
  const [position, setPosition] = useState<React.CSSProperties>({ display: 'none' });

  useEffect(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

      setPosition({
        position: 'absolute',
        top: `${rect.bottom + scrollTop + 8}px`,
        left: `${Math.min(window.innerWidth - 300, rect.left + scrollLeft)}px`,
        zIndex: 1000,
      });
    }
  }, [triggerRef]);

  const categoryKeys = Object.keys(iconCategories);

  return (
    <div ref={popoverRef} className="icon-popover" style={position}>
      {/* Search input */}
      <div className="icon-search-container">
        <svg className="icon-search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          ref={searchRef}
          type="text"
          placeholder="Search any icon..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            if (e.target.value) setActiveCategory('All');
          }}
          autoFocus
          autoComplete="off"
        />
      </div>

      {/* Category chips */}
      {!search && (
        <div className="icon-categories">
          {categoryKeys.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`icon-category-chip${activeCategory === cat ? ' active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Icon grid */}
      <div className="icon-list">
        {iconsToRender.length === 0 ? (
          <div className="icon-no-results">No icons found for "{search}"</div>
        ) : (
          iconsToRender.map((item) => (
            <span
              key={item.name}
              className="icon-list-item"
              title={item.title}
              onClick={() => {
                onSelect(item.name);
                onClose();
              }}
            >
              <LucideIcon name={item.name} size={18} />
              <span className="icon-list-item-label">{item.title}</span>
            </span>
          ))
        )}
      </div>
    </div>
  );
}
