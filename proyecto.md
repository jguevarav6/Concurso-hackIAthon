# HackIAthon - Reto 3 - Guia tecnica detallada con MySQL

## 0. Introduccion del reto

Antes de completar el registro al hackIAthon, se busca evaluar capacidad de analisis, criterio tecnico y ejecucion con herramientas de IA. La prueba consiste en escoger un reto real y construir una solucion funcional.

Reto seleccionado: **Estimador Agentico de Copago y Cobertura para el Paciente**.

Descripcion del reto: un agente conversacional ayuda al paciente a entender su beneficio antes de atenderse. El paciente ingresa su sintoma, el agente sugiere la especialidad en el hospital y, cruzando datos con su plan de seguro, indica cuanto sera su copago y que hospital de la red le conviene mas economicamente.

Entregables solicitados por la organizacion:

- Enlace publico del agente funcional.
- Enlace del repositorio en GitHub o GitLab.

Correo de entrega: `hackiathon@viamatica.com`.

## 1. Decision del producto

La entrega debe ser un MVP funcional, no una plataforma hospitalaria completa. La prioridad es que el evaluador pueda abrir un enlace, probar el agente, ver que consulta datos reales en MySQL, calcule un copago y recomiende un hospital.

Decision recomendada:

- Construir una landing publica con demo interactiva.
- Incluir un chatbot funcional.
- Usar pacientes demo cargados desde MySQL.
- Usar una base de datos MySQL real.
- Calcular copagos en backend con reglas deterministicas.
- Usar IA para interpretar sintomas y redactar respuestas.
- Desplegar en Vercel.
- Documentar el proyecto en README.

El producto visualmente sera una sola pagina tipo SaaS: hero, explicacion breve, selector de paciente, chatbot, panel de resultados, ranking de hospitales, trazabilidad de subagentes y seccion tecnica corta.

## 2. Stack tecnico oficial del proyecto

| Capa | Tecnologia | Uso exacto | Motivo |
| --- | --- | --- | --- |
| Frontend | Next.js + React | Landing, chat, panel de resultados y componentes visuales | Permite frontend y backend en un solo proyecto |
| Lenguaje | TypeScript | Tipos de entidades, contratos API y respuestas del agente | Reduce errores y mejora mantenibilidad |
| Estilos | TailwindCSS | Layout, responsive, cards, badges y paneles | Rapido para construir UI limpia |
| Backend | Next.js API Routes | Endpoints `/api/chat` y `/api/patients` | Evita crear servidor separado |
| Base de datos | MySQL | Pacientes, polizas, planes, hospitales, especialidades, coberturas y estimaciones | Base real para demostrar persistencia |
| ORM | Prisma | Modelos, migraciones, consultas y seed | Facilita trabajar con MySQL desde TypeScript |
| IA | OpenAI API | Clasificacion de sintomas y respuesta natural | Da el componente conversacional |
| Validacion | Zod | Validar requests y respuestas internas | Evita datos invalidos en API |
| Deploy | Vercel | Publicacion de la app Next.js | Rapido para entregar link publico |
| Repositorio | GitHub | Entrega, control de versiones y colaboracion | Requisito del reto |

## 3. Comandos iniciales

```bash
npx create-next-app@latest copago-agent --typescript --tailwind --eslint --app --src-dir
cd copago-agent
npm install openai prisma @prisma/client mysql2 zod lucide-react
npx prisma init
```

Scripts esperados en `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev",
    "prisma:seed": "prisma db seed",
    "prisma:studio": "prisma studio"
  }
}
```

## 4. Variables de entorno

Archivo local: `.env.local`.

Archivo de ejemplo para el repo: `.env.example`.

```bash
DATABASE_URL="mysql://USER:PASSWORD@HOST:3306/copago_agent"
OPENAI_API_KEY="sk-..."
NEXT_PUBLIC_APP_NAME="Copago AI"
```

Reglas:

- No subir `.env.local` al repositorio.
- Subir solo `.env.example` sin secretos.
- Configurar las mismas variables en Vercel.
- Validar que `DATABASE_URL` apunte a MySQL real, local o remoto.

## 5. Arquitectura general

Arquitectura monolitica modular con Next.js:

```txt
Navegador
  -> Landing + Chat UI
  -> POST /api/chat
  -> validateRequest()
  -> symptomAgent()
  -> coverageService(MySQL)
  -> hospitalService(MySQL)
  -> copayCalculator()
  -> recommendationAgent()
  -> responseComposer()
  <- JSON final para pintar chat, cobertura y ranking
```

Capas internas:

