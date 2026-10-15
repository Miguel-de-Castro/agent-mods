import type { Register } from 'claude-code'

type Tier = 'opus' | 'sonnet' | 'haiku'

// Agent types the router decides for; custom types (plugin agents) keep their own model.
const ROUTED = new Set(['general-purpose', 'Explore', 'Plan'])

// A prompt this long carries a real task: never send it to haiku.
const HAIKU_MAX_CHARS = 1200

const OPUS = [
  'architecture', 'arquitetura', 'design decision', 'root cause', 'causa raiz', 'race condition',
  'concurrency', 'concorrência', 'concorrencia', 'deadlock', 'security', 'segurança', 'seguranca',
  'vulnerab', 'audit', 'auditoria', 'threat model', 'contract', 'contrato', 'prove', 'proof',
  'demonstre', 'matemática', 'matematica', 'algorithm', 'algoritmo', 'complexity', 'complexidade',
  'migration plan', 'plano de migração', 'plano de migracao', 'trade-off', 'tradeoff', 'redesign',
  'unclear', 'intermittent', 'intermitente', 'critically', 'criticamente',
]

const HAIKU = [
  'classify', 'classifique', 'categorize', 'categorise', 'categoriza', 'summarize', 'summarise',
  'resuma', 'sumariz', 'list the files', 'list files', 'liste os arquivos', 'liste arquivos',
  'find files', 'find where', 'locate', 'localize', 'onde está', 'grep for', 'count the', 'conte os',
  'extract the', 'extraia', 'add tags', 'rename the', 'renomeie', 'translate',
  'traduza', 'what does', 'o que faz',
]

const has = (text: string, words: string[]) => words.some(w => text.includes(w))

export const pickModel = (subagentType: string, description: string, prompt: string): Tier => {
  const text = `${description}\n${prompt}`.toLowerCase()
  if (has(text, OPUS)) return 'opus'
  if (subagentType === 'Plan') return 'opus'
  if (subagentType === 'Explore') return 'haiku'
  if (prompt.length <= HAIKU_MAX_CHARS && has(text, HAIKU)) return 'haiku'
  return 'sonnet'
}

export const register: Register = on => {
  on('agent.spawn', ($, e, next) => {
    if (e.model !== undefined || !ROUTED.has(e.subagentType)) return next(e)
    return next({ ...e, model: pickModel(e.subagentType, e.description, e.prompt) })
  }).catch(($, e, next) => next(e))
}
