import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"

export default function PerfilLoading() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="container mx-auto px-4 py-12 flex-grow">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="px-6 py-6 border-b border-gray-100">
              <div className="h-8 bg-gray-200 rounded-md w-1/3 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded-md w-2/3 mt-2 animate-pulse"></div>
            </div>

            <div className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                {/* Avatar skeleton */}
                <div className="w-20 h-20 bg-gray-200 rounded-full animate-pulse"></div>

                {/* Informações básicas skeleton */}
                <div className="space-y-3 w-full">
                  <div className="h-5 bg-gray-200 rounded-md w-3/4 animate-pulse"></div>
                  <div className="h-5 bg-gray-200 rounded-md w-1/2 animate-pulse"></div>
                  <div className="h-5 bg-gray-200 rounded-md w-2/3 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Métricas corporais skeleton */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mt-6">
            <div className="px-6 py-4 border-b border-gray-100">
              <div className="h-6 bg-gray-200 rounded-md w-1/4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded-md w-1/2 mt-2 animate-pulse"></div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Coluna 1 skeleton */}
                <div className="space-y-6">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded-md w-1/3 animate-pulse"></div>
                        <div className="h-6 bg-gray-200 rounded-md w-1/2 mt-1 animate-pulse"></div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Coluna 2 skeleton */}
                <div className="space-y-6">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded-md w-1/3 animate-pulse"></div>
                        <div className="h-6 bg-gray-200 rounded-md w-1/2 mt-1 animate-pulse"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

