import { sendLovableEmail, parseEmailWebhookPayload } from 'npm:@lovable.dev/email-js'
import { WebhookError, verifyWebhookRequest } from 'npm:@lovable.dev/webhooks-js'
import { createCorsHeaders } from '../_shared/security.ts'

const EMAIL_HOOK_ALLOWED_HEADERS =
  'authorization, x-client-info, apikey, content-type, x-lovable-signature, x-lovable-timestamp, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version'

function createEmailHookCorsHeaders(req: Request): Record<string, string> {
  return {
    ...createCorsHeaders(req),
    'Access-Control-Allow-Headers': EMAIL_HOOK_ALLOWED_HEADERS,
  }
}

const EMAIL_SUBJECTS: Record<string, string> = {
  signup: 'Confirm your email',
  invite: "You've been invited",
  magiclink: 'Your login link',
  recovery: 'Reset your password',
  email_change: 'Confirm your new email',
  reauthentication: 'Your verification code',
}

type TemplateData = {
  siteName?: string
  siteUrl?: string
  recipient?: string
  confirmationUrl?: string
  token?: string
  email?: string
  newEmail?: string
}

type RenderedEmail = {
  html: string
  text: string
}

type EmailTemplate = (data: TemplateData) => RenderedEmail

// Configuration
const SITE_NAME = "investmentsmai"
const SENDER_DOMAIN = "notify.properties.maiprop.co"
const ROOT_DOMAIN = "properties.maiprop.co"
const FROM_DOMAIN = "properties.maiprop.co" // Domain shown in From address (may be root or sender subdomain)
const BRAND_NAME = "mAI Prop"
const BRAND_URL = "https://investmentsmai.lovable.app"
const LOGO_URL = "https://cqxcztafhnwkhxgaylne.supabase.co/storage/v1/object/public/email-assets/logo-new.png"

function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function safeHttpUrl(value: unknown, fallback = BRAND_URL): string {
  try {
    const url = new URL(String(value || fallback))
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.toString() : fallback
  } catch {
    return fallback
  }
}

function renderLayout({
  preview,
  heading,
  body,
  text,
  buttonHref,
  buttonLabel,
  footer,
}: {
  preview: string
  heading: string
  body: string
  text: string
  buttonHref?: string
  buttonLabel?: string
  footer: string
}): RenderedEmail {
  const safePreview = escapeHtml(preview)
  const safeHeading = escapeHtml(heading)
  const safeFooter = escapeHtml(footer)
  const safeButtonHref = buttonHref ? escapeHtml(safeHttpUrl(buttonHref)) : ''
  const buttonHtml = buttonHref && buttonLabel
    ? `<div style="text-align:center;margin:30px 0"><a href="${safeButtonHref}" style="background-color:#4ef5f1;color:#000014;font-size:15px;font-weight:600;border-radius:8px;padding:14px 28px;text-decoration:none;display:inline-block">${escapeHtml(buttonLabel)}</a></div>`
    : ''

  const html = `<!doctype html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>${safePreview}</title>
  </head>
  <body style="margin:0;background-color:#ffffff;font-family:Inter,Helvetica Neue,Arial,sans-serif">
    <div style="display:none;max-height:0;overflow:hidden">${safePreview}</div>
    <main style="padding:0;margin:0 auto;max-width:520px">
      <div style="background-color:#000014;padding:28px 0;text-align:center;border-radius:8px 8px 0 0">
        <img src="${escapeHtml(LOGO_URL)}" alt="${escapeHtml(BRAND_NAME)}" width="180" style="margin:0 auto;display:block">
      </div>
      <section style="background-color:#0a0e2a;padding:32px 30px;border-radius:0 0 8px 8px">
        <h1 style="font-size:24px;font-weight:700;color:#4ef5f1;margin:0 0 16px;font-family:Space Grotesk,Helvetica Neue,Arial,sans-serif">${safeHeading}</h1>
        ${body}
        ${buttonHtml}
      </section>
      <p style="font-size:12px;color:#888;margin:20px 0 0;text-align:center">${safeFooter}</p>
      <p style="font-size:12px;color:#666;text-align:center;margin:8px 0 0">© 2026 ${escapeHtml(BRAND_NAME)} · <a href="${escapeHtml(BRAND_URL)}" style="color:#8755f2;text-decoration:none">${escapeHtml(new URL(BRAND_URL).host)}</a></p>
    </main>
  </body>
</html>`

  return { html, text }
}

