import { M as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as CircleQuestionMark, t as lucide_react_exports } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/LucideIcon-BgDqgfGu.js
var import_jsx_runtime = require_jsx_runtime();
function LucideIcon({ name, className, size = 16, style }) {
	const IconComponent = lucide_react_exports[name];
	if (!IconComponent) {
		const Fallback = CircleQuestionMark;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fallback, {
			className,
			size,
			style
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconComponent, {
		className,
		size,
		style
	});
}
//#endregion
export { LucideIcon as t };
