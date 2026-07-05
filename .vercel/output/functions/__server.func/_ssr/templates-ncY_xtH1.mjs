import { t as templates } from "./templates-NLP32bXK.mjs";
import { M as require_jsx_runtime, m as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as LucideIcon } from "./LucideIcon-BgDqgfGu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/templates-ncY_xtH1.js
var import_jsx_runtime = require_jsx_runtime();
function TemplatesGallery() {
	const templateList = Object.values(templates);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		style: {
			backgroundColor: "#09090b",
			color: "#f4f4f5",
			minHeight: "100vh",
			fontFamily: "'Inter', sans-serif",
			padding: "60px 20px"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				maxWidth: "1200px",
				margin: "0 auto"
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				style: {
					textAlign: "center",
					marginBottom: "60px"
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "inline-flex",
							alignItems: "center",
							gap: "10px",
							marginBottom: "16px"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LucideIcon, {
							name: "CheckSquare",
							size: 32,
							style: {
								color: "var(--accent, #6366f1)",
								strokeWidth: "2.5px"
							}
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							style: {
								fontFamily: "'Outfit', sans-serif",
								fontSize: "48px",
								fontWeight: 800,
								letterSpacing: "-0.03em",
								background: "linear-gradient(135deg, #ffffff 40%, #6366f1)",
								WebkitBackgroundClip: "text",
								WebkitTextFillColor: "transparent",
								margin: 0
							},
							children: "HabitGrid Templates"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						style: {
							fontSize: "18px",
							color: "#a1a1aa",
							maxWidth: "650px",
							margin: "0 auto 24px auto",
							lineHeight: 1.6
						},
						children: "Select from our curated list of 18 goal-specific tracking templates. Customize typography, page layout, and grids, then export a premium print-ready PDF instantly."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						style: {
							display: "inline-flex",
							alignItems: "center",
							gap: "8px",
							padding: "12px 24px",
							fontSize: "14px",
							fontWeight: 600,
							color: "#ffffff",
							background: "linear-gradient(135deg, #6366f1, #4f46e5)",
							borderRadius: "10px",
							textDecoration: "none",
							boxShadow: "0 4px 20px rgba(99, 102, 241, 0.3)",
							transition: "all 0.2s"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LucideIcon, {
							name: "Plus",
							size: 16
						}), "Create Blank Custom Grid"]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					display: "grid",
					gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
					gap: "28px"
				},
				children: templateList.map((tpl) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						backgroundColor: "#121214",
						border: "1px solid #27272a",
						borderRadius: "16px",
						padding: "28px",
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-between",
						transition: "all 0.3s ease",
						boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)"
					},
					onMouseEnter: (e) => {
						e.currentTarget.style.borderColor = "#6366f1";
						e.currentTarget.style.transform = "translateY(-4px)";
						e.currentTarget.style.boxShadow = "0 15px 35px rgba(99, 102, 241, 0.1)";
					},
					onMouseLeave: (e) => {
						e.currentTarget.style.borderColor = "#27272a";
						e.currentTarget.style.transform = "translateY(0)";
						e.currentTarget.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.2)";
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								justifyContent: "space-between",
								alignItems: "flex-start",
								marginBottom: "14px"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								style: {
									fontFamily: "'Outfit', sans-serif",
									fontSize: "20px",
									fontWeight: 700,
									color: "#ffffff",
									margin: 0,
									lineHeight: 1.3
								},
								children: tpl.heading
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: {
									fontSize: "10px",
									fontWeight: 600,
									textTransform: "uppercase",
									padding: "4px 10px",
									borderRadius: "12px",
									backgroundColor: "rgba(99, 102, 241, 0.1)",
									color: "#6366f1",
									border: "1px solid rgba(99, 102, 241, 0.2)"
								},
								children: tpl.periodMode
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: {
								fontSize: "13px",
								color: "#a1a1aa",
								lineHeight: 1.5,
								marginBottom: "20px",
								minHeight: "40px"
							},
							children: tpl.description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: { marginBottom: "24px" },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
								style: {
									fontSize: "11px",
									fontWeight: 600,
									textTransform: "uppercase",
									letterSpacing: "0.05em",
									color: "#71717a",
									marginBottom: "10px"
								},
								children: [
									"Habits Included (",
									tpl.habits.length,
									")"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								style: {
									listStyle: "none",
									padding: 0,
									margin: 0,
									display: "flex",
									flexDirection: "column",
									gap: "8px"
								},
								children: [tpl.habits.slice(0, 4).map((h, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									style: {
										display: "flex",
										alignItems: "center",
										gap: "8px",
										fontSize: "13px",
										color: "#e4e4e7"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LucideIcon, {
										name: h.icon,
										size: 14,
										style: {
											color: "#6366f1",
											opacity: .8
										}
									}), h.name]
								}, i)), tpl.habits.length > 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									style: {
										fontSize: "12px",
										color: "#71717a",
										fontStyle: "italic",
										paddingLeft: "22px"
									},
									children: [
										"+ ",
										tpl.habits.length - 4,
										" more habits..."
									]
								})]
							})]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							gap: "12px",
							borderTop: "1px solid #27272a",
							paddingTop: "20px",
							marginTop: "12px"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							search: { template: tpl.slug },
							style: {
								flex: 1,
								textAlign: "center",
								textDecoration: "none",
								padding: "10px 14px",
								fontSize: "13px",
								fontWeight: 600,
								borderRadius: "8px",
								backgroundColor: "#6366f1",
								color: "#ffffff",
								transition: "background 0.2s"
							},
							onMouseEnter: (e) => {
								e.currentTarget.style.backgroundColor = "#4f46e5";
							},
							onMouseLeave: (e) => {
								e.currentTarget.style.backgroundColor = "#6366f1";
							},
							children: "Use Template"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: `/templates/${tpl.slug}`,
							style: {
								flex: 1,
								textAlign: "center",
								textDecoration: "none",
								padding: "10px 14px",
								fontSize: "13px",
								fontWeight: 600,
								borderRadius: "8px",
								backgroundColor: "transparent",
								color: "#e4e4e7",
								border: "1px solid #27272a",
								transition: "all 0.2s"
							},
							onMouseEnter: (e) => {
								e.currentTarget.style.borderColor = "#71717a";
								e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.02)";
							},
							onMouseLeave: (e) => {
								e.currentTarget.style.borderColor = "#27272a";
								e.currentTarget.style.backgroundColor = "transparent";
							},
							children: "View Details"
						})]
					})]
				}, tpl.slug))
			})]
		})
	});
}
//#endregion
export { TemplatesGallery as component };
