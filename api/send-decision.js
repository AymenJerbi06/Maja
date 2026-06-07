function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatList(items, formatter = (item) => item) {
  if (!items?.length) return "<li>Nothing selected</li>";
  return items.map((item) => `<li>${escapeHtml(formatter(item))}</li>`).join("");
}

function buildEmailHtml(payload) {
  const decision = payload.finalDecision?.accepted ? "Accepted the mission" : "Wants time to think";
  const answers = payload.answers || {};

  return `
    <div style="font-family: Georgia, serif; color: #2b182f; line-height: 1.6;">
      <h1 style="color: #925366;">Maja Vancouver Website Result</h1>
      <p><strong>Decision:</strong> ${escapeHtml(decision)}</p>
      <p><strong>Submitted:</strong> ${escapeHtml(payload.submittedAt)}</p>
      <p><strong>Language used:</strong> ${escapeHtml(payload.user?.language || "unknown")}</p>

      <h2>Academic route</h2>
      <p>${escapeHtml(answers.academicRoute?.title || "No route selected")}</p>

      <h2>Interests</h2>
      <ul>${formatList(answers.interests, (item) => item.label)}</ul>

      <h2>Saved schools</h2>
      <ul>${formatList(answers.savedSchools, (school) => school.name)}</ul>

      <h2>Budget view</h2>
      <p>${escapeHtml(answers.budgetView?.title || "No budget view selected")}</p>

      <h2>Vancouver activities</h2>
      <ul>${formatList(answers.vancouverActivities, (item) => `${item.title}: ${item.choice}`)}</ul>

      <h2>Things she wants to talk about</h2>
      <ul>${formatList(answers.talkTopics, (item) => item.label)}</ul>

      <h2>Aymen explain requests</h2>
      <ul>${formatList(answers.explainRequests, (item) => item.label)}</ul>

      <h2>Not yet button</h2>
      <p>
        Clicked: ${escapeHtml(answers.notYet?.clicked ? "yes" : "no")}<br />
        Count: ${escapeHtml(answers.notYet?.clickCount || 0)}<br />
        Last clicked: ${escapeHtml(answers.notYet?.lastClickedAt || "never")}
      </p>
    </div>
  `;
}

function buildEmailText(payload) {
  const answers = payload.answers || {};
  const lines = [
    "Maja Vancouver Website Result",
    `Decision: ${payload.finalDecision?.accepted ? "Accepted the mission" : "Wants time to think"}`,
    `Submitted: ${payload.submittedAt}`,
    `Language used: ${payload.user?.language || "unknown"}`,
    "",
    `Academic route: ${answers.academicRoute?.title || "No route selected"}`,
    `Interests: ${(answers.interests || []).map((item) => item.label).join(", ") || "Nothing selected"}`,
    `Saved schools: ${(answers.savedSchools || []).map((school) => school.name).join(", ") || "Nothing selected"}`,
    `Budget view: ${answers.budgetView?.title || "No budget view selected"}`,
    `Vancouver activities: ${(answers.vancouverActivities || []).map((item) => `${item.title}: ${item.choice}`).join(", ") || "Nothing selected"}`,
    `Talk topics: ${(answers.talkTopics || []).map((item) => item.label).join(", ") || "Nothing selected"}`,
    `Explain requests: ${(answers.explainRequests || []).map((item) => item.label).join(", ") || "Nothing selected"}`,
    "",
    `Not yet clicked: ${answers.notYet?.clicked ? "yes" : "no"}`,
    `Not yet click count: ${answers.notYet?.clickCount || 0}`,
    `Not yet last clicked: ${answers.notYet?.lastClickedAt || "never"}`,
  ];

  return lines.join("\n");
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.RESEND_TO_EMAIL;

  if (!apiKey || !from || !to) {
    return response.status(500).json({
      error: "Missing RESEND_API_KEY, RESEND_FROM_EMAIL, or RESEND_TO_EMAIL.",
    });
  }

  const payload = typeof request.body === "string" ? JSON.parse(request.body || "{}") : request.body || {};
  const accepted = Boolean(payload.finalDecision?.accepted);

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      subject: accepted ? "Maja accepted the Vancouver mission" : "Maja wants time to think",
      html: buildEmailHtml(payload),
      text: buildEmailText(payload),
    }),
  });

  const result = await resendResponse.json().catch(() => ({}));

  if (!resendResponse.ok) {
    return response.status(resendResponse.status).json({
      error: result.message || "Resend could not send the email.",
      details: result,
    });
  }

  return response.status(200).json({ ok: true, id: result.id });
}
