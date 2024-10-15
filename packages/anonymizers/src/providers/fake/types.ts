export enum FakeStringProviders {
  Animal = "animal",
  Email = "email",
  First = "first",
  Gender = "gender",
  Last = "last",
  Color = "color",
  IP = "ip",
  Letter = "letter",
  Name = "name",
  Paragraph = "paragraph",
  Sentence = "sentence",
  SSN = "ssn",
  Word = "word",
}

export enum FakeNumberProviders {
  Age = "age",
  Natural = "natural",
  Prime = "prime",
}

// @deprecated
export const fakeTypes: string[] = [
  "age",
  "email",
  "first",
  "firstName",
  "last",
  "lastName",
  "letter",
  "name",
  "word",
];

// @deprecated
export type FakeType =
  | "age"
  | "animal"
  | "email"
  | "first"
  | "firstName"
  | "last"
  | "lastName"
  | "letter"
  | "name"
  | "word";
