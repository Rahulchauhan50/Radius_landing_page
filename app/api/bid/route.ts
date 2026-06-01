import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, bidAmount } = body;

    // Basic Input Validation
    if (!name || !phone || !email || !bidAmount) {
      return NextResponse.json(
        { error: 'All fields (name, phone, email, bidAmount) are required.' },
        { status: 400 }
      );
    }

    const parsedBid = parseFloat(bidAmount);
    if (isNaN(parsedBid) || parsedBid <= 0) {
      return NextResponse.json(
        { error: 'Bid amount must be a positive number.' },
        { status: 400 }
      );
    }

    const gmailUser = process.env.GMAIL_USER;
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

    if (!gmailUser || !gmailAppPassword) {
      console.error('Missing GMAIL_USER or GMAIL_APP_PASSWORD in environment variables.');
      return NextResponse.json(
        { error: 'SMTP Configuration is missing. Please configure GMAIL_USER and GMAIL_APP_PASSWORD.' },
        { status: 500 }
      );
    }

    // Set up Nodemailer Transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    });

    // Generate unique Bid ID based on current date, time, and random component
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const randomSuffix = Math.random().toString(36).substring(2, 5).toUpperCase();
    const bidId = `BID${year}${month}${day}${hours}${minutes}${seconds}${randomSuffix}`;

    const formattedAmount = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(parsedBid);

    // Email to Admin
    const adminMailOptions = {
      from: `"Radius Auction" <${gmailUser}>`,
      to: 'rahulchauhah50@gmail.com',
      cc: 'mohit.gandhi@infinityadvt.com',
      subject: `🚨 [New Auction Bid] MacBook Neo - ${name}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f9f9fb; padding: 40px 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); border: 1px solid #eef0f3;">
            <div style="background-color: #121212; padding: 24px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.5px;">Radius Auction Update</h1>
            </div>
            <div style="padding: 32px 24px;">
              <p style="font-size: 16px; color: #1e1e24; margin-top: 0; line-height: 1.5;">A student has submitted a new bid on the <strong>MacBook Neo</strong> Surprise Bid event!</p>
              
              <div style="background-color: #f4f5f7; border-radius: 8px; padding: 20px; margin: 24px 0;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 6px 0; font-size: 14px; color: #6b7280; font-weight: 500; width: 35%;">Bid ID:</td>
                    <td style="padding: 6px 0; font-size: 14px; color: #111827; font-weight: 600; font-family: monospace;">${bidId}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-size: 14px; color: #6b7280; font-weight: 500; width: 35%;">Bidder Name:</td>
                    <td style="padding: 6px 0; font-size: 14px; color: #111827; font-weight: 600;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-size: 14px; color: #6b7280; font-weight: 500;">Bid Amount:</td>
                    <td style="padding: 6px 0; font-size: 16px; color: #D22630; font-weight: 700;">${formattedAmount}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-size: 14px; color: #6b7280; font-weight: 500;">Email Address:</td>
                    <td style="padding: 6px 0; font-size: 14px; color: #111827; font-weight: 600;">${email}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-size: 14px; color: #6b7280; font-weight: 500;">Phone Number:</td>
                    <td style="padding: 6px 0; font-size: 14px; color: #111827; font-weight: 600;">${phone}</td>
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

    // Email to Bidding User (Student)
    const userMailOptions = {
      from: `"Radius Elevate" <${gmailUser}>`,
      to: email,
      cc: 'mohit.gandhi@infinityadvt.com',
      subject: `🎉 Bid Logged: MacBook Neo Surprise Bid Event`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f9f9fb; padding: 40px 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); border: 1px solid #eef0f3;">
            <div style="background-color: #D22630; padding: 24px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.5px;">Radius Elevate</h1>
            </div>
            <div style="padding: 32px 24px;">
              <p style="font-size: 16px; color: #1e1e24; margin-top: 0; line-height: 1.5; font-weight: 500;">Hi ${name},</p>
              <p style="font-size: 15px; color: #374151; line-height: 1.6; margin-bottom: 24px;">Thank you for participating in the Radius Elevate Grand Store Opening event at Chitkara University. We have successfully logged your custom surprise bid for the MacBook Neo!</p>
              
              <div style="background-color: #fdf2f2; border: 1px solid #fde8e8; border-radius: 8px; padding: 20px; margin: 24px 0;">
                <p style="font-size: 13px; color: #9b1c1c; margin: 0 0 8px 0; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Your Registered Bid Details</p>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 6px 0; font-size: 14px; color: #4b5563; font-weight: 500; width: 35%;">Bid ID:</td>
                    <td style="padding: 6px 0; font-size: 14px; color: #111827; font-weight: 600; font-family: monospace;">${bidId}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-size: 14px; color: #4b5563; font-weight: 500;">Device:</td>
                    <td style="padding: 6px 0; font-size: 14px; color: #111827; font-weight: 600;">MacBook Neo</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-size: 14px; color: #4b5563; font-weight: 500;">Your Bid Price:</td>
                    <td style="padding: 6px 0; font-size: 16px; color: #D22630; font-weight: 700;">${formattedAmount}</td>
                  </tr>
                </table>
              </div>

              <p style="font-size: 15px; color: #374151; line-height: 1.6; margin-top: 24px;">Our team is reviewing all entries. We will announce the final selected surprise bids during our Grand Store Launch. Stay tuned and see you there!</p>
              
              <div style="border-t: 1px solid #eef0f3; margin-top: 32px; padding-top: 20px; text-align: center;">
                <p style="font-size: 13px; color: #6b7280; margin: 0;">Radius Elevate Store Launch</p>
                <p style="font-size: 12px; color: #9ca3af; margin: 4px 0 0 0;">Chitkara University Campus</p>
              </div>
            </div>
          </div>
        </div>
      `,
    };

    // Send emails concurrently
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions),
    ]);

    return NextResponse.json({ success: true, bidId });
  } catch (error: any) {
    console.error('Error handling bid submission:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to process bid submission.' },
      { status: 500 }
    );
  }
}