| Capa | Carpeta | Responsabilidad |
| --- | --- | --- |
| UI | `src/components` | Chat, paneles, cards, loaders, estados de error |
| Pagina | `src/app/page.tsx` | Composicion de landing y demo |
| API | `src/app/api/chat/route.ts` | Endpoint principal del agente |
| DB | `src/lib/prisma.ts` | Cliente Prisma conectado a MySQL |
| Servicios | `src/lib/services` | Consultas de polizas, coberturas y hospitales |
| Agentes | `src/lib/agents` | Clasificar sintomas, recomendar y redactar respuesta |
| Calculo | `src/lib/copayCalculator.ts` | Formula deterministica de copago |
| Tipos | `src/types` | Contratos TypeScript compartidos |
| Prisma | `prisma` | Schema, migraciones y seed |

## 6. Estructura de carpetas recomendada

```txt
copago-agent/
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
    lib/
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
    types/
      agent.ts
      database.ts
  .env.example
  README.md
  AGENTS.md
```

## 7. Modelo de datos MySQL

La base debe ser real. Los datos pueden ser demo, pero deben estar persistidos en MySQL y consultarse desde el backend.

Tablas principales:

| Tabla | Proposito | Campos clave |
| --- | --- | --- |
| `patients` | Pacientes de prueba | `id`, `full_name`, `document_number`, `age`, `city` |
| `insurance_plans` | Planes de seguro | `id`, `name`, `deductible` |
| `patient_policies` | Poliza activa del paciente | `patient_id`, `plan_id`, `status`, `start_date`, `end_date` |
| `specialties` | Especialidades medicas | `id`, `name`, `slug`, `keywords` |
| `hospitals` | Hospitales de la red | `id`, `name`, `city`, `base_consultation_price`, `network_level` |
| `hospital_specialties` | Relacion hospital-especialidad | `hospital_id`, `specialty_id`, `active` |
| `coverage_rules` | Reglas de cobertura por plan | `plan_id`, `specialty_id`, `coverage_percent`, `fixed_copay` |
| `copay_estimations` | Historial de calculos | `patient_id`, `hospital_id`, `specialty_id`, `amount` |
| `chat_sessions` | Sesiones del chat | `patient_id`, `created_at` |
| `chat_messages` | Mensajes del chat | `session_id`, `role`, `content` |

Relaciones:

- Un paciente puede tener una o varias polizas.
- Una poliza pertenece a un plan.
- Un plan tiene reglas de cobertura por especialidad.
- Un hospital atiende varias especialidades.
- Una especialidad puede estar disponible en varios hospitales.
- Una estimacion guarda el resultado del copago calculado.
- Una sesion de chat guarda mensajes de usuario y asistente.

## 8. Formula de copago

La IA no debe calcular dinero. El dinero se calcula en TypeScript para mantener consistencia.

```txt
precio_base = hospital.base_consultation_price
cobertura = coverage_rule.coverage_percent / 100
copago_variable = precio_base * (1 - cobertura)

si fixed_copay existe:
  copago_final = min(fixed_copay, copago_variable)
si no:
  copago_final = copago_variable

hospital_recomendado = hospital con menor copago_final
```

Reglas adicionales:

- Redondear a 2 decimales.
- Si el plan no cubre la especialidad, mostrar cobertura limitada o no disponible.
- Si no hay hospitales para la especialidad, responder que no hay red disponible para ese caso.
- Si el sintoma es grave, priorizar emergencia sobre ahorro economico.

## 9. Subagentes y automatizacion

No se requiere framework complejo de agentes. Los subagentes seran funciones especializadas dentro del backend.

| Subagente | Entrada | Salida | Implementacion |
| --- | --- | --- | --- |
| `symptomAgent` | Texto del paciente | `specialtySlug`, `urgencyLevel`, `reasoning` | OpenAI + fallback por keywords |
| `coverageAgent` | `patientId`, `specialtyId` | Plan, cobertura, deducible, copago fijo | Query MySQL con Prisma |
| `copayAgent` | Hospitales + regla de cobertura | Copago por hospital | Funcion pura en TypeScript |
| `recommendationAgent` | Ranking de hospitales | Mejor hospital | Ordenamiento por menor copago |
| `responseComposer` | Resultado estructurado | Respuesta natural | OpenAI o plantilla fallback |

Flujo automatizado:

1. Usuario selecciona paciente demo.
2. Usuario escribe sintomas.
3. `/api/chat` valida el request con Zod.
4. `symptomAgent` clasifica especialidad.
5. `coverageService` busca la poliza activa en MySQL.
6. `hospitalService` busca hospitales que atienden esa especialidad.
7. `copayCalculator` calcula copago por hospital.
8. `recommendationAgent` elige el hospital mas conveniente.
9. `conversationService` guarda mensajes y estimacion.
10. `responseComposer` genera respuesta natural.
11. Frontend muestra chat, cobertura, ranking y trazabilidad.

