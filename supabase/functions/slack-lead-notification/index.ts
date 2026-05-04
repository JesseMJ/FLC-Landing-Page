import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const SLACK_WEBHOOK_URL = Deno.env.get("SLACK_WEBHOOK_URL") as string;

Deno.serve(async (req: Request) => {
  try {
    const payload = await req.json();

    if (payload.type === 'INSERT' && payload.table === 'leads') {
      const lead = payload.record;
      const services = Array.isArray(lead.services_requested) 
        ? lead.services_requested.join(', ') 
        : 'None specified';

      const slackMessage = {
        blocks: [
          {
            type: "header",
            text: {
              type: "plain_text",
              text: "🌱 New Lawn Care Lead!",
              emoji: true
            }
          },
          {
            type: "section",
            fields: [
              { type: "mrkdwn", text: `*Name:*\n${lead.full_name}` },
              { type: "mrkdwn", text: `*Phone:*\n${lead.phone || 'N/A'}` },
              { type: "mrkdwn", text: `*Email:*\n${lead.email || 'N/A'}` },
              { type: "mrkdwn", text: `*Address:*\n${lead.address}` },
              { type: "mrkdwn", text: `*Lot Size:*\n${lead.lot_size}` },
              { type: "mrkdwn", text: `*Services Requested:*\n${services}` }
            ]
          }
        ]
      };

      const response = await fetch(SLACK_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(slackMessage)
      });

      if (!response.ok) {
        console.error("Slack API error:", await response.text());
        return new Response("Failed to send to Slack", { status: 500 });
      }

      return new Response("Notification sent to Slack", { status: 200 });
    }

    return new Response("Ignored payload", { status: 200 });
  } catch (err) {
    console.error("Error processing webhook:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
});
