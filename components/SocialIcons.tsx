"use client";

import { buttonVariants } from "@/components/ui/button";
import type { Link as SocialLink } from "@/consts";
import { cn } from "@/lib/utils";
import { GithubLogo, LinkedinLogo, TwitterLogo } from "@phosphor-icons/react";
import { Globe, Mail, MessageCircleQuestion, Rss } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

interface SocialIconsProps {
	links: SocialLink[];
	className?: string;
}

const iconMap: { [key: string]: ReactNode } = {
	Website: <Globe />,
	GitHub: <GithubLogo />,
	LinkedIn: <LinkedinLogo />,
	Twitter: <TwitterLogo />,
	Email: <Mail />,
	RSS: <Rss />,
};

const getSocialLink = ({ href, label }: SocialLink) => ({
	href: label === "Email" ? `mailto:${href}` : href,
	ariaLabel: label,
	iconName: iconMap[label as keyof typeof iconMap] || (
		<MessageCircleQuestion />
	),
});

const SocialIcons = ({ links, className }: SocialIconsProps) => {
	return (
		<ul
			className={cn("not-prose flex flex-wrap gap-2", className)}
			role="list"
		>
			{links.map((link, index) => {
				const { href, ariaLabel, iconName } = getSocialLink(link);
				return (
					<li key={index}>
						<Link
							href={href}
							aria-label={ariaLabel}
							title={ariaLabel}
							className={buttonVariants({
								variant: "outline",
								size: "icon",
							})}
						>
							{iconName}
						</Link>
					</li>
				);
			})}
		</ul>
	);
};

export default SocialIcons;
