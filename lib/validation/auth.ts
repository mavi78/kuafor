import { z } from 'zod'

/**
 * Sign-in schema with email and password validation.
 * Used for login forms.
 */
export const signInSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'E-posta adresi gereklidir' })
    .email({ message: 'Geçerli bir e-posta adresi giriniz' }),
  password: z
    .string()
    .min(1, { message: 'Şifre gereklidir' })
    .min(6, { message: 'Şifre en az 6 karakter olmalıdır' }),
})

export type SignInInput = z.infer<typeof signInSchema>

/**
 * Sign-up schema with name, email, phone, and password validation.
 * Used for customer self-registration.
 */
export const signUpSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Ad soyad gereklidir' })
    .min(2, { message: 'Ad soyad en az 2 karakter olmalıdır' }),
  email: z
    .string()
    .min(1, { message: 'E-posta adresi gereklidir' })
    .email({ message: 'Geçerli bir e-posta adresi giriniz' }),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^(\+90|0)?5\d{9}$/.test(val.replace(/\s/g, '')),
      { message: 'Geçerli bir telefon numarası giriniz (örn: 5551234567)' }
    ),
  password: z
    .string()
    .min(1, { message: 'Şifre gereklidir' })
    .min(6, { message: 'Şifre en az 6 karakter olmalıdır' }),
  confirmPassword: z.string().min(1, { message: 'Şifre tekrarı gereklidir' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Şifreler eşleşmiyor',
  path: ['confirmPassword'],
})

export type SignUpInput = z.infer<typeof signUpSchema>

/**
 * Password reset request schema.
 * Used for initiating password reset flow.
 */
export const passwordResetRequestSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'E-posta adresi gereklidir' })
    .email({ message: 'Geçerli bir e-posta adresi giriniz' }),
})

export type PasswordResetRequestInput = z.infer<typeof passwordResetRequestSchema>

/**
 * Password reset confirmation schema.
 * Used for completing password reset with token.
 */
export const passwordResetConfirmSchema = z.object({
  token: z.string().min(1, { message: 'Token gereklidir' }),
  password: z
    .string()
    .min(1, { message: 'Şifre gereklidir' })
    .min(6, { message: 'Şifre en az 6 karakter olmalıdır' }),
  confirmPassword: z.string().min(1, { message: 'Şifre tekrarı gereklidir' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Şifreler eşleşmiyor',
  path: ['confirmPassword'],
})

export type PasswordResetConfirmInput = z.infer<typeof passwordResetConfirmSchema>