function paragraph(content: string): string {
  return `<p style="font-size:15px;color:#e0fafa;line-height:1.6;margin:0 0 16px">${content}</p>`
}

const EMAIL_TEMPLATES: Record<string, EmailTemplate> = {
  signup: ({ recipient, confirmationUrl }) => {
    const safeRecipient = escapeHtml(recipient || 'your email')
    return renderLayout({
      preview: `Confirm your email for ${BRAND_NAME}`,
      heading: 'Welcome aboard',
      body: [
        paragraph("You're one step away from accessing exclusive Greek real estate investment opportunities."),
        paragraph(`Confirm your email (${safeRecipient}) to get started:`),
      ].join(''),
      text: `Welcome aboard\n\nYou're one step away from accessing exclusive Greek real estate investment opportunities.\n\nConfirm your email (${recipient || 'your email'}) to get started: ${confirmationUrl || ''}`,
      buttonHref: confirmationUrl,
      buttonLabel: 'Verify Email',
      footer: "If you didn't create an account, you can safely ignore this email.",
    })
  },
  invite: ({ siteUrl, confirmationUrl }) => renderLayout({
    preview: `You've been invited to join ${BRAND_NAME}`,
    heading: "You've been invited",
    body: paragraph(`You've been invited to join <a href="${escapeHtml(safeHttpUrl(siteUrl))}" style="color:#4ef5f1;text-decoration:underline"><strong>${escapeHtml(BRAND_NAME)}</strong></a>, your gateway to exclusive Greek real estate investments.`),
    text: `You've been invited to join ${BRAND_NAME}, your gateway to exclusive Greek real estate investments.\n\nAccept invitation: ${confirmationUrl || ''}`,
    buttonHref: confirmationUrl,
    buttonLabel: 'Accept Invitation',
    footer: "If you weren't expecting this invitation, you can safely ignore this email.",
  }),
  magiclink: ({ confirmationUrl }) => renderLayout({
    preview: `Your login link for ${BRAND_NAME}`,
    heading: 'Your login link',
    body: paragraph(`Click below to log in to ${escapeHtml(BRAND_NAME)}. This link expires shortly.`),
    text: `Your login link\n\nClick below to log in to ${BRAND_NAME}. This link expires shortly.\n\n${confirmationUrl || ''}`,
    buttonHref: confirmationUrl,
    buttonLabel: 'Log In',
    footer: "If you didn't request this link, you can safely ignore this email.",
  }),
  recovery: ({ confirmationUrl }) => renderLayout({
    preview: `Reset your password for ${BRAND_NAME}`,
    heading: 'Reset your password',
    body: paragraph('We received a request to reset your password. Click below to choose a new one.'),
    text: `Reset your password\n\nWe received a request to reset your password. Click below to choose a new one.\n\n${confirmationUrl || ''}`,
    buttonHref: confirmationUrl,
    buttonLabel: 'Reset Password',
    footer: "If you didn't request this, you can safely ignore this email.",
  }),
  email_change: ({ email, newEmail, confirmationUrl }) => {
    const oldEmail = escapeHtml(email || 'your current email')
    const nextEmail = escapeHtml(newEmail || 'your new email')
    return renderLayout({
      preview: `Confirm your email change for ${BRAND_NAME}`,
      heading: 'Confirm email change',
      body: paragraph(`You requested to change your email from ${oldEmail} to ${nextEmail}.`),
      text: `Confirm email change\n\nYou requested to change your email from ${email || 'your current email'} to ${newEmail || 'your new email'}.\n\n${confirmationUrl || ''}`,
      buttonHref: confirmationUrl,
      buttonLabel: 'Confirm Email Change',
      footer: "If you didn't request this change, please secure your account immediately.",
    })
  },
  reauthentication: ({ token }) => {
    const safeToken = escapeHtml(token || '')
    return renderLayout({
      preview: `Your verification code for ${BRAND_NAME}`,
      heading: 'Verification code',
      body: [
        paragraph('Use the code below to confirm your identity:'),
        `<p style="font-family:Space Grotesk,Courier,monospace;font-size:28px;font-weight:700;color:#4ef5f1;margin:0 0 30px;text-align:center;letter-spacing:6px">${safeToken}</p>`,
      ].join(''),
      text: `Verification code\n\nUse this code to confirm your identity: ${token || ''}`,
      footer: "This code expires shortly. If you didn't request this, ignore this email.",
    })
  },
}