## 10. Reglas de seguridad medica del agente

El sistema debe evitar prometer diagnosticos. Debe orientar administrativamente sobre especialidad, cobertura y costos.

Reglas:

- No diagnosticar enfermedades.
- No reemplazar criterio medico profesional.
- Recomendar emergencia ante dolor de pecho intenso, dificultad respiratoria, desmayo, sangrado severo o sintomas alarmantes.
- Aclarar que el copago es estimado.
- No pedir datos medicos reales sensibles.
- Usar pacientes demo.

Frase sugerida para respuestas:

```txt
Esta es una orientacion administrativa y de cobertura. No reemplaza una evaluacion medica profesional. El copago mostrado es estimado y puede variar segun validacion final del hospital o aseguradora.
```

## 11. API principal

Endpoint principal:

```txt
POST /api/chat
```

Request:

```json
{
  "patientId": 1,
  "message": "Tengo dolor fuerte en el pecho y fiebre desde ayer"
}
```

Response esperado:

```json
{
  "reply": "Por tus sintomas, lo mas prudente es atencion por Emergencias. Tu plan cubre el 80% y el hospital mas conveniente es Hospital Metropolitano con un copago estimado de 25.00.",
  "specialty": {
    "id": 3,
    "name": "Emergencias",
    "slug": "emergencias",
    "urgencyLevel": "high"
  },
  "coverage": {
    "planName": "Plan Premium",
    "coveragePercent": 80,
    "fixedCopay": 25,
    "deductible": 100
  },
  "recommendedHospital": {
    "id": 1,
    "name": "Hospital Metropolitano",
    "city": "Quito",
    "basePrice": 120,
    "estimatedCopay": 25,
    "networkLevel": "premium"
  },
  "hospitalRanking": [
    {
      "id": 1,
      "name": "Hospital Metropolitano",
      "city": "Quito",
      "basePrice": 120,
      "estimatedCopay": 25,
      "networkLevel": "premium"
    }
  ],
  "agentTrace": [
    "Sintomas clasificados",
    "Cobertura consultada en MySQL",
    "Copago calculado",
    "Hospital recomendado"
  ]
}
```

Validaciones:

- `patientId` requerido.
- `patientId` debe existir en MySQL.
- `message` requerido.
- `message` minimo 5 caracteres.
- `message` maximo 800 caracteres.
- Si OpenAI falla, usar fallback.
- Si no hay cobertura, responder sin romper la app.

Endpoint secundario:

```txt
GET /api/patients
```

Uso: cargar pacientes demo en el selector.

Response:

```json
[
  {
    "id": 1,
    "fullName": "Paciente Demo Premium",
    "documentNumber": "0102030405",
    "city": "Quito"
  }
]
```

## 12. Componentes visuales

No construir un dashboard pesado. Construir una landing con demo funcional.

Componentes:

| Componente | Archivo | Responsabilidad |
| --- | --- | --- |
| Hero | `components/landing/Hero.tsx` | Presenta el producto y boton para probar agente |
| HowItWorks | `components/landing/HowItWorks.tsx` | Explica flujo de subagentes |
| PatientSelector | `components/chat/PatientSelector.tsx` | Selector de pacientes demo desde MySQL |
| ChatBox | `components/chat/ChatBox.tsx` | Chat, input, boton, loading y errores |
| MessageBubble | `components/chat/MessageBubble.tsx` | Render de mensajes usuario/agente |
| ExamplePrompts | `components/chat/ExamplePrompts.tsx` | Botones con sintomas de prueba |
| CoveragePanel | `components/results/CoveragePanel.tsx` | Plan, cobertura, deducible y copago |
| HospitalCard | `components/results/HospitalCard.tsx` | Hospital recomendado o ranking |
| HospitalRanking | `components/results/HospitalRanking.tsx` | Lista ordenada por copago |
| AgentTrace | `components/results/AgentTrace.tsx` | Pasos ejecutados por los subagentes |

Layout desktop:

```txt
Header
Hero
Demo Section
  Chat 60% ancho
  Panel de resultados 40% ancho
Ranking de hospitales
Como funciona
Footer
```

Layout mobile:

```txt
Hero
Selector paciente
Chat
Panel de resultados
Ranking de hospitales
Como funciona
Footer
```

Estados visuales:

- Inicial: instrucciones y ejemplos de sintomas.
- Loading: "Analizando sintomas y cobertura...".
- Exito: respuesta, cobertura y hospital recomendado.
- Error: mensaje controlado si API o DB fallan.
- Sin cobertura: mensaje claro y alternativa.

