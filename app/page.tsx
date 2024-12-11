"use client";

import IntegrationCard from "@/components/IntegrationCard";
import { INTEGRATIONS } from "@/consts";

export default function Home() {
	return (
		<div className="flex gap-6 w-full px-4">
			{INTEGRATIONS.map((integration, i) => (
				<IntegrationCard integration={integration} key={i} />
			))}
		</div>
	);
}
