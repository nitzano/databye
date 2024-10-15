export enum FakeProvider {
  Age = "age",
  Animal = "animal",
  Color = "color",
  Email = "email",
  First = "first",
  Gender = "gender",
  IP = "ip",
  Last = "last",
  Letter = "letter",
  Name = "name",
  Natural = "natural",
  Paragraph = "paragraph",
  Prime = "prime",
  Sentence = "sentence",
  SSN = "ssn",
  Word = "word",
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
