const { contactUsEmail } = require("../Mail/Template/ContactForm");
const mailSender = require("../utils/MailSender");

exports.contactUsController = async (req, res) => {
  const { email, firstname, lastname, message, phoneNo, countrycode } =
    req.body;
  console.log(req.body);
  try {
    await mailSender(
      email,
      "Your Data send successfully",
      contactUsEmail(email, firstname, lastname, message, phoneNo, countrycode)
    );
    return res.json({
      success: true,
      message: "Email send successfully",
    });
  } catch (error) {
    console.error(error);
    return res.json({
      success: false,
      message: "Something went wrong...",
    });
  }
};



/**
 * ========================================
 * 📩 Contact Controller Summary
 * ========================================
 *
 * This controller handles the submission of contact form data
 * from users through the "Contact Us" page.
 *
 * 📨 contactUsController (`exports.contactUsController`)
 *    - Extracts the following fields from `req.body`:
 *      - `email`, `firstname`, `lastname`, `message`, `phoneNo`, `countrycode`
 *    - Uses a pre-defined email template (`contactUsEmail`) to format the email body.
 *    - Sends the email using the `mailSender` utility.
 *    - Responds with a success or error message.
 *
 * 📌 Utilized Modules:
 *    - `contactUsEmail` – Formats the contact form data into an email template.
 *    - `mailSender` – Sends the actual email using the configured mail transport.
 *
 * ✅ Use Case:
 *    - To send confirmation or follow-up messages when users submit contact queries.
 *
 * ========================================
 */
