declare module "@strothj/react-archer" {
	import React from "react";

	export type ArcherAnchorPosition = "top" | "bottom" | "left" | "right";

	export interface ArcherContainerProps {
		/** A color string `'#ff0000'` */
		strokeColor?: string;
		strokeWidth?: number;
		arrowLength?: number;
		arrowThickness?: number;
	}

	export interface ArcherElementProps {
		id: string;
		relations?: {
			from: {
				anchor: ArcherAnchorPosition;
			};
			to: {
				anchor: ArcherAnchorPosition;
				id: string;
			};
			label?: string;
		}[];
		style?: React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLDivElement>,
			HTMLDivElement
		>["style"];
	}

	export const ArcherContainer: React.ComponentType<ArcherContainerProps>;
	export const ArcherElement: React.ComponentType<ArcherElementProps>;
}