## 13. Tareas separadas para dos personas

Regla central: dividir por carpetas para no chocar cambios.

### Persona 1 - Frontend y UI

Rama: `feature/frontend-ui`.

Archivos principales:

```txt
src/app/page.tsx
src/components/landing/*
src/components/chat/*
src/components/results/*
```

Tareas:

1. Crear layout base en `page.tsx`.
2. Crear `Hero.tsx` con nombre del producto, descripcion y CTA.
3. Crear `PatientSelector.tsx` con datos mock temporales.
4. Crear `ChatBox.tsx` con mensajes, input, boton y loading.
5. Crear `MessageBubble.tsx` para usuario y agente.
6. Crear `ExamplePrompts.tsx` con ejemplos: cardiologia, dermatologia, traumatologia, emergencia.
7. Crear `CoveragePanel.tsx` para plan, cobertura, deducible y copago.
8. Crear `HospitalCard.tsx` para hospital recomendado.
9. Crear `HospitalRanking.tsx` para lista de hospitales ordenados.
10. Crear `AgentTrace.tsx` para pasos de automatizacion.
11. Conectar `ChatBox` a `POST /api/chat` cuando el backend este listo.
12. Conectar `PatientSelector` a `GET /api/patients` cuando el backend este listo.
13. Agregar estados: inicial, loading, exito, error, sin cobertura.
14. Pulir responsive desktop/mobile.
15. Revisar que el build no falle.

### Persona 2 - Backend, IA y MySQL

Rama: `feature/backend-agents`.

Archivos principales:

```txt
prisma/schema.prisma
prisma/seed.ts
src/app/api/chat/route.ts
src/app/api/patients/route.ts
src/lib/prisma.ts
src/lib/openai.ts
src/lib/validators.ts
src/lib/copayCalculator.ts
src/lib/agents/*
src/lib/services/*
src/types/*
```

Tareas:

1. Configurar Prisma con MySQL.
2. Crear `schema.prisma`.
3. Ejecutar migracion inicial.
4. Crear seed con pacientes, planes, hospitales, especialidades y reglas de cobertura.
5. Crear `src/lib/prisma.ts`.
6. Crear `src/lib/openai.ts`.
7. Crear validadores Zod.
8. Crear `GET /api/patients`.
9. Crear `POST /api/chat` con respuesta mock inicial.
10. Implementar `symptomAgent.ts`.
11. Implementar fallback por keywords.
12. Implementar `coverageService.ts`.
13. Implementar `hospitalService.ts`.
14. Implementar `copayCalculator.ts`.
15. Implementar `recommendationAgent.ts`.
16. Implementar `responseComposer.ts`.
17. Guardar sesiones y mensajes en MySQL.
18. Guardar estimaciones en MySQL.
19. Manejar errores de DB y OpenAI.
20. Validar build y lint.

## 14. Plan de ejecucion en tres dias

### Dia 1 - Base del proyecto

Persona 1:

- Crear layout inicial.
- Crear hero.
- Crear chat visual con datos mock.
- Crear panel de resultados mock.
- Crear cards de hospitales mock.
- Subir primer commit de UI.

Persona 2:

- Crear repo y configurar dependencias.
- Configurar Prisma.
- Crear schema MySQL.
- Crear migracion.
- Crear seed.
- Crear endpoint `GET /api/patients`.
- Crear endpoint `POST /api/chat` con respuesta mock.

Meta del dia 1:

- La app corre local.
- Hay UI visible.
- MySQL tiene datos.
- Existe un primer endpoint funcional.

### Dia 2 - Integracion real

Persona 1:

- Conectar chat con `/api/chat`.
- Conectar selector con `/api/patients`.
- Pintar respuesta real.
- Pintar cobertura y ranking real.
- Agregar loading/error.

Persona 2:

- Implementar `symptomAgent`.
- Implementar `coverageService`.
- Implementar `hospitalService`.
- Implementar `copayCalculator`.
- Implementar `recommendationAgent`.
- Implementar `responseComposer`.
- Integrar OpenAI con fallback.

Meta del dia 2:

- El agente responde con datos de MySQL.
- Calcula copago.
- Recomienda hospital.
- La UI muestra resultados.

### Dia 3 - Pulido y entrega

Persona 1:

- Pulir responsive.
- Mejorar textos de la landing.
- Agregar ejemplos de prueba.
- Revisar errores visuales.
- Tomar capturas para README.

Persona 2:

- Probar casos de demo.
- Ajustar seed.
- Configurar variables en Vercel.
- Ejecutar migraciones en produccion.
- Probar deploy.
- Completar README tecnico.

