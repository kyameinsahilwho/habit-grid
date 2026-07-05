import { t as buildHead } from "./seo-C2Q5yaq3.mjs";
import { M as require_jsx_runtime, c as HeadContent, d as lazyRouteComponent, f as createFileRoute, p as createRootRoute, s as Scripts, u as createRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route$2 } from "../_slug-DdD0Uiot.mjs";
import { t as Route$3 } from "./routes-Bk1V1yZ7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BhEh2JCc.js
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-Cg14LjQZ.css";
var Route$1 = createRootRoute({
	head: () => ({
		meta: [{ charSet: "utf-8" }, {
			name: "viewport",
			content: "width=device-width, initial-scale=1"
		}],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Abril+Fatface&display=swap"
			}
		]
	}),
	shellComponent: RootDocument
});
function RootDocument({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
var $$splitComponentImporter = () => import("./templates-ncY_xtH1.mjs");
var Route = createFileRoute("/templates/")({
	head: () => buildHead({
		title: "Habit Tracker Templates Gallery | Printable Habit PDFs",
		description: "Browse 18+ high-performance, print-ready habit tracker templates. Instantly customize templates for 75 Hard, student study habits, weight loss, and more.",
		path: "/templates",
		keywords: [
			"habit tracker templates",
			"printable habit sheets",
			"customizable habit grid templates"
		]
	}),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$3.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$1
});
var TemplatesIndexRoute = Route.update({
	id: "/templates/",
	path: "/templates/",
	getParentRoute: () => Route$1
});
var rootRouteChildren = {
	IndexRoute,
	TemplatesSlugRoute: Route$2.update({
		id: "/templates/$slug",
		path: "/templates/$slug",
		getParentRoute: () => Route$1
	}),
	TemplatesIndexRoute
};
var routeTree = Route$1._addFileChildren(rootRouteChildren)._addFileTypes();
function getRouter() {
	return createRouter({
		routeTree,
		scrollRestoration: true,
		defaultPreload: "intent",
		defaultPreloadStaleTime: 0
	});
}
//#endregion
export { getRouter };
