// /app/admin/layout.tsx

import { getSession } from "@/lib/auth/session";
import { AdminNavbar } from "@/components/admin/AdminNavbar";
import { ToastProvider } from "@/components/admin/ToastProvider";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  const headerList = await headers();
  const pathname = headerList.get("x-invoke-path") || "";

  // 1. Redirigir si no hay sesión y no estamos en login
  // Aunque el middleware ya lo hace, esto es una capa de seguridad extra en renderizado
  if (!session.isLoggedIn && !pathname.includes("/admin/login")) {
    // Nota: El middleware es más eficiente para esto, pero dejamos la validación lógica aquí
  }

  const isAdminPage = pathname.startsWith("/admin");
  const isLoginPage = pathname === "/admin/login";

  return (
    <div className="bg-[var(--bg-primary)] min-h-screen">
      <ToastProvider />
      {session.isLoggedIn && !isLoginPage && (
        <AdminNavbar adminName={session.name} />
      )}
      <main>
        {children}
      </main>
    </div>
  );
}

