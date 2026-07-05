import { t as buildHead } from "./seo-C2Q5yaq3.mjs";
import { d as lazyRouteComponent, f as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Bk1V1yZ7.js
var $$splitComponentImporter = () => import("./routes-ChqmoSBn.mjs");
var Route = createFileRoute("/")({
	validateSearch: (search) => {
		return { template: typeof search.template === "string" ? search.template : void 0 };
	},
	head: () => buildHead({
		title: "HabitGrid | Premium Habit & Journal Sheets Designer",
		description: "Design beautiful, custom habit tracker grids and export them as print-ready PDFs. Choose months, weeks, or custom day ranges.",
		path: "/",
		keywords: [
			"habit tracker",
			"habit design",
			"pdf habit tracker",
			"custom habit list"
		]
	}),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
