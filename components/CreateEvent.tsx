"use client";
import { useState } from "react";
import { Button } from "./ui/button";

const CreateEvent = () => {
	const [eventType, setEventType] = useState("signup");
	const [variables, setVariables] = useState<
		{ key: string; value: string }[]
	>([{ key: "", value: "" }]);

	const handleEventTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setEventType(e.target.value);
	};

	const handleSave = async () => {
		const eventVariables = variables.reduce((acc, variable) => {
			acc[variable.key] = variable.value;
			return acc;
		}, {} as Record<string, string>);

		const response = await fetch(
			`${process.env.NEXT_PUBLIC_APP_URL}/events`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					eventType,
					variables: eventVariables,
				}),
			}
		);

		if (!response.ok) {
			console.log("failed request", response);
		}
	};

	const handleVariableChange = (
		index: number,
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const newVariables = [...variables];
		newVariables[index][e.target.name as "key" | "value"] = e.target.value;
		setVariables(newVariables);
	};

	const addVariable = () => {
		setVariables([...variables, { key: "", value: "" }]);
	};

	return (
		<div className="p-5 flex flex-col justify-center items-start gap-4 border border-gray-500 w-fit rounded-lg">
			<div className="mb-5">
				<label className="mr-2 font-bold">Event Type:</label>
				<select
					value={eventType}
					onChange={handleEventTypeChange}
					className="p-1 rounded border border-gray-300"
				>
					<option value="signup">Signup</option>
					<option value="orderplacement">Order Placement</option>
				</select>
			</div>
			<div>
				<label className="block mb-2 font-bold">Variables:</label>
				{variables.map((variable, index) => (
					<div key={index} className="mb-2 flex items-center">
						<input
							type="text"
							name="key"
							placeholder="Key"
							value={variable.key}
							onChange={(e) => handleVariableChange(index, e)}
							className="p-1 mr-2 rounded border border-gray-300 w-36"
						/>
						<input
							type="text"
							name="value"
							placeholder="Description"
							value={variable.value}
							onChange={(e) => handleVariableChange(index, e)}
							className="p-1 mr-2 rounded border border-gray-300 w-36"
						/>
						<Button
							onClick={() => {
								const newVariables = variables.filter(
									(_, i) => i !== index
								);
								setVariables(newVariables);
							}}
							variant={"destructive"}
						>
							Delete
						</Button>
					</div>
				))}

				<Button onClick={addVariable} variant="default">
					Add Variable
				</Button>
			</div>
			<Button onClick={handleSave}>Save</Button>
		</div>
	);
};

export default CreateEvent;
