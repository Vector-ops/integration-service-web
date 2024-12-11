import { IIntegration, IWhatsappIntegration } from "./app/types";

export type Site = {
	TITLE: string;
	DESCRIPTION: string;
	EMAIL: string;
	NUM_POSTS_ON_HOMEPAGE: number;
	POSTS_PER_PAGE: number;
	SITEURL: string;
};

export type Link = {
	href: string;
	label: string;
};

export const SITE: Site = {
	TITLE: "Project Eclipse",
	DESCRIPTION:
		"Project Eclipse is a action thriller story about three powers that are fighting to dominate each other.",
	EMAIL: "sumith2827@gmail.com",
	NUM_POSTS_ON_HOMEPAGE: 3,
	POSTS_PER_PAGE: 5,
	SITEURL: "",
};

export const NAV_LINKS: Link[] = [
	{ href: "/", label: "Integrations" },
	{ href: "/events", label: "Events" },
	{ href: "/templates", label: "Templates" },
	{ href: "/message", label: "Send Message" },
];

export const SOCIAL_LINKS: Link[] = [
	{ href: "https://github.com/vector-ops", label: "GitHub" },
	{ href: "https://twitter.com/SumithBH1", label: "Twitter" },
	{ href: "sumith2827@gmail.com", label: "Email" },
];

export const INTEGRATIONS: IIntegration[] = [
	{ name: "Whatsapp", href: "/whatsapp" },
	{ name: "Email", href: "/email" },
];

export const WHATSAPP_INTEGRATIONS: IWhatsappIntegration[] = [
	{ name: "Bitespeed", href: "/whatsapp/bitespeed" },
	{ name: "BIK", href: "/whatsapp/bik" },
	{ name: "Kwikchat", href: "/whatsapp/kwikchat" },
	{ name: "Interakt", href: "/whatsapp/interakt" },
];

export const EVENTS: string[] = ["signup", "orderplacement"];
