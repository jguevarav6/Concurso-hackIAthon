# Arquitectura del Proyecto

## Vision General

El proyecto sera un MVP funcional para el reto "Estimador Agentico de Copago y Cobertura para el Paciente".

La arquitectura recomendada es un monolito modular con Next.js, TypeScript, TailwindCSS, API Routes, Prisma, MySQL, OpenAI API y despliegue en Vercel.

Objetivo principal: entregar una aplicacion publica donde el evaluador pueda seleccionar un paciente demo, escribir sintomas, recibir una orientacion administrativa, consultar cobertura desde MySQL, ver el copago estimado y obtener un ranking de hospitales.

## Stack Tecnico

| Capa | Tecnologia | Uso |
| --- | --- | --- |
| Frontend | Next.js + React | Landing, demo, chat, resultados y trazabilidad |
| Lenguaje | TypeScript | Tipos, contratos API y reglas de negocio |
| Estilos | TailwindCSS | Layout responsive, componentes visuales, badges y paneles |
| Backend | Next.js Route Handlers | Endpoints internos de la aplicacion |
| Base de datos | MySQL | Persistencia real de pacientes, planes, hospitales, coberturas y estimaciones |
| ORM | Prisma | Schema, migraciones, seed y consultas tipadas |
| IA | OpenAI API | Clasificacion de sintomas y redaccion natural |
| Validacion | Zod | Validacion de requests y contratos internos |
| Iconos | lucide-react | Iconos UI livianos y consistentes |
| Deploy | Vercel | Publicacion del MVP |
| Repositorio | GitHub | Control de versiones y entrega |

## Tipo de Arquitectura

Se usara una arquitectura monolitica modular.

No se recomienda separar frontend y backend en proyectos distintos para este MVP, porque aumentaria el costo de coordinacion, despliegue y configuracion. Next.js permite concentrar UI, API, servicios y despliegue en una sola base de codigo.

La modularidad se mantiene separando responsabilidades por carpetas:

```txt
src/app
src/components
src/lib
src/types
prisma
```

## Flujo Principal

```txt
Usuario
  -> Landing + Demo
  -> Selecciona paciente demo
  -> Escribe sintomas
  -> POST /api/chat
  -> Zod valida request
  -> symptomAgent clasifica sintomas
  -> coverageService consulta poliza y cobertura en MySQL
  -> hospitalService consulta hospitales disponibles
  -> copayCalculator calcula copago
  -> recommendationAgent ordena hospitales
  -> conversationService guarda mensajes y estimacion
  -> responseComposer genera respuesta final
  <- JSON para pintar chat, cobertura, ranking y trazabilidad
```

## Frontend

El frontend sera una landing SaaS de una sola pagina con demo funcional integrada.

Responsabilidades:

- Mostrar propuesta del producto.
- Cargar pacientes demo desde `GET /api/patients`.
- Enviar sintomas a `POST /api/chat`.
- Mostrar conversacion.
- Mostrar cobertura, deducible, copago y hospital recomendado.
- Mostrar ranking de hospitales.
- Mostrar trazabilidad de subagentes.
- Manejar estados inicial, loading, exito, error y sin cobertura.

Estructura:

```txt
src/app/
  layout.tsx
  page.tsx
  api/
    chat/
      route.ts
    patients/
      route.ts

src/components/
  landing/
    Hero.tsx
    HowItWorks.tsx
    TechnicalSummary.tsx
  chat/
    ChatBox.tsx
    MessageBubble.tsx
    PatientSelector.tsx
    ExamplePrompts.tsx
  results/
    CoveragePanel.tsx
    HospitalCard.tsx
    HospitalRanking.tsx
    AgentTrace.tsx
```

El frontend no debe calcular dinero ni decidir cobertura. Esas decisiones pertenecen al backend.

## Componentes UI

Componentes principales:

| Componente | Responsabilidad |
| --- | --- |
| `Hero` | Presentar el producto y llevar al usuario a la demo |
| `HowItWorks` | Explicar el flujo de subagentes |
| `TechnicalSummary` | Mostrar stack y arquitectura de forma breve |
| `PatientSelector` | Seleccionar paciente demo consultado desde MySQL |
| `ChatBox` | Controlar input, envio, loading, errores y mensajes |
| `MessageBubble` | Renderizar mensajes del usuario y del agente |
| `ExamplePrompts` | Ofrecer sintomas de prueba |
| `CoveragePanel` | Mostrar plan, cobertura, deducible y copago |
| `HospitalCard` | Mostrar hospital recomendado |
| `HospitalRanking` | Mostrar hospitales ordenados por menor copago |
| `AgentTrace` | Mostrar pasos ejecutados por los subagentes |

## TailwindCSS

TailwindCSS sera el sistema de estilos principal.

Criterios:

- Usar componentes responsive.
- Mantener una UI limpia tipo SaaS de salud/seguros.
- Usar tarjetas, badges, paneles y estados visuales.
- Evitar un dashboard pesado.
- Mantener consistencia visual entre chat, cobertura y ranking.
- No introducir otra libreria de estilos salvo necesidad real.

Direccion visual recomendada:

