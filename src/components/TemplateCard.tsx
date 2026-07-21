import { Link } from '@tanstack/react-router';
import type { HabitTemplate } from '../lib/templates';
import { LucideIcon } from './LucideIcon';

interface TemplateCardProps {
  template: HabitTemplate;
}

export function TemplateCard({ template }: TemplateCardProps) {
  const isTape = template.slug.length % 2 === 0;

  return (
    <div className="tpl-card">
      {isTape ? <div className="handdrawn-tape" /> : <div className="handdrawn-tack" />}
      <div>
        {/* Title + badge */}
        <div className="tpl-card-header">
          <h3 className="tpl-card-title">{template.heading}</h3>
          <span className="tpl-card-badge">{template.periodMode}</span>
        </div>

        <p className="tpl-card-desc">{template.description}</p>

        {/* Habits preview */}
        <p className="tpl-card-habits-label">
          Habits Included ({template.habits.length})
        </p>
        <ul className="tpl-card-habits-list">
          {template.habits.slice(0, 4).map((h, i) => (
            <li key={i}>
              <LucideIcon name={h.icon} size={13} style={{ color: 'var(--accent)', flexShrink: 0 }} />
              <span>{h.name}</span>
            </li>
          ))}
          {template.habits.length > 4 && (
            <li className="tpl-card-habits-more">
              + {template.habits.length - 4} more...
            </li>
          )}
        </ul>
      </div>

      {/* Actions */}
      <div className="tpl-card-actions">
        <Link
          to="/"
          search={{ template: template.slug }}
          className="btn btn-primary"
          style={{ textDecoration: 'none' }}
        >
          Use Template
        </Link>
        <Link
          to={`/templates/${template.slug}` as any}
          className="btn btn-outline"
          style={{
            textDecoration: 'none',
            color: 'var(--text-primary)',
            borderColor: 'var(--sidebar-border)',
          }}
        >
          Details
        </Link>
      </div>
    </div>
  );
}
