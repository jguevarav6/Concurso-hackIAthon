# Bitacora de Desarrollo

## 2026-05-20

- Se creo `arquitectura.md` con la arquitectura del MVP basada en `proyecto.md`.
- Se creo el esqueleto del proyecto Next.js con App Router, TailwindCSS, Prisma, rutas API, componentes, agentes internos, servicios y tipos.
- Se confirmo que `.env`, `.env.local` y `.env*.local` estan en `.gitignore`.
- Se agrego `skills/` a `.gitignore` porque es material de trabajo de Codex y no parte del producto final.
- Se instalaron dependencias con `npm.cmd install` usando acceso de red.
- Se genero Prisma Client con `npm.cmd run prisma:generate`.
- Se corrigio `next.config.ts` a `next.config.mjs` porque Next.js 14 no soporta config TypeScript.
- Verificacion: `npm.cmd run lint` y `npm.cmd run build` pasaron correctamente.
- Se ejecuto `npm.cmd audit --omit=dev`; reporto vulnerabilidades en `next` y `postcss`. No se aplico `npm audit fix --force` porque propone un salto mayor a Next 16.
- Se desplego la app en Vercel.
- URL de produccion: `https://concurso-psi.vercel.app`.
- URL tecnica del despliegue: `https://concurso-306f9ga10-jguevarav6s-projects.vercel.app`.
- Validacion: Vercel ejecuto build correctamente y la URL de produccion respondio HTTP 200.
- Nota: Vercel no pudo conectar automaticamente el repositorio de GitHub al proyecto, pero el despliegue manual quedo activo.
- Se actualizo `README.md` para que otros programadores puedan clonar, instalar, configurar variables, correr Prisma, ejecutar localmente, verificar y desplegar el proyecto.
- Se agrego al skill local la regla de usar una rama diferente por cada commit o tarea significativa.
- Se simplifico `README.md` para dejar solo descripcion, stack, requisitos, instalacion, variables, base de datos, ejecucion local, verificacion y deploy.
- Se dejo de ignorar `skills/` para que otros programadores tambien puedan usar las reglas locales del proyecto.
- Se agrego en `proyecto.md` el avance real del proyecto y el plan frontend dividido en tareas pequenas FE-01 a FE-10.
- Validacion: `npm.cmd run build` paso correctamente.
- Se completo FE-01 en la rama `frontend/base-layout`: layout responsive base, hero estructural, panel demo, sidebar sticky en desktop, orden mobile, tarjetas consistentes y estados visuales iniciales.
