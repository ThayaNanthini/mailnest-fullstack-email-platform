import { useState } from "react";

export const useSendCampaign = () => {
  const [loading, setLoading] = useState(false);

  const sendCampaign = async (
    templateId: number | null,
    contactIds: number[],
  ): Promise<{ message: string; type: "success" | "error" | "warning" }> => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/campaigns", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ templateId, contactIds }),
      });

      if (!res.ok) {
        throw new Error();
      }

      return {
        message: "Campaign sent 🚀",
        type: "success",
      };
    } catch {
      return {
        message: "❌ Failed to send campaign",
        type: "error",
      };
    } finally {
      setLoading(false);
    }
  };

  return { sendCampaign, loading };
};
