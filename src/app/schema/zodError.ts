import z from "zod";

const myError = new z.ZodError([
  {
    code: "unrecognized_keys",
    keys: ["extraField"],
    path: [],
    message: 'Unrecognized key: "extraField"',
  },
  {
    expected: "string",
    code: "invalid_type",
    path: ["username"],
    message: "Invalid input: expected string, received number",
  },
  {
    origin: "number",
    code: "too_small",
    minimum: 0,
    inclusive: true,
    path: ["favoriteNumbers", 1],
    message: "Too small: expected number to be >=0",
  },
]);

z.prettifyError(myError);
