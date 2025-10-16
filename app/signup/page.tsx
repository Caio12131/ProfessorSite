import RegisterForm from "@/components/auth/register-form-firebase"

export default function SignupPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 bg-white">
      <div className="w-full max-w-md">
        <RegisterForm />
      </div>
    </main>
  )
}
