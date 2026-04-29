// import { useState } from "react";

// const API = "http://localhost:8080/api/contacts";

// export const useUpdateContact = () => {
//   const [loading, setLoading] = useState(false);

//   const updateContact = async (
//     id: number,
//     name: string,
//     email: string,
//     department: string
//   ): Promise<{ message: string; type: "success" | "error" }> => {
//     setLoading(true);

//     try {
//       const res = await fetch(`${API}/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ id, name, email, department }),
//       });

//       if (!res.ok) {
//         throw new Error();
//       }

//       return {
//         message: "✅ Contact updated successfully",
//         type: "success",
//       };
//     } catch {
//       return {
//         message: "❌ Failed to update contact",
//         type: "error",
//       };
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { updateContact, loading };
// };

import { useState } from "react";

const API = "http://localhost:8080/api/contacts";

export const useUpdateContact = () => {
  const [loading, setLoading] = useState(false);

  const updateContact = async (
    id: number,
    name: string,
    email: string,
    department: string,
  ): Promise<{ message: string; type: "success" | "error" }> => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, department }),
      });

      if (!res.ok) {
        throw new Error();
      }

      return {
        message: "✅ Contact updated successfully",
        type: "success",
      };
    } catch {
      return {
        message: "❌ Failed to update contact",
        type: "error",
      };
    } finally {
      setLoading(false);
    }
  };

  return { updateContact, loading };
};
