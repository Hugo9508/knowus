import { supabase } from './supabaseClient'

/**
 * Guarda o actualiza las respuestas de un pilar.
 * Usa upsert con constraint (pillar_id, user_id).
 *
 * La tabla answers requiere couple_id NOT NULL,
 * pero en fase temprana (sin pareja vinculada) usamos
 * el couple_id del perfil o un placeholder.
 */
export async function saveAnswers({
  pillarSlug,
  userId,
  coupleId,
  content,
  isComplete = false,
}) {
  // Primero necesitamos el UUID real del pilar por su slug
  const { data: pillar, error: pillarErr } = await supabase
    .from('pillars')
    .select('id')
    .eq('slug', pillarSlug)
    .single()

  if (pillarErr || !pillar) {
    // Si no existe el pilar en la DB, guardamos localmente por ahora
    console.warn('Pilar no encontrado en DB, guardando en localStorage:', pillarSlug)
    localStorage.setItem(
      `answers_${userId}_${pillarSlug}`,
      JSON.stringify({ content, isComplete, savedAt: new Date().toISOString() })
    )
    return { success: true, source: 'local' }
  }

  const { data, error } = await supabase
    .from('answers')
    .upsert(
      {
        pillar_id: pillar.id,
        user_id: userId,
        couple_id: coupleId,
        content,
        is_complete: isComplete,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'pillar_id,user_id' }
    )
    .select()
    .single()

  if (error) {
    console.error('Error guardando respuestas:', error)
    // Fallback a localStorage
    localStorage.setItem(
      `answers_${userId}_${pillarSlug}`,
      JSON.stringify({ content, isComplete, savedAt: new Date().toISOString() })
    )
    return { success: true, source: 'local', error: error.message }
  }

  return { success: true, source: 'supabase', data }
}

/**
 * Carga las respuestas existentes para un pilar/usuario.
 */
export async function loadAnswers({ pillarSlug, userId }) {
  // Buscar pilar por slug
  const { data: pillar } = await supabase
    .from('pillars')
    .select('id')
    .eq('slug', pillarSlug)
    .single()

  if (!pillar) {
    // Intentar desde localStorage
    const local = localStorage.getItem(`answers_${userId}_${pillarSlug}`)
    if (local) {
      const parsed = JSON.parse(local)
      return { content: parsed.content, isComplete: parsed.isComplete, source: 'local' }
    }
    return null
  }

  const { data, error } = await supabase
    .from('answers')
    .select('content, is_complete')
    .eq('pillar_id', pillar.id)
    .eq('user_id', userId)
    .single()

  if (error || !data) {
    // Fallback local
    const local = localStorage.getItem(`answers_${userId}_${pillarSlug}`)
    if (local) {
      const parsed = JSON.parse(local)
      return { content: parsed.content, isComplete: parsed.isComplete, source: 'local' }
    }
    return null
  }

  return { content: data.content, isComplete: data.is_complete, source: 'supabase' }
}
