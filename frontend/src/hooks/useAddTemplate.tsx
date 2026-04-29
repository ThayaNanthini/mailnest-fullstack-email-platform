import { useState } from "react";

const API = "http://localhost:8080/api/templates";

export const useAddTemplates = () => {
  const [loading, setLoading] = useState(false);

  const addTemplate = async (
    name: string,
    subject: string,
    body: string
  ): Promise<{ message: string; type: "success" | "error" }> => {
    setLoading(true);
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, subject, body }),
      });

      if (!res.ok) {
        throw new Error();
      }

      return {
        message: "✅ Template added successfully",
        type: "success",
      };
    } catch {
      return {
        message: "❌ Failed to add template",
        type: "error",
      };
    } finally {
      setLoading(false);
    }
  };

  return { addTemplate, loading };
};