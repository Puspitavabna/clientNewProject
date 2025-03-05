export const dynamic = "force-dynamic";

import { Metadata } from "next";
// import type { Metadata } from "next";
// import { Montserrat } from "next/font/google";

import "./globals.css";
import { AppProvider } from "./context/AppContextType";
//  import { AppProvider } from "./context/AppContextType";



// const montserrat = Montserrat({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Truzz Online",
  description: "Truzz Online",
  icons: {
    icon: '/logo.svg', // Path to your favicon in the public folder
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body
      // className={montserrat.className}
      >
        <AppProvider>
          {children}
        </AppProvider>

      </body>
    </html>
  );

}
