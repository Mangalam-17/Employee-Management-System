import { z } from "zod";

export const createEmployeeSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  department: z.string().min(1, "Department is required"),
  salary: z.number().min(0, "Salary must be a positive number"),
});

export const updateEmployeeSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  department: z.string().optional(),
  salary: z.number().min(0).optional(),
  status: z.enum(["ACTIVE", "INACTIVE"]).optional()
});