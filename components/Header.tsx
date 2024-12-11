"use client";

import { NAV_LINKS } from "@/consts";
import Image from "next/image";
import Link from "next/link";
import logo from "../public/static/logo.svg";
import Container from "./Container";
import { ThemeToggle } from "./ThemeToggle";
import MobileMenu from "./ui/mobile-menu";

const Header = () => {
	return (
		<header className="sticky top-0 z-10 bg-background/50 backdrop-blur-md w-full">
			<Container>
				<div className="flex flex-wrap items-center justify-between gap-4 py-4">
					<Link
						href="/"
						className="flex flex-shrink-0 items-center gap-2 text-xl font-semibold transition-colors duration-300 hover:text-primary"
					>
						<Image src={logo} alt="Logo" className="size-8" />
						Integration Service
					</Link>
					<div className="flex items-center gap-2 md:gap-4">
						{/* <nav className="hidden items-center gap-4 text-sm sm:gap-6 md:flex">
							{NAV_LINKS.map((item, i) => (
								<Link
									key={i}
									href={item.href}
									className="capitalize text-foreground/60 transition-colors hover:text-foreground/80"
								>
									{item.label}
								</Link>
							))}
						</nav> */}
						<MobileMenu />
						<ThemeToggle />
					</div>
				</div>
			</Container>
		</header>
	);
};

export default Header;
