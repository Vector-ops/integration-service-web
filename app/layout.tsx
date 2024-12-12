import AppSidebar from "@/components/AppSidebar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/theme-provider";
import {
	Sidebar,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "Integrations Service",
	description: "Generate event",
};

const verdana = localFont({
	src: [
		{
			path: "./fonts/verdana-font-family/verdana.ttf",
			weight: "400",
		},
		{
			path: "./fonts/verdana-font-family/verdana-bold.ttf",
			weight: "700",
		},
	],
	variable: "--font-verdana",
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${verdana.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					enableSystem
					disableTransitionOnChange
				>
					{/* <SidebarProvider> */}
					<main className="box-border flex h-fit min-h-screen flex-col gap-y-6 bg-white dark:bg-black">
						<div className="flex justify-center items-center w-full">
							<Header />
						</div>
						<div className="flex flex-grow justify-center gap-2">
							<AppSidebar />
							{children}
							<Analytics />
						</div>
						{/* <div className="flex justify-center items-center">
							<Footer />
						</div> */}
					</main>
					{/* </SidebarProvider> */}
				</ThemeProvider>
			</body>
		</html>
	);
}
