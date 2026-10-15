import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OptiVerse XR",
  description: "Optimize 3D assets for extended reality workflows with OptiVerse XR.",
};

// Bitdefender's browser extension can add this attribute before React hydrates.
// Remove only that known extension attribute, rather than masking real UI mismatches.
const removeExtensionAttributeBeforeHydration = `
  (() => {
    const attribute = "bis_skin_checked";
    const removeAttribute = (element) => {
      if (element instanceof Element && element.hasAttribute(attribute)) {
        element.removeAttribute(attribute);
      }
    };

    const clean = (root) => {
      removeAttribute(root);
      root.querySelectorAll?.("[bis_skin_checked]").forEach(removeAttribute);
    };

    clean(document.documentElement);

    new MutationObserver((mutations) => {
      mutations.forEach((mutation) => removeAttribute(mutation.target));
    }).observe(document.documentElement, {
      subtree: true,
      attributes: true,
      attributeFilter: [attribute],
    });
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
        <Script id="remove-extension-hydration-attribute" strategy="beforeInteractive">
          {removeExtensionAttributeBeforeHydration}
        </Script>
      </body>
    </html>
  );
}