Meta del dia 3:

- Link publico funcionando.
- Repo limpio.
- README claro.
- Demo probada en navegador privado.
- Correo listo para enviar.

## 15. Git y reglas anti-conflicto

Ramas:

| Rama | Responsable | Archivos permitidos |
| --- | --- | --- |
| `main` | Ambos | Solo merges estables |
| `feature/frontend-ui` | Persona 1 | `src/app/page.tsx`, `src/components/*` |
| `feature/backend-agents` | Persona 2 | `src/app/api/*`, `src/lib/*`, `prisma/*`, `src/types/*` |
| `fix/deploy` | Ambos si hace falta | Fixes de build, deploy o README |

Reglas:

- No editar el mismo archivo al mismo tiempo.
- Definir tipos compartidos temprano.
- Hacer commits pequenos.
- Antes de merge: `npm run lint` y `npm run build`.
- Revisar diff antes de unir ramas.
- Si hay conflicto, resolver con llamada corta, no por chat infinito.

Convencion de commits:

```txt
feat(ui): add chat layout
feat(db): add prisma schema and seed
feat(api): add chat endpoint
feat(agent): implement symptom classifier
feat(copay): calculate hospital copays
fix(api): handle missing coverage rule
docs(readme): add setup instructions
```

## 16. Prisma schema base

```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Patient {
  id             Int               @id @default(autoincrement())
  fullName       String
  documentNumber String            @unique
  age            Int
  city           String
  policies       PatientPolicy[]
  estimations    CopayEstimation[]
  sessions       ChatSession[]
}

model InsurancePlan {
  id            Int             @id @default(autoincrement())
  name          String
  deductible    Decimal         @db.Decimal(10, 2)
  policies      PatientPolicy[]
  coverageRules CoverageRule[]
}

model PatientPolicy {
  id        Int       @id @default(autoincrement())
  patientId Int
  planId    Int
  status    String
  startDate DateTime
  endDate   DateTime?
  patient   Patient       @relation(fields: [patientId], references: [id])
  plan      InsurancePlan @relation(fields: [planId], references: [id])
}

model Specialty {
  id                  Int                 @id @default(autoincrement())
  name                String
  slug                String              @unique
  keywords            String              @db.Text
  coverageRules       CoverageRule[]
  hospitalSpecialties HospitalSpecialty[]
}

model Hospital {
  id                    Int                 @id @default(autoincrement())
  name                  String
  city                  String
  baseConsultationPrice Decimal             @db.Decimal(10, 2)
  networkLevel          String
  hospitalSpecialties   HospitalSpecialty[]
  estimations           CopayEstimation[]
}

model HospitalSpecialty {
  id          Int       @id @default(autoincrement())
  hospitalId  Int
  specialtyId Int
  active      Boolean   @default(true)
  hospital    Hospital  @relation(fields: [hospitalId], references: [id])
  specialty   Specialty @relation(fields: [specialtyId], references: [id])
}

model CoverageRule {
  id              Int           @id @default(autoincrement())
  planId          Int
  specialtyId     Int
  coveragePercent Int
  fixedCopay      Decimal?      @db.Decimal(10, 2)
  plan            InsurancePlan @relation(fields: [planId], references: [id])
  specialty       Specialty     @relation(fields: [specialtyId], references: [id])
}

model CopayEstimation {
  id          Int       @id @default(autoincrement())
  patientId   Int
  hospitalId  Int
  specialtyId Int
  amount      Decimal   @db.Decimal(10, 2)
  createdAt   DateTime  @default(now())
  patient     Patient   @relation(fields: [patientId], references: [id])
  hospital    Hospital  @relation(fields: [hospitalId], references: [id])
}

model ChatSession {
  id        Int           @id @default(autoincrement())
  patientId Int
  createdAt DateTime      @default(now())
  patient   Patient       @relation(fields: [patientId], references: [id])
  messages  ChatMessage[]
}

model ChatMessage {
  id        Int         @id @default(autoincrement())
  sessionId Int
  role      String
  content   String      @db.Text
  createdAt DateTime    @default(now())
  session   ChatSession @relation(fields: [sessionId], references: [id])
}
```

## 17. Seed minimo recomendado

Datos minimos:

- 3 pacientes demo: Basico, Plus y Premium.
- 3 planes: Plan Basico, Plan Plus, Plan Premium.
- 5 especialidades: cardiologia, dermatologia, traumatologia, gastroenterologia, emergencias.
- 4 hospitales en red con precios distintos.
- Reglas de cobertura diferentes por plan.
- Un caso sin cobertura para probar error controlado.

Ejemplo de pacientes:

