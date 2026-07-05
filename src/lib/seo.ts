const BASE_URL = 'https://habitgrid.codingmarvel.com';

export function buildHead({
  title,
  description,
  path = '',
  keywords = [],
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
}) {
  const canonicalUrl = `${BASE_URL}${path}`;

  return {
    meta: [
      { title },
      { name: 'description', content: description },
      { name: 'keywords', content: keywords.join(', ') },
      // Open Graph
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: canonicalUrl },
      { property: 'og:site_name', content: 'HabitGrid' },
      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
    ],
    links: [
      { rel: 'canonical', href: canonicalUrl }
    ]
  };
}
