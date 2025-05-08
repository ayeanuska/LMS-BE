import { userActivationUrlEmailTemplate } from "./emailTemplate.js";
import { emailTransporter } from "./transport.js";

export const userActivationUrlEmail = async (obj) => {
  // get the transporter
  // get template
  const transporter = emailTransporter();
  const info = await transporter.sendMail(userActivationUrlEmailTemplate(obj));
  console.log(info.messageId);
  return info.messageId;
};
