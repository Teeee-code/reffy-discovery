exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { prospectName, contactPref, phone, email, transcript, timestamp } = JSON.parse(event.body);

    const emailBody = `
NEW REFFY CONVERSATION
======================
Time: ${timestamp}
Prospect: ${prospectName || 'Unknown'}
Phone: ${phone || 'Not provided'}
Email: ${email || 'Not provided'}
Contact preference: ${contactPref || 'Not specified'}

TRANSCRIPT:
-----------
${transcript}
    `.trim();

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
