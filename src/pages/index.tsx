import Image from "next/image";
import { Inter } from "next/font/google";
import { twMerge } from "tailwind-merge";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	return (
		<div
			className={twMerge(inter.className, " grid place-items-center h-screen")}
		>
			<h1 className="text-lg">
			Get Started with{" "}
				<span className="underline font-bold text-3xl tracking-tighter underline-offset-8">
					NextJS
				</span>{" "}
				+{" "}
				<span className="text-sky-600 underline font-bold text-3xl tracking-tighter underline-offset-8">
					TailwindCSS
				</span>{" "}
				+{" "}
				<span className="text-blue-600 underline font-bold text-3xl tracking-tighter underline-offset-8">
					Typescript
				</span>
			</h1>
		</div>
	);
}
