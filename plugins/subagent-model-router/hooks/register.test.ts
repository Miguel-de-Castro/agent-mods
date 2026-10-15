import { expect, test } from 'claude-code/testing'

const spawn = (subagentType: string, description: string, prompt: string, model?: string) => ({
  tool_use_id: 't1', prompt, description, subagentType, model,
})

const run = async ($: any, on: any, input: ReturnType<typeof spawn>) => {
  let seen: string | undefined
  on('agent.spawn', async (_$: any, e: any) => ((seen = e.model), { model: e.model ?? 'inherit' }))
  await $.agent.spawn(input)
  return seen
}

test('security audit goes to opus', async ($, on) => {
  expect(await run($, on, spawn('general-purpose', 'audit auth', 'Review the security of the login flow'))).toBe('opus')
})

test('plain refactor goes to sonnet', async ($, on) => {
  expect(await run($, on, spawn('general-purpose', 'add tests', 'Write unit tests for the formatter'))).toBe('sonnet')
})

test('simple listing goes to haiku', async ($, on) => {
  expect(await run($, on, spawn('general-purpose', 'list', 'List files in src/'))).toBe('haiku')
})

test('an explicit model is kept', async ($, on) => {
  expect(await run($, on, spawn('general-purpose', 'audit', 'security audit', 'sonnet'))).toBe('sonnet')
})

test('custom agent types are left alone', async ($, on) => {
  expect(await run($, on, spawn('my-custom-agent', 'audit', 'security audit'))).toBeUndefined()
})
