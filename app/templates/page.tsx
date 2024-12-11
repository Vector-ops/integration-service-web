"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { IProviderTemplate } from "../types";

const page = () => {
	const [brandId, setBrandId] = React.useState<number>();
	const [templateData, setTemplateData] = React.useState<IProviderTemplate[]>(
		[]
	);
	React.useEffect(() => {
		const fetchIntegrationData = async () => {
			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_APP_URL}/api/v1/templates/whatsapp?brandId=${brandId}`
				);
				const data: IProviderTemplate[] = await response.json();
				setTemplateData(data);
			} catch (error) {
				console.error("Error fetching integration data:", error);
			}
		};

		fetchIntegrationData();
	}, [brandId]);

	const toggleTemplate = async (templateId: number, isEnabled: boolean) => {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_APP_URL}/api/v1/templates/whatsapp/${templateId}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ isEnabled: !isEnabled }),
				}
			);

			if (!response.ok) {
				throw new Error("Failed to update integration");
			}

			const updatedTemplate = await response.json();
			setTemplateData((prevData) =>
				prevData.map((template) =>
					template.id === templateId
						? {
								...template,
								isEnabled: updatedTemplate.isEnabled,
						  }
						: template
				)
			);
		} catch (error) {
			console.error("Error updating integration:", error);
		}
	};
	return (
		<div className="w-full flex flex-col gap-4 m-4">
			<div className="flex justify-between items-center">
				<h1 className="text-3xl font-bold">Whatsapp Templates</h1>
				<Button
					type="button"
					onClick={() => {
						window.location.href = "/templates/create";
					}}
				>
					Create Template
				</Button>
			</div>
			<div className="flex justify-start items-center gap-4 w-[30%]">
				<label className="block text-sm font-bold">Brand Id:</label>
				<input
					type="number"
					value={brandId || ""}
					onChange={(e) => setBrandId(Number(e.target.value))}
					className="m-1 block w-full shadow-sm sm:text-sm border border-gray-800 rounded-md h-8 px-2"
				/>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{templateData.length > 0 &&
					templateData.map((template) => (
						<div
							key={template.providerTemplateId}
							className="p-4 border rounded-lg shadow-md"
						>
							<h2 className="text-xl font-semibold mb-2">
								Template ID: {template.providerTemplateId}
							</h2>
							<p className="mb-2">Brand ID: {template.brandId}</p>
							<div className="mb-2">
								<p className="font-bold">Custom Data:</p>
								<ul className="list-disc list-inside">
									{Object.entries(template.customData).map(
										([key, value]) => (
											<li key={key}>
												<strong>{key}:</strong> {value}
											</li>
										)
									)}
								</ul>
							</div>
							<div className="flex items-center justify-between">
								<span
									className={`text-sm font-medium ${
										template.isEnabled
											? "text-green-600"
											: "text-red-600"
									}`}
								>
									{template.isEnabled
										? "Enabled"
										: "Disabled"}
								</span>
								<Button
									type="button"
									onClick={() =>
										toggleTemplate(
											template.id,
											template.isEnabled
										)
									}
									className="ml-4"
								>
									Toggle
								</Button>
							</div>
						</div>
					))}
			</div>
		</div>
	);
};

export default page;
