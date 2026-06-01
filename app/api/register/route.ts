import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, formType } = body;

    // Basic validation
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'All fields (name, email, phone) are required.' },
        { status: 400 }
      );
    }

    const gmailUser = process.env.GMAIL_USER;
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

    if (!gmailUser || !gmailAppPassword) {
      console.error('Missing GMAIL_USER or GMAIL_APP_PASSWORD in environment variables.');
      return NextResponse.json(
        { error: 'SMTP configuration is missing on the server.' },
        { status: 500 }
      );
    }

    // Nodemailer transporter — identical SMTP setup as /api/bid
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    });

    // Generate a unique submission ID
    const now = new Date();
    const pad = (n: number) => String(n).padStart(2, '0');
    const datePart = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}`;
    const timePart = `${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
    const randomSuffix = Math.random().toString(36).substring(2, 5).toUpperCase();
    const submissionId = `REG${datePart}${timePart}${randomSuffix}`;

    // Determine context labels based on form type
    const isAmbassador = formType === 'ambassador';
    const isReferral = formType === 'referral';

    const formLabel = isAmbassador
      ? 'Ambassador Registration'
      : isReferral
      ? 'Referral Submission'
      : 'Registration';

    const adminSubject = isAmbassador
      ? `🎯 [New Ambassador] ${name} has registered`
      : `🔗 [New Referral] ${name} submitted a referral`;

    const userSubject = isAmbassador
      ? `✅ You're registered as a Radius Ambassador!`
      : `✅ Thanks for referring! Radius has received your details.`;

    const adminBodyTitle = isAmbassador
      ? 'New Ambassador Registration'
      : 'New Referral Submission';

    const adminBodyIntro = isAmbassador
      ? `A student has registered to become a <strong>Radius Ambassador</strong> at Chitkara University.`
      : `A student has submitted a <strong>referral</strong> via the Radius Elevate platform.`;

    const userBodyIntro = isAmbassador
      ? `Thank you for registering as a <strong>Radius Ambassador</strong>! Our team will review your details and get back to you on campus soon.`
      : `Thank you for referring a friend to Radius Elevate! Our team will review your submission and get in touch shortly.`;

    // ── Admin Email ──────────────────────────────────────────────────────────
    const adminMailOptions = {
      from: `"Radius Elevate" <${gmailUser}>`,
      to: 'rahulchauhah50@gmail.com',
      // cc: 'mohit.gandhi@infinityadvt.com',
      subject: adminSubject,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f9f9fb; padding: 40px 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); border: 1px solid #eef0f3;">
            <div style="background-color: #121212; padding: 24px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.5px;">Radius Elevate — ${adminBodyTitle}</h1>
            </div>
            <div style="padding: 32px 24px;">
              <p style="font-size: 16px; color: #1e1e24; margin-top: 0; line-height: 1.5;">${adminBodyIntro}</p>

              <div style="background-color: #f4f5f7; border-radius: 8px; padding: 20px; margin: 24px 0;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 7px 0; font-size: 14px; color: #6b7280; font-weight: 500; width: 35%;">Submission ID:</td>
                    <td style="padding: 7px 0; font-size: 14px; color: #111827; font-weight: 600; font-family: monospace;">${submissionId}</td>
                  </tr>
                  <tr>
                    <td style="padding: 7px 0; font-size: 14px; color: #6b7280; font-weight: 500;">Name:</td>
                    <td style="padding: 7px 0; font-size: 14px; color: #111827; font-weight: 600;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 7px 0; font-size: 14px; color: #6b7280; font-weight: 500;">Email:</td>
                    <td style="padding: 7px 0; font-size: 14px; color: #111827; font-weight: 600;">${email}</td>
                  </tr>
                  <tr>
                    <td style="padding: 7px 0; font-size: 14px; color: #6b7280; font-weight: 500;">Phone:</td>
                    <td style="padding: 7px 0; font-size: 14px; color: #111827; font-weight: 600;">${phone}</td>
                  </tr>
                  <tr>
                    <td style="padding: 7px 0; font-size: 14px; color: #6b7280; font-weight: 500;">Form Type:</td>
                    <td style="padding: 7px 0; font-size: 14px; color: #111827; font-weight: 600;">${formLabel}</td>
                  </tr>
                  <tr>
                    <td style="padding: 7px 0; font-size: 14px; color: #6b7280; font-weight: 500;">Submitted At:</td>
                    <td style="padding: 7px 0; font-size: 14px; color: #111827; font-weight: 600;">${now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</td>
                  </tr>
                </table>
              </div>

              <div style="text-align: center; margin-top: 32px;">
                <p style="font-size: 12px; color: #9ca3af; margin: 0;">This is an automated notification from Radius Elevate platform.</p>
              </div>
            </div>
          </div>
        </div>
      `,
    };

    // ── User Confirmation Email ───────────────────────────────────────────────
    const userMailOptions = {
      from: `"Radius Elevate" <${gmailUser}>`,
      to: email,
      cc: 'mohit.gandhi@infinityadvt.com',
      subject: userSubject,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f9f9fb; padding: 40px 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); border: 1px solid #eef0f3;">
            <div style="background-color: #D22630; padding: 24px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.5px;">Radius Elevate</h1>
            </div>
            <div style="padding: 32px 24px;">
              <p style="font-size: 16px; color: #1e1e24; margin-top: 0; line-height: 1.5; font-weight: 500;">Hi ${name},</p>
              <p style="font-size: 15px; color: #374151; line-height: 1.6; margin-bottom: 24px;">${userBodyIntro}</p>

              <div style="background-color: #fdf2f2; border: 1px solid #fde8e8; border-radius: 8px; padding: 20px; margin: 24px 0;">
                <p style="font-size: 13px; color: #9b1c1c; margin: 0 0 8px 0; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Your Submission Details</p>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 7px 0; font-size: 14px; color: #4b5563; font-weight: 500; width: 35%;">Submission ID:</td>
                    <td style="padding: 7px 0; font-size: 14px; color: #111827; font-weight: 600; font-family: monospace;">${submissionId}</td>
                  </tr>
                  <tr>
                    <td style="padding: 7px 0; font-size: 14px; color: #4b5563; font-weight: 500;">Form:</td>
                    <td style="padding: 7px 0; font-size: 14px; color: #111827; font-weight: 600;">${formLabel}</td>
                  </tr>
                  <tr>
                    <td style="padding: 7px 0; font-size: 14px; color: #4b5563; font-weight: 500;">Name:</td>
                    <td style="padding: 7px 0; font-size: 14px; color: #111827; font-weight: 600;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 7px 0; font-size: 14px; color: #4b5563; font-weight: 500;">Email:</td>
                    <td style="padding: 7px 0; font-size: 14px; color: #111827; font-weight: 600;">${email}</td>
                  </tr>
                  <tr>
                    <td style="padding: 7px 0; font-size: 14px; color: #4b5563; font-weight: 500;">Phone:</td>
                    <td style="padding: 7px 0; font-size: 14px; color: #111827; font-weight: 600;">${phone}</td>
                  </tr>
                </table>
              </div>

              <p style="font-size: 15px; color: #374151; line-height: 1.6; margin-top: 24px;">
                Our team will be in touch with you soon. See you at the <strong>Radius Grand Store Launch</strong> at Chitkara University!
              </p>

              <div style="border-top: 1px solid #eef0f3; margin-top: 32px; padding-top: 20px; text-align: center;">
                <p style="font-size: 13px; color: #6b7280; margin: 0;">Radius Elevate Store Launch</p>
                <p style="font-size: 12px; color: #9ca3af; margin: 4px 0 0 0;">Chitkara University Campus</p>
              </div>
            </div>
          </div>
        </div>
      `,
    };

    // Send both emails concurrently
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions),
    ]);

    return NextResponse.json({ success: true, submissionId });
  } catch (error: any) {
    console.error('Error handling registration submission:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to process registration.' },
      { status: 500 }
    );
  }
}