```txt
Paciente Demo Basico - Plan Basico - Guayaquil
Paciente Demo Plus - Plan Plus - Quito
Paciente Demo Premium - Plan Premium - Quito
```

Ejemplo de hospitales:

```txt
Hospital Metropolitano - Quito - premium - precio base 120
Clinica Central - Quito - plus - precio base 90
Hospital del Valle - Quito - plus - precio base 75
Centro Medico Familiar - Guayaquil - basico - precio base 45
```

Ejemplo de reglas:

```txt
Plan Basico + Dermatologia = 50% cobertura
Plan Basico + Traumatologia = 40% cobertura
Plan Plus + Cardiologia = 70% cobertura
Plan Plus + Emergencias = 60% cobertura
Plan Premium + Cardiologia = 80% cobertura, copago fijo 25
Plan Premium + Emergencias = 85% cobertura, copago fijo 30
```

## 18. Prompt del Symptom Agent

```txt
Eres un clasificador administrativo de sintomas para un demo de seguros medicos.
No diagnostiques enfermedades. Solo sugiere una especialidad probable.
Devuelve exclusivamente JSON valido.

Formato:
{
  "specialtySlug": "cardiologia | dermatologia | traumatologia | gastroenterologia | emergencias",
  "urgencyLevel": "low | medium | high",
  "reasoning": "frase corta"
}

Especialidades disponibles:
- cardiologia
- dermatologia
- traumatologia
- gastroenterologia
- emergencias

Reglas:
- Si hay dolor de pecho intenso, dificultad respiratoria, desmayo, sangrado severo o sintomas alarmantes, usa emergencias y urgencyLevel high.
- Si el texto es ambiguo, usa la especialidad mas probable y reasoning breve.
- No des diagnosticos.
```

## 19. Fallback por keywords

El fallback permite que el demo no muera si OpenAI falla.

```txt
pecho, palpitaciones, corazon -> cardiologia
piel, manchas, picazon, sarpullido -> dermatologia
rodilla, fractura, golpe, caida, hueso -> traumatologia
estomago, vomito, diarrea, gastritis -> gastroenterologia
respirar, desmayo, sangrado, emergencia, dolor fuerte -> emergencias
```

## 20. Contrato TypeScript recomendado

```ts
export type UrgencyLevel = 'low' | 'medium' | 'high';

export type AgentResponse = {
  reply: string;
  specialty: {
    id: number;
    name: string;
    slug: string;
    urgencyLevel: UrgencyLevel;
  };
  coverage: {
    planName: string;
    coveragePercent: number;
    fixedCopay?: number | null;
    deductible: number;
  } | null;
  recommendedHospital: HospitalRecommendation | null;
  hospitalRanking: HospitalRecommendation[];
  agentTrace: string[];
};

export type HospitalRecommendation = {
  id: number;
  name: string;
  city: string;
  basePrice: number;
  estimatedCopay: number;
  networkLevel: string;
};
```

## 21. Casos de prueba para la demo

| Caso | Mensaje de usuario | Resultado esperado |
| --- | --- | --- |
| Emergencia | Tengo dolor fuerte en el pecho y me cuesta respirar | Emergencias, urgencia alta, advertencia de atencion inmediata |
| Cardiologia | Tengo palpitaciones y dolor leve en el pecho | Cardiologia, cobertura y ranking de hospitales |
| Dermatologia | Tengo manchas rojas en la piel y mucha picazon | Dermatologia, copago calculado |
| Traumatologia | Me cai y me duele mucho la rodilla | Traumatologia, hospital recomendado |
| Gastro | Tengo dolor de estomago y vomito desde ayer | Gastroenterologia, cobertura y copago |
| Sin cobertura | Necesito atencion dental | Mensaje de cobertura no disponible o especialidad no soportada |
| Ambiguo | Me siento mal | Pedir mas detalle o dar orientacion general sin romper la app |

## 22. README minimo

El `README.md` debe incluir:

- Nombre del proyecto.
- Reto seleccionado.
- Problema.
- Solucion.
- Stack tecnico.
- Arquitectura.
- Flujo de agentes.
- Modelo de datos MySQL.
- Variables de entorno.
- Instalacion local.
- Comandos Prisma.
- Link de produccion.
- Capturas o GIF.
- Integrantes.

## 23. Deploy con MySQL y Vercel

Checklist:

1. Crear base MySQL local o remota.
2. Configurar `DATABASE_URL`.
3. Ejecutar `npx prisma generate`.
4. Ejecutar `npx prisma migrate dev --name init` en local.
5. Ejecutar `npx prisma db seed`.
6. Probar `npm run dev`.
7. Subir repo a GitHub.
8. Importar proyecto en Vercel.
9. Agregar `DATABASE_URL` y `OPENAI_API_KEY` en Vercel.
10. Ejecutar migracion en base de produccion si aplica.
11. Probar app desplegada.
12. Probar en navegador privado.

