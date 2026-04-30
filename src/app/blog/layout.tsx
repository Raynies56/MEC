import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog de Salud Visual | Dra. Valentina Reyes",
  description: "Consejos, noticias y artículos sobre cómo cuidar tus ojos y salud visual.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
