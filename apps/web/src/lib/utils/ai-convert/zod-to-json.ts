import { JSONSchema7 } from "json-schema";
import * as z from "zod";
import zodToJsonSchema from "zod-to-json-schema";

const DEFAULT_SCHEMA_PREFIX = "JSON schema:";
const DEFAULT_SCHEMA_SUFFIX =
  "You MUST answer with a JSON object that matches the JSON schema above.";

/**
 * Construct a prompt to convert a Zod schema to a JSON schema.
 * @param zodSchema The Zod schema to convert.
 * @param system An optional system message to include in the prompt.
 * @param schemaPrefix An optional prefix to add to the JSON schema.
 * @param schemaSuffix An optional suffix to add to the JSON schema. defaults to:  @default "You MUST answer with a JSON object that matches the JSON schema above."
 * @returns A string containing the prompt to convert the Zod schema to a JSON schema.
 */
export function constructJsonSchemaPrompt({
  system,
  zodSchema,
  schemaPrefix = DEFAULT_SCHEMA_PREFIX,
  schemaSuffix = DEFAULT_SCHEMA_SUFFIX,
}: {
  system?: string;
  zodSchema: z.Schema<unknown>;
  schemaPrefix?: string;
  schemaSuffix?: string;
}): string {
  const jsonSchema = convertZodToJSONSchema(zodSchema);

  return [
    system,
    system != null ? "" : null, // add a newline if system is not null
    schemaPrefix,
    JSON.stringify(jsonSchema),
    schemaSuffix,
  ]
    .filter((line) => line != null)
    .join("\n");
}

export function convertZodToJSONSchema(
  zodSchema: z.Schema<unknown>
): JSONSchema7 {
  // we assume that zodToJsonSchema will return a valid JSONSchema7
  return zodToJsonSchema(zodSchema) as JSONSchema7;
}
