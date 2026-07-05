import { t as templates } from "./_ssr/templates-NLP32bXK.mjs";
import { M as require_jsx_runtime, m as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as Route } from "./_slug-DdD0Uiot.mjs";
import { t as LucideIcon } from "./_ssr/LucideIcon-BgDqgfGu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-nbYZ8GvA.js
var import_jsx_runtime = require_jsx_runtime();
function TemplatePage({ template }) {
	const relatedTemplates = template.relatedSlugs.map((slug) => templates[slug]).filter(Boolean);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		style: {
			backgroundColor: "#09090b",
			color: "#f4f4f5",
			minHeight: "100vh",
			fontFamily: "'Inter', sans-serif",
			padding: "60px 20px",
			lineHeight: 1.6
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				maxWidth: "900px",
				margin: "0 auto"
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					style: {
						marginBottom: "40px",
						fontSize: "13px"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/templates",
						style: {
							color: "#a1a1aa",
							textDecoration: "none",
							display: "inline-flex",
							alignItems: "center",
							gap: "6px"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LucideIcon, {
							name: "ArrowLeft",
							size: 14
						}), " Back to Templates Gallery"]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					style: { marginBottom: "50px" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						style: {
							fontFamily: "'Outfit', sans-serif",
							fontSize: "44px",
							fontWeight: 800,
							letterSpacing: "-0.02em",
							color: "#ffffff",
							marginBottom: "16px",
							lineHeight: 1.2
						},
						children: template.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						style: {
							fontSize: "20px",
							color: "#a1a1aa",
							fontWeight: 400
						},
						children: template.subheading
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					style: {
						background: "linear-gradient(135deg, #18181b, #121214)",
						border: "1px solid #27272a",
						borderRadius: "16px",
						padding: "36px",
						marginBottom: "50px",
						boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
						display: "flex",
						flexDirection: "column",
						gap: "24px"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								flexDirection: "column",
								gap: "8px"
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: {
										fontSize: "11px",
										fontWeight: 700,
										color: "#6366f1",
										textTransform: "uppercase",
										letterSpacing: "0.1em"
									},
									children: "PRE-CONFIGURED TEMPLATE"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									style: {
										fontFamily: "'Outfit', sans-serif",
										fontSize: "24px",
										fontWeight: 700,
										color: "#ffffff",
										margin: 0
									},
									children: "Printable PDF Habit Chart"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									style: {
										color: "#a1a1aa",
										fontSize: "15px",
										margin: 0
									},
									children: template.introText
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							style: {
								fontSize: "12px",
								fontWeight: 700,
								textTransform: "uppercase",
								letterSpacing: "0.05em",
								color: "#71717a",
								marginBottom: "14px"
							},
							children: "Habits list pre-loaded in this template:"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								display: "grid",
								gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
								gap: "12px"
							},
							children: template.habits.map((habit, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									backgroundColor: "#09090b",
									border: "1px solid #27272a",
									borderRadius: "8px",
									padding: "12px 16px",
									display: "flex",
									alignItems: "center",
									gap: "12px"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LucideIcon, {
									name: habit.icon,
									size: 16,
									style: { color: "#6366f1" }
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: {
										fontSize: "13px",
										fontWeight: 500,
										color: "#f4f4f5"
									},
									children: habit.name
								})]
							}, idx))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: { marginTop: "10px" },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/",
								search: { template: template.slug },
								style: {
									display: "inline-flex",
									alignItems: "center",
									gap: "10px",
									padding: "14px 32px",
									fontSize: "15px",
									fontWeight: 700,
									color: "#ffffff",
									background: "linear-gradient(135deg, #6366f1, #4f46e5)",
									borderRadius: "10px",
									textDecoration: "none",
									boxShadow: "0 4px 20px rgba(99, 102, 241, 0.4)",
									transition: "transform 0.2s, box-shadow 0.2s"
								},
								onMouseEnter: (e) => {
									e.currentTarget.style.transform = "translateY(-2px)";
									e.currentTarget.style.boxShadow = "0 6px 24px rgba(99, 102, 241, 0.5)";
								},
								onMouseLeave: (e) => {
									e.currentTarget.style.transform = "translateY(0)";
									e.currentTarget.style.boxShadow = "0 4px 20px rgba(99, 102, 241, 0.4)";
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LucideIcon, {
									name: "Sliders",
									size: 16
								}), " Customize & Print This Template"]
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					style: { marginBottom: "60px" },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							style: {
								fontFamily: "'Outfit', sans-serif",
								fontSize: "28px",
								fontWeight: 700,
								color: "#ffffff",
								marginBottom: "20px"
							},
							children: "Why use a physical habit grid?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: {
								color: "#a1a1aa",
								fontSize: "15px",
								marginBottom: "20px"
							},
							children: "In a digital world filled with notifications and endless scroll screens, physical tracking remains one of the most effective ways to build new routines. Hanging a beautifully-designed, custom-printed paper grid on your fridge, bathroom mirror, or desk acts as a constant passive visual reminder."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: {
								color: "#a1a1aa",
								fontSize: "15px",
								marginBottom: "30px"
							},
							children: "It takes less than a second to pick up a pen or highlighter and mark off a completed block. There are no apps to open, passwords to enter, or notifications to distract you. It is pure, simple, visual accountability."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							style: {
								fontFamily: "'Outfit', sans-serif",
								fontSize: "20px",
								fontWeight: 600,
								color: "#ffffff",
								marginBottom: "14px"
							},
							children: "How to customize your HabitGrid sheet:"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
							style: {
								color: "#a1a1aa",
								fontSize: "15px",
								paddingLeft: "20px",
								display: "flex",
								flexDirection: "column",
								gap: "12px"
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Adjust Timeframes:" }), " Set it to display calendar months, a consecutive number of weeks (like 4 or 8 weeks), or a custom range (like Andy Frisella\\'s 75 days)."] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Choose Aesthetics:" }), " Pick a design style and choose from our curated color palettes like \"Royal Violet\", \"Mint Emerald\", or configure custom background/accent hex codes."] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Add Layout Elements:" }), " Choose whether to include a start date block, a notes and reflections text section, or a visual icon legend on the bottom."] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Export:" }), " Click export to instantly download your ready-to-print vector PDF."] })
							]
						})
					]
				}),
				template.faqs && template.faqs.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					style: {
						borderTop: "1px solid #27272a",
						paddingTop: "50px",
						marginBottom: "60px"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						style: {
							fontFamily: "'Outfit', sans-serif",
							fontSize: "28px",
							fontWeight: 700,
							color: "#ffffff",
							marginBottom: "30px"
						},
						children: "Frequently Asked Questions"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							display: "flex",
							flexDirection: "column",
							gap: "24px"
						},
						children: template.faqs.map((faq, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							style: {
								fontSize: "16px",
								fontWeight: 600,
								color: "#ffffff",
								marginBottom: "8px"
							},
							children: faq.question
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: {
								color: "#a1a1aa",
								fontSize: "14px",
								margin: 0
							},
							children: faq.answer
						})] }, idx))
					})]
				}),
				relatedTemplates.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					style: {
						borderTop: "1px solid #27272a",
						paddingTop: "50px"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						style: {
							fontFamily: "'Outfit', sans-serif",
							fontSize: "20px",
							fontWeight: 600,
							color: "#ffffff",
							marginBottom: "20px"
						},
						children: "Explore Other Habit Templates"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							display: "grid",
							gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
							gap: "20px"
						},
						children: relatedTemplates.map((rel) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: `/templates/${rel.slug}`,
							style: {
								backgroundColor: "#121214",
								border: "1px solid #27272a",
								borderRadius: "12px",
								padding: "20px",
								textDecoration: "none",
								display: "flex",
								flexDirection: "column",
								justifyContent: "space-between",
								transition: "all 0.2s"
							},
							onMouseEnter: (e) => {
								e.currentTarget.style.borderColor = "#6366f1";
							},
							onMouseLeave: (e) => {
								e.currentTarget.style.borderColor = "#27272a";
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								style: {
									fontFamily: "'Outfit', sans-serif",
									fontSize: "16px",
									fontWeight: 700,
									color: "#ffffff",
									margin: "0 0 6px 0"
								},
								children: rel.heading
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								style: {
									fontSize: "12px",
									color: "#a1a1aa",
									margin: 0
								},
								children: [rel.description.substring(0, 80), "..."]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								style: {
									display: "inline-flex",
									alignItems: "center",
									gap: "4px",
									fontSize: "12px",
									color: "#6366f1",
									fontWeight: 600,
									marginTop: "16px"
								},
								children: ["View Template ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LucideIcon, {
									name: "ArrowRight",
									size: 12
								})]
							})]
						}, rel.slug))
					})]
				})
			]
		})
	});
}
function TemplateComponent() {
	const { template } = Route.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TemplatePage, { template });
}
//#endregion
export { TemplateComponent as component };
