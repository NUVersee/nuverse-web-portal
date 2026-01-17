import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "sonner";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NUverse - Virtual Reality University Tour",
  description: "Experience Nile University in immersive 360° VR. Explore campus, labs, and student life from anywhere.",
  icons: {
    icon: "/Images/NUverse Logo.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased font-sans bg-[var(--background)] text-[var(--foreground)] min-h-screen selection:bg-brand-500/30" suppressHydrationWarning={true}>
        <Providers>{children}</Providers>
        <Toaster
          position="top-center"
          richColors
          theme="dark"
          duration={3000}
          toastOptions={{
            style: {
              background: 'linear-gradient(135deg, #38476b 0%, #1a2035 100%)',
              border: '1px solid rgba(255, 193, 172, 0.3)',
              color: 'white',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontSize: '16px',
              padding: '16px 24px',
              borderRadius: '12px',
              minWidth: '435px',
            },
          }}
        />
      </body>
    </html>
  );
}

