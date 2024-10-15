import { FakeProvider } from "./types.js";

export type FakeOptions = {
	provider: FakeProvider;
};

export const defaultFakeOptions: FakeOptions = {
	provider: FakeProvider.Word,
};
