import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact PT Pipo Agri Natura by email or WhatsApp to start a green coffee sourcing conversation.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
