export type MaskOptions = {
	// Character to replace
	character: string;
	// Do not mask these characters
	excludeCharacters?: string[];
	// Do not exclude from end
	excludeEndCount?: number;
	// Do not exclude from start
	excludeStartCount?: number;
};

export const defaultMaskOptions: MaskOptions = {
	character: '*',
};
