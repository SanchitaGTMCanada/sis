
import "./globals.css";

export const metadata = {
  title: "PI-NC | Student Information System",
  description:
    "Polytechnic Institute of Northern Canada - Student Information System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
