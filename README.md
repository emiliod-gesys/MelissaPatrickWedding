# Melissa & Patrick — Invitación de Boda

Aplicación web personalizada para la boda de Melissa y Patrick. Cada invitado ve su invitación en su idioma (español o alemán) con el número de acompañantes permitidos.

## Características

- Login sin contraseña (solo nombre de usuario)
- Invitación personalizada por invitado (idioma + invitados adicionales)
- Panel de administración exclusivo para el usuario maestro
- Animaciones con Framer Motion
- Fotos e iconos personalizados incluidos

## Stack

- **Frontend/Backend:** Next.js 15 (App Router)
- **Base de datos:** Supabase (PostgreSQL)
- **Hosting:** Vercel
- **Estilos:** Tailwind CSS 4

## Configuración

### 1. Supabase

1. Crea un proyecto en [supabase.com](https://supabase.com)
2. Ve a **SQL Editor** y ejecuta el contenido de `supabase/migrations/001_initial.sql`
3. Copia las credenciales desde **Project Settings → API**:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (solo servidor, nunca en el cliente)

### 2. Variables de entorno

Copia `.env.example` a `.env.local` y completa los valores:

```bash
cp .env.example .env.local
```

Genera un `SESSION_SECRET` aleatorio (mínimo 16 caracteres).

### 3. Instalar y ejecutar

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

### 4. Usuario maestro

Por defecto se crea un admin con usuario: **`admin`**

Entra con ese nombre y podrás crear invitados desde el panel de administración.

## Despliegue en Vercel

1. Conecta el repositorio en [vercel.com](https://vercel.com)
2. Añade las mismas variables de entorno en **Project Settings → Environment Variables**
3. Despliega

## Estructura

```
src/
  app/
    login/          → Página de acceso
    invitation/     → Invitación personalizada
    admin/          → Panel del usuario maestro
    api/            → Rutas de autenticación y gestión de invitados
  components/       → UI con animaciones
  lib/              → Sesiones, i18n, Supabase
public/media/       → Fotos e iconos de la boda
```

## Personalización

- **Fecha y lugar:** edita `src/lib/i18n.ts` (`WEDDING_DATE`, textos `hero`)
- **Programa del día:** edita los horarios en `timeline` dentro de `i18n.ts`
- **Fotos:** añade imágenes en `public/media/fotos/` y actualiza el array `PHOTOS`
