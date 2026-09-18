import type { Metadata } from "next";
import "./globals.css";
import ShareButton from "./share-button";

export const metadata: Metadata = {
  title: "NexAI Global Markets",
  description: "Africa-built multilingual AI for financial education, market intelligence and safe trading practice."
};

export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en"><body>{children}<ShareButton /></body></html>;
}
