// /app/admin/page.tsx
import { redirect } from "next/navigation";

export default function AdminPage() {
  // Redirigir automáticamente a la página de citas (el middleware se encargará de pedir login si es necesario)
  redirect("/admin/citas");
}
