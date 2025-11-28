import "./globals.css";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center font-sans overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>

      <main className="relative z-10 flex flex-col items-center justify-center py-32 px-6 text-center max-w-4xl">
        {/* Main heading */}
        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-extrabold tracking-tighter mb-6 text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-indigo-300 to-pink-400 animate-pulse drop-shadow-2xl">
          Welcome to Nuverse Frontend!
        </h1>

        {/* Decorative line */}
        <div className="h-1 w-32 bg-linear-to-r from-cyan-400 via-indigo-300 to-pink-400 rounded-full mb-8 shadow-lg shadow-indigo-500/50"></div>

        {/* Description */}
        <p className="mt-8 text-lg sm:text-xl text-slate-200 max-w-2xl leading-relaxed">
          A stylish, modern foundation for the Nuverse Frontend project — ready for GitHub and built for the future.
        </p>

        {/* CTA Button */}
        <div className="mt-12">
          <button className="px-8 py-3 bg-linear-to-r from-cyan-500 to-indigo-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 transform hover:scale-105">
            Get Started
          </button>
        </div>
      </main>
    </div>
  );
}
