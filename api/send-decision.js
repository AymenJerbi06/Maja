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
  const password = payload.password || {};

  return `
    <div style="font-family: Georgia, serif; color: #2b182f; line-height: 1.6;">
      <h1 style="color: #925366;">Maja Vancouver Website Result</h1>
      <p><strong>Decision:</strong> ${escapeHtml(decision)}</p>
      <p><strong>Submitted:</strong> ${escapeHtml(payload.submittedAt)}</p>
      <p><strong>Language used:</strong> ${escapeHtml(payload.user?.language || "unknown")}</p>

      <h2>Password attempts</h2>
      <p>
        Wrong attempts: ${escapeHtml(password.wrongAttempts ?? 0)}<br />
        Solved on attempt: ${escapeHtml(password.solvedOnAttempt || "unknown")}<br />
        Got it right first try: ${escapeHtml(password.gotRightFirstTry ? "yes" : "no")}<br />
        Accepted at: ${escapeHtml(password.acceptedAt || "unknown")}
      </p>

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

      <h2>Comments before submitting</h2>
      <p>${escapeHtml(answers.submissionComment || "No comments written")}</p>

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
  const password = payload.password || {};
  const lines = [
    "Maja Vancouver Website Result",
    `Decision: ${payload.finalDecision?.accepted ? "Accepted the mission" : "Wants time to think"}`,
    `Submitted: ${payload.submittedAt}`,
    `Language used: ${payload.user?.language || "unknown"}`,
    "",
    `Password wrong attempts: ${password.wrongAttempts ?? 0}`,
    `Password solved on attempt: ${password.solvedOnAttempt || "unknown"}`,
    `Password got right first try: ${password.gotRightFirstTry ? "yes" : "no"}`,
    `Password accepted at: ${password.acceptedAt || "unknown"}`,
    "",
    `Academic route: ${answers.academicRoute?.title || "No route selected"}`,
    `Interests: ${(answers.interests || []).map((item) => item.label).join(", ") || "Nothing selected"}`,
    `Saved schools: ${(answers.savedSchools || []).map((school) => school.name).join(", ") || "Nothing selected"}`,
    `Budget view: ${answers.budgetView?.title || "No budget view selected"}`,
    `Vancouver activities: ${(answers.vancouverActivities || []).map((item) => `${item.title}: ${item.choice}`).join(", ") || "Nothing selected"}`,
    `Talk topics: ${(answers.talkTopics || []).map((item) => item.label).join(", ") || "Nothing selected"}`,
    `Explain requests: ${(answers.explainRequests || []).map((item) => item.label).join(", ") || "Nothing selected"}`,
    `Comments before submitting: ${answers.submissionComment || "No comments written"}`,
    "",
    `Not yet clicked: ${answers.notYet?.clicked ? "yes" : "no"}`,
    `Not yet click count: ${answers.notYet?.clickCount || 0}`,
    `Not yet last clicked: ${answers.notYet?.lastClickedAt || "never"}`,
  ];

  return lines.join("\n");
}

export async function POST(request) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.RESEND_TO_EMAIL;

  if (!apiKey || !from || !to) {
    return Response.json(
      { error: "Missing RESEND_API_KEY, RESEND_FROM_EMAIL, or RESEND_TO_EMAIL." },
      { status: 500 },
    );
  }

  const payload = await request.json().catch(() => ({}));
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
    return Response.json(
      {
        error: result.message || "Resend could not send the email.",
        details: result,
      },
      { status: resendResponse.status },
    );
  }

  return Response.json({ ok: true, id: result.id });
}
