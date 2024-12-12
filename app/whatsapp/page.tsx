"use client";
import { ICredentials, IIntegrationData } from "@/app/types";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import React from "react";

const page = () => {
	const [integrationData, setIntegrationData] = React.useState<
		IIntegrationData[]
	>([]);
	const [credsUpdated, setCredsUpdated] = React.useState<boolean>(false);
	const [integrationId, setIntegrationId] = React.useState<number>();
	const [brandId, setBrandId] = React.useState<number>();

	React.useEffect(() => {
		const fetchIntegrationData = async () => {
			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_APP_URL}/integrations?brandId=${brandId}`
				);
				const data: IIntegrationData[] = await response.json();
				setIntegrationData(data);
			} catch (error) {
				console.error("Error fetching integration data:", error);
			}
		};

		fetchIntegrationData();
	}, [brandId]);

	const toggleIntegration = async (
		integrationId: number,
		isEnabled: boolean
	) => {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_APP_URL}/integrations/${integrationId}`,
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

			const updatedIntegration = await response.json();
			setIntegrationData((prevData) =>
				prevData.map((integration) =>
					integration.id === integrationId
						? {
								...integration,
								isEnabled: updatedIntegration.isEnabled,
						  }
						: integration
				)
			);
		} catch (error) {
			console.error("Error updating integration:", error);
		}
	};

	const updateCredentials = async (
		integrationId: number,
		newCredentials: ICredentials
	) => {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_APP_URL}/integrations/${integrationId}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(newCredentials),
				}
			);

			if (!response.ok) {
				throw new Error("Failed to update credentials");
			}

			const updatedIntegration = await response.json();
			setIntegrationData((prevData) =>
				prevData.map((integration) =>
					integration.id === integrationId
						? {
								...integration,
								credentials: updatedIntegration.credentials,
						  }
						: integration
				)
			);
			setCredsUpdated(false);
		} catch (error) {
			console.error("Error updating credentials:", error);
		}
	};

	return (
		<div className="w-full flex flex-col gap-4 m-4">
			<div className="flex justify-between items-center">
				<h1 className="text-3xl font-bold">Whatsapp Integrations</h1>
				<Button
					type="button"
					onClick={() => {
						window.location.href = "/whatsapp/create";
					}}
				>
					Create Integration
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
			<div className="flex justify-start items-center gap-4 flex-wrap">
				{integrationData.length > 0 &&
					integrationData.map((integration) => (
						<Card key={integration.id} className="w-[400px]">
							<CardHeader>
								<h2>
									Integration: {integration.integrationName}
								</h2>
								<p>Brand Id: {integration.brandId}</p>
								<p>
									Enabled:{" "}
									{integration.isEnabled ? "Yes" : "No"}
								</p>
								<div>
									{Object.keys(integration.credentials).map(
										(key, index) => (
											<div
												key={index}
												className="mb-2 flex justify-center items-center"
											>
												<label className="block text-sm font-bold">
													{key}:
												</label>
												<input
													type="text"
													value={
														integration.credentials[
															key as keyof ICredentials
														]
													}
													onChange={(e) => {
														const updatedCredentials =
															{
																...integration.credentials,
																[key]: e.target
																	.value,
															};
														setIntegrationData(
															(prevData) =>
																prevData.map(
																	(intg) =>
																		intg.id ===
																		integration.id
																			? {
																					...intg,
																					credentials:
																						updatedCredentials,
																			  }
																			: intg
																)
														);
														setCredsUpdated(true);
														setIntegrationId(
															integration.id
														);
													}}
													className="m-1 block w-full shadow-sm sm:text-sm border border-gray-800 rounded-md h-8 px-2"
												/>
											</div>
										)
									)}
								</div>
								<div className="flex justify-center items-center gap-2 w-full">
									<Button
										type="button"
										onClick={() =>
											toggleIntegration(
												integration.id,
												integration.isEnabled
											)
										}
									>
										{integration.isEnabled
											? "Disable"
											: "Enable"}
									</Button>
									<Button
										type="button"
										onClick={() => {
											if (integrationId) {
												updateCredentials(
													integrationId,
													integrationData.find(
														(intg) =>
															intg.id ===
															integrationId
													)?.credentials!
												);
											}
										}}
										disabled={
											!credsUpdated || !integrationId
										}
									>
										Save
									</Button>
								</div>
							</CardHeader>
						</Card>
					))}
			</div>
		</div>
	);
};

export default page;
