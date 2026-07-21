import { Link } from '@tanstack/react-router';
import type { HabitTemplate } from '../lib/templates';
import { templates } from '../lib/templates';
import { LucideIcon } from './LucideIcon';
import { SiteLogoIcon } from './SiteLogoIcon';
import { TemplateCard } from './TemplateCard';

interface TemplatePageProps {
  template: HabitTemplate;
}

export function TemplatePage({ template }: TemplatePageProps) {
  const relatedTemplates = template.relatedSlugs
    .map((slug) => templates[slug])
    .filter(Boolean);

  return (
    <div className="tpl-shell">
      <div className="tpl-inner">

        {/* Unified Header Navigation */}
        <nav className="tpl-nav">
          <Link to="/templates" className="tpl-nav-back">
            <LucideIcon name="ArrowLeft" size={14} />
            Back to Templates Gallery
          </Link>
          <Link to="/" className="tpl-nav-logo">
            <SiteLogoIcon size={22} />
            <span>HabitGrid</span>
          </Link>
        </nav>

        {/* Hero */}
        <header className="tpl-hero">
          <h1>{template.title}</h1>
          <p>{template.subheading}</p>
        </header>

        {/* CTA box */}
        <div className="tpl-cta-box">
          <div className="handdrawn-tape" style={{ width: '120px', height: '28px', top: '-14px' }} />
          <div>
            <p className="tpl-cta-label">Pre-Configured Template</p>
            <h2>Printable PDF Habit Chart</h2>
            <p>{template.introText}</p>
          </div>

          {/* Habits grid */}
          <div>
            <p className="tpl-card-habits-label">
              Habits pre-loaded in this template ({template.habits.length}):
            </p>
            <div className="tpl-habits-grid">
              {template.habits.map((habit, idx) => (
                <div key={idx} className="tpl-habit-chip">
                  <LucideIcon name={habit.icon} size={15} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                  {habit.name}
                </div>
              ))}
            </div>
          </div>

          {/* CTA button */}
          <Link
            to="/"
            search={{ template: template.slug }}
            className="btn btn-primary"
            style={{ textDecoration: 'none', padding: '12px 22px', fontSize: '14px', alignSelf: 'flex-start' }}
          >
            <LucideIcon name="Sliders" size={15} />
            Customize &amp; Print This Template
          </Link>
        </div>

        {/* Article content */}
        <section className="tpl-section">
          <h2>Why use a physical habit grid?</h2>
          <p>
            In a digital world filled with notifications and endless scroll, physical tracking remains
            one of the most effective ways to build lasting routines. Hanging a beautifully-designed,
            custom-printed paper grid on your fridge, bathroom mirror, or desk acts as a constant
            passive visual reminder — no app to open, no password to enter.
          </p>
          <p>
            It takes less than a second to mark off a completed block. Pure, simple, visual accountability.
          </p>
          <h3>How to customize your HabitGrid sheet:</h3>
          <ol>
            <li>
              <strong>Adjust Timeframes:</strong> Set calendar months, consecutive weeks, or a custom range
              like Andy Frisella's 75 days.
            </li>
            <li>
              <strong>Choose Aesthetics:</strong> Pick a design style and curated color palette like
              "Royal Violet", "Mint Emerald", or enter custom hex codes.
            </li>
            <li>
              <strong>Add Layout Elements:</strong> Include a start date block, notes section, or icon legend.
            </li>
            <li>
              <strong>Export:</strong> Click export to instantly download your ready-to-print vector PDF.
            </li>
          </ol>
        </section>

        {/* FAQs */}
        {template.faqs && template.faqs.length > 0 && (
          <>
            <hr className="tpl-divider" />
            <section className="tpl-section">
              <h2>Frequently Asked Questions</h2>
              <div className="tpl-faq-list">
                {template.faqs.map((faq, idx) => (
                  <div key={idx} className="tpl-faq-item">
                    <h4>{faq.question}</h4>
                    <p>{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* Related templates */}
        {relatedTemplates.length > 0 && (
          <>
            <hr className="tpl-divider" />
            <section className="tpl-section">
              <h3 style={{ fontSize: '22px', marginBottom: '18px' }}>Explore Other Habit Templates</h3>
              <div className="tpl-grid">
                {relatedTemplates.map((rel) => (
                  <TemplateCard key={rel.slug} template={rel} />
                ))}
              </div>
            </section>
          </>
        )}

      </div>
    </div>
  );
}
