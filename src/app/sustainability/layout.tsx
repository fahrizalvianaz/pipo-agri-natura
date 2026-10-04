import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sustainability",
  description: "A short, factual statement of PT Pipo Agri Natura's current approach to sustainability.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
