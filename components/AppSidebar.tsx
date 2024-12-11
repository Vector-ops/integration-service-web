"use client";

import { NAV_LINKS } from "@/consts";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const AppSidebar = () => {
	const pathname = usePathname();
	return (
		<div className="w-[20%] flex flex-col justify-start items-center backdrop-blur-sm shadow-md bg-white p-4">
			{NAV_LINKS.map((item, i) => (
				<div
					key={i}
					className={`w-full rounded-md p-4 text-center cursor-pointer transition-all duration-300 ${
						pathname === item.href
							? "bg-green-600 text-white"
							: "hover:bg-green-100"
					}`}
				>
					<Link href={item.href}>{item.label}</Link>
				</div>
			))}
		</div>
	);
};

export default AppSidebar;
