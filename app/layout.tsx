import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Seattle Adventures",
  description: "Discover the best places to visit in Seattle, Washington.",
  openGraph: {
    title: "Seattle Adventures",
    description: "Discover the best places to visit in Seattle, Washington.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
