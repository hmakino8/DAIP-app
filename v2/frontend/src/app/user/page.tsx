"use client";

import { ScreenHub } from "./components/layout/ScreenHub";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { AuthProvider } from "./contexts/AuthProvider";
import { ScreenProvider } from "./contexts/ScreenProvider";
import { UIStateProvider } from "./contexts/UIStateProvider";

export default function UserPage() {
  return (
    <AuthProvider>
      <UIStateProvider>
        <ScreenProvider>
          <Header />
          <ScreenHub />
          <Footer />
        </ScreenProvider>
      </UIStateProvider>
    </AuthProvider>
  );
}
