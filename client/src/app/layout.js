import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AiGen",
  description: "AIgen: Your all-in-one AI SaaS platform for image, code, and voice generation. Unleash creativity effortlessly. Try it now!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
