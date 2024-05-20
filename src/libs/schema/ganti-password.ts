import zod from 'zod'

export const gantiPasswordSchema = zod.object({
  password_lama: zod
    .string({
      required_error: 'Password harus di isi',
      invalid_type_error:
        'Format password tidak valid, terdiri dari minimal 6 karakter',
    })
    .refine(
      (value) => {
        // Validasi bahwa password memiliki minimal 6 karakter
        return value.length >= 6
      },
      {
        message: 'Password harus memiliki minimal 6 karakter',
      },
    ),
  password_baru: zod
    .string({
      required_error: 'Password harus di isi',
      invalid_type_error:
        'Format password tidak valid, terdiri dari minimal 6 karakter',
    })
    .refine(
      (value) => {
        // Validasi bahwa password memiliki minimal 6 karakter
        return value.length >= 6
      },
      {
        message: 'Password harus memiliki minimal 6 karakter',
      },
    ),
})
