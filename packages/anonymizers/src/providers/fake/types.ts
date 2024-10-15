export enum FakeStringProviders {
  FirstName = "first_name",
  LastName = "last_name",
  Word = "word",
  Name = "name",
  Animal = "animal",
  Email = "email",
}

export enum FakeNumberProviders {
  Age = "age",
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
