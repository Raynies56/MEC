# Centro Oftalmológico Visión Plena

Sitio web médico premium y sistema de gestión de citas para la Dra. Valentina Reyes.

## Características

- **Landing Page Atractiva**: Animaciones suaves, glassmorphism, totalmente responsiva.
- **Formulario de Citas Multi-Paso**: Reserva inteligente de acuerdo a disponibilidad horaria.
- **Dashboard de Doctor**: Gestión y administración de citas protegida por NextAuth.
- **Dark Mode Automático**: Soporte completo de UI clara oscura.
- **Supabase Backend**: Almacenamiento seguro en PostgreSQL para pacientes y citas.

## Stack Tecnológico

- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS + Framer Motion
- **Autenticación**: NextAuth.js
- **Base de Datos**: Supabase
- **Manejo de Estado**: Zustand
- **Formularios**: React Hook Form + Zod

## Estructura de Carpetas

- `/app`: Rutas de la aplicación (frontend y API endpoints).
- `/components`: Componentes aislados (UI reutilizables, secciones, layout).
- `/hooks`: Hooks customizados para interactuar con la API de disponibilidad y estado global.
- `/lib`: Utilidades, constantes y configuración de Supabase.
- `/supabase`: Base de datos (ver \`schema.sql\`).
- `/types`: Interfaces Globales de TS.

## Instalación y Configuración

1. **Instalar Dependencias**
   \`\`\`bash
   npm install
   \`\`\`

2. **Configuración de Entorno**
   - Crea un archivo \`.env.local\` basado en \`.env.example\`
   - Añade tus claves de Supabase, Resend y genera un NEXTAUTH_SECRET

3. **Configuración de Base de Datos**
   - Ve a tu consola de Supabase.
   - Ejecuta todo el script SQL ubicado en \`supabase/schema.sql\` en el editor SQL para crear las tablas y las políticas de seguridad (RLS).
   - Opcionalmente, inserta o registra tu usuario doctor usando el comando documentado dentro del archivo SQL (la contraseña del ejemplo es \`admin123\`).

4. **Ejecutar en Desarrollo**
   \`\`\`bash
   npm run dev
   \`\`\`
   Abre [http://localhost:3000](http://localhost:3000) para ver el sitio.

## Consideraciones Adicionales
- Para producción, debes alojar la app preferiblemente en Vercel, proporcionando allí todas las variables de entorno asociadas a la base de datos y NextAuth de producción.
