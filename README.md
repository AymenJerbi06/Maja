# Maja Vancouver Website

A static romantic journey website with a Vercel serverless email endpoint for final submissions.

## Vercel + Resend setup

Add these environment variables in Vercel Project Settings:

- `RESEND_API_KEY`: your Resend API key
- `RESEND_FROM_EMAIL`: the sender, for example `Maja Website <onboarding@resend.dev>` while testing
- `RESEND_TO_EMAIL`: the email address where Aymen should receive Maja's answers

After changing environment variables in Vercel, redeploy the project so the API function can read them.

The website posts final answers to `/api/send-decision`. The endpoint sends an email through Resend and includes:

- final accept / think decision
- selected academic route
- interests
- saved schools
- Vancouver activity answers
- talk topics
- Aymen explain requests
- whether and how often she clicked `Not yet`
