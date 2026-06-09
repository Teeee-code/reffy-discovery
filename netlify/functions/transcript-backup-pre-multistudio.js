exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { prospectName, contactPref, phone, email, transcript, timestamp } = JSON.parse(event.body);

    // Generate PATH summary using Claude
    let pathSummary = '';
    try {
      const aiResponse = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 600,
          messages: [{
            role: 'user',
            content: `You are a sales assistant for Club Pilates. Read this prospect conversation and extract clean PATH notes for the studio team to enter into ClubReady. Be concise — 1-2 sentences per section max. If a section wasn't discussed, write "Not discussed."

PATH format:
P — Purpose: What sparked their interest in Pilates? What are they hoping Pilates will help them with?
A — Activity: What are they currently doing for fitness/staying active?
T — Training History: What have they done in the past? What worked and what didn't?
H — Health/Injuries: Any injuries, limitations, or health goals mentioned?
OTHER NOTES: Anything else the team should know (nervousness, readiness to book, objections, personality, specific scheduling needs, etc.)

Conversation:
${transcript}

Return ONLY the PATH notes in clean plain text, no extra commentary.`
          }]
        })
      });

      const aiData = await aiResponse.json();
      pathSummary = aiData.content?.[0]?.text || 'PATH summary unavailable.';
    } catch(e) {
      pathSummary = 'PATH summary unavailable — see full transcript below.';
    }

    const emailBody = `NEW REFFY CONVERSATION
======================
Prospect: ${prospectName || 'Unknown'}
Phone: ${phone || 'Not provided'}
Email: ${email || 'Not provided'}
Contact preference: ${contactPref || 'Not specified'}
Time: ${timestamp}

PATH NOTES
----------
${pathSummary}

FULL TRANSCRIPT
---------------
${transcript}`.trim();

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Reffy <onboarding@resend.dev>',
        to: [process.env.NOTIFY_EMAIL],
        subject: `New Reffy Conversation — ${prospectName || 'Prospect'} | Club Pilates Mission Valley`,
        text: emailBody,
      }),
    });

    const data = await res.json();
    console.log('Resend response:', JSON.stringify(data));

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error('Email error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
