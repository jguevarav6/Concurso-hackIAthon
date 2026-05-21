# Concurso HackIAthon - Copago AI

MVP para el reto **Estimador Agentico de Copago y Cobertura para el Paciente**.

La aplicacion permite que un paciente demo escriba sintomas, reciba una especialidad sugerida, consulte cobertura desde MySQL, calcule un copago estimado y vea el hospital de la red mas conveniente.

## Stack

- Next.js 14 con App Router
- React 18
- TypeScript
- TailwindCSS
- Prisma ORM
- MySQL
- OpenAI API
- Zod
- Vercel

## Requisitos

- Node.js 20 o superior
- npm
- Git
- Base de datos MySQL local o remota
- Cuenta/API key de OpenAI

## Instalacion

Clonar el repositorio:

```bash
git clone https://github.com/jguevarav6/Concurso-hackIAthon.git
cd Concurso-hackIAthon
```

Instalar dependencias:

```bash
npm install
```

En Windows PowerShell, si `npm install` falla por politica de ejecucion, usar:

```powershell
npm.cmd install
```

## Variables de Entorno

Crear un archivo `.env.local` en la raiz del proyecto.

Usar `.env.example` como referencia:

```bash
DATABASE_URL="mysql://USER:PASSWORD@HOST:3306/copago_agent"
OPENAI_API_KEY="sk-..."
NEXT_PUBLIC_APP_NAME="Copago AI"
```

Reglas:

- No subir `.env.local` al repositorio.
- Configurar las mismas variables en Vercel para produccion.
- `DATABASE_URL` debe apuntar a una base MySQL real.

## Base de Datos

Generar Prisma Client:

```bash
npm run prisma:generate
```

Crear migracion inicial cuando la base este configurada:

```bash
npm run prisma:migrate
```

Ejecutar seed:

```bash
npm run prisma:seed
```

Abrir Prisma Studio:

```bash
npm run prisma:studio
```

Nota: el seed actual es un placeholder. La siguiente fase debe cargar pacientes demo, planes, hospitales, especialidades y reglas de cobertura.

## Desarrollo Local

Ejecutar el servidor:

```bash
npm run dev
```

En Windows PowerShell:

```powershell
npm.cmd run dev
```

Abrir:

```txt
http://localhost:3000
```

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run prisma:studio
```

## Estructura

```txt
prisma/
  schema.prisma
  seed.ts

src/
  app/
    layout.tsx
    page.tsx
    api/
      chat/
        route.ts
      patients/
        route.ts
  components/
    landing/
    chat/
    results/
  lib/
    agents/
    services/
    copayCalculator.ts
    openai.ts
    prisma.ts
    validators.ts
  types/
    agent.ts
    database.ts
```

## Arquitectura

La solucion usa un monolito modular con Next.js:

```txt
Usuario
  -> Landing + Chat UI
  -> POST /api/chat
  -> Validacion con Zod
  -> symptomAgent
  -> coverageService
  -> hospitalService
  -> copayCalculator
  -> recommendationAgent
  -> responseComposer
  <- Respuesta estructurada para la UI
```

La IA no calcula dinero. Los copagos se calculan en TypeScript dentro del backend para mantener resultados deterministas.

Para mas detalle, revisar:

```txt
arquitectura.md
```

## Endpoints

### `GET /api/patients`

Carga pacientes demo para el selector.

Estado actual: endpoint scaffold.

### `POST /api/chat`

Recibe:

```json
{
  "patientId": 1,
  "message": "Tengo dolor fuerte en el pecho"
}
```

Devuelve respuesta estructurada para chat, cobertura, hospital recomendado, ranking y trazabilidad.

Estado actual: valida request y responde scaffold.

## Verificacion

Antes de subir cambios:

```bash
npm run lint
npm run build
```

Ultima verificacion realizada:

- `npm.cmd run build`: correcto
- despliegue Vercel: correcto
- URL produccion: `https://concurso-psi.vercel.app`

## Despliegue

El proyecto esta desplegado en Vercel:

```txt
https://concurso-psi.vercel.app
```

Para desplegar manualmente:

```bash
npx vercel
```

Para desplegar a produccion:

```bash
npx vercel --prod
```

Vercel necesita las variables:

```txt
DATABASE_URL
OPENAI_API_KEY
NEXT_PUBLIC_APP_NAME
```

## Estado Actual

Implementado:

- Arquitectura base del proyecto
- Configuracion Next.js, TypeScript, TailwindCSS y Prisma
- Componentes iniciales de landing, chat y resultados
- Rutas API base
- Tipos compartidos
- Servicios y agentes internos como scaffold
- Despliegue inicial en Vercel

Pendiente:

- Seed real de MySQL
- Implementar consultas reales con Prisma
- Integrar OpenAI en `symptomAgent` y `responseComposer`
- Conectar frontend con `/api/patients` y `/api/chat`
- Guardar sesiones, mensajes y estimaciones
- Completar manejo de errores y casos sin cobertura

## Reglas de Trabajo

- Trabajar cada cambio en una rama nueva.
- No commitear directo en `main` salvo instruccion explicita.
- No subir secretos.
- Mantener cambios pequenos y revisables.
- Ejecutar `npm run lint` y `npm run build` antes de cerrar una tarea.
