# Concurso HackIAthon - Copago AI

MVP del reto **Estimador Agentico de Copago y Cobertura para el Paciente**.

La app permite seleccionar un paciente demo, escribir sintomas, consultar cobertura en MySQL, estimar copago y recomendar el hospital mas conveniente.

## Stack

- Next.js 14
- React 18
- TypeScript
- TailwindCSS
- Prisma
- MySQL
- OpenAI API
- Zod
- Vercel

## Requisitos

- Node.js 20 o superior
- npm
- Git
- Base de datos MySQL
- API key de OpenAI

## Instalacion

```bash
git clone https://github.com/jguevarav6/Concurso-hackIAthon.git
cd Concurso-hackIAthon
npm install
```

En Windows PowerShell, si `npm install` falla:

```powershell
npm.cmd install
```

## Variables de Entorno

Crear `.env.local` en la raiz:

```bash
DATABASE_URL="mysql://USER:PASSWORD@HOST:3306/copago_agent"
GEMINI_API_KEY="your-gemini-api-key"
GEMINI_MODEL="gemini-3.5-flash"
NEXT_PUBLIC_APP_NAME="Copago AI"
```

No subir `.env.local` al repositorio.

## Base de Datos

```bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

## Ejecutar Local

```bash
npm run dev
```

Abrir:

```txt
http://localhost:3000
```

## Verificacion

```bash
npm run lint
npm run build
```

## Deploy

Produccion:

```txt
https://concurso-psi.vercel.app
```

Deploy manual:

```bash
npx vercel
```

Deploy a produccion:

```bash
npx vercel --prod
```

## Documentacion

La arquitectura detallada esta en:

```txt
arquitectura.md
```
