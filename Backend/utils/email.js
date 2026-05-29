
const nodemailer = require("nodemailer");

const pug = require("pug");


const htmlToText = require("html-to-text");


module.exports = class Email {

  constructor(user, url) {

  
    this.to = user.email;

  
    this.firstName = user.name.split(" ")[0];

  
    this.url = url;
    this.from = `OrderIt <${process.env.EMAIL_FROM}>`;
  }
  newTransport() {



    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,

      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  // Main function used to send emails
  // It receives template name and email subject
  async send(template, subject) {

    // Render HTML email using pug template
    // The template receives dynamic data such as name and URL
    const html = pug.renderFile(`${__dirname}/../view/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
    });

    // Email options that define the email structure
    const mailOptions = {

      // Sender address
      from: this.from,

      // Receiver address
      to: this.to,

      // Email subject
      subject,

      // HTML version of the email
      html,

      // Plain text version of the email
      text: htmlToText.convert(html),
    };

    // Send email using configured transporter
    await this.newTransport().sendMail(mailOptions);
  }

  // Function used to send welcome email after user registers
  async sendWelcome() {

    await this.send("welcome", "welcome to the Order It!");
  }

  // Function used to send password reset email
  async sendPasswordReset() {

    await this.send(
      "passwordReset",
      "password reset token (valid for only 10 minutes)"
    );
  }
};



// Notes for development

// Mailtrap is commonly used during development
// It captures emails instead of actually sending them to real users
// This prevents accidental emails being sent to customers

// Example service:
// https://mailtrap.io

// Another service used in production:
// SendGrid
// SendGrid provides an SMTP server to send emails reliably

// For testing you can also use mailsac
// Example: anything@mailsac.com will receive emails instantly
