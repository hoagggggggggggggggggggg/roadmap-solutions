import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Flashcards App",
  description: "Learn programming concepts with flashcards",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="w-full">{children}</body>
    </html>
  )
}