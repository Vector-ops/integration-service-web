"use client";

import { ICredentials, IEventData, IIntegrationData } from "@/app/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useParams } from "next/navigation";
import React from "react";

const page = ({ params }: { params: { slug: string } }) => {
	const [eventData, setEventData] = React.useState<IEventData[]>([]);
	const [credsUpdated, setCredsUpdated] = React.useState<boolean>(false);
	const [integrationId, setIntegrationId] = React.useState<number>();
	const { slug } = useParams();

	React.useEffect(() => {
		const fetchEventData = async () => {
			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_APP_URL}/api/v1/events`
				);
				const data: IEventData[] = await response.json();
				setEventData(data);
			} catch (error) {
				console.error("Error fetching event data:", error);
			}
		};

		fetchEventData();
	}, [params.slug, slug]);

	return (
		<div className="w-full flex flex-col gap-4 m-4">
			<div className="flex justify-between items-center">
				<h1 className="text-3xl font-bold">Events</h1>
				<Button
					type="button"
					onClick={() => {
						window.location.href = "/events/create";
					}}
				>
					Create Event
				</Button>
			</div>
			<div className="flex justify-start items-center gap-4 flex-wrap">
				{eventData.map((event) => (
					<Card key={event.id} className="w-[400px]">
						<CardHeader>
							<p>Event Id: {event.id}</p>
							<h2>Event Type: {event.eventType}</h2>
						</CardHeader>
						<CardContent>
							<h2 className="text-lg font-bold ">Variables</h2>
							<div className="flex flex-col justify-start items-center">
								{Object.entries(event.variables).map(
									([key, value]) => (
										<div key={key} className="w-full">
											<strong>{key}:</strong> {value}
										</div>
									)
								)}
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
};

export default page;
