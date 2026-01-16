import "./globals.css";
import { Providers } from "./providers";

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
      </body>
    </html>
  );
}
