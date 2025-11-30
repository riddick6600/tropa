import QRCodeBlock from "@/components/features/QRCodeBlock";
import StickyAudioPlayer from "@/components/features/StickyAudioPlayer";
import ToastContainer from "@/components/features/ToastContainer";
import { AudioProvider } from "@/lib/context/AudioContext";
import { GamificationProvider } from "@/lib/context/GamificationContext";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Тропы Наследия | Мультимедийный гид по Абхазии",
  description: "Исследуйте исторические места и маршруты Абхазии с аудиогидами, геймификацией и интерактивными картами. Узнайте о П.С. Уваровой, озере Рица, Эшере и других достопримечательностях.",
  openGraph: {
    title: "Тропы Наследия",
    description: "Мультимедийный гид по Абхазии с аудиогидами и геймификацией",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <GamificationProvider>
          <AudioProvider>
            <main className="app-wrapper">
              {children}
              <QRCodeBlock />
            </main>
            <StickyAudioPlayer />
            <ToastContainer />
          </AudioProvider>
        </GamificationProvider>
      </body>
    </html>
  );
}
