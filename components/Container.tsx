import { cn } from "@/lib/utils";
import React from "react";

interface Props {
	className?: string;
	children: React.ReactNode;
}

const Container: React.FC<Props> = ({ className, children }) => {
	return (
		<div className={cn("mx-auto max-w-screen px-4", className)}>
			{children}
		</div>
	);
};

export default Container;
