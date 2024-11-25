import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Checkout and Stripe",
  description: "Checkout with Stripe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Oxygen+Mono&display=swap" rel="stylesheet" />
      </head>
      <body
      >
        {children}
      </body>
    </html>
  );
}
