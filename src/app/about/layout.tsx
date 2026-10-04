import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us & Products",
  description: "Who we are, where our Java green coffee comes from, a product overview and FOB/CIF shipping terms.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
