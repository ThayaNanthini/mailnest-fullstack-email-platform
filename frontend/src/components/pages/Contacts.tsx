import { useCallback, useState } from "react";
import { EditIcon, DeleteIcon, TickIcon, CrossIcon } from "../Icons";
import { useToast } from "../../context/ToastContext";
import { useGetContacts } from "../../hooks/useGetContacts";
import Button from "../ui/Button";
import Card from "../ui/Card";
import { useAddContacts } from "../../hooks/useAddContact";
import { useUpdateContact } from "../../hooks/useUpdateContact";
import { useDeleteContact } from "../../hooks/useDeleteContact";

// ✅ Utility functions
const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const Contacts = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editContact, setEditContact] = useState(0);
  const { showToast } = useToast();
  const { contacts, getContacts } = useGetContacts();
  const { addContact, loading } = useAddContacts();
  const { updateContact } = useUpdateContact();
  const { deleteContact } = useDeleteContact();

  const add = useCallback(async () => {
    if (!name || !email || !department) {
      showToast("⚠️ Please fill all fields", "warning");
      return;
    }
    if (!isValidEmail(email)) {
      showToast("❌ Invalid email format", "error");
      return;
    }
    const res = await addContact(name, email, department);
    showToast(res.message, res.type);

    if (res.type === "success") {
      getContacts();
      handleClose();
    }
  }, [name, email, department, getContacts, addContact, showToast]);

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Are you sure?");
    if (!confirmDelete) return;
    const res = await deleteContact(id);
    showToast(res.message, res.type);
    if (res.type === "success") {
      getContacts();
    }
  };

  const handleEdit = async (id: number) => {
    if (!name || !email || !department) {
      showToast("⚠️ Please fill all fields", "warning");
      return;
    }
    if (!isValidEmail(email)) {
      showToast("❌ Invalid email format", "error");
      return;
    }
    const res = await updateContact(id, name, email, department);
    showToast(res.message, res.type);
    if (res.type === "success") {
      getContacts();
      handleClose();
    }
  };

  const edit = (details: {
    id: number;
    name: string;
    email: string;
    department: string;
  }) => {
    setIsEditing(true);
    setEditContact(details.id);
    setName(details.name);
    setEmail(details.email);
    setDepartment(details.department);
  };

  const handleClose = () => {
    setIsEditing(false);
    setEditContact(0);
    setName("");
    setEmail("");
    setDepartment("");
  };

  const contactsLength = contacts.length;
  const nameValue = !isEditing ? name : "";
  const emailValue = !isEditing ? email : "";
  const departmentValue = !isEditing ? department : "";
  const addButton = loading ? "Adding Contact..." : "Add Contact";
  const buttonDisabled = loading || !name || !email || !department || isEditing;

  return (
    <>
      <div className="header_card">
        <h2>📇 Contacts</h2>
        <div className="total">
          <h3>Total Contacts : {contactsLength}</h3>
        </div>
      </div>
      <Card>
        <input
          className="input"
          placeholder="Name"
          value={nameValue}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="input"
          placeholder="Email"
          value={emailValue}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input"
          placeholder="Department"
          value={departmentValue}
          onChange={(e) => setDepartment(e.target.value)}
        />
        <Button disabled={buttonDisabled} onClick={add}>
          {addButton}
        </Button>
      </Card>

      <div className="card contacts">
        {contactsLength === 0 ? (
          <div className="empty">No contacts yet 🚀</div>
        ) : (
          contacts.map((c) => (
            <div className="row" key={c.id}>
              {editContact === c.id ? (
                <>
                  {" "}
                  <input
                    className="input_update"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    className="input_update"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    className="input_update"
                    placeholder="Department"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  />
                </>
              ) : (
                <div className="contact_details">
                  <strong>{c.name}</strong>
                  <p>{c.email}</p>
                  <p>{c.department}</p>
                </div>
              )}

              {isEditing ? (
                <div className="actions">
                  <span
                    className="icon success"
                    onClick={() => handleEdit(c.id)}
                  >
                    <TickIcon />
                  </span>

                  <span className="icon error" onClick={() => handleClose()}>
                    <CrossIcon />
                  </span>
                </div>
              ) : (
                <div className="actions">
                  <span className="icon edit" onClick={() => edit(c)}>
                    <EditIcon />
                  </span>{" "}
                  <span
                    className="icon delete"
                    onClick={() => handleDelete(c.id)}
                  >
                    <DeleteIcon />
                  </span>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Contacts;
