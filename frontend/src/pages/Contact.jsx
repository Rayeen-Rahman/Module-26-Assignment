import { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, send to backend API
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }, 4000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-900 text-white py-14 px-4 text-center">
        <h1 className="text-4xl font-extrabold mb-2">Contact Us</h1>
        <p className="text-gray-400 text-sm">Have questions or feedback? We'd love to hear from you.</p>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12">
        {/* Info */}
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Get in Touch</h2>
          <div className="space-y-4 text-sm text-gray-600">
            {[
              { icon: "📧", label: "Email", value: "contact@newsportal.com" },
              { icon: "📞", label: "Phone", value: "+880 1700-000000" },
              { icon: "📍", label: "Address", value: "Dhaka, Bangladesh" },
              { icon: "🕐", label: "Hours", value: "Mon–Fri, 9am–6pm" },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-3">
                <span className="text-xl">{item.icon}</span>
                <div>
                  <p className="font-semibold text-gray-700">{item.label}</p>
                  <p className="text-gray-500">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          {submitted ? (
            <div className="text-center py-10">
              <span className="text-5xl block mb-4">✅</span>
              <h3 className="text-xl font-bold text-gray-900">Message Sent!</h3>
              <p className="text-gray-400 text-sm mt-2">Thanks for reaching out. We'll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-1.5">Name</label>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-50"
                    placeholder="Your name" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-1.5">Email</label>
                  <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-50"
                    placeholder="your@email.com" />
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1.5">Subject</label>
                <input required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-50"
                  placeholder="What's this about?" />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1.5">Message</label>
                <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-50 resize-none"
                  placeholder="Write your message..." />
              </div>
              <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-3 rounded-xl transition-colors text-sm">
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
