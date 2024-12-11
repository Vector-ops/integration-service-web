"use client";

import { Button } from "@/components/ui/button";
import channel from "@/lib/rabbitmq";
import React, { useEffect, useState } from "react";
import { IEventData, IRabbitMQMessage } from "../types";

const page = () => {
	const [event, setEvent] = useState("signup");
	const [eventData, setEventData] = useState<IEventData[] | null>(null);
	const [recipient, setRecipient] = useState("+919999999999");
	const [userId, setUserId] = useState(1234);
	const [brandId, setBrandId] = useState(234);
	const [variables, setVariables] = useState();

	useEffect(() => {
		const fetchEventData = async () => {
			try {
				const response = await fetch(
					"http://localhost:3000/api/v1/events"
				);
				const data: IEventData[] = await response.json();
				setEventData(data);
			} catch (error) {
				console.error("Error fetching event data:", error);
			}
		};

		fetchEventData();
	}, []);

	const sendMessage = async () => {
		const message: IRabbitMQMessage = {
			brandId,
			eventType: event,
			recipient,
			userId,
			customData: variables!,
		};

		channel.sendToQueue(
			process.env.QUEUE_NAME!,
			Buffer.from(JSON.stringify(message))
		);
	};

	return (
		<div className="w-full flex flex-col gap-6 px-4">
			<h1 className="text-3xl font-bold">Send Message</h1>
			<form className="flex flex-col gap-4 items-start border border-gray-500 w-[40%] rounded-md p-4">
				<label className="flex items-center justify-center">
					<span className="w-32">Event:</span>
					<select
						value={event}
						onChange={(e) => setEvent(e.target.value)}
						className="border p-2 flex-1"
					>
						<option value="signup">Signup</option>
						<option value="orderplacement">Order Placement</option>
					</select>
				</label>

				<label className="flex items-center">
					<span className="w-32">Recipient:</span>
					<input
						type="text"
						value={recipient}
						onChange={(e) => setRecipient(e.target.value)}
						className="border p-2 flex-1"
					/>
				</label>
				<label className="flex items-center">
					<span className="w-32">User ID:</span>
					<input
						type="number"
						value={userId}
						onChange={(e) => setUserId(Number(e.target.value))}
						className="border p-2 flex-1"
					/>
				</label>
				<label className="flex items-center">
					<span className="w-32">Brand ID:</span>
					<input
						type="number"
						value={brandId}
						onChange={(e) => setBrandId(Number(e.target.value))}
						className="border p-2 flex-1"
					/>
				</label>
				<p className="text-xl font-bold">Variables</p>
				<p>Create an event if you do not see the variables</p>
				{eventData && (
					<>
						{eventData
							.filter((data) => data.eventType === event)
							.flatMap((data) =>
								Object.keys(data.variables).map((key) => (
									<label
										key={key}
										className="flex items-center"
									>
										<span className="w-32 break-words">
											{key}:
										</span>
										<input
											type="text"
											value={variables?.[key] || ""}
											onChange={(e) =>
												setVariables((prev: any) => ({
													...prev,
													[key]: e.target.value,
												}))
											}
											className="border p-2 flex-1"
										/>
									</label>
								))
							)}
					</>
				)}
				<Button type="button" onClick={() => sendMessage}>
					Send Message
				</Button>
			</form>
		</div>
	);
};

export default page;
