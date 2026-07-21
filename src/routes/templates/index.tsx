import { createFileRoute, Link } from '@tanstack/react-router';
import { templates } from '../../lib/templates';
import { LucideIcon } from '../../components/LucideIcon';
import { SiteLogoIcon } from '../../components/SiteLogoIcon';
import { buildHead } from '../../lib/seo';

import { TemplateCard } from '../../components/TemplateCard';

export const Route = createFileRoute('/templates/')({
  head: () =>
    buildHead({
      title: 'Habit Tracker Templates Gallery | Printable Habit PDFs',
      description:
        'Browse 18+ high-performance, print-ready habit tracker templates. Instantly customize templates for 75 Hard, student study habits, weight loss, and more.',
      path: '/templates',
      keywords: ['habit tracker templates', 'printable habit sheets', 'customizable habit grid templates'],
    }),
  component: TemplatesGallery,
});

function TemplatesGallery() {
  const templateList = Object.values(templates);

  return (
    <div className="tpl-shell">
      <div className="tpl-inner">
        {/* Top Unified Header Navigation */}
        <nav className="tpl-nav">
          <Link to="/" className="tpl-nav-back">
            <LucideIcon name="ArrowLeft" size={14} />
            Back to App
          </Link>
          <Link to="/" className="tpl-nav-logo">
            <SiteLogoIcon size={22} />
            <span>HabitGrid</span>
          </Link>
        </nav>

        {/* Gallery Header */}
        <header className="tpl-gallery-header">
          <div className="tpl-gallery-header-logo-row">
            <h1 className="tpl-gallery-title">HabitGrid Templates Gallery</h1>
          </div>
          <p className="tpl-gallery-subtitle">
            Browse 18 goal-specific tracking templates. Customize typography, page layout, and habits —
            then export a print-ready PDF instantly.
          </p>
          <Link to="/" className="btn btn-primary" style={{ textDecoration: 'none', padding: '11px 22px', fontSize: '13.5px', display: 'inline-flex' }}>
            <LucideIcon name="Plus" size={15} />
            Create Blank Custom Grid
          </Link>
        </header>

        {/* Grid */}
        <div className="tpl-grid">
          {templateList.map((tpl) => (
            <TemplateCard key={tpl.slug} template={tpl} />
          ))}
        </div>

      </div>
    </div>
  );
}
