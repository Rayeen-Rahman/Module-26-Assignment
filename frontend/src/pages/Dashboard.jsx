import { useState, useEffect } from "react";
import API from "../api/axios";
import useAuthStore from "../store/authStore";

const categories = ["Technology", "Sports", "Politics", "Entertainment", "Business", "Health", "Science", "World"];

const Dashboard = () => {
  const { user, updateUser } = useAuthStore();
  const [myNews, setMyNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("news"); // 'news' | 'create' | 'profile'
  const [editingNews, setEditingNews] = useState(null);

  // Profile form
  const [profile, setProfile] = useState({ name: user?.name || "", avatar: user?.avatar || "", bio: user?.bio || "" });
  const [profileMsg, setProfileMsg] = useState("");

  // News form
  const [newsForm, setNewsForm] = useState({ title: "", content: "", image: "", category: "World" });
  const [newsMsg, setNewsMsg] = useState("");

  const fetchMyNews = async () => {
    try {
      const { data } = await API.get("/news/my");
      setMyNews(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMyNews(); }, []);

  const handleCreateNews = async (e) => {
    e.preventDefault();
    setNewsMsg("");
    try {
      if (editingNews) {
        await API.put(`/news/${editingNews._id}`, newsForm);
        setNewsMsg("✅ News updated successfully!");
        setEditingNews(null);
      } else {
        await API.post("/news", newsForm);
        setNewsMsg("✅ News published successfully!");
      }
      setNewsForm({ title: "", content: "", image: "", category: "World" });
      fetchMyNews();
      setTimeout(() => { setNewsMsg(""); setActiveTab("news"); }, 1500);
    } catch (err) {
      setNewsMsg("❌ " + (err.response?.data?.message || "Failed"));
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this article?")) return;
    await API.delete(`/news/${id}`);
    setMyNews((prev) => prev.filter((n) => n._id !== id));
  };

  const startEdit = (item) => {
    setEditingNews(item);
    setNewsForm({ title: item.title, content: item.content, image: item.image, category: item.category });
    setActiveTab("create");
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setProfileMsg("");
    try {
      const { data } = await API.put("/user/profile", profile);
      updateUser(data);
      setProfileMsg("✅ Profile updated!");
      setTimeout(() => setProfileMsg(""), 2000);
    } catch (err) {
      setProfileMsg("❌ " + (err.response?.data?.message || "Failed"));
    }
  };

  const Tab = ({ id, label }) => (
    <button
      onClick={() => { setActiveTab(id); setEditingNews(null); setNewsMsg(""); }}
      className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all
        ${activeTab === id ? "bg-yellow-500 text-gray-900" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-900 text-white py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-extrabold mb-1">👤 Dashboard</h1>
          <p className="text-gray-400 text-sm">Welcome back, {user?.name}</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-3 mb-8 flex-wrap">
          <Tab id="news" label={`📰 My News (${myNews.length})`} />
          <Tab id="create" label={editingNews ? "✏️ Edit Article" : "➕ New Article"} />
          <Tab id="profile" label="👤 Profile" />
        </div>

        {/* My News Tab */}
        {activeTab === "news" && (
          <div>
            {loading ? (
              <p className="text-gray-400 text-center py-10">Loading...</p>
            ) : myNews.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <p className="text-4xl mb-3">📭</p>
                <p className="font-medium">You haven't published any news yet</p>
                <button onClick={() => setActiveTab("create")} className="mt-4 bg-yellow-500 text-gray-900 font-bold px-6 py-2.5 rounded-xl text-sm hover:bg-yellow-400 transition-colors">
                  Write Your First Article
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {myNews.map((item) => (
                  <div key={item._id} className="bg-white rounded-2xl border border-gray-100 p-5 flex items-start gap-4 shadow-sm">
                    {item.image && (
                      <img src={item.image} alt={item.title} className="w-20 h-16 object-cover rounded-xl flex-shrink-0" onError={(e) => { e.target.style.display = "none"; }} />
                    )}
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-bold text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded-full">{item.category}</span>
                      <h3 className="font-bold text-gray-900 mt-1 text-sm line-clamp-1">{item.title}</h3>
                      <p className="text-gray-400 text-xs mt-1 line-clamp-2">{item.content}</p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button onClick={() => startEdit(item)} className="bg-gray-100 hover:bg-yellow-100 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors">Edit</button>
                      <button onClick={() => handleDelete(item._id)} className="bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Create/Edit News Tab */}
        {activeTab === "create" && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm max-w-2xl">
            <h2 className="text-xl font-extrabold text-gray-900 mb-6">
              {editingNews ? "Edit Article" : "Publish New Article"}
            </h2>
            {newsMsg && (
              <div className={`mb-5 text-sm px-4 py-3 rounded-xl ${newsMsg.startsWith("✅") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>
                {newsMsg}
              </div>
            )}
            <form onSubmit={handleCreateNews} className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1.5">Title *</label>
                <input required value={newsForm.title} onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-50"
                  placeholder="Article title..." />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1.5">Category</label>
                <select value={newsForm.category} onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-50">
                  {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1.5">Image URL (optional)</label>
                <input value={newsForm.image} onChange={(e) => setNewsForm({ ...newsForm, image: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-50"
                  placeholder="https://..." />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1.5">Content *</label>
                <textarea required rows={8} value={newsForm.content} onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-50 resize-none"
                  placeholder="Write your article content here..." />
              </div>
              <div className="flex gap-3">
                <button type="submit" className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold px-6 py-3 rounded-xl transition-colors text-sm">
                  {editingNews ? "Update Article" : "Publish Article"}
                </button>
                {editingNews && (
                  <button type="button" onClick={() => { setEditingNews(null); setNewsForm({ title: "", content: "", image: "", category: "World" }); setActiveTab("news"); }}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-6 py-3 rounded-xl transition-colors text-sm">
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm max-w-lg">
            <h2 className="text-xl font-extrabold text-gray-900 mb-6">Update Profile</h2>
            {profileMsg && (
              <div className={`mb-5 text-sm px-4 py-3 rounded-xl ${profileMsg.startsWith("✅") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>
                {profileMsg}
              </div>
            )}
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1.5">Name</label>
                <input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-50" />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1.5">Avatar URL</label>
                <input value={profile.avatar} onChange={(e) => setProfile({ ...profile, avatar: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-50"
                  placeholder="https://..." />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1.5">Bio</label>
                <textarea rows={3} value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-50 resize-none"
                  placeholder="Tell us about yourself..." />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1.5">Email (read-only)</label>
                <input value={user?.email} readOnly className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-gray-100 text-gray-400 cursor-not-allowed" />
              </div>
              <button type="submit" className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold px-6 py-3 rounded-xl transition-colors text-sm">
                Save Changes
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
