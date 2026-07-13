export interface InputField {
  key: string
  label: string
  type: 'input' | 'textarea' | 'select'
  placeholder?: string
  options?: string[]
}

export const PRODUCT = {
  name: "EnvScan",
  slug: "envscan",
  tagline: "Find leaked secrets and bad config before you commit.",
  description: "Paste a .env, yaml, or toml config and EnvScan flags leaked secrets (keys, tokens, passwords), insecure settings, and gives a remediation checklist mapped to common weakness types.",
  toolTitle: "Scan config for secrets",
  resultLabel: "Scan findings",
  ctaLabel: "Scan config",
  features: [
  "Detect leaked keys / tokens / passwords",
  "Flag insecure settings",
  "Map findings to weakness types",
  "Give a remediation checklist"
],
  inputs: [
  {
    "key": "config_text",
    "label": "Paste config (.env / yaml / toml)",
    "type": "textarea",
    "placeholder": "e.g. DB_PASSWORD=supersecret\\nSTRIPE_KEY=sk_live_xxx\\nDEBUG=true"
  },
  {
    "key": "scope",
    "label": "Focus",
    "type": "select",
    "options": [
      "Secrets only",
      "Insecure settings",
      "Both"
    ]
  }
] as InputField[],
  systemPrompt: "You are an application-security engineer. Given a config snippet and a scope, flag leaked secrets (API keys, tokens, passwords), insecure settings (debug=true in prod, disabled TLS, wildcard CORS), and map each finding to a common weakness type. Always return a prioritized remediation checklist. In demo (mock) mode, return a realistic sample scan following exactly this structure. Never exfiltrate or repeat the secret value verbatim.",
  pricing: [
  {
    "tier": "Free",
    "price": "$0",
    "desc": "3 scans/mo"
  },
  {
    "tier": "Pro",
    "price": "$29/mo",
    "desc": "Unlimited, CI integration"
  }
],
  mock: (inputs: Record<string, string>): string => {
  const c = (inputs['config_text'] || '').trim()
  const sc = inputs['scope'] || 'Both'
  if (!c) return 'Paste a config snippet to scan for secrets and bad settings.'
  let out = 'CONFIG SCAN (scope: ' + sc + ')\n\n'
  out += 'Findings:\n'
  out += '  - [HIGH] Live secret detected (Stripe key) - rotate immediately, move to a secret manager.\n'
  out += '  - [MED] DEBUG=true in what looks like a production config - disable.\n'
  out += '  - [LOW] Plaintext DB password - use env injection + secret store.\n\n'
  out += 'Remediation checklist:\n'
  out += '  - [ ] Rotate the exposed key now\n'
  out += '  - [ ] Move secrets out of the repo (env / vault)\n'
  out += '  - [ ] Add a pre-commit secret scanner\n'
  out += '\n--- (Mock demo. Paste your real config for a tailored scan.)'
  return out
}
}
