
import "./globals.css";
import DashboardLayout from "@/components/layout/DashboardLayout";

export const metadata = {
  title: "PI-NC | Student Information System",
  description:
    "Polytechnic Institute of Northern Canada - Student Information System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <DashboardLayout>
          {children}
        </DashboardLayout>
      </body>
    </html>
  );
}
