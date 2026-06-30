import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "King of the North",
  description: "EuroBowl Poland 2026 Rules Warm-up tournament site",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
