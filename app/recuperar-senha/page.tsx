import PasswordResetForm from "@/components/auth/password-reset-form"

export default function PasswordResetPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 bg-white">
      <div className="w-full max-w-md">
        <PasswordResetForm />
      </div>
    </main>
  )
}
