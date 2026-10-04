import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sustainability",
  description: "Our environmental, social and governance commitments as we build our sourcing network in Temanggung.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
