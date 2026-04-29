import { useState } from "react";

const API = "http://localhost:8080/api/contacts";

export const useAddContacts = () => {
  const [loading, setLoading] = useState(false);

  const addContact = async (
    name: string,
    email: string,
    department: string,
  ): Promise<{ message: string; type: "success" | "error" }> => {
    setLoading(true);
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, department }),
      });
      if (!res.ok) {
        throw new Error();
      }
      return {
        message: "✅ Contact added successfully",
        type: "success",
      };
    } catch {
      return {
        message: "❌ Failed to add contact",
        type: "error",
      };
    } finally {
      setLoading(false);
    }
  };

  return { addContact, loading };
};
