export interface IIntegration {
	name: string;
	href: string;
}
export interface IWhatsappIntegration {
	name: string;
	href: string;
}

export interface ICredentials {
	apikey?: string;

	secret?: string;

	channelId?: string;
}

export interface IIntegrationData {
	id: number;
	integrationName: string;
	integrationType: string;
	brandId: number;
	isEnabled: boolean;
	credentials: ICredentials;
	createdAt: string;
	updatedAt: string;
}

export interface IEventData {
	id: number;
	eventType: string;
	variables: JSON;
	createdAt: string;
	updatedAt: string;
}

export interface IProviderTemplate {
	id: number;
	providerTemplateId: string;
	brandId: number;
	customData: JSON;
	isEnabled: boolean;
	createdAt: string;
	updatedAt: string;
}

export interface IRabbitMQMessage {
	brandId: number;
	recipient: string;
	userId: number;
	customData: { [key: string]: string };
	eventType: string;
}
