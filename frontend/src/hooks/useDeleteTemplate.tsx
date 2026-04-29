import { useState } from "react";

const API = "http://localhost:8080/api/templates";

export const useDeleteTemplate = () => {
  const [loading, setLoading] = useState(false);

  const deleteTemplate = async (
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
        message: "✅ Template deleted successfully",
        type: "success",
      };
    } catch {
      return {
        message: "❌ Failed to delete template",
        type: "error",
      };
    } finally {
      setLoading(false);
    }
  };
  return { deleteTemplate, loading };
};
