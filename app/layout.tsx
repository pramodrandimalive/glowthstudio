import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {title:'Glowth — Good brands. Wild ideas.',description:'A creative agency serving Australia and Sri Lanka. Branding, social media, AI visual campaigns, photography and video production.',robots:{index:false,follow:false}};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="en-AU"><body>{children}</body></html>;}