Comandos utiles:

```bash
npm run dev
npm run lint
npm run build
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
npx prisma studio
npx prisma migrate deploy
```

## 24. Riesgos y plan B

| Riesgo | Impacto | Plan B |
| --- | --- | --- |
| OpenAI falla o no hay credito | El chat no responde con IA | Fallback por keywords y plantilla |
| MySQL no conecta en Vercel | No hay datos reales en produccion | Verificar connection string, SSL y proveedor MySQL |
| No alcanza el tiempo para todo el UI | Demo incompleta | Priorizar chat, cobertura y hospital recomendado |
| Conflictos de Git | Perdida de tiempo | Separar carpetas y hacer merges frecuentes |
| Calculos inconsistentes | Pierde credibilidad | Calcular siempre en backend, no en prompt |
| Seed pobre | Demo se ve vacia | Crear minimo 3 pacientes, 4 hospitales y 5 especialidades |

## 25. Criterio de exito

El proyecto esta listo si cumple esto:

- El enlace publico abre correctamente.
- El usuario puede seleccionar un paciente demo.
- El usuario puede escribir sintomas.
- El agente responde automaticamente.
- La especialidad sugerida aparece en pantalla.
- La cobertura se consulta desde MySQL.
- El copago se calcula en backend.
- El hospital recomendado aparece con ranking.
- Hay trazabilidad de subagentes.
- El repositorio tiene README y `.env.example`.
- El proyecto compila con `npm run build`.

## 26. Correo de entrega

```txt
Asunto: Entrega Reto #3 - Estimador Agentico de Copago y Cobertura

Hola equipo HackIAthon,

Compartimos nuestra solucion funcional para el Reto #3.

Agente desplegado: https://...
Repositorio: https://github.com/...

La solucion implementa un agente conversacional que analiza sintomas, recomienda especialidad, consulta poliza en MySQL, calcula copago estimado y recomienda el hospital de la red mas conveniente economicamente.

Saludos,
[Nombre 1] y [Nombre 2]
```

## 27. Avance real del proyecto

### Estado actual

- Repositorio GitHub: `https://github.com/jguevarav6/Concurso-hackIAthon`
- Deploy Vercel: `https://concurso-psi.vercel.app`
- Arquitectura base creada.
- Estructura Next.js, TailwindCSS, Prisma, componentes, rutas API, agentes internos, servicios y tipos creada.
- README corto de instalacion creado.
- Build actual funcionando.

### Regla de trabajo

- Cada tarea significativa debe hacerse en una rama diferente.
- No trabajar directo sobre `main` salvo instruccion explicita.
- Registrar avances importantes en este archivo.
- Mantener `development.md` como bitacora breve del proyecto.

## 28. Plan frontend por tareas pequenas

El objetivo de esta fase es construir solo el frontend, sin implementar todavia la logica real de backend/MySQL/OpenAI.

### Tarea FE-01: Base visual y layout general

Rama sugerida: `frontend/base-layout`

Alcance:

- Revisar `src/app/page.tsx`.
- Definir estructura responsive principal.
- Crear layout desktop con hero, demo, resultados y secciones inferiores.
- Crear layout mobile con orden claro: hero, selector, chat, resultados, ranking y flujo.
- Mantener TailwindCSS como sistema de estilos.

Criterio de aceptacion:

- La pagina se ve ordenada en mobile y desktop.
- No hay solapamientos ni textos cortados.
- `npm run build` pasa.

### Tarea FE-02: Hero moderno

Rama sugerida: `frontend/hero-section`

Alcance:

- Mejorar `Hero.tsx`.
- Usar copy breve y claro.
- Agregar CTA visual hacia la demo.
- Aplicar colores claros, jerarquia tipografica y buen espaciado.

Criterio de aceptacion:

- El primer viewport comunica rapidamente que hace Copago AI.
- El diseno se ve moderno sin parecer dashboard pesado.
- Funciona bien en mobile.

### Tarea FE-03: Selector de paciente demo

Rama sugerida: `frontend/patient-selector`

Alcance:

- Mejorar `PatientSelector.tsx`.
- Mostrar informacion util del paciente demo.
- Preparar estado visual para loading/error cuando se conecte al backend.
- Mantener API futura compatible con `GET /api/patients`.

Criterio de aceptacion:

- El selector es claro, accesible y responsive.
- Se entiende que son pacientes demo.

### Tarea FE-04: Chat UI

Rama sugerida: `frontend/chat-ui`

Alcance:

