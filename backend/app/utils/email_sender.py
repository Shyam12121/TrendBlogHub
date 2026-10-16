import os
import smtplib
from email.message import EmailMessage


SMTP_HOST = os.getenv("SMTP_HOST")
SMTP_PORT = int(os.getenv("SMTP_PORT", 587))
SMTP_USER = os.getenv("SMTP_USER")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")
SMTP_FROM = os.getenv("SMTP_FROM", SMTP_USER)


def send_otp_email(to_email: str, otp: str) -> None:
    """
    Brevo SMTP se OTP email bhejta hai.
    Register/Login me jo SMTP use ho raha hai wahi ye use karta hai.
    """
    message = EmailMessage()
    message["From"] = SMTP_FROM
    message["To"] = to_email
    message["Subject"] = "Your Password Reset OTP — TrendBlogHub"

    text_body = f"""Hello,

Your OTP for password reset is: {otp}

This OTP is valid for 10 minutes. Do not share it with anyone.

If you didn't request this, please ignore this email.

— TrendBlogHub Team
"""
    message.set_content(text_body)

    html_body = f"""
    <html>
      <body style="font-family: Arial, sans-serif; background:#f8fafc; padding:24px;">
        <div style="max-width:480px; margin:0 auto; background:#ffffff; border-radius:12px;
                    padding:32px; box-shadow:0 10px 30px rgba(15,23,42,0.08);">
          <h2 style="color:#0b1a33; margin:0 0 12px;">Password Reset OTP</h2>
          <p style="color:#475569; font-size:14px; margin:0 0 24px;">
            Use the code below to reset your TrendBlogHub password.
          </p>
          <div style="font-size:32px; font-weight:700; letter-spacing:8px;
                      text-align:center; color:#2563eb; background:#eef2ff;
                      padding:16px; border-radius:10px;">
            {otp}
          </div>
          <p style="color:#64748b; font-size:13px; margin:24px 0 0;">
            This OTP is valid for <b>10 minutes</b>. Do not share it with anyone.
          </p>
          <p style="color:#94a3b8; font-size:12px; margin:16px 0 0;">
            If you didn't request this, please ignore this email.
          </p>
        </div>
      </body>
    </html>
    """
    message.add_alternative(html_body, subtype="html")

    with smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=15) as server:
        server.starttls()
        server.login(SMTP_USER, SMTP_PASSWORD)
        server.send_message(message)