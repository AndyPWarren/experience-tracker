declare module 'autosuggest-highlight/parse' {
	export default function parse(text: string, matches: number[] | number[][]): Array<{ text: string; highlight: boolean; }>;
}
