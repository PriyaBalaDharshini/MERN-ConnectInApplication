import { mailtrapClient, sender } from "../lib/mailTrap.js";
import { createWelcomeEmailTemplate } from "./emailTemplate.js";

export const sendWelcomeEmail = async (email, name, profileUrl) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Welcome to ConnectIn",
            html: createWelcomeEmailTemplate(name, profileUrl),
            category: "welcome",
        });

        console.log("Welcome Email sent succesffully", response);
    } catch (error) {
        throw error;
    }
};