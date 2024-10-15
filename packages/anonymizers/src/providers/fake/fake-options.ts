import { FakeSource } from "./types.js";

export type FakeOptions = {
	provider: FakeSource;
};

export const defaultFakeOptions: FakeOptions = {
	provider: FakeSource.Word,
};
