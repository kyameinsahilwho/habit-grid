import { i as __toESM } from "../_runtime.mjs";
import { t as templates } from "./templates-NLP32bXK.mjs";
import { M as require_jsx_runtime, N as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as lucide_react_exports } from "../_libs/lucide-react.mjs";
import { t as LucideIcon } from "./LucideIcon-BgDqgfGu.mjs";
import { t as Route } from "./routes-Bk1V1yZ7.mjs";
import { t as Sortable } from "../_libs/sortablejs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-ChqmoSBn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var defaultIcons = [
	{
		name: "Droplet",
		title: "Water"
	},
	{
		name: "Dumbbell",
		title: "Workout"
	},
	{
		name: "BookOpen",
		title: "Read"
	},
	{
		name: "Brain",
		title: "Meditation"
	},
	{
		name: "Apple",
		title: "Diet"
	},
	{
		name: "Camera",
		title: "Progress Pic"
	},
	{
		name: "Bed",
		title: "Sleep"
	},
	{
		name: "Flame",
		title: "Streak/Intensity"
	},
	{
		name: "Smile",
		title: "Mood"
	},
	{
		name: "Coffee",
		title: "Coffee/Tea"
	},
	{
		name: "DollarSign",
		title: "Savings/Money"
	},
	{
		name: "Laptop",
		title: "Work/Coding"
	},
	{
		name: "Heart",
		title: "Self-Care"
	},
	{
		name: "Bike",
		title: "Cardio/Bike"
	},
	{
		name: "Sparkles",
		title: "Clean/Beauty"
	},
	{
		name: "Music",
		title: "Instrument/Music"
	},
	{
		name: "Paintbrush",
		title: "Creativity/Art"
	},
	{
		name: "Scale",
		title: "Weight"
	},
	{
		name: "Ban",
		title: "Quit Bad Habit"
	},
	{
		name: "CheckSquare",
		title: "Checklist"
	},
	{
		name: "Activity",
		title: "Health"
	},
	{
		name: "Compass",
		title: "Focus"
	},
	{
		name: "PenTool",
		title: "Journaling"
	},
	{
		name: "GraduationCap",
		title: "Learning"
	},
	{
		name: "Sun",
		title: "Morning Routine"
	},
	{
		name: "Moon",
		title: "Night Routine"
	},
	{
		name: "SmilePlus",
		title: "Gratitude"
	},
	{
		name: "Utensils",
		title: "Meal Prep"
	},
	{
		name: "Trees",
		title: "Outdoors/Nature"
	}
];
var allIconKeys = Object.keys(lucide_react_exports).filter((key) => typeof lucide_react_exports[key] === "function" || typeof lucide_react_exports[key] === "object" && lucide_react_exports[key] !== null);
function IconPicker({ onSelect, onClose, triggerRef }) {
	const [search, setSearch] = (0, import_react.useState)("");
	const popoverRef = (0, import_react.useRef)(null);
	const iconsToRender = (0, import_react.useMemo)(() => {
		if (!search) return defaultIcons;
		const query = search.toLowerCase();
		return allIconKeys.filter((name) => name.toLowerCase().includes(query)).sort().slice(0, 100).map((name) => ({
			name,
			title: name
		}));
	}, [search]);
	(0, import_react.useEffect)(() => {
		function handleClickOutside(event) {
			if (popoverRef.current && !popoverRef.current.contains(event.target) && triggerRef.current && !triggerRef.current.contains(event.target)) onClose();
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [onClose, triggerRef]);
	const [position, setPosition] = (0, import_react.useState)({ display: "none" });
	(0, import_react.useEffect)(() => {
		if (triggerRef.current) {
			const rect = triggerRef.current.getBoundingClientRect();
			const scrollTop = window.scrollY || document.documentElement.scrollTop;
			const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
			setPosition({
				position: "absolute",
				top: `${rect.bottom + scrollTop + 6}px`,
				left: `${Math.min(window.innerWidth - 280, rect.left + scrollLeft)}px`,
				zIndex: 1e3
			});
		}
	}, [triggerRef]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: popoverRef,
		className: "icon-popover",
		style: position,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "icon-search-container",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "text",
				placeholder: "Search icons (e.g. star, heart)...",
				value: search,
				onChange: (e) => setSearch(e.target.value),
				autoFocus: true,
				autoComplete: "off"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "icon-list",
			children: iconsToRender.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					gridColumn: "span 5",
					textAlign: "center",
					color: "var(--text-muted)",
					fontSize: "11px",
					padding: "10px 0",
					width: "100%"
				},
				children: "No icons found"
			}) : iconsToRender.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				title: item.title,
				onClick: () => {
					onSelect(item.name);
					onClose();
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LucideIcon, {
					name: item.name,
					size: 18
				})
			}, item.name))
		})]
	});
}
function Sidebar({ habits, config, onChangeConfig, onAddHabit, onDeleteHabit, onReorder, onEditHabitName, onEditHabitIcon, onExportPdf, isExporting }) {
	const [newHabitName, setNewHabitName] = (0, import_react.useState)("");
	const [selectedIcon, setSelectedIcon] = (0, import_react.useState)("Droplet");
	const [activePickerId, setActivePickerId] = (0, import_react.useState)(null);
	const habitListRef = (0, import_react.useRef)(null);
	const iconTriggerRef = (0, import_react.useRef)(null);
	const habitIconRefs = (0, import_react.useRef)({});
	(0, import_react.useEffect)(() => {
		if (!habitListRef.current) return;
		const sortable = new Sortable(habitListRef.current, {
			handle: ".drag-handle",
			animation: 150,
			ghostClass: "habit-item-drag-fallback",
			onEnd: () => {
				if (!habitListRef.current) return;
				onReorder(Array.from(habitListRef.current.children).map((item) => item.dataset.id).map((id) => habits.find((h) => h.id === id)).filter(Boolean));
			}
		});
		return () => {
			sortable.destroy();
		};
	}, [habits, onReorder]);
	const handleAddClick = () => {
		if (!newHabitName.trim()) return;
		onAddHabit(newHabitName.trim(), selectedIcon);
		setNewHabitName("");
	};
	const handleConfigChange = (key, value) => {
		onChangeConfig({
			...config,
			[key]: value
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "sidebar",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sidebar-header",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "logo",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LucideIcon, {
						name: "CheckSquare",
						className: "logo-icon-svg",
						style: {
							width: "22px",
							height: "22px",
							color: "var(--accent)",
							strokeWidth: "2.5px"
						}
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "HabitGrid" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "tagline",
					children: "Create print-ready beautiful habit sheets"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sidebar-scroll",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "settings-section",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "section-title",
							children: "1. Habits & Questions"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "add-habit-form",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "input-group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									placeholder: "Workout, Drink water, Did I feel happy?...",
									maxLength: 30,
									value: newHabitName,
									onChange: (e) => setNewHabitName(e.target.value),
									onKeyDown: (e) => {
										if (e.key === "Enter") handleAddClick();
									}
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									ref: iconTriggerRef,
									className: "picker-btn",
									style: { marginRight: "6px" },
									onClick: () => setActivePickerId(activePickerId === "new" ? null : "new"),
									title: "Choose icon",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LucideIcon, {
										name: selectedIcon,
										size: 18
									})
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "btn btn-primary",
								onClick: handleAddClick,
								disabled: !newHabitName.trim(),
								children: "Add Item"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "habit-list-container",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", { children: ["Your Habits & Questions ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "badge",
									children: habits.length
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									ref: habitListRef,
									className: "habit-list",
									children: habits.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-muted",
										style: {
											textAlign: "center",
											padding: "20px 0",
											fontSize: "12px"
										},
										children: "No habits or questions added yet. Create one above!"
									}) : habits.map((habit) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "habit-item",
										"data-id": habit.id,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "habit-item-info",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "drag-handle",
													children: "☰"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													ref: (el) => {
														habitIconRefs.current[habit.id] = el;
													},
													className: "habit-item-emoji",
													title: "Click to change icon",
													onClick: () => setActivePickerId(activePickerId === habit.id ? null : habit.id),
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LucideIcon, {
														name: habit.icon,
														className: "habit-icon-svg"
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "habit-item-name",
													contentEditable: true,
													suppressContentEditableWarning: true,
													spellCheck: false,
													title: "Click to edit name",
													onBlur: (e) => {
														const val = e.currentTarget.innerText.trim();
														if (val && val !== habit.name) onEditHabitName(habit.id, val);
														else e.currentTarget.innerText = habit.name;
													},
													onKeyDown: (e) => {
														if (e.key === "Enter") {
															e.preventDefault();
															e.currentTarget.blur();
														}
													},
													children: habit.name
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "habit-item-actions",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												className: "delete-habit-btn",
												title: "Delete habit",
												onClick: () => onDeleteHabit(habit.id),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LucideIcon, {
													name: "X",
													size: 14,
													style: { stroke: "var(--text-muted)" }
												})
											})
										})]
									}, habit.id))
								}),
								habits.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "drag-hint",
									children: "Drag to reorder items"
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "settings-section",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "section-title",
							children: "2. Design & Typography"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "form-group",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "grid-title",
								children: "Tracker Title"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								id: "grid-title",
								value: config.gridTitle,
								onChange: (e) => handleConfigChange("gridTitle", e.target.value),
								placeholder: "e.g., 75 HARD, June Tracker..."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "form-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "form-group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "title-font",
									children: "Title Font Style"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									id: "title-font",
									value: config.titleFont,
									onChange: (e) => handleConfigChange("titleFont", e.target.value),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "outfit",
											children: "Outfit (Modern)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "playfair",
											children: "Playfair (Elegant)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "abril",
											children: "Abril Fatface (Bold)"
										})
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "form-group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "cell-shape",
									children: "Checkbox Style"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									id: "cell-shape",
									value: config.cellShape,
									onChange: (e) => handleConfigChange("cellShape", e.target.value),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "square",
											children: "Square"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "rounded",
											children: "Rounded Square"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "circle",
											children: "Circle"
										})
									]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "form-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "form-group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "select-period-mode",
									children: "Timeframe Mode"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									id: "select-period-mode",
									value: config.periodMode,
									onChange: (e) => handleConfigChange("periodMode", e.target.value),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "days",
											children: "Specific Days Count"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "month",
											children: "Full Calendar Month"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "weeks",
											children: "Consecutive Weeks"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "range",
											children: "Custom Date Range"
										})
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "form-group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "theme-preset",
									children: "Color Palette Theme"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									id: "theme-preset",
									value: config.themePreset,
									onChange: (e) => handleConfigChange("themePreset", e.target.value),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "monochrome",
											children: "Minimal Monochrome"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "sand-navy",
											children: "Warm Sand & Navy"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "violet",
											children: "Royal Violet"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "emerald",
											children: "Mint Emerald"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "sunset",
											children: "Bright Sunset"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "ocean",
											children: "Cool Ocean Blue"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "lavender",
											children: "Wild Lavender"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "custom",
											children: "Custom Color Palette..."
										})
									]
								})]
							})]
						}),
						config.periodMode === "month" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "form-row",
							style: {
								backgroundColor: "rgba(255,255,255,0.02)",
								padding: "10px",
								borderRadius: "8px",
								border: "1px solid var(--sidebar-border)"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "form-group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Month" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: config.month,
									onChange: (e) => handleConfigChange("month", parseInt(e.target.value)),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: 0,
											children: "January"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: 1,
											children: "February"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: 2,
											children: "March"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: 3,
											children: "April"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: 4,
											children: "May"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: 5,
											children: "June"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: 6,
											children: "July"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: 7,
											children: "August"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: 8,
											children: "September"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: 9,
											children: "October"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: 10,
											children: "November"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: 11,
											children: "December"
										})
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "form-group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Year" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									value: config.year,
									onChange: (e) => handleConfigChange("year", parseInt(e.target.value)),
									min: 2020,
									max: 2040
								})]
							})]
						}),
						config.periodMode === "weeks" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "form-row",
							style: {
								backgroundColor: "rgba(255,255,255,0.02)",
								padding: "10px",
								borderRadius: "8px",
								border: "1px solid var(--sidebar-border)"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "form-group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Start Date" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "date",
									value: config.startWeekDate,
									onChange: (e) => handleConfigChange("startWeekDate", e.target.value)
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "form-group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Weeks" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									value: config.weeksCount,
									onChange: (e) => handleConfigChange("weeksCount", parseInt(e.target.value)),
									min: 1,
									max: 20
								})]
							})]
						}),
						config.periodMode === "days" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "form-row",
							style: {
								backgroundColor: "rgba(255,255,255,0.02)",
								padding: "10px",
								borderRadius: "8px",
								border: "1px solid var(--sidebar-border)"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "form-group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Start Date" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "date",
									value: config.startDaysDate,
									onChange: (e) => handleConfigChange("startDaysDate", e.target.value)
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "form-group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Days" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									value: config.daysCount,
									onChange: (e) => handleConfigChange("daysCount", parseInt(e.target.value)),
									min: 5,
									max: 150
								})]
							})]
						}),
						config.periodMode === "range" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "form-row",
							style: {
								backgroundColor: "rgba(255,255,255,0.02)",
								padding: "10px",
								borderRadius: "8px",
								border: "1px solid var(--sidebar-border)"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "form-group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Start Date" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "date",
									value: config.startRangeDate,
									onChange: (e) => handleConfigChange("startRangeDate", e.target.value)
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "form-group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "End Date" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "date",
									value: config.endRangeDate,
									onChange: (e) => handleConfigChange("endRangeDate", e.target.value)
								})]
							})]
						}),
						config.themePreset === "custom" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							id: "custom-palette-controls",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "form-row",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "form-group",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "pdf-bg-color",
										children: "Background Color"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										style: {
											display: "flex",
											gap: "8px",
											alignItems: "center"
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "color",
											id: "pdf-bg-color",
											value: config.pdfBgColor,
											onChange: (e) => handleConfigChange("pdfBgColor", e.target.value)
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											style: {
												fontSize: "11px",
												fontFamily: "monospace"
											},
											children: config.pdfBgColor
										})]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "form-group",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "pdf-text-color",
										children: "Accent/Text Color"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										style: {
											display: "flex",
											gap: "8px",
											alignItems: "center"
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "color",
											id: "pdf-text-color",
											value: config.pdfTextColor,
											onChange: (e) => handleConfigChange("pdfTextColor", e.target.value)
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											style: {
												fontSize: "11px",
												fontFamily: "monospace"
											},
											children: config.pdfTextColor
										})]
									})]
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "form-group",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "columns-per-row",
								children: "Columns Layout Split"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								id: "columns-per-row",
								value: config.columnsPerRow,
								onChange: (e) => handleConfigChange("columnsPerRow", parseInt(e.target.value)),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: 0,
										children: "Single continuous row (No split)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: 10,
										children: "Split row every 10 days"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: 15,
										children: "Split row every 15 days"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: 25,
										children: "Split row every 25 days"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: 31,
										children: "Split row every 31 days (Calendar Month)"
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "settings-section",
							style: { marginTop: "12px" },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "section-title",
								children: "3. Layout Details"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "checkbox-options",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "checkbox-container",
										children: [
											"Include Start Date Box",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "checkbox",
												checked: config.showStartDateBox,
												onChange: (e) => handleConfigChange("showStartDateBox", e.target.checked)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "checkmark" })
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "checkbox-container",
										children: [
											"Show Weekday Letters (Su, Mo, Tu...)",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "checkbox",
												checked: config.showWeekdays,
												onChange: (e) => handleConfigChange("showWeekdays", e.target.checked)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "checkmark" })
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "checkbox-container",
										children: [
											"Show Day Numbers",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "checkbox",
												checked: config.showDayNumbers,
												onChange: (e) => handleConfigChange("showDayNumbers", e.target.checked)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "checkmark" })
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "checkbox-container",
										children: [
											"Include Notes & Reflections Area",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "checkbox",
												checked: config.showNotesSection,
												onChange: (e) => handleConfigChange("showNotesSection", e.target.checked)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "checkmark" })
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "checkbox-container",
										children: [
											"Show Legend on Bottom",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "checkbox",
												checked: config.showStatusLegend,
												onChange: (e) => handleConfigChange("showStatusLegend", e.target.checked)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "checkmark" })
										]
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "settings-section",
							style: { marginTop: "12px" },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "section-title",
								children: "4. Printable Page Options"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "form-row",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "form-group",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "page-size",
										children: "Page Size"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										id: "page-size",
										value: config.pageSize,
										onChange: (e) => handleConfigChange("pageSize", e.target.value),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "a4",
											children: "A4 Standard"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "letter",
											children: "US Letter"
										})]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "form-group",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "page-orientation",
										children: "Orientation"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										id: "page-orientation",
										value: config.pageOrientation,
										onChange: (e) => handleConfigChange("pageOrientation", e.target.value),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "portrait",
											children: "Portrait"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "landscape",
											children: "Landscape"
										})]
									})]
								})]
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "sidebar-actions",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					id: "export-pdf-btn",
					className: "btn btn-accent btn-large",
					onClick: onExportPdf,
					disabled: isExporting,
					children: isExporting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "btn-icon",
						children: "⏳"
					}), " Generating PDF..."] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LucideIcon, {
						name: "Download",
						size: 16
					}), " Export to Printable PDF"] })
				})
			}),
			activePickerId === "new" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconPicker, {
				onSelect: (icon) => setSelectedIcon(icon),
				onClose: () => setActivePickerId(null),
				triggerRef: iconTriggerRef
			}),
			activePickerId && activePickerId !== "new" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconPicker, {
				onSelect: (icon) => onEditHabitIcon(activePickerId, icon),
				onClose: () => setActivePickerId(null),
				triggerRef: { current: habitIconRefs.current[activePickerId] || null }
			})
		]
	});
}
var WEEKDAY_NAMES = [
	"Su",
	"Mo",
	"Tu",
	"We",
	"Th",
	"Fr",
	"Sa"
];
var MONTH_NAMES = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
];
var themeColorPresets = {
	"sand-navy": {
		bg: "#dfbca0",
		text: "#0f2d59"
	},
	"violet": {
		bg: "#ffffff",
		text: "#6366f1"
	},
	"emerald": {
		bg: "#ffffff",
		text: "#10b981"
	},
	"sunset": {
		bg: "#ffffff",
		text: "#f97316"
	},
	"ocean": {
		bg: "#ffffff",
		text: "#0ea5e9"
	},
	"lavender": {
		bg: "#ffffff",
		text: "#a855f7"
	},
	"monochrome": {
		bg: "#ffffff",
		text: "#27272a"
	}
};
function getGridDates(config) {
	const dates = [];
	if (config.periodMode === "month") {
		const daysInMonth = new Date(config.year, config.month + 1, 0).getDate();
		for (let d = 1; d <= daysInMonth; d++) {
			const date = new Date(config.year, config.month, d);
			dates.push({
				dateString: `${config.year}-${String(config.month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`,
				dayNumber: d,
				absoluteIndex: d,
				weekdayLabel: WEEKDAY_NAMES[date.getDay()],
				isWeekend: date.getDay() === 0 || date.getDay() === 6
			});
		}
	} else if (config.periodMode === "weeks") {
		const startDate = new Date(config.startWeekDate);
		const day = startDate.getDay();
		const diff = startDate.getDate() - day + (day === 0 ? -6 : 1);
		const startMonday = new Date(startDate.setDate(diff));
		const totalDays = config.weeksCount * 7;
		for (let d = 0; d < totalDays; d++) {
			const date = new Date(startMonday);
			date.setDate(startMonday.getDate() + d);
			const weekNumber = Math.floor(d / 7) + 1;
			dates.push({
				dateString: date.toISOString().split("T")[0],
				dayNumber: date.getDate(),
				absoluteIndex: d + 1,
				weekdayLabel: WEEKDAY_NAMES[date.getDay()],
				isWeekend: date.getDay() === 0 || date.getDay() === 6,
				weekGroup: weekNumber
			});
		}
	} else if (config.periodMode === "days") {
		const start = new Date(config.startDaysDate);
		const totalDays = parseInt(config.daysCount) || 30;
		for (let d = 0; d < totalDays; d++) {
			const date = new Date(start);
			date.setDate(start.getDate() + d);
			dates.push({
				dateString: date.toISOString().split("T")[0],
				dayNumber: date.getDate(),
				absoluteIndex: d + 1,
				weekdayLabel: WEEKDAY_NAMES[date.getDay()],
				isWeekend: date.getDay() === 0 || date.getDay() === 6
			});
		}
	} else if (config.periodMode === "range") {
		const start = new Date(config.startRangeDate);
		const end = new Date(config.endRangeDate);
		start.setHours(0, 0, 0, 0);
		end.setHours(0, 0, 0, 0);
		let totalDays = 1;
		if (end >= start) totalDays = Math.round((end.getTime() - start.getTime()) / (1e3 * 60 * 60 * 24)) + 1;
		totalDays = Math.min(150, Math.max(1, totalDays));
		for (let d = 0; d < totalDays; d++) {
			const date = new Date(start);
			date.setDate(start.getDate() + d);
			dates.push({
				dateString: date.toISOString().split("T")[0],
				dayNumber: date.getDate(),
				absoluteIndex: d + 1,
				weekdayLabel: WEEKDAY_NAMES[date.getDay()],
				isWeekend: date.getDay() === 0 || date.getDay() === 6
			});
		}
	}
	return dates;
}
function getTimeframeSubtitleText(config) {
	if (config.periodMode === "month") return `${MONTH_NAMES[config.month]} ${config.year}`;
	else if (config.periodMode === "weeks") {
		const start = new Date(config.startWeekDate);
		const end = new Date(start);
		end.setDate(start.getDate() + config.weeksCount * 7 - 1);
		const formatOptions = {
			month: "short",
			day: "numeric",
			year: "numeric"
		};
		return `${start.toLocaleDateString("en-US", formatOptions)} - ${end.toLocaleDateString("en-US", formatOptions)}`;
	} else if (config.periodMode === "days") if ((config.gridTitle || "").toLowerCase().includes("75") && parseInt(config.daysCount) === 75) return "Challenge Tracker";
	else {
		const start = new Date(config.startDaysDate);
		const end = new Date(start);
		end.setDate(start.getDate() + parseInt(config.daysCount) - 1);
		const formatOptions = {
			month: "short",
			day: "numeric",
			year: "numeric"
		};
		return `${start.toLocaleDateString("en-US", formatOptions)} - ${end.toLocaleDateString("en-US", formatOptions)}`;
	}
	else if (config.periodMode === "range") {
		const start = new Date(config.startRangeDate);
		const end = new Date(config.endRangeDate);
		const formatOptions = {
			month: "short",
			day: "numeric",
			year: "numeric"
		};
		if (end >= start) return `${start.toLocaleDateString("en-US", formatOptions)} - ${end.toLocaleDateString("en-US", formatOptions)}`;
		else return `${start.toLocaleDateString("en-US", formatOptions)}`;
	}
	return "";
}
function paginateHabits({ habits, config, dates }) {
	const isPortrait = config.pageOrientation === "portrait";
	const colsPerRow = parseInt(config.columnsPerRow);
	const segments = [];
	if (colsPerRow > 0 && dates.length > colsPerRow) for (let i = 0; i < dates.length; i += colsPerRow) segments.push(dates.slice(i, i + colsPerRow));
	else segments.push(dates);
	const maxCols = Math.max(...segments.map((s) => s.length));
	const a4Width = 1123;
	const a4Height = 794;
	const letterWidth = 1056;
	const letterHeight = 816;
	const containerWidth = config.pageSize === "a4" ? isPortrait ? a4Height : a4Width : isPortrait ? letterHeight : letterWidth;
	const availableGridWidth = containerWidth - 100 - 150;
	const idealCellSize = Math.max(14, Math.min(36, Math.floor(availableGridWidth / maxCols) - 2));
	const pages = [];
	let currentPageItems = [];
	let currentPageHeight = 0;
	const paperHeight = config.pageSize === "a4" ? isPortrait ? a4Width : a4Height : isPortrait ? letterWidth : letterHeight;
	const maxPageHeight = paperHeight - 100;
	const page1HeaderHeight = 140;
	const miniHeaderHeight = 50;
	let estimatedFooterHeight = 0;
	if (config.showNotesSection || config.showStatusLegend) {
		estimatedFooterHeight += 30;
		if (config.showNotesSection) estimatedFooterHeight += 130;
		if (config.showStatusLegend) estimatedFooterHeight += 60;
	}
	if (habits.length === 0) pages.push({
		items: [],
		isFirst: true,
		isLast: true
	});
	else {
		const segmentHeight = (config.showWeekdays || config.showDayNumbers ? config.showWeekdays && config.showDayNumbers ? 28 : 18 : 0) + idealCellSize + 12;
		habits.forEach((habit) => {
			let remainingSegments = [...segments];
			let segmentOffset = 0;
			let isContinued = false;
			while (remainingSegments.length > 0) {
				let currentLimit = maxPageHeight - estimatedFooterHeight;
				if (pages.length === 0 && currentPageItems.length === 0) currentLimit -= page1HeaderHeight;
				else currentLimit -= miniHeaderHeight;
				const requiredHeightForOneSegment = (isContinued ? 20 : 28) + segmentHeight;
				if (currentPageHeight + requiredHeightForOneSegment + 20 > currentLimit && currentPageItems.length > 0) {
					pages.push({
						items: currentPageItems,
						isFirst: pages.length === 0,
						isLast: false
					});
					currentPageItems = [];
					currentPageHeight = 0;
					currentLimit = maxPageHeight - estimatedFooterHeight - miniHeaderHeight;
				}
				const availableHeight = currentLimit - currentPageHeight - (isContinued ? 20 : 28) - 20;
				let countToFit = Math.floor(availableHeight / segmentHeight);
				countToFit = Math.max(1, countToFit);
				const sliceCount = Math.min(countToFit, remainingSegments.length);
				const segmentsForPage = remainingSegments.slice(0, sliceCount);
				const itemHeight = (isContinued ? 20 : 28) + sliceCount * segmentHeight;
				currentPageItems.push({
					habit,
					segments: segmentsForPage,
					startIndex: segmentOffset,
					isContinued
				});
				currentPageHeight += itemHeight;
				remainingSegments = remainingSegments.slice(sliceCount);
				segmentOffset += sliceCount;
				isContinued = true;
			}
		});
		if (currentPageItems.length > 0) pages.push({
			items: currentPageItems,
			isFirst: pages.length === 0,
			isLast: true
		});
	}
	if (pages.length > 0) pages[pages.length - 1].isLast = true;
	return {
		pages,
		idealCellSize,
		paperHeight,
		containerWidth
	};
}
function PreviewCanvas({ habits, config, checkedCells, onCellClick, exportPdfRef, isExporting, setIsExporting }) {
	const dates = (0, import_react.useMemo)(() => getGridDates(config), [config]);
	const { pages, idealCellSize, paperHeight, containerWidth } = (0, import_react.useMemo)(() => paginateHabits({
		habits,
		config,
		dates
	}), [
		habits,
		config,
		dates
	]);
	const viewportRef = (0, import_react.useRef)(null);
	const containerRef = (0, import_react.useRef)(null);
	const [scale, setScale] = (0, import_react.useState)(1);
	const [notesLines, setNotesLines] = (0, import_react.useState)({});
	(0, import_react.useEffect)(() => {
		function adjustScale() {
			if (!viewportRef.current) return;
			const availableWidth = viewportRef.current.clientWidth - 40;
			if (availableWidth < containerWidth) setScale(availableWidth / containerWidth);
			else setScale(1);
		}
		adjustScale();
		window.addEventListener("resize", adjustScale);
		return () => window.removeEventListener("resize", adjustScale);
	}, [
		containerWidth,
		habits,
		config
	]);
	(0, import_react.useLayoutEffect)(() => {
		const newNotesLines = {};
		pages.forEach((page, pageIdx) => {
			if (!config.showNotesSection) return;
			const pageEl = document.getElementById(`page-card-${pageIdx}`);
			if (!pageEl) return;
			const contentEl = pageEl.querySelector(".pdf-content");
			const headerEl = pageEl.querySelector(".pdf-header");
			const gridTableContainer = pageEl.querySelector(".grid-table-container");
			const footerEl = pageEl.querySelector(".pdf-footer");
			const notesBox = pageEl.querySelector(".pdf-notes-box");
			const legendBox = pageEl.querySelector(".pdf-legend-box");
			if (contentEl && gridTableContainer && footerEl && notesBox) {
				const contentHeight = contentEl.clientHeight;
				const headerHeight = headerEl ? headerEl.offsetHeight : 0;
				let headerMargin = 0;
				if (headerEl) {
					const headerStyle = window.getComputedStyle(headerEl);
					headerMargin = parseFloat(headerStyle.marginBottom) || 0;
				}
				let tablesHeight = 0;
				gridTableContainer.querySelectorAll(".habit-segmented-table-wrapper").forEach((t, idx) => {
					tablesHeight += t.offsetHeight;
					if (idx > 0) tablesHeight += 20;
				});
				let tableContainerMargin = 0;
				const tablesStyle = window.getComputedStyle(gridTableContainer);
				tableContainerMargin = parseFloat(tablesStyle.marginBottom) || 0;
				const footerHeight = footerEl.offsetHeight;
				const legendHeight = legendBox ? legendBox.offsetHeight : 0;
				const emptyNotesBoxHeight = notesBox.offsetHeight;
				const maxNotesLinesHeight = contentHeight - (headerHeight + headerMargin + tablesHeight + tableContainerMargin + footerHeight) + Math.max(0, legendHeight - emptyNotesBoxHeight);
				newNotesLines[pageIdx] = Math.max(0, Math.floor((maxNotesLinesHeight + 12) / 26));
			}
		});
		setNotesLines(newNotesLines);
	}, [
		pages,
		habits,
		config
	]);
	(0, import_react.useEffect)(() => {
		async function getActiveCSS() {
			let cssText = "";
			for (const sheet of Array.from(document.styleSheets)) try {
				if (sheet.href && !sheet.href.startsWith(window.location.origin)) continue;
				const rules = sheet.cssRules || sheet.rules;
				if (rules) for (const rule of Array.from(rules)) cssText += rule.cssText + "\n";
			} catch (e) {
				console.warn("Could not read style rules from stylesheet", sheet.href, e);
			}
			return cssText;
		}
		async function triggerPDFExport() {
			setIsExporting(true);
			try {
				const orientation = config.pageOrientation === "portrait" ? "portrait" : "landscape";
				const size = config.pageSize === "a4" ? "A4" : "letter";
				const pageSetupCss = `
          @page {
            size: ${size} ${orientation};
            margin: 0 !important;
          }
          body {
            margin: 0 !important;
            padding: 0 !important;
            background: transparent !important;
          }
        `;
				const activeCss = await getActiveCSS() + "\n" + pageSetupCss;
				const pagesContainer = containerRef.current;
				if (!pagesContainer) throw new Error("PDF pages container not found.");
				const htmlPayload = `
          <div id="pdf-pages-container" class="pdf-pages-container">
            ${pagesContainer.innerHTML}
          </div>
        `;
				const response = await fetch("/api/generate-pdf", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						html: htmlPayload,
						css: activeCss,
						pageSize: size,
						orientation,
						baseUrl: window.location.origin
					})
				});
				if (!response.ok) {
					let errorText = "Unknown error";
					try {
						const errData = await response.json();
						errorText = errData.details || errData.error || errorText;
					} catch (_) {
						errorText = await response.text();
					}
					throw new Error(`Failed to generate PDF: ${errorText}`);
				}
				const blob = await response.blob();
				const url = window.URL.createObjectURL(blob);
				const filename = `${(config.gridTitle || "habit-grid").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "habit-tracker"}.pdf`;
				const a = document.createElement("a");
				a.href = url;
				a.download = filename;
				document.body.appendChild(a);
				a.click();
				setTimeout(() => {
					document.body.removeChild(a);
					window.URL.revokeObjectURL(url);
				}, 100);
			} catch (err) {
				console.error("PDF Export Error:", err);
				alert("Error generating PDF: " + err.message);
			} finally {
				setIsExporting(false);
			}
		}
		exportPdfRef.current = triggerPDFExport;
	}, [
		config,
		exportPdfRef,
		setIsExporting
	]);
	config.pageOrientation;
	const presetColors = themeColorPresets[config.themePreset] || themeColorPresets["monochrome"];
	const pageBg = config.themePreset === "custom" ? config.pdfBgColor : presetColors.bg;
	const pageText = config.themePreset === "custom" ? config.pdfTextColor : presetColors.text;
	const themeAccent = config.themePreset === "custom" ? config.pdfTextColor : presetColors.text;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "preview-area",
		ref: viewportRef,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "preview-viewport-wrapper",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: containerRef,
				id: "pdf-pages-container",
				className: "pdf-pages-container",
				children: pages.map((page, pageIdx) => {
					const pageNum = pageIdx + 1;
					const containerStyle = {
						"--pdf-page-bg": pageBg,
						"--pdf-page-text": pageText,
						"--accent": themeAccent,
						transform: scale < 1 ? `scale(${scale})` : "scale(1)",
						marginBottom: scale < 1 ? `${paperHeight * (scale - 1)}px` : "0px"
					};
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						id: `page-card-${pageIdx}`,
						className: `pdf-page-container format-${config.pageSize} layout-${config.pageOrientation} font-style-${config.titleFont}`,
						style: containerStyle,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pdf-content",
							children: [
								page.isFirst ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pdf-header",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "header-main",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
											className: "pdf-title",
											children: config.gridTitle || "Personal Habit Tracker"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "pdf-subtitle",
											children: getTimeframeSubtitleText(config)
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "header-right-side",
										children: config.showStartDateBox && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "header-start-date-box",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "start-date-label",
												children: [
													"start",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
													"date"
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "start-date-rectangle",
												style: { borderColor: "var(--pdf-page-text)" }
											})]
										})
									})]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pdf-header mini-header",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "header-main",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "pdf-title-mini",
											children: config.gridTitle || "Personal Habit Tracker"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "header-right-side",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "page-num-badge",
											children: [
												"Page ",
												pageNum,
												" of ",
												pages.length
											]
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid-table-container",
									children: page.items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: {
											textAlign: "center",
											padding: "40px",
											opacity: .5,
											fontStyle: "italic"
										},
										children: "No habits or questions added yet. Create one in the sidebar!"
									}) : page.items.map((item, itemIdx) => {
										const totalRowsInGroup = item.segments.length * 2;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "habit-segmented-table-wrapper",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
												className: "grid-table",
												style: {
													color: "var(--pdf-page-text)",
													borderColor: "var(--pdf-page-text)"
												},
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: item.segments.map((segmentDates, segIndex) => {
													return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
														className: "header-row",
														children: [segIndex === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
															className: "habit-label-cell",
															rowSpan: totalRowsInGroup,
															style: {
																width: "150px",
																maxWidth: "150px"
															},
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "habit-label-content",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "habit-label-emoji",
																	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LucideIcon, {
																		name: item.habit.icon,
																		size: 14,
																		className: "habit-icon-svg"
																	})
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																	className: "habit-label-text",
																	title: item.habit.name,
																	children: [item.habit.name, item.isContinued && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																		className: "cont-label",
																		children: " (cont.)"
																	})]
																})]
															})
														}), segmentDates.map((d, dIdx) => {
															const dayDisplay = config.periodMode === "days" ? d.absoluteIndex : d.dayNumber;
															return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
																className: d.isWeekend ? "weekday-header weekend" : "weekday-header",
																style: {
																	width: `${idealCellSize}px`,
																	maxWidth: `${idealCellSize}px`
																},
																children: config.showDayNumbers && config.showWeekdays ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																	style: {
																		fontSize: "7px",
																		fontWeight: 500,
																		opacity: .8,
																		textTransform: "uppercase"
																	},
																	children: d.weekdayLabel
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																	style: {
																		fontSize: "10px",
																		fontWeight: 700,
																		marginTop: "1px"
																	},
																	children: dayDisplay
																})] }) : config.showDayNumbers ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																	style: {
																		fontSize: "10px",
																		fontWeight: 700
																	},
																	children: dayDisplay
																}) : config.showWeekdays ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																	style: {
																		fontSize: "8px",
																		fontWeight: 600,
																		opacity: .8,
																		textTransform: "uppercase"
																	},
																	children: d.weekdayLabel
																}) : null
															}, dIdx);
														})]
													}, `h-${segIndex}`), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
														className: "checkboxes-row",
														style: { height: `${idealCellSize + 6}px` },
														children: segmentDates.map((d, dIdx) => {
															const cellKey = `${item.habit.id}-${d.dateString}`;
															const isChecked = checkedCells.get(cellKey) === true;
															return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
																className: "grid-cell-td",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																	className: `grid-cell-box ${`cell-shape-${config.cellShape}`} ${isChecked ? "checked" : ""}`,
																	style: {
																		width: `${idealCellSize}px`,
																		height: `${idealCellSize}px`,
																		maxWidth: `${idealCellSize}px`,
																		maxHeight: `${idealCellSize}px`,
																		borderColor: "var(--pdf-page-text)",
																		"--habit-color": isChecked ? themeAccent : void 0
																	},
																	onClick: () => onCellClick(item.habit.id, d.dateString)
																})
															}, dIdx);
														})
													}, `b-${segIndex}`)] });
												}) })
											})
										}, itemIdx);
									})
								}),
								(config.showNotesSection || config.showStatusLegend) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pdf-footer",
									style: { borderTopColor: "var(--pdf-page-text)" },
									children: [config.showNotesSection && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "pdf-notes-box",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Notes & Reflections" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "notes-lines",
											children: Array.from({ length: notesLines[pageIdx] || 0 }).map((_, lineIdx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "note-line",
												style: { borderBottomColor: "var(--pdf-page-text)" }
											}, lineIdx))
										})]
									}), config.showStatusLegend && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "pdf-legend-box",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Legend" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "legend-items",
											children: habits.map((habit) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "legend-item",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "legend-color",
													style: {
														backgroundColor: themeAccent,
														borderColor: "var(--pdf-page-text)"
													}
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													style: {
														display: "inline-flex",
														alignItems: "center",
														gap: "4px"
													},
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LucideIcon, {
														name: habit.icon,
														size: 12,
														className: "habit-icon-svg"
													}), habit.name]
												})]
											}, habit.id))
										})]
									})]
								})
							]
						})
					}, pageIdx);
				})
			})
		})
	});
}
var STATE_LOCAL_STORAGE_KEY = "habit_tracker_designer_state_v8";
function HabitDesigner({ templateSlug }) {
	const today = /* @__PURE__ */ new Date();
	const nextMonthDate = new Date(today.getFullYear(), today.getMonth() + 1, 1);
	const nextMonthYear = nextMonthDate.getFullYear();
	const nextMonthMonthVal = nextMonthDate.getMonth();
	const formatDateStr = (date) => {
		return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
	};
	const defaultStartDate = formatDateStr(nextMonthDate);
	const defaultConfig = {
		periodMode: "days",
		month: nextMonthMonthVal,
		year: nextMonthYear,
		startWeekDate: defaultStartDate,
		weeksCount: 4,
		startDaysDate: defaultStartDate,
		daysCount: 75,
		startRangeDate: defaultStartDate,
		endRangeDate: formatDateStr(new Date(nextMonthDate.getFullYear(), nextMonthDate.getMonth() + 1, nextMonthDate.getDate())),
		gridTitle: "Personal Habit Tracker",
		titleFont: "outfit",
		cellShape: "rounded",
		columnsPerRow: 25,
		themePreset: "monochrome",
		pdfBgColor: "#dfbca0",
		pdfTextColor: "#0f2d59",
		showStartDateBox: true,
		showWeekdays: true,
		showDayNumbers: true,
		showNotesSection: true,
		showStatusLegend: false,
		pageSize: "a4",
		pageOrientation: "portrait"
	};
	const [habits, setHabits] = (0, import_react.useState)([
		{
			id: "1",
			name: "Diet Check",
			icon: "Apple"
		},
		{
			id: "2",
			name: "Water (1 Gal)",
			icon: "Droplet"
		},
		{
			id: "3",
			name: "Read 10 Pgs",
			icon: "BookOpen"
		}
	]);
	const [config, setConfig] = (0, import_react.useState)(defaultConfig);
	const [checkedCells, setCheckedCells] = (0, import_react.useState)(/* @__PURE__ */ new Map());
	const [isExporting, setIsExporting] = (0, import_react.useState)(false);
	const exportPdfRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (templateSlug && templates[templateSlug]) {
			const template = templates[templateSlug];
			setHabits(template.habits.map((h, index) => ({
				id: String(Date.now() + index),
				name: h.name,
				icon: h.icon
			})));
			setConfig((prev) => ({
				...prev,
				gridTitle: template.heading,
				themePreset: template.themePreset,
				periodMode: template.periodMode,
				daysCount: template.daysCount || prev.daysCount,
				weeksCount: template.weeksCount || prev.weeksCount
			}));
			setCheckedCells(/* @__PURE__ */ new Map());
		} else {
			const saved = localStorage.getItem(STATE_LOCAL_STORAGE_KEY);
			if (saved) try {
				const parsed = JSON.parse(saved);
				if (parsed.habits && Array.isArray(parsed.habits)) setHabits(parsed.habits);
				if (parsed.config) setConfig((prev) => ({
					...prev,
					...parsed.config
				}));
			} catch (e) {
				console.error("Failed parsing saved state", e);
			}
		}
	}, [templateSlug]);
	(0, import_react.useEffect)(() => {
		if (!templateSlug) localStorage.setItem(STATE_LOCAL_STORAGE_KEY, JSON.stringify({
			habits,
			config
		}));
	}, [
		habits,
		config,
		templateSlug
	]);
	const handleCellClick = (habitId, dateString) => {
		const key = `${habitId}-${dateString}`;
		setCheckedCells((prev) => {
			const next = new Map(prev);
			if (next.get(key) === true) next.delete(key);
			else next.set(key, true);
			return next;
		});
	};
	const handleAddHabit = (name, icon) => {
		const newHabit = {
			id: String(Date.now()),
			name,
			icon
		};
		setHabits((prev) => [...prev, newHabit]);
	};
	const handleDeleteHabit = (id) => {
		setHabits((prev) => prev.filter((h) => h.id !== id));
		setCheckedCells((prev) => {
			const next = new Map(prev);
			for (const key of next.keys()) if (key.startsWith(`${id}-`)) next.delete(key);
			return next;
		});
	};
	const handleReorder = (newHabits) => {
		setHabits(newHabits);
	};
	const handleEditHabitName = (id, newName) => {
		setHabits((prev) => prev.map((h) => h.id === id ? {
			...h,
			name: newName
		} : h));
	};
	const handleEditHabitIcon = (id, newIcon) => {
		setHabits((prev) => prev.map((h) => h.id === id ? {
			...h,
			icon: newIcon
		} : h));
	};
	const totalCells = habits.length * getGridDates(config).length;
	const checkedCount = checkedCells.size;
	const percentage = totalCells > 0 ? Math.round(checkedCount / totalCells * 100) : 0;
	const handleExport = () => {
		if (exportPdfRef.current) exportPdfRef.current();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "app-container",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sidebar, {
			habits,
			config,
			onChangeConfig: setConfig,
			onAddHabit: handleAddHabit,
			onDeleteHabit: handleDeleteHabit,
			onReorder: handleReorder,
			onEditHabitName: handleEditHabitName,
			onEditHabitIcon: handleEditHabitIcon,
			onExportPdf: handleExport,
			isExporting
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				flex: 1,
				display: "flex",
				flexDirection: "column",
				height: "100%"
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "preview-header",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "preview-header-info",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Live Preview Studio" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Completion progress: ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [percentage, "%"] })] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						display: "flex",
						gap: "12px",
						alignItems: "center"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "/templates",
						style: {
							textDecoration: "none",
							display: "inline-flex",
							alignItems: "center",
							gap: "8px",
							padding: "8px 14px",
							fontSize: "12px",
							fontWeight: 500,
							color: "var(--text-primary)",
							background: "var(--card-bg)",
							border: "1px solid var(--sidebar-border)",
							borderRadius: "8px",
							transition: "all 0.2s"
						},
						onMouseEnter: (e) => {
							e.currentTarget.style.borderColor = "var(--accent)";
						},
						onMouseLeave: (e) => {
							e.currentTarget.style.borderColor = "var(--sidebar-border)";
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LucideIcon, {
							name: "Grid",
							size: 14,
							style: { color: "var(--accent)" }
						}), "Browse SEO Templates"]
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewCanvas, {
				habits,
				config,
				checkedCells,
				onCellClick: handleCellClick,
				exportPdfRef,
				isExporting,
				setIsExporting
			})]
		})]
	});
}
function Home() {
	const { template } = Route.useSearch();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HabitDesigner, { templateSlug: template });
}
//#endregion
export { Home as component };
