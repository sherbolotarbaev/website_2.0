type TextBoundaries = {
	left: number
	right: number
	width: number
}

declare global {
	interface HTMLCanvasElement {
		textBoundaries?: TextBoundaries
	}
}

export {}
