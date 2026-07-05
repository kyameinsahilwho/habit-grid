import { createFileRoute } from '@tanstack/react-router';
import { HabitDesigner } from '../components/HabitDesigner';
import { buildHead } from '../lib/seo';

interface SearchParams {
  template?: string;
}

export const Route = createFileRoute('/')({
  validateSearch: (search: Record<string, unknown>): SearchParams => {
    return {
      template: typeof search.template === 'string' ? search.template : undefined,
    };
  },
  head: () =>
    buildHead({
      title: 'HabitGrid | Premium Habit & Journal Sheets Designer',
      description:
        'Design beautiful, custom habit tracker grids and export them as print-ready PDFs. Choose months, weeks, or custom day ranges.',
      path: '/',
      keywords: ['habit tracker', 'habit design', 'pdf habit tracker', 'custom habit list'],
    }),
  component: Home,
});

function Home() {
  const { template } = Route.useSearch();
  return <HabitDesigner templateSlug={template} />;
}
