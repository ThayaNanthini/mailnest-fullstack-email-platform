import { useCallback, useState } from "react";
import { useToast } from "../../context/ToastContext";
import Button from "../ui/Button";
import Card from "../ui/Card";
import { useSendCampaign } from "../../hooks/useSendCampaign";
import { useGetContacts } from "../../hooks/useGetContacts";
import { useGetTemplates } from "../../hooks/useGetTemplates";

const Campaigns = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [selectedContacts, setSelectedContacts] = useState<number[]>([]);
  const { showToast } = useToast();
  const { sendCampaign, loading } = useSendCampaign();
  const { contacts } = useGetContacts();
  const { templates } = useGetTemplates();

  const toggle = (id: number) => {
    setSelectedContacts((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const handleSend = useCallback(async () => {
    if (!selectedTemplate) {
      showToast("⚠️ Select a template", "warning");
      return;
    }

    if (selectedContacts.length === 0) {
      showToast("⚠️ Select at least one contact", "warning");
      return;
    }
    const res = await sendCampaign(selectedTemplate, selectedContacts);

    showToast(res.message, res.type);
  }, [selectedTemplate, selectedContacts, sendCampaign, showToast]);

  const contactsLength = selectedContacts.length;
  const sendCampaignButton = loading ? "Sending Campaign.." : "Send Campaign";

  return (
    <>
      <div className="header_card">
        <h2>📤 Campaigns</h2>{" "}
        <Button onClick={handleSend} disabled={loading}>
          {sendCampaignButton}
        </Button>
      </div>
      <div className="campaign">
        <Card>
          <h3>Select Template</h3>
          <div className="campaign_grid items_list">
            {templates.map((t) => (
              <div
                key={t.id}
                className={`template ${selectedTemplate === t.id ? "active" : ""}`}
                onClick={() => setSelectedTemplate(t.id)}
              >
                <h4>{t.name}</h4>
                <p>{t.subject}</p>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h3>Contacts ({contactsLength})</h3>
          <div className="items_list">
            {contacts.map((c) => (
              <div key={c.id} className="row">
                <label className="container">
                  <input type="checkbox" onChange={() => toggle(c.id)} />
                  <span className="checkmark"></span>
                </label>
                <div className="contact_details">
                  <p>{c.name}</p>
                  <p>{c.email}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
};

export default Campaigns;
