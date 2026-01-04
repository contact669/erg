import { adminDb } from "@/firebase/admin";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const event = req.body;
    const quoteRequest = event.data?.document?.fields;
    const requestId = event.data?.document?.name.split('/').pop();

    if (!quoteRequest || !requestId) {
      console.warn("Invalid event payload received:", JSON.stringify(event, null, 2));
      return res.status(400).json({ message: "Invalid payload: missing quote request data." });
    }

    const getFieldValue = (field: any) => {
        if (!field) return undefined;
        return field.stringValue || field.integerValue || field.doubleValue || undefined;
    }
    
    const clientName = getFieldValue(quoteRequest.clientName);
    const clientEmail = getFieldValue(quoteRequest.clientEmail);
    const clientPhone = getFieldValue(quoteRequest.clientPhone);
    const projectDescription = getFieldValue(quoteRequest.projectDescription);

    if (!clientName || !clientEmail || !projectDescription) {
        console.error("Missing critical fields in quote request:", { clientName, clientEmail });
        return res.status(400).json({ message: "Missing critical fields in quote request." });
    }

    const mailCollection = adminDb.collection("mail");

    // Email to Admin
    await mailCollection.add({
      to: "contact@erg-renovation.fr", 
      template: {
        name: "quote-request-admin",
        data: {
          clientName,
          clientEmail,
          clientPhone: clientPhone || "Non fourni",
          projectDescription,
          requestId,
        },
      },
    });

    // Confirmation Email to Client
    await mailCollection.add({
      to: clientEmail,
      template: {
        name: "quote-request-confirmation",
        data: {
          clientName,
        },
      },
    });

    res.status(200).json({ message: "Emails triggered successfully." });
  } catch (error) {
    console.error("Error triggering emails:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

    