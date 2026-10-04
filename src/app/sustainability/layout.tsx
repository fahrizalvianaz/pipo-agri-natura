import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sustainability",
  description: "PT Pipo Agri Natura's environmental, social and governance principles and Code of Conduct.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
