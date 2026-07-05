import { createFileRoute, notFound } from '@tanstack/react-router';
import { templates } from '../../lib/templates';
import { TemplatePage } from '../../components/TemplatePage';
import { buildHead } from '../../lib/seo';

export const Route = createFileRoute('/templates/$slug')({
  loader: ({ params }) => {
    const template = templates[params.slug];
    if (!template) {
      throw notFound();
    }
    return { template };
  },
  head: ({ loaderData }) => {
    const tpl = loaderData?.template;
    if (!tpl) {
      return buildHead({
        title: 'Template Not Found | HabitGrid',
        description: 'The requested habit tracker template was not found.',
      });
    }
    return buildHead({
      title: tpl.title,
      description: tpl.description,
      path: `/templates/${tpl.slug}`,
      keywords: tpl.seoKeywords,
    });
  },
  component: TemplateComponent,
});

function TemplateComponent() {
  const { template } = Route.useLoaderData();
  return <TemplatePage template={template} />;
}