- Fondo claro y profesional.
- Azul petroleo para confianza.
- Verde clinico para estados positivos.
- Amarillo o naranja suave para alertas.
- Rojo controlado para emergencia o errores.

## Backend

El backend vivira dentro de Next.js usando Route Handlers.

Endpoints:

```txt
GET /api/patients
POST /api/chat
```

Responsabilidades:

- Validar entradas.
- Consultar MySQL.
- Ejecutar subagentes internos.
- Calcular copagos.
- Guardar sesiones, mensajes y estimaciones.
- Responder con datos estructurados para la UI.
- Manejar errores sin romper la demo.

Estructura:

```txt
src/lib/
  prisma.ts
  openai.ts
  validators.ts
  copayCalculator.ts
  agents/
    symptomAgent.ts
    recommendationAgent.ts
    responseComposer.ts
  services/
    coverageService.ts
    hospitalService.ts
    conversationService.ts
```

## Subagentes Internos

Los subagentes del producto seran funciones especializadas, no un framework complejo de agentes.

| Subagente | Responsabilidad |
| --- | --- |
| `symptomAgent` | Clasificar sintomas, especialidad y urgencia |
| `coverageService` | Obtener plan, poliza y cobertura desde MySQL |
| `hospitalService` | Obtener hospitales que atienden la especialidad |
| `copayCalculator` | Calcular copago de forma deterministica |
| `recommendationAgent` | Ordenar hospitales y elegir el mas conveniente |
| `responseComposer` | Redactar respuesta natural con restricciones medicas |

Regla clave: la IA no calcula dinero. El dinero se calcula en TypeScript.

## Base de Datos

Base de datos: MySQL real.

ORM: Prisma.

Tablas principales:

```txt
patients
insurance_plans
patient_policies
specialties
hospitals
hospital_specialties
coverage_rules
copay_estimations
chat_sessions
chat_messages
```

Datos minimos:

- 3 pacientes demo.
- 3 planes.
- 5 especialidades.
- 4 hospitales.
- Reglas de cobertura variadas.
- 1 caso sin cobertura para probar error controlado.

## Contratos API

Endpoint de pacientes:

```txt
GET /api/patients
```

Uso:

- Alimentar `PatientSelector`.
- Mostrar pacientes demo.

Endpoint principal:

```txt
POST /api/chat
```

Entrada:

```txt
patientId
message
```

Salida:

```txt
reply
specialty
coverage
recommendedHospital
hospitalRanking
agentTrace
```

## Seguridad y Reglas Medicas

El agente debe orientar administrativamente, no diagnosticar.

Reglas:

- No diagnosticar enfermedades.
- No reemplazar criterio medico profesional.
- Recomendar emergencia ante sintomas alarmantes.
- Aclarar que el copago es estimado.
- Usar pacientes demo.
- No pedir datos medicos reales sensibles.

## Ambientes

## Local

```txt
.env.local
MySQL local o remoto de desarrollo
npm run dev
```

Uso: desarrollo rapido, seed y pruebas manuales.

## Preview

```txt
Vercel Preview Deployments
Variables configuradas en Vercel
Base staging opcional
```

Uso: validar ramas antes de produccion.

## Produccion

```txt
Vercel Production
MySQL remoto estable
Variables reales en Vercel
```

Uso: demo publica para entregar al hackathon.

## Despliegue

Arquitectura de despliegue:

```txt
Usuario
  -> Vercel
  -> Next.js App
  -> Route Handlers
  -> Prisma
  -> MySQL remoto
  -> OpenAI API
```

Variables requeridas:

```txt
DATABASE_URL
OPENAI_API_KEY
NEXT_PUBLIC_APP_NAME
```

Checklist de deploy:

- Crear base MySQL.
- Configurar `DATABASE_URL`.
- Ejecutar migraciones Prisma.
- Ejecutar seed.
- Configurar variables en Vercel.
- Ejecutar build.
- Probar la demo en navegador privado.

## Reglas de Separacion

Frontend:

```txt
src/app/page.tsx
src/components/landing/*
src/components/chat/*
src/components/results/*
```

Backend:

```txt
src/app/api/*
src/lib/*
src/types/*
prisma/*
```

Esta separacion reduce conflictos si trabajan dos personas.

## Riesgos Arquitectonicos

| Riesgo | Mitigacion |
| --- | --- |
| OpenAI falla o no hay credito | Fallback por keywords y respuesta por plantilla |
| MySQL falla en Vercel | Revisar `DATABASE_URL`, proveedor, SSL y migraciones |
| Calculo inconsistente | Calcular siempre en backend con funcion pura |
| UI incompleta | Priorizar chat, cobertura y hospital recomendado |
| Seed pobre | Preparar datos demo suficientes desde el inicio |
| Riesgo medico | Mantener lenguaje administrativo y disclaimer |
| Conflictos de Git | Separar carpetas de frontend y backend |

## Decision Final

La arquitectura final sera:

```txt
Next.js monolitico modular
+ React
+ TypeScript
+ TailwindCSS
+ Next.js Route Handlers
+ Prisma
+ MySQL
+ OpenAI API con fallback
+ Vercel
```

Esta arquitectura es suficiente para entregar un MVP funcional, desplegable y demostrable sin sobreingenieria.
