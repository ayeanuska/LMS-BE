import {
  passwordResetOTPSendTemplate,
  userActivationUrlEmailTemplate,
} from "./emailTemplate.js";
import { emailTransporter } from "./transport.js";

export const userActivationUrlEmail = async (obj) => {
  // { fuction: // get the transporter
  // get template}
  const transporter = emailTransporter();
  const info = await transporter.sendMail(userActivationUrlEmailTemplate(obj));
  console.log(info.messageId);
  return info.messageId;
};

export const passwordResetOTPNotifEmail = async (obj) => {
  // { fuction: // get the transporter
  // get template}
  const transporter = emailTransporter();
  const info = await transporter.sendMail(passwordResetOTPSendTemplate(obj));

  return info.messageId;
};
