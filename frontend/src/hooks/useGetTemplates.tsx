import { useEffect, useState } from "react";

const API = "http://localhost:8080/api/templates";
interface Contact {
  id: number;
  name: string;
  subject: string;
  body: string;
}

export const useGetTemplates = () => {
  const [loading, setLoading] = useState(false);
  const [templates, setTemplates] = useState<Contact[]>([]);

  const getTemplates = async () => {
    try {
      const res = await fetch(API, {
        method: "GET",
      });
      const data = res.json();
      setTemplates(await data);
    } catch {
      throw new Error("❌ Failed to get contacts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTemplates();
  }, []);

  return { templates, getTemplates, loading };
};
