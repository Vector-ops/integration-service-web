"use client";
import { SOCIAL_LINKS } from "@/consts";
import Container from "./Container";
import SocialIcons from "./SocialIcons";

const Footer = () => {
	const date = new Date();
	return (
		<footer className="py-4 w-full">
			<Container>
				<div className="flex flex-col items-center justify-center gap-y-2 md:flex-row md:justify-between lg:flex-row lg:justify-between w-full">
					<div className="flex justify-between">
						<p className="text-center text-sm text-muted-foreground">
							&copy; {new Date().getFullYear()} All rights
							reserved.
						</p>
					</div>
					<SocialIcons links={SOCIAL_LINKS} />
				</div>
			</Container>
		</footer>
	);
};

export default Footer;
