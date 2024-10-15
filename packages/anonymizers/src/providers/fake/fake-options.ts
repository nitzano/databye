import { FakeSource } from "./types.js";

export type FakeOptions = {
	source: FakeSource;
};

export const defaultFakeOptions: FakeOptions = {
	source: FakeSource.Word,
};
