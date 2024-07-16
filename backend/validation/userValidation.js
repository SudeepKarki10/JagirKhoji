const { z } = require("zod");

const userSchema = z.object({
  username: z.string().min(1, "Username is required").max(50),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(100),
});

module.exports = userSchema;
