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
- Se completo FE-02 en la rama `frontend/hero-section`: hero moderno con CTA principal, enlace al flujo tecnico, senales de valor y panel compacto de estado de demo.
- Se completo el frontend en la rama `frontend/complete-demo-ui`: selector de pacientes, chat funcional, ejemplos de sintomas, loading, respuesta mock, cobertura, ranking, trazabilidad, secciones informativas y QA responsive inicial.
- Validacion frontend: `npm.cmd run lint` y `npm.cmd run build` pasaron correctamente.

## 2026-05-22

- Se integró Gemini como motor de IA en reemplazo del mock estático (`buildMockResponse`).
- Se instaló `@google/genai` (SDK oficial) y se reescribió `src/lib/gemini.ts` usando `ai.models.generateContent`.
- Se agregaron `GEMINI_API_KEY` y `GEMINI_MODEL` a `.env`; el modelo se configura sin tocar código.
- Se implementó el pipeline completo en `src/app/api/chat/route.ts`: `symptomAgent` → cobertura → ranking de hospitales → Gemini genera el reply.
- `DemoExperience.tsx` ahora llama a `POST /api/chat` en lugar de `buildMockResponse` en el navegador.
- Se eliminó `buildMockResponse` de `src/lib/mock/demoData.ts`; el resto del archivo (pacientes, trazas, prompts) se mantiene.
- `symptomAgent` retorna `specialtySlug: "none"` para mensajes no médicos; el route responde con un saludo conversacional sin ejecutar el pipeline médico.
- Se añadió `systemInstruction` a Gemini con la identidad "Copago AI" y las reglas de comportamiento administrativo.
- Se renombró `runDemo` → `sendPatientMessage` en `DemoExperience.tsx` para mayor claridad.
