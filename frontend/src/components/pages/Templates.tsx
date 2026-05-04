import { useCallback, useState } from "react";
import { DeleteIcon } from "../Icons";
import { useToast } from "../../context/ToastContext";
import Button from "../ui/Button";
import Card from "../ui/Card";
import { useAddTemplates } from "../../hooks/useAddTemplate";
import { useGetTemplates } from "../../hooks/useGetTemplates";
import { useDeleteTemplate } from "../../hooks/useDeleteTemplate";

const Templates = () => {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const { showToast } = useToast();
  const { templates, getTemplates } = useGetTemplates();
  const { addTemplate, loading } = useAddTemplates();
  const { deleteTemplate } = useDeleteTemplate();

  const add = useCallback(async () => {
    if (!name || !subject || !body) {
      showToast("⚠️ Please fill all fields", "warning");
      return;
    }
    const res = await addTemplate(name, subject, body);
    showToast(res.message, res.type);
    if (res.type === "success") {
      getTemplates();
      handleClose();
    }
  }, [name, body, subject, addTemplate, getTemplates, showToast]);

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Are you sure?");
    if (!confirmDelete) return;
    const res = await deleteTemplate(id);
    showToast(res.message, res.type);
    if (res.type === "success") {
      getTemplates();
    }
  };

  const handleClose = () => {
    setName("");
    setSubject("");
    setBody("");
  };

  const buttonDisabled = loading || !name || !subject || !body;
  const addButton = loading ? "Adding Template..." : "Add Template";
  const totalTemplates = templates.length;

  return (
    <>
      <div className="header_card">
        <h2>🧾 Templates</h2>
        <div className="total">
          <h3>Total Templates : {totalTemplates}</h3>
        </div>
      </div>

      <Card>
        <input
          className="input"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="input"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <textarea
          className="input"
          placeholder="Email Body (use {{name}}... {{department}})"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <Button onClick={add} disabled={buttonDisabled}>
          {addButton}
        </Button>
      </Card>

      <div className="grid">
        {templates.map((t) => (
          <div className="template delete" key={t.id}>
            <div>
              <h4>{t.name}</h4>
              <p>{t.subject}</p>
            </div>
            <div className="actions">
              <span className="icon delete" onClick={() => handleDelete(t.id)}>
                <DeleteIcon />
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Templates;
