"use server";

import amqp from "amqplib";

async function connectToRabbitMq(): Promise<amqp.Channel> {
	try {
		const connection = await amqp.connect("amqp://localhost");

		const channel = await connection.createChannel();

		const queueName = process.env.QUEUE_NAME;
		if (!queueName) {
			console.error("Missing QUEUE_NAME in environment variables");
			await channel.close();
			process.exit(1);
		}

		await channel.assertQueue(queueName, { durable: true });
		console.log(`Queue ${queueName} is ready.`);

		return channel;
	} catch (error) {
		console.error("Failed to connect to RabbitMQ:", error);
		process.exit(1);
	}
}

async function initializeChannel() {
	const channel = await connectToRabbitMq();
	return channel;
}

const channel = await initializeChannel();

export default channel;
