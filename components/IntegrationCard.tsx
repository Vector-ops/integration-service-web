import { IIntegration } from "@/app/types";
import { WhatsappLogo } from "@phosphor-icons/react";
import { Mail } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";
import gmail from "../public/static/gmail.png";
import whatsapp from "../public/static/whatsapp.png";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card";

const Icons: { [key: string]: StaticImageData } = {
	whatsapp: whatsapp,
	email: gmail,
};

const IntegrationCard = ({ integration }: { integration: IIntegration }) => {
	return (
		<Link href={integration.href}>
			<Card className="max-h-fit w-56 flex flex-col items-center justify-center">
				<CardHeader>
					<CardTitle className="text-3xl">
						{integration.name}
					</CardTitle>
				</CardHeader>
				<CardContent className="items-center">
					<Image
						src={Icons[integration.name.toLowerCase()]}
						alt={integration.name}
						width={40}
						height={40}
					/>
				</CardContent>
			</Card>
		</Link>
	);
};

export default IntegrationCard;
