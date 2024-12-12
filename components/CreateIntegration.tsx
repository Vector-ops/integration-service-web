"use client";

import { ICredentials } from "@/app/types";
import React, { useState } from "react";
import { Button } from "./ui/button";

const CreateIntegration = ({
	integrationType,
}: {
	integrationType: string;
}) => {
	const [brandId, setBrandId] = useState<number>();
	const [isEnabled, setIsEnabled] = useState(true);
	const [credentials, setCredentials] = useState<ICredentials>();
	const [integrationName, setIntegrationName] = useState<string>();

	const handleSubmit = async () => {
		const response = await fetch(
			new URL(`${process.env.NEXT_PUBLIC_API_URL!}/integration`),
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					integrationType,
					integrationName,
					brandId,
					isEnabled,
					credentials,
				}),
			}
		);

		if (!response.ok) {
			// Handle error
			console.error("Failed to submit integration");
			return;
		}

		const data = await response.json();
		console.log("Integration submitted successfully:", data);
	};

	return (
		<div className="flex w-[50%] flex-col justify-center items-center gap-5 p-5 border border-gray-500 rounded-lg 	">
			<div className="flex justify-center items-center gap-2.5">
				<label htmlFor="integrationName">Integration Name:</label>
				<input
					id="integrationName"
					type="string"
					value={integrationName || ""}
					onChange={(e) =>
						setIntegrationName(e.target.value.toLowerCase())
					}
					className="p-2 border border-gray-500 rounded w-[400px]"
				/>
			</div>
			<div>
				<label htmlFor="brandId">Brand ID:</label>
				<input
					id="brandId"
					type="number"
					value={brandId || ""}
					onChange={(e) => setBrandId(parseInt(e.target.value))}
					className="p-2 border border-gray-500 rounded w-[400px]"
				/>
			</div>
			{integrationName === "bitespeed" && (
				<div className="flex justify-center items-start gap-2.5">
					<label htmlFor="channelId">Channel ID:</label>
					<input
						id="channelId"
						type="text"
						value={credentials?.channelId || ""}
						onChange={(e) =>
							setCredentials({ channelId: e.target.value })
						}
						className="p-2 border border-gray-500 rounded w-[400px]"
					/>
				</div>
			)}
			{integrationName === "kwikchat" && (
				<div className="flex justify-center items-center gap-2.5">
					<label htmlFor="apikey">API Key:</label>
					<input
						id="apikey"
						type="text"
						value={credentials?.apikey || ""}
						onChange={(e) =>
							setCredentials({ apikey: e.target.value })
						}
						className="p-2 border border-gray-500 rounded w-[400px]"
					/>
				</div>
			)}
			{integrationName === "bik" && (
				<div className="flex flex-col justify-center items-center gap-2.5">
					<div className="flex justify-center items-center gap-2.5">
						<label htmlFor="apikey">API Key:</label>
						<input
							id="apikey"
							type="text"
							value={credentials?.apikey || ""}
							onChange={(e) =>
								setCredentials({
									...credentials,
									apikey: e.target.value,
								})
							}
							className="p-2 border border-gray-500 rounded w-[400px]"
						/>
					</div>
					<div className="flex  justify-center items-center gap-2.5">
						<label htmlFor="secret">Secret:</label>
						<input
							id="secret"
							type="text"
							value={credentials?.secret || ""}
							onChange={(e) =>
								setCredentials({
									...credentials,
									secret: e.target.value,
								})
							}
							className="p-2 border border-gray-500 rounded w-[400px]"
						/>
					</div>
				</div>
			)}
			<div className="flex justify-start items-start gap-2.5">
				<label htmlFor="isEnabled">Enabled:</label>
				<input
					id="isEnabled"
					type="checkbox"
					checked={isEnabled}
					onChange={(e) => setIsEnabled(e.target.checked)}
					className="w-5 h-5"
				/>
			</div>
			<Button onClick={handleSubmit} className="w-[400px]">
				Submit
			</Button>
		</div>
	);
};

export default CreateIntegration;