// Sample data for preview mode ONLY (not used in actual email sending).
// URLs are baked in at scaffold time from the project's real data.
// The sample email uses a fixed placeholder (RFC 6761 .test TLD) so the Go backend
// can always find-and-replace it with the actual recipient when sending test emails,
// even if the project's domain has changed since the template was scaffolded.
const SAMPLE_PROJECT_URL = "https://investmentsmai.lovable.app"
const SAMPLE_EMAIL = "user@example.test"
const SAMPLE_DATA: Record<string, TemplateData> = {
  signup: {
    siteName: SITE_NAME,
    siteUrl: SAMPLE_PROJECT_URL,
    recipient: SAMPLE_EMAIL,
    confirmationUrl: SAMPLE_PROJECT_URL,
  },
  magiclink: {
    siteName: SITE_NAME,
    confirmationUrl: SAMPLE_PROJECT_URL,
  },
  recovery: {
    siteName: SITE_NAME,
    confirmationUrl: SAMPLE_PROJECT_URL,
  },
  invite: {
    siteName: SITE_NAME,
    siteUrl: SAMPLE_PROJECT_URL,
    confirmationUrl: SAMPLE_PROJECT_URL,
  },
  email_change: {
    siteName: SITE_NAME,
    email: SAMPLE_EMAIL,
    newEmail: SAMPLE_EMAIL,
    confirmationUrl: SAMPLE_PROJECT_URL,
  },
  reauthentication: {
    token: '123456',
  },
}

// Preview endpoint handler - returns rendered HTML without sending email
async function handlePreview(req: Request): Promise<Response> {
  const previewCorsHeaders = {
    ...createEmailHookCorsHeaders(req),
    'Access-Control-Allow-Headers': 'authorization, content-type',
  }

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: previewCorsHeaders })
  }

  const apiKey = Deno.env.get('LOVABLE_API_KEY')
  const authHeader = req.headers.get('Authorization')

  if (!apiKey || authHeader !== `Bearer ${apiKey}`) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { ...previewCorsHeaders, 'Content-Type': 'application/json' },
    })
  }

  let type: string
  try {
    const body = await req.json()
    type = body.type
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Invalid JSON in request body' }), {
      status: 400,
      headers: { ...previewCorsHeaders, 'Content-Type': 'application/json' },
    })
  }

  const EmailTemplate = EMAIL_TEMPLATES[type]

  if (!EmailTemplate) {
    return new Response(JSON.stringify({ error: `Unknown email type: ${type}` }), {
      status: 400,
      headers: { ...previewCorsHeaders, 'Content-Type': 'application/json' },
    })
  }

  const sampleData = SAMPLE_DATA[type] || {}
  const { html } = EmailTemplate(sampleData)

  return new Response(html, {
    status: 200,
    headers: { ...previewCorsHeaders, 'Content-Type': 'text/html; charset=utf-8' },
  })
}

