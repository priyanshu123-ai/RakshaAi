import { motion } from "framer-motion";
import { useState } from "react";
import {
  Phone, MessageCircle, MapPin, Shield, Trash2,
  CheckCircle, UserPlus, Eye
} from "lucide-react";

const defaultContacts = [
  { id: "1", name: "Mom", initials: "M", phone: "+91 98765 43210", relation: "Mother", trusted: true, canTrack: true, lastActive: "Online" },
  { id: "2", name: "Sara Khan", initials: "SK", phone: "+91 87654 32109", relation: "Best Friend", trusted: true, canTrack: true, lastActive: "2h ago" },
  { id: "3", name: "Priya Sharma", initials: "PS", phone: "+91 76543 21098", relation: "Sister", trusted: true, canTrack: false, lastActive: "5h ago" },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

const InnerCirclePage = () => {
  const [contacts, setContacts] = useState(defaultContacts);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newRelation, setNewRelation] = useState("");

  const addContact = () => {
    if (!newName || !newPhone) return;

    const c = {
      id: Date.now().toString(),
      name: newName,
      initials: newName
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2),
      phone: newPhone,
      relation: newRelation || "Contact",
      trusted: true,
      canTrack: false,
      lastActive: "Just added",
    };

    setContacts([...contacts, c]);
    setNewName("");
    setNewPhone("");
    setNewRelation("");
    setShowAddForm(false);
  };

  const removeContact = (id) => {
    setContacts(contacts.filter((c) => c.id !== id));
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">

      <motion.div variants={item} className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900">
            Inner Circle
          </h1>
          <p className="text-slate-500 mt-1">
            Manage your trusted contacts who receive alerts and can monitor you.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-rose-500 text-white rounded-xl px-4 py-2.5 text-sm font-semibold flex items-center gap-2"
        >
          <UserPlus className="w-4 h-4" /> Add Contact
        </button>
      </motion.div>

      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="bg-white rounded-2xl p-5 border border-rose-500/30 shadow-lg shadow-rose-500/10"
        >
          <h3 className="font-display font-semibold text-sm text-slate-900 mb-4">
            Add Trusted Contact
          </h3>

          <div className="grid grid-cols-3 gap-3">

            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Full Name"
              className="bg-slate-100 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-rose-500"
            />

            <input
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              placeholder="Phone Number"
              className="bg-slate-100 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-rose-500"
            />

            <input
              value={newRelation}
              onChange={(e) => setNewRelation(e.target.value)}
              placeholder="Relation"
              className="bg-slate-100 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-rose-500"
            />

          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 text-sm text-slate-500"
            >
              Cancel
            </button>

            <button
              onClick={addContact}
              className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-xl px-5 py-2 text-sm font-semibold"
            >
              Add Contact
            </button>
          </div>

        </motion.div>
      )}

      <div className="grid grid-cols-3 gap-6">

        <motion.div variants={item} className="col-span-2 space-y-3">

          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-md flex items-center gap-4 group"
            >

              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 via-pink-600 to-purple-700 flex items-center justify-center text-white font-bold text-lg">
                {contact.initials}
              </div>

              <div className="flex-1">

                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-slate-900">
                    {contact.name}
                  </h3>

                  {contact.trusted && (
                    <Shield className="w-3.5 h-3.5 text-emerald-500" />
                  )}

                </div>

                <p className="text-xs text-slate-500">
                  {contact.relation} · {contact.phone}
                </p>

                <div className="flex items-center gap-3 mt-2">

                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                    contact.lastActive === "Online"
                      ? "bg-emerald-500/10 text-emerald-500"
                      : "bg-slate-100 text-slate-500"
                  }`}>
                    {contact.lastActive}
                  </span>

                  {contact.canTrack && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 flex items-center gap-1">
                      <Eye className="w-2.5 h-2.5" /> Can track you
                    </span>
                  )}

                </div>

              </div>

              <button
                onClick={() => removeContact(contact.id)}
                className="w-9 h-9 rounded-xl bg-red-500/10 flex items-center justify-center"
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </button>

            </div>
          ))}

        </motion.div>

      </div>

    </motion.div>
  );
};

export default InnerCirclePage;