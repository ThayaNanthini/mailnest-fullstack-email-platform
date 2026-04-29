import { useEffect, useState } from "react";

const API = "http://localhost:8080/api/contacts";
interface Contact {
  id: number;
  name: string;
  email: string;
  department: string;
}

export const useGetContacts = () => {
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);

  const getContacts = async () => {
    try {
      const res = await fetch(API, {
        method: "GET",
      });
      const data = res.json();
      setContacts(await data);
    } catch {
      throw new Error("❌ Failed to get contacts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  return { contacts, getContacts, loading };
};
