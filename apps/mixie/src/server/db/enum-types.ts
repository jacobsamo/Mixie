import * as z from "zod";
import { fonts, theme } from "@/types/zodSchemas";

export type TFont = z.infer<typeof fonts>;

export type TTheme = z.infer<typeof theme>;
