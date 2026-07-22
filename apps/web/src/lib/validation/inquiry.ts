import { z } from "zod";

export const inquirySchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters."),
  email: z.string().trim().email("Enter a valid email address."),
  country: z.string().trim().min(2, "Country must be at least 2 characters."),
  boilerType: z
    .string()
    .trim()
    .min(2, "Boiler type must be at least 2 characters."),
  message: z
    .string()
    .trim()
    .min(10, "Project details must be at least 10 characters."),
  website: z.string().trim().max(200).optional().default(""),
});

export type InquiryInput = z.input<typeof inquirySchema>;
export type InquiryPayload = z.output<typeof inquirySchema>;
