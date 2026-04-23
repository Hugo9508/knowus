/**
 * RELATIONAL OS — Isla 1: Raíces 🌱
 * "Quién sos antes de ser nosotros. El origen."
 * 
 * Teorías base: Gottman Love Map, Teoría del Apego (Bowlby),
 *               Sistemas Familiares (Bowen)
 * Visibilidad: Nivel 1-2 (contenido seguro, primer contacto)
 * Color: #8B6914 (ámbar tierra)
 */

export const ISLA_RAICES = {
  id: 'raices',
  name: 'Raíces',
  subtitle: 'Quién sos antes de ser nosotros',
  description: 'El origen. Tu historia, tu temperamento, los patrones que heredaste y los que elegiste. Raíces es el mapa de quién sos cuando nadie te mira.',
  emoji: '🌱',
  color: '#8B6914',
  theories: ['Gottman Love Map', 'Teoría del Apego (Bowlby)', 'Sistemas Familiares (Bowen)'],
  visibilityLevel: 1,
  unlocked: true,
  pilares: [
    // ────────────────────────────────────────────
    // P1 · Temperamento
    // ────────────────────────────────────────────
    {
      id: 'temperamento',
      number: 1,
      name: 'Temperamento',
      theory: 'Tipos temperamentales + MBTI',
      tags: ['PERSONALIDAD', 'CARÁCTER', 'ENERGÍA'],
      intro: 'Tu temperamento es el hardware con el que naciste. No es lo que sentís, sino cómo procesás lo que sentís. Entenderlo te da poder sobre tus reacciones automáticas.',
      contextNote: '💡 No hay respuestas buenas ni malas. El temperamento no se cambia, se comprende y se gestiona.',
      questions: [
        {
          id: 'p1q1',
          type: 'choice',
          prompt: '¿Cómo reaccionás instintivamente ante el conflicto?',
          guidance: 'Pensá en tu primera reacción — no la que elegís después de reflexionar, sino la automática.',
          options: ['Me cierro', 'Confronto', 'Busco mediación', 'Me desconecto'],
        },
        {
          id: 'p1q2',
          type: 'choice',
          prompt: '¿Sos introvertido o extrovertido en términos de recarga de energía?',
          guidance: 'No se trata de si sos sociable, sino de dónde sacás energía: ¿de la gente o de la soledad?',
          options: ['Introvertido', 'Extrovertido', 'Ambiverto'],
        },
        {
          id: 'p1q3',
          type: 'text',
          prompt: 'Describí cómo te comportás cuando estás en tu mejor versión.',
          guidance: 'Pensá en un día donde todo fluyó. ¿Cómo hablabas? ¿Cómo te movías? ¿Qué energía irradiabas?',
          placeholder: 'Cuando estoy bien, soy una persona que...',
        },
      ],
    },

    // ────────────────────────────────────────────
    // P2 · Historia de Vida
    // ────────────────────────────────────────────
    {
      id: 'historia-vida',
      number: 2,
      name: 'Historia de Vida',
      theory: 'Gottman Love Map · Psicología Narrativa',
      tags: ['APEGO', 'INFANCIA', 'NARRATIVA'],
      intro: 'Tu historia de vida no es solo lo que pasó, sino la historia que te contás sobre lo que pasó. Esa narrativa moldea cómo das y recibís amor hoy.',
      contextNote: '🔐 Este pilar toca zonas sensibles. Respondé solo lo que sientas cómodo compartir ahora. Siempre podés volver y profundizar después.',
      questions: [
        {
          id: 'p2q1',
          type: 'text',
          prompt: '¿Cuál fue el momento de tu infancia que más definió cómo das amor hoy?',
          guidance: 'Puede ser un momento de cuidado, una ausencia, un abrazo, un silencio. No tiene que ser traumático — a veces lo sutil es lo que más marca.',
          placeholder: 'Recuerdo que cuando era chico/a...',
        },
        {
          id: 'p2q2',
          type: 'text',
          prompt: '¿Qué aprendiste sobre el conflicto viendo a tus padres?',
          guidance: '¿Se gritaban? ¿Se ignoraban? ¿Uno siempre cedía? ¿Usaban el silencio como castigo? Lo que viste en casa es tu "software base" para las peleas.',
          placeholder: 'En mi casa, cuando había conflicto...',
        },
        {
          id: 'p2q3',
          type: 'choice',
          prompt: '¿Con qué estilo de apego te identificás más hoy?',
          guidance: 'Seguro: confío y me dejo querer. Ansioso: necesito confirmación constante. Evitativo: me alejo cuando la cosa se pone intensa. Desorganizado: oscilo entre acercarme y huir.',
          options: ['Seguro', 'Ansioso', 'Evitativo', 'Desorganizado'],
        },
      ],
    },

    // ────────────────────────────────────────────
    // P3 · Herencia Familiar
    // ────────────────────────────────────────────
    {
      id: 'herencia-familiar',
      number: 3,
      name: 'Herencia Familiar',
      theory: 'Bowen — Diferenciación del Self · Mandatos transgeneracionales',
      tags: ['FAMILIA', 'PATRONES', 'MANDATOS'],
      intro: 'Cada familia tiene reglas no escritas — mandatos que se transmiten como genes silenciosos. No elegiste esas reglas, pero sí podés elegir cuáles seguir.',
      contextNote: '🌳 Pensá en al menos 3 generaciones: tus abuelos, tus padres, vos. ¿Qué patrones se repiten?',
      questions: [
        {
          id: 'p3q1',
          type: 'text',
          prompt: '¿Qué comportamiento de tu familia repetís aunque no quieras?',
          guidance: 'Puede ser algo que hacés con la plata, cómo reaccionás al enojo, cómo te comunicás bajo presión, o cómo te vinculás con la culpa.',
          placeholder: 'Me doy cuenta de que hago lo mismo que...',
        },
        {
          id: 'p3q2',
          type: 'text',
          prompt: '¿Cuál es el mandato familiar no dicho que más te pesa?',
          guidance: 'Ejemplos: "Los hombres no lloran", "La familia es lo primero aunque duela", "No hables de lo que pasa en casa", "Tenés que ser el fuerte".',
          placeholder: 'En mi familia siempre hubo una regla no dicha...',
        },
        {
          id: 'p3q3',
          type: 'choice',
          prompt: '¿Qué rol cumpliste en tu familia de origen?',
          guidance: 'El cuidador protege a todos. El rebelde cuestiona todo. El logrador busca aprobación con éxitos. El invisible se adapta sin hacer ruido. El mediador evita conflictos.',
          options: ['El cuidador', 'El rebelde', 'El logrador', 'El invisible', 'El mediador'],
        },
      ],
    },

    // ────────────────────────────────────────────
    // P4 · Mecanismos de Defensa
    // ────────────────────────────────────────────
    {
      id: 'mecanismos-defensa',
      number: 4,
      name: 'Mecanismos de Defensa',
      theory: 'Psicoanálisis aplicado · Terapia cognitiva',
      tags: ['DEFENSA', 'PROTECCIÓN', 'CONFLICTO'],
      intro: 'Tus mecanismos de defensa son tu armadura emocional. Te protegieron cuando los necesitaste, pero en una relación pueden convertirse en muros que impiden la conexión.',
      contextNote: '⚠️ No se trata de juzgar tus defensas — se trata de conocerlas. Lo que podés nombrar, podés gestionar.',
      questions: [
        {
          id: 'p4q1',
          type: 'choice',
          prompt: '¿Qué hacés cuando te sentís atacado/a emocionalmente?',
          guidance: 'Tu primera reacción, la automática. No la ideal — la real.',
          options: ['Me aíslo', 'Contraataco', 'Complazco', 'Uso humor', 'Me desconecto'],
        },
        {
          id: 'p4q2',
          type: 'text',
          prompt: '¿Cuál es tu "señal de alarma" interna que indica que estás a punto de explotar o cerrarte?',
          guidance: 'Puede ser algo físico (pecho apretado, mandíbula tensa, manos frías) o emocional (ganas de desaparecer, sarcasmo involuntario, silencio repentino).',
          placeholder: 'Cuando estoy llegando a mi límite, siento que...',
        },
        {
          id: 'p4q3',
          type: 'text',
          prompt: '¿Qué necesitás que el otro haga cuando estás en ese estado?',
          guidance: 'Esto es clave para tu pareja. ¿Necesitás espacio? ¿Un abrazo sin palabras? ¿Que te digan que no están enojados? ¿Que no te presionen a hablar?',
          placeholder: 'Lo que más me ayuda en ese momento es que...',
        },
      ],
    },

    // ────────────────────────────────────────────
    // P5 · Regulación Emocional
    // ────────────────────────────────────────────
    {
      id: 'regulacion-emocional',
      number: 5,
      name: 'Regulación Emocional',
      theory: 'Neurobiología Interpersonal (Daniel Siegel) — Ventana de Tolerancia',
      tags: ['ESTRÉS', 'TOLERANCIA', 'REGULACIÓN'],
      intro: 'La "ventana de tolerancia" es el rango donde podés pensar con claridad, sentir sin desbordarte y comunicar sin destruir. Conocer la tuya es conocer tus límites reales.',
      contextNote: '🧠 Siegel dice que fuera de la ventana entramos en "hiperactivación" (ansiedad, enojo) o "hipoactivación" (desconexión, shutdown). ¿Cuál es tu patrón?',
      questions: [
        {
          id: 'p5q1',
          type: 'multiselect',
          prompt: '¿Qué situaciones te sacan más rápido de tu centro?',
          guidance: 'Seleccioná todos los que apliquen. No hay límite — la honestidad aquí es lo que importa.',
          options: ['Ruido', 'Desorden', 'Presión laboral', 'Silencio del otro', 'Cambios de planes', 'Crítica', 'Cansancio físico'],
        },
        {
          id: 'p5q2',
          type: 'choice',
          prompt: '¿Cuánto tiempo necesitás para regularte después de una pelea?',
          guidance: 'No es cuánto "deberías" necesitar. Es cuánto necesitás realmente para volver a pensar con claridad.',
          options: ['30 minutos', '1-2 horas', 'Un día entero', 'Varios días'],
        },
        {
          id: 'p5q3',
          type: 'text',
          prompt: '¿Qué te devuelve la paz cuando estás desbordado/a?',
          guidance: 'Puede ser una actividad, un lugar, una persona, un ritual. ¿Qué te baja la intensidad cuando todo parece demasiado?',
          placeholder: 'Cuando estoy al límite, lo que me devuelve la calma es...',
        },
      ],
    },

    // ────────────────────────────────────────────
    // P6 · Visión de Vida
    // ────────────────────────────────────────────
    {
      id: 'vision-vida',
      number: 6,
      name: 'Visión de Vida',
      theory: 'Logoterapia (Frankl) · Autodeterminación (Deci & Ryan)',
      tags: ['PROPÓSITO', 'FUTURO', 'SENTIDO'],
      intro: 'Viktor Frankl sobrevivió a Auschwitz y su conclusión fue clara: el ser humano puede soportar casi cualquier "cómo" si tiene un "para qué". ¿Cuál es el tuyo?',
      contextNote: '🌅 No busques la respuesta "correcta". A veces el propósito no es grandioso — a veces es simplemente vivir en paz.',
      questions: [
        {
          id: 'p6q1',
          type: 'text',
          prompt: '¿Cuál es tu definición personal de éxito en 5 años?',
          guidance: 'No pienses en lo que "debería" ser. ¿Qué imagen te viene cuando imaginás tu vida funcionando bien?',
          placeholder: 'En 5 años, el éxito para mí sería...',
        },
        {
          id: 'p6q2',
          type: 'slider',
          prompt: '¿Vivís para trabajar o trabajás para vivir?',
          guidance: 'No hay respuesta buena. Hay personas que encuentran sentido profundo en su trabajo y otras que lo usan como herramienta para lo que realmente les importa.',
          min: 1,
          max: 5,
          minLabel: 'Vivo para trabajar',
          maxLabel: 'Trabajo para vivir',
        },
        {
          id: 'p6q3',
          type: 'text',
          prompt: '¿Qué necesita ser verdad en tu vida para sentirte en paz?',
          guidance: 'No es qué querés lograr. Es qué condiciones necesitás para sentir que todo está bien. ¿Salud? ¿Libertad? ¿Conexión? ¿Estabilidad?',
          placeholder: 'Me siento en paz cuando sé que...',
        },
      ],
    },

    // ────────────────────────────────────────────
    // P7 · Ritmos Biológicos
    // ────────────────────────────────────────────
    {
      id: 'ritmos-biologicos',
      number: 7,
      name: 'Ritmos Biológicos',
      theory: 'Cronobiología · Neurociencia del sueño',
      tags: ['ENERGÍA', 'SUEÑO', 'ESPACIO'],
      intro: 'Tu cuerpo tiene un reloj que no negocia. Ignorarlo genera irritabilidad, malentendidos y peleas que no son realmente sobre lo que parecen. Este pilar mapea tu biología real.',
      contextNote: '⏰ Muchos conflictos de pareja son en realidad conflictos de ritmos: uno es nocturno, el otro mañanero. Entenderlo cambia todo.',
      questions: [
        {
          id: 'p7q1',
          type: 'choice',
          prompt: '¿Sos mañanero o nocturno?',
          guidance: 'No es qué horario te obliga tu trabajo, sino cuándo sentís que tu cerebro funciona mejor naturalmente.',
          options: ['Mañanero', 'Nocturno', 'Variable'],
        },
        {
          id: 'p7q2',
          type: 'choice',
          prompt: '¿Cómo cambia tu humor cuando dormís mal?',
          guidance: 'La falta de sueño afecta directamente tu regulación emocional. ¿Qué versión de vos aparece cuando no dormiste?',
          options: ['Me irrito fácil', 'Me cierro', 'No cambia mucho', 'Me deprimo'],
        },
        {
          id: 'p7q3',
          type: 'choice',
          prompt: '¿Cuánto espacio físico solo necesitás por semana para no perder tu identidad?',
          guidance: 'Tiempo genuinamente solo, sin pareja, sin trabajo, sin obligaciones. Solo vos y tu mundo interior.',
          options: ['Pocas horas', 'Medio día', 'Un día completo', 'Más de un día'],
        },
      ],
    },
  ],
}

/** Helper to get a specific pilar by ID */
export function getPilarById(pilarId) {
  return ISLA_RAICES.pilares.find(p => p.id === pilarId) || null
}

/** All pilar IDs for routing */
export const RAICES_PILAR_IDS = ISLA_RAICES.pilares.map(p => p.id)
