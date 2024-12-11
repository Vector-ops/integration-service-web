import CreateIntegration from "@/components/CreateIntegration";
import React from "react";

const Page = () => {
	return (
		<div className="w-full flex flex-col gap-4 m-4">
			<h1 className="text-3xl font-bold">Create Integration</h1>
			<p>Enter integration name to get credential inputs</p>
			<CreateIntegration integrationType="whatsapp" />
		</div>
	);
};

export default Page;
