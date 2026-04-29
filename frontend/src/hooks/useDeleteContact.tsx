import { useState } from "react";

const API = "http://localhost:8080/api/contacts";

export const useDeleteContact = () => {
  const [loading, setLoading] = useState(false);

  const deleteContact = async (
    id: number,
  ): Promise<{ message: string; type: "success" | "error" }> => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error();
      }

      return {
        message: "✅ Contact deleted successfully",
        type: "success",
      };
    } catch {
      return {
        message: "❌ Failed to delete contact",
        type: "error",
      };
    } finally {
      setLoading(false);
    }
  };
  return { deleteContact, loading };
};
