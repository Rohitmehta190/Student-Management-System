import * as z from "zod"

export const studentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  course: z.string().min(1, "Please select a course"),
  year: z.string().min(1, "Please select an academic year"),
  status: z.enum(["Active", "On Leave", "Graduated"]),
  attendance: z.string().optional(),
  avatar: z.string().optional(),
})

export type StudentValues = z.infer<typeof studentSchema>

export const teacherSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Please select a subject"),
  experience: z.string().min(1, "Please enter experience"),
  avatar: z.string().optional(),
})

export type TeacherValues = z.infer<typeof teacherSchema>

export const courseSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  code: z.string().min(3, "Course code must be at least 3 characters"),
  instructor: z.string().min(1, "Please assign an instructor"),
  category: z.string().min(1, "Please select a category"),
  duration: z.string().min(1, "Please enter duration"),
  image: z.string().optional(),
})

export type CourseValues = z.infer<typeof courseSchema>