// Webhook handler - verifies signature and sends email
async function handleWebhook(req: Request): Promise<Response> {
  const corsHeaders = createEmailHookCorsHeaders(req)
  const apiKey = Deno.env.get('LOVABLE_API_KEY')

  if (!apiKey) {
    console.error('LOVABLE_API_KEY not configured')
    return new Response(
      JSON.stringify({ error: 'Server configuration error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  // Verify signature + timestamp, then parse payload.
  let payload: any
  let run_id = ''
  try {
    const verified = await verifyWebhookRequest({
      req,
      secret: apiKey,
      parser: parseEmailWebhookPayload,
    })
    payload = verified.payload
    run_id = payload.run_id
  } catch (error) {
    if (error instanceof WebhookError) {
      switch (error.code) {
        case 'invalid_signature':
        case 'missing_timestamp':
        case 'invalid_timestamp':
        case 'stale_timestamp':
          console.error('Invalid webhook signature', { error: error.message })
          return new Response(JSON.stringify({ error: 'Invalid signature' }), {
            status: 401,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          })
        case 'invalid_payload':
        case 'invalid_json':
          console.error('Invalid webhook payload', { error: error.message })
          return new Response(
            JSON.stringify({ error: 'Invalid webhook payload' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
      }
    }

    console.error('Webhook verification failed', { error })
    return new Response(
      JSON.stringify({ error: 'Invalid webhook payload' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  if (!run_id) {
    console.error('Webhook payload missing run_id')
    return new Response(
      JSON.stringify({ error: 'Invalid webhook payload' }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }

  if (payload.version !== '1') {
    console.error('Unsupported payload version', { version: payload.version, run_id })
    return new Response(
      JSON.stringify({ error: `Unsupported payload version: ${payload.version}` }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }

  // The email action type is in payload.data.action_type (e.g., "signup", "recovery")
  // payload.type is the hook event type ("auth")
  const emailType = payload.data.action_type
  console.log('Received auth event', { emailType, email: payload.data.email, run_id })

  const EmailTemplate = EMAIL_TEMPLATES[emailType]
  if (!EmailTemplate) {
    console.error('Unknown email type', { emailType, run_id })
    return new Response(
      JSON.stringify({ error: `Unknown email type: ${emailType}` }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  // Build template props from payload.data (HookData structure)
  const templateProps = {
    siteName: SITE_NAME,
    siteUrl: `https://${ROOT_DOMAIN}`,
    recipient: payload.data.email,
    confirmationUrl: payload.data.url,
    token: payload.data.token,
    email: payload.data.email,
    newEmail: payload.data.new_email,
  }

  const { html, text } = EmailTemplate(templateProps)

  // Send email via Lovable Email API
  // The callback URL is provided in the payload by Lovable, ensuring correct routing
  // for both production and local development
  const callbackUrl = payload.data.callback_url
  if (!callbackUrl) {
    console.error('No callback_url in payload', { run_id })
    return new Response(JSON.stringify({ error: 'Missing callback_url in payload' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  let result: { message_id?: string }
  try {
    result = await sendLovableEmail(
      {
        run_id,
        to: payload.data.email,
        from: `${SITE_NAME} <noreply@${FROM_DOMAIN}>`,
        sender_domain: SENDER_DOMAIN,
        subject: EMAIL_SUBJECTS[emailType] || 'Notification',
        html,
        text,
        purpose: 'transactional',
      },
      { apiKey, sendUrl: callbackUrl }
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to send email'
    console.error('Email API error', { error: message, run_id })
    return new Response(JSON.stringify({ error: 'Failed to send email' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  console.log('Email sent successfully', { message_id: result.message_id, run_id })

  return new Response(
    JSON.stringify({ success: true, message_id: result.message_id }),
    { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

Deno.serve(async (req) => {
  const url = new URL(req.url)
  const corsHeaders = createEmailHookCorsHeaders(req)

  // Handle CORS preflight for main endpoint
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  // Route to preview handler for /preview path
  if (url.pathname.endsWith('/preview')) {
    return handlePreview(req)
  }

  // Main webhook handler
  try {
    return await handleWebhook(req)
  } catch (error) {
    console.error('Webhook handler error:', error)
    const message = error instanceof Error ? error.message : 'Unknown error'
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
