'use client'
import Navbar from "../components/Navbar";
import Sidebar from "./components/Sidebar";

import { Provider } from "react-redux"
import { store, persistor } from '../store/store'
import { PersistGate } from 'redux-persist/integration/react'
import { useRouter } from "next/navigation";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const router = useRouter()

  if (!store.getState().auth.isAuthenticated) {
    //router.push('/')
    //return
  }
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="min-h-screen flex flex-col">
          {/* Navbar at the top */}
          <Navbar />

          {/* Main content area */}
          <main className="flex flex-1 overflow-hidden">
            {/* Sidebar */}
            <Sidebar />

            {/* Main section for the children */}
            <section className="flex-1 bg-[#E9F0FF] p-4 overflow-y-auto">
              {children}
            </section>
          </main>
        </div>
      </PersistGate>
    </Provider>
  );
}