- Mejorar `ChatBox.tsx`.
- Mejorar `MessageBubble.tsx`.
- Mejorar `ExamplePrompts.tsx`.
- Crear estados visuales: inicial, escribiendo, loading, error y exito simulado.
- Preparar conexion futura a `POST /api/chat`.

Criterio de aceptacion:

- El chat se siente usable y claro.
- El input, boton y ejemplos funcionan visualmente en mobile y desktop.
- No se calcula nada en frontend.

### Tarea FE-05: Panel de cobertura

Rama sugerida: `frontend/coverage-panel`

Alcance:

- Mejorar `CoveragePanel.tsx`.
- Mostrar plan, cobertura, deducible, copago estimado y disclaimer.
- Preparar estados: sin estimacion, con cobertura, sin cobertura y error.

Criterio de aceptacion:

- La informacion financiera se lee rapido.
- El copago se presenta como estimado.
- El panel no se rompe con valores largos.

### Tarea FE-06: Ranking de hospitales

Rama sugerida: `frontend/hospital-ranking`

Alcance:

- Mejorar `HospitalCard.tsx`.
- Mejorar `HospitalRanking.tsx`.
- Mostrar hospital recomendado, ciudad, nivel de red, precio base y copago.
- Preparar estado vacio.

Criterio de aceptacion:

- El hospital recomendado destaca sin saturar la pantalla.
- El ranking es legible en mobile.

### Tarea FE-07: Trazabilidad de subagentes

Rama sugerida: `frontend/agent-trace`

Alcance:

- Mejorar `AgentTrace.tsx`.
- Mostrar pasos del flujo: sintomas, cobertura, copago, recomendacion y respuesta.
- Usar estados visuales: pendiente, activo y completado.

Criterio de aceptacion:

- El evaluador entiende que hay automatizacion por subagentes.
- El componente se mantiene simple y claro.

### Tarea FE-08: Secciones informativas

Rama sugerida: `frontend/info-sections`

Alcance:

- Mejorar `HowItWorks.tsx`.
- Mejorar `TechnicalSummary.tsx`.
- Explicar flujo y stack sin mucho texto.
- Mantener diseno moderno, claro y responsive.

Criterio de aceptacion:

- Las secciones ayudan al evaluador sin distraer de la demo.
- No parecen una landing generica.

### Tarea FE-09: Integracion visual con datos mock

Rama sugerida: `frontend/mock-state-integration`

Alcance:

- Crear estado local mock para simular respuesta del agente.
- Conectar visualmente chat, cobertura, ranking y trazabilidad.
- Mantener contratos compatibles con `src/types/agent.ts`.

Criterio de aceptacion:

- La demo se puede recorrer visualmente sin backend real.
- Los datos mock son coherentes con el reto.

### Tarea FE-10: QA responsive y accesibilidad

Rama sugerida: `frontend/responsive-a11y-qa`

Alcance:

- Revisar mobile, tablet y desktop.
- Revisar labels, contraste, focus visible, botones, inputs y estructura semantica.
- Ajustar espaciados, tamanos y overflow.

Criterio de aceptacion:

- No hay textos superpuestos.
- Los controles son usables en mobile.
- `npm run lint` y `npm run build` pasan.

### Avance frontend

| Tarea | Estado | Rama | Notas |
| --- | --- | --- | --- |
| FE-01 Base visual y layout general | Completado | `frontend/base-layout` | Layout responsive base creado para mobile y desktop |
| FE-02 Hero moderno | Completado | `frontend/hero-section` | Hero con CTA, senales de valor y panel de estado |
| FE-03 Selector de paciente demo | Completado | `frontend/complete-demo-ui` | Selector funcional con datos mock de pacientes |
| FE-04 Chat UI | Completado | `frontend/complete-demo-ui` | Chat funcional con input, ejemplos, loading y mensajes |
| FE-05 Panel de cobertura | Completado | `frontend/complete-demo-ui` | Panel conectado a respuesta mock con plan, cobertura y deducible |
| FE-06 Ranking de hospitales | Completado | `frontend/complete-demo-ui` | Ranking mock con hospital recomendado y copagos |
| FE-07 Trazabilidad de subagentes | Completado | `frontend/complete-demo-ui` | Pasos visuales con estados pendiente/completado |
| FE-08 Secciones informativas | Completado | `frontend/complete-demo-ui` | Flujo y resumen tecnico mejorados |
| FE-09 Integracion visual con datos mock | Completado | `frontend/complete-demo-ui` | Demo frontend conectada con estado local mock |
| FE-10 QA responsive y accesibilidad | Completado | `frontend/complete-demo-ui` | `npm run lint` y `npm run build` pasaron |
