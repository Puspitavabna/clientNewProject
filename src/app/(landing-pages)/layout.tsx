'use client'

import FooterNav from "../components/FooterNav";
import Navbar from "../components/Navbar";
import {Provider} from "react-redux"
import {store,persistor} from '../store/store'
import {PersistGate} from 'redux-persist/integration/react'
export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
<PersistGate loading={null} persistor={persistor}>
  
<section>
      <Navbar />
      {children}
      {/* <Footer /> */}
      <FooterNav />
    </section>
</PersistGate>

    </Provider>
 
  );
}
