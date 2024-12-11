"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { IEventData, IIntegrationData } from "../../types";

const page = () => {
	const [brandId, setBrandId] = React.useState<number>();
	const [templateId, setTemplateId] = React.useState<number>();
	const [variableMapping, setVariableMapping] = React.useState<any>();
	const [integrationName, setIntegrationName] = React.useState<string>();
	const [eventId, setEventId] = React.useState<number>();
	const [events, setEvents] = React.useState<IEventData[]>([]);
	const [integrationData, setIntegrationData] =
		React.useState<IIntegrationData[]>();

	React.useEffect(() => {
		const fetchEvents = async () => {
			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_APP_URL}/api/v1/events`
				);
				const data: IEventData[] = await response.json();
				setEvents(data);
			} catch (error) {
				console.error("Error fetching events:", error);
			}
		};

		fetchEvents();
	}, []);

	React.useEffect(() => {
		if (brandId) {
			const fetchIntegrationData = async () => {
				try {
					const response = await fetch(
						`${process.env.NEXT_PUBLIC_APP_URL}/api/v1/integrations?brandId=${brandId}`
					);
					const data: IIntegrationData[] = await response.json();
					setIntegrationData(data);
				} catch (error) {
					console.error("Error fetching integration data:", error);
				}
			};

			fetchIntegrationData();
		}
	}, [brandId]);

	const handleSubmit = async () => {
		try {
			const integration = integrationData?.find(
				(integration) => integration.integrationName === integrationName
			);

			if (!integration) {
				throw new Error("Integration not found");
			}

			const response = await fetch(
				`${process.env.NEXT_PUBLIC_APP_URL}/api/v1/templates/whatsapp`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						templateId,
						eventId,
						integrationId: integration.id,
						brandId,
						customData: variableMapping,
						isEnabled: true,
					}),
				}
			);

			if (!response.ok) {
				throw new Error("Failed to save template");
			}

			const data = await response.json();
			console.log("Template saved successfully:", data);
		} catch (error) {
			console.error("Error saving template:", error);
		}
	};

	return (
		<div className="w-full flex flex-col gap-4 m-5">
			<div className="flex justify-between items-center">
				<h1 className="text-3xl font-bold">Create Template</h1>
				<Button type="button" variant="default" onClick={handleSubmit}>
					Save
				</Button>
			</div>
			<div className="flex flex-col w-[50%] border border-gray-500 p-6 rounded-md">
				<p className="mb-2">
					Enter brandId to get integrations associated with the brand
				</p>
				<div className="mb-4 flex">
					<label
						className="block  text-sm font-bold mb-2"
						htmlFor="brandId"
					>
						Brand ID
					</label>
					<input
						id="brandId"
						type="number"
						value={brandId || ""}
						onChange={(e) => setBrandId(Number(e.target.value))}
						className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
					/>
				</div>
				<div className="mb-4">
					<label
						className="block  text-sm font-bold mb-2"
						htmlFor="templateId"
					>
						Template ID
					</label>
					<input
						id="templateId"
						type="number"
						value={templateId || ""}
						onChange={(e) => setTemplateId(Number(e.target.value))}
						className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
					/>
				</div>
				<div className="mb-4">
					<label
						className="block  text-sm font-bold mb-2"
						htmlFor="integrationName"
					>
						Integration Name
					</label>
					<select
						id="integrationName"
						value={integrationName || ""}
						onChange={(e) => setIntegrationName(e.target.value)}
						className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
					>
						<option value="">Select an integration</option>
						{integrationData?.map((integration) => (
							<option
								key={integration.id}
								value={integration.integrationName}
							>
								{integration.integrationName}
							</option>
						))}
					</select>
				</div>
				<div className="mb-4">
					<label
						className="block  text-sm font-bold mb-2"
						htmlFor="eventId"
					>
						Event
					</label>
					<select
						id="eventId"
						value={eventId || ""}
						onChange={(e) => setEventId(parseInt(e.target.value))}
						className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
					>
						<option value="">Select an event</option>
						{events.map((event) => (
							<option key={event.id} value={event.id}>
								{event.eventType}
							</option>
						))}
					</select>
				</div>
				{eventId && (
					<div className="mb-4">
						<label
							className="block  text-sm font-bold mb-2"
							htmlFor="variableMapping"
						>
							Variable Mapping
						</label>
						{events.find((event) => event.id === eventId)
							?.variables &&
							Object.keys(
								events.find((event) => event.id === eventId)
									?.variables!
							).map((variable: string) => (
								<div key={variable} className="mb-2">
									<label
										className="block  text-sm font-bold mb-2"
										htmlFor={variable}
									>
										{variable}
									</label>
									<input
										id={variable}
										type="text"
										value={
											variableMapping?.[variable] || ""
										}
										onChange={(e) =>
											setVariableMapping((prev: any) => ({
												...prev,
												[variable]: e.target.value,
											}))
										}
										className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
									/>
								</div>
							))}
					</div>
				)}
			</div>
		</div>
	);
};

export default page;
