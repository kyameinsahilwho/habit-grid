import { t as templates } from "./_ssr/templates-NLP32bXK.mjs";
import { t as buildHead } from "./_ssr/seo-C2Q5yaq3.mjs";
import { O as notFound, d as lazyRouteComponent, f as createFileRoute } from "./_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-DdD0Uiot.js
var $$splitComponentImporter = () => import("./_slug-nbYZ8GvA.mjs");
var Route = createFileRoute("/templates/$slug")({
	loader: ({ params }) => {
		const template = templates[params.slug];
		if (!template) throw notFound();
		return { template };
	},
	head: ({ loaderData }) => {
		const tpl = loaderData?.template;
		if (!tpl) return buildHead({
			title: "Template Not Found | HabitGrid",
			description: "The requested habit tracker template was not found."
		});
		return buildHead({
			title: tpl.title,
			description: tpl.description,
			path: `/templates/${tpl.slug}`,
			keywords: tpl.seoKeywords
		});
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
