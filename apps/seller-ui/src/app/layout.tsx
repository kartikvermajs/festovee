import "./global.css";
import Providers from "./provider";

export const metadata = {
  title: "Festovee Seller",
  description: "Festovee Seller",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
