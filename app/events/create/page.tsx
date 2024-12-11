import CreateEvent from "@/components/CreateEvent";
import CreateIntegration from "@/components/CreateIntegration";
import React from "react";

const Page = () => {
	return (
		<div className="w-full flex flex-col gap-4 m-4">
			<h1 className="text-3xl font-bold">Create Event</h1>
			<CreateEvent />
		</div>
	);
};

export default Page;
