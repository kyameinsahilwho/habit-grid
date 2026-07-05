//#region node_modules/.nitro/vite/services/ssr/assets/seo-C2Q5yaq3.js
var BASE_URL = "https://habitgrid.codingmarvel.com";
function buildHead({ title, description, path = "", keywords = [] }) {
	const canonicalUrl = `${BASE_URL}${path}`;
	return {
		meta: [
			{ title },
			{
				name: "description",
				content: description
			},
			{
				name: "keywords",
				content: keywords.join(", ")
			},
			{
				property: "og:title",
				content: title
			},
			{
				property: "og:description",
				content: description
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:url",
				content: canonicalUrl
			},
			{
				property: "og:site_name",
				content: "HabitGrid"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:title",
				content: title
			},
			{
				name: "twitter:description",
				content: description
			}
		],
		links: [{
			rel: "canonical",
			href: canonicalUrl
		}]
	};
}
//#endregion
export { buildHead as t };
