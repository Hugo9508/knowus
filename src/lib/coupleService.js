import { supabase } from './supabaseClient'

/**
 * Genera un código de invitación de 6 caracteres y lo guarda
 * en el metadata del perfil del usuario.
 */
export async function generateInviteCode(userId) {
  const code = Math.random().toString(36).substring(2, 8).toUpperCase()

  const { error } = await supabase
    .from('profiles')
    .update({ invite_code: code })
    .eq('id', userId)

  if (error) throw error
  return code
}

/**
 * Busca un usuario por su código de invitación.
 */
export async function findUserByInviteCode(code) {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, display_name, email')
    .eq('invite_code', code.toUpperCase())
    .single()

  if (error || !data) return null
  return data
}

/**
 * Crea la pareja en la tabla couples.
 * user_a = quien creó el código, user_b = quien lo ingresó.
 * El trigger sync_couple_id() actualiza couple_id en ambos profiles.
 */
export async function linkCouple(userAId, userBId) {
  // Verificar que no exista ya una pareja entre ellos
  const { data: existing } = await supabase
    .from('couples')
    .select('id')
    .or(`and(user_a_id.eq.${userAId},user_b_id.eq.${userBId}),and(user_a_id.eq.${userBId},user_b_id.eq.${userAId})`)
    .maybeSingle()

  if (existing) {
    return { success: true, coupleId: existing.id, alreadyLinked: true }
  }

  const { data, error } = await supabase
    .from('couples')
    .insert({
      user_a_id: userAId,
      user_b_id: userBId,
      status: 'active',
      started_at: new Date().toISOString().split('T')[0],
    })
    .select()
    .single()

  if (error) throw error

  // Actualizar partner_id en ambos profiles
  await supabase.from('profiles').update({ partner_id: userBId }).eq('id', userAId)
  await supabase.from('profiles').update({ partner_id: userAId }).eq('id', userBId)

  // Limpiar invite_code
  await supabase.from('profiles').update({ invite_code: null }).eq('id', userAId)

  return { success: true, coupleId: data.id, alreadyLinked: false }
}

/**
 * Obtiene la info de la pareja actual del usuario.
 */
export async function getCoupleInfo(userId) {
  const { data: profile } = await supabase
    .from('profiles')
    .select('couple_id, partner_id')
    .eq('id', userId)
    .single()

  if (!profile?.couple_id) return null

  // Obtener datos del partner
  const { data: partner } = await supabase
    .from('profiles')
    .select('id, display_name, email, avatar_url')
    .eq('id', profile.partner_id)
    .single()

  return {
    coupleId: profile.couple_id,
    partner,
  }
}
