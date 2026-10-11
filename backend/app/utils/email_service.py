
import os
import smtplib
import logging
from email.message import EmailMessage

logger = logging.getLogger(__name__)


def send_email(to_email: str, subject: str, body: str) -> None:
    host = os.getenv("SMTP_HOST") or os.getenv("Host")
    port_value = os.getenv("SMTP_PORT") or os.getenv("Port") or "587"
    username = os.getenv("SMTP_USERNAME") or os.getenv("Username")
    password = os.getenv("SMTP_PASSWORD") or os.getenv("Password")

    from_email = (
        os.getenv("SMTP_FROM_EMAIL")
        or os.getenv("EMAIL_FROM")
        or os.getenv("EMAIL")
        or username
    )

    try:
        port = int(port_value)
    except (TypeError, ValueError):
        logger.error("Invalid SMTP port configuration.")
        
        return

    # Safe diagnostics: never print the password.
   

    if not all([host, username, password, from_email]):
        logger.error("SMTP configuration is incomplete; email not sent.")
        
        return

    message = EmailMessage()
    message["Subject"] = subject
    message["From"] = from_email
    message["To"] = to_email
    message.set_content(body)

    try:
        if port == 465:
            with smtplib.SMTP_SSL(host, port, timeout=20) as server:
                
                server.login(username, password)
                
                server.send_message(message)
        else:
            with smtplib.SMTP(host, port, timeout=20) as server:
                
                server.ehlo()
                server.starttls()
                server.ehlo()
                
                server.login(username, password)
                
                server.send_message(message)

        logger.info("Email accepted by SMTP for %s", to_email)
        

    except Exception as exc:
        logger.exception("Failed to send email to %s", to_email)
        


def send_welcome_email(to_email: str, name: str) -> None:
    

    send_email(
        to_email=to_email,
        subject="Welcome to TrendBlogHub!",
        body=(
            f"Hi {name},\n\n"
            "Welcome to TrendBlogHub!\n\n"
            "Your account has been created successfully. "
            "You can now log in and explore our latest blogs.\n\n"
            "Thanks for joining us,\n"
            "TrendBlogHub Team"
        ),
    )


def send_login_alert(to_email: str, name: str) -> None:
    

    send_email(
        to_email=to_email,
        subject="New login to your TrendBlogHub account",
        body=(
            f"Hi {name},\n\n"
            "Your TrendBlogHub account was just logged into successfully.\n\n"
            "If this was you, no action is needed. If you do not "
            "recognize this activity, change your password and "
            "contact the site administrator.\n\n"
            "TrendBlogHub Team"
        ),
    )
