import { Link } from '@tanstack/react-router';
import type { HabitTemplate } from '../lib/templates';
import { templates } from '../lib/templates';
import { LucideIcon } from './LucideIcon';


interface TemplatePageProps {
  template: HabitTemplate;
}

export function TemplatePage({ template }: TemplatePageProps) {
  // Find related templates
  const relatedTemplates = template.relatedSlugs
    .map((slug) => templates[slug])
    .filter(Boolean);

  return (
    <div
      style={{
        backgroundColor: '#09090b',
        color: '#f4f4f5',
        minHeight: '100vh',
        fontFamily: "'Inter', sans-serif",
        padding: '60px 20px',
        lineHeight: 1.6,
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Navigation Breadcrumb */}
        <nav style={{ marginBottom: '40px', fontSize: '13px' }}>
          <Link
            to="/templates"
            style={{
              color: '#a1a1aa',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <LucideIcon name="ArrowLeft" size={14} /> Back to Templates Gallery
          </Link>
        </nav>

        {/* Hero Section */}
        <header style={{ marginBottom: '50px' }}>
          <h1
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '44px',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: '#ffffff',
              marginBottom: '16px',
              lineHeight: 1.2,
            }}
          >
            {template.title}
          </h1>
          <p style={{ fontSize: '20px', color: '#a1a1aa', fontWeight: 400 }}>
            {template.subheading}
          </p>
        </header>

        {/* Call to Action Box */}
        <section
          style={{
            background: 'linear-gradient(135deg, #18181b, #121214)',
            border: '1px solid #27272a',
            borderRadius: '16px',
            padding: '36px',
            marginBottom: '50px',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#6366f1',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              PRE-CONFIGURED TEMPLATE
            </span>
            <h2
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '24px',
                fontWeight: 700,
                color: '#ffffff',
                margin: 0,
              }}
            >
              Printable PDF Habit Chart
            </h2>
            <p style={{ color: '#a1a1aa', fontSize: '15px', margin: 0 }}>
              {template.introText}
            </p>
          </div>

          {/* Habit Preview Cards Grid */}
          <div>
            <h3
              style={{
                fontSize: '12px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: '#71717a',
                marginBottom: '14px',
              }}
            >
              Habits list pre-loaded in this template:
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                gap: '12px',
              }}
            >
              {template.habits.map((habit, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#09090b',
                    border: '1px solid #27272a',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  <LucideIcon name={habit.icon} size={16} style={{ color: '#6366f1' }} />
                  <span style={{ fontSize: '13px', fontWeight: 500, color: '#f4f4f5' }}>
                    {habit.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Deep link button */}
          <div style={{ marginTop: '10px' }}>
            <Link
              to="/"
              search={{ template: template.slug }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '14px 32px',
                fontSize: '15px',
                fontWeight: 700,
                color: '#ffffff',
                background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                borderRadius: '10px',
                textDecoration: 'none',
                boxShadow: '0 4px 20px rgba(99, 102, 241, 0.4)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 24px rgba(99, 102, 241, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(99, 102, 241, 0.4)';
              }}
            >
              <LucideIcon name="Sliders" size={16} /> Customize & Print This Template
            </Link>
          </div>
        </section>

        {/* Informational SEO Content */}
        <section style={{ marginBottom: '60px' }}>
          <h2
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '28px',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '20px',
            }}
          >
            Why use a physical habit grid?
          </h2>
          <p style={{ color: '#a1a1aa', fontSize: '15px', marginBottom: '20px' }}>
            In a digital world filled with notifications and endless scroll screens, physical
            tracking remains one of the most effective ways to build new routines. Hanging a
            beautifully-designed, custom-printed paper grid on your fridge, bathroom mirror, or desk
            acts as a constant passive visual reminder.
          </p>
          <p style={{ color: '#a1a1aa', fontSize: '15px', marginBottom: '30px' }}>
            It takes less than a second to pick up a pen or highlighter and mark off a completed block.
            There are no apps to open, passwords to enter, or notifications to distract you. It is
            pure, simple, visual accountability.
          </p>

          <h3
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '20px',
              fontWeight: 600,
              color: '#ffffff',
              marginBottom: '14px',
            }}
          >
            How to customize your HabitGrid sheet:
          </h3>
          <ol
            style={{
              color: '#a1a1aa',
              fontSize: '15px',
              paddingLeft: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <li>
              <strong>Adjust Timeframes:</strong> Set it to display calendar months, a consecutive number
              of weeks (like 4 or 8 weeks), or a custom range (like Andy Frisella\'s 75 days).
            </li>
            <li>
              <strong>Choose Aesthetics:</strong> Pick a design style and choose from our curated color palettes like
              &quot;Royal Violet&quot;, &quot;Mint Emerald&quot;, or configure custom background/accent hex codes.
            </li>
            <li>
              <strong>Add Layout Elements:</strong> Choose whether to include a start date block, a notes and
              reflections text section, or a visual icon legend on the bottom.
            </li>
            <li>
              <strong>Export:</strong> Click export to instantly download your ready-to-print vector PDF.
            </li>
          </ol>
        </section>

        {/* FAQ Section */}
        {template.faqs && template.faqs.length > 0 && (
          <section
            style={{
              borderTop: '1px solid #27272a',
              paddingTop: '50px',
              marginBottom: '60px',
            }}
          >
            <h2
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '28px',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '30px',
              }}
            >
              Frequently Asked Questions
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {template.faqs.map((faq, idx) => (
                <div key={idx}>
                  <h4
                    style={{
                      fontSize: '16px',
                      fontWeight: 600,
                      color: '#ffffff',
                      marginBottom: '8px',
                    }}
                  >
                    {faq.question}
                  </h4>
                  <p style={{ color: '#a1a1aa', fontSize: '14px', margin: 0 }}>
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related Templates Internal Linking */}
        {relatedTemplates.length > 0 && (
          <section style={{ borderTop: '1px solid #27272a', paddingTop: '50px' }}>
            <h3
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '20px',
                fontWeight: 600,
                color: '#ffffff',
                marginBottom: '20px',
              }}
            >
              Explore Other Habit Templates
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: '20px',
              }}
            >
              {relatedTemplates.map((rel) => (
                <Link
                  key={rel.slug}
                  to={`/templates/${rel.slug}` as any}
                  style={{
                    backgroundColor: '#121214',
                    border: '1px solid #27272a',
                    borderRadius: '12px',
                    padding: '20px',
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#6366f1';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#27272a';
                  }}
                >
                  <div>
                    <h4
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: '16px',
                        fontWeight: 700,
                        color: '#ffffff',
                        margin: '0 0 6px 0',
                      }}
                    >
                      {rel.heading}
                    </h4>
                    <p style={{ fontSize: '12px', color: '#a1a1aa', margin: 0 }}>
                      {rel.description.substring(0, 80)}...
                    </p>
                  </div>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '12px',
                      color: '#6366f1',
                      fontWeight: 600,
                      marginTop: '16px',
                    }}
                  >
                    View Template <LucideIcon name="ArrowRight" size={12} />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
