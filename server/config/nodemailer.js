
import brevo from "@getbrevo/brevo";

export const sendEmail = async (toEmail, subject, htmlContent) => {
  try {
    const apiInstance = new brevo.TransactionalEmailsApi();

    apiInstance.setApiKey(
      brevo.TransactionalEmailsApiApiKeys.apiKey,
      process.env.BREVO_API_KEY
    );

    const emailData = {
      sender: {
        email: "hasnainiftikhar930@gmail.com",
        name: "Roomora", 
      },
      to: [{ email: toEmail }],
      subject,
      htmlContent,
    };

    await apiInstance.sendTransacEmail(emailData);
    console.log(' Brevo API email sent successfully');
  } catch (error) {
    console.error("Brevo Email Error:", error?.response?.data || error.message);
    throw error;
  }
};