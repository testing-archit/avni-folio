import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const { name, email, message } = await req.json();

  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'avnisixc13@gmail.com',
      subject: 'New message from your portfolio',
      react: (
        <div>
          <h1>New message from {name}</h1>
          <p>Email: {email}</p>
          <p>Message: {message}</p>
        </div>
      ),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}