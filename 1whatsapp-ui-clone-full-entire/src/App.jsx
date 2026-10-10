import { useMemo, useState } from "react";
import {
  MessageCircle, CircleDashed, Users, Search, MoreVertical, Paperclip,
  Smile, Mic, Send, Phone, Video, ChevronDown, CheckCheck, Plus, Filter,
  ArrowLeft, Check, Archive, Star, Pin, X, Settings, Menu, PanelLeftClose
} from "lucide-react";
import "./App.css";

const initialChats = [
  {
    id: 1, name: "Madara Uchiha", avatar: "MU", color: "#d99cbd",
    time: "4:42 PM",avatar: "MU",photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtfhBIzRwalLCeqhNXWgSjsOnPryeu3t-GE2ISH_nzUA&s", preview: "Haha, Wake up to reality 😄", unread: 2,
    online: true, pinned: true,
    messages: [
      { id: 1, from: "them", text: "Hey! How was your day?", time: "4:36 PM" },
      { id: 2, from: "me", text: "Pretty good! Just finished my work.", time: "4:38 PM" },
      { id: 3, from: "them", text: "Nice 😊 Any plans for the weekend?", time: "4:40 PM" },
      { id: 4, from: "me", text: "Thinking of watching a movie. Want to join?", time: "4:41 PM" },
      { id: 5, from: "them", text: "Haha, Wake up to reality 😄", time: "4:42 PM" }
    ]
  },
  {
    id: 2, name: "College Friends 🎓", avatar: "CF", color: "#6da5cf",
    time: "4:18 PM",avatar: "CF",
  photo: "https://images.shiksha.com/mediadata/images/1696949807phpEw1jQ2.jpeg", preview: "You : I'll check them tonight", unread: 5, group: true,
    messages: [
      { id: 1, from: "them", author: "Madara Uchiha", text: "Guys, notes shared in the group 📚", time: "4:10 PM" },
      { id: 2, from: "them", author: "Obito Uchiha", text: "Thank you!", time: "4:12 PM" },
      { id: 3, from: "me", text: "I'll check them tonight.", time: "4:18 PM" }
    ]
  },
  {
    id: 3, name: "Obito Uchiha", avatar: "OB", color: "#d7a46b",
    time: "3:56 PM",avatar: "OU",
  photo: "https://m.gettywallpapers.com/wp-content/uploads/2023/09/Naruto-Obito-Dp.jpg", preview: "Send me the project link", unread: 0,
    messages: [
      { id: 1, from: "them", text: "Did you finish the React project?", time: "3:52 PM" },
      { id: 2, from: "me", text: "Almost done. I'm fixing the responsive layout.", time: "3:54 PM" },
      { id: 3, from: "them", text: "Send me the project link", time: "3:56 PM" }
    ]
  },
  {
    id: 4, name: "Amma", avatar: "A", color: "#c87d73",
    time: "2:32 PM",avatar: "A",
  photo: "https://blogger.googleusercontent.com/img/a/AVvXsEjP5Y2bz_PrQFsIy2I-tvE_94hzSChBI_brz04-LFUxZkFpTH75ovoxf4dxxNr-GksRosuKPRWDijKK8o5ASjD32Wkl7cUd7N01AbuPXiqR7MONRMPowaVKLOAvgcRmye6kP5aP38JfqeAkgQ5y84eOmK0kWH0ndxsLv68_I4tKsH0Tx2cQ5tUwPMkGh2k=w945-h600-p-k-no-nu", preview: "Okay, take care!", unread: 0,
    messages: [
      { id: 1, from: "them", text: "Have you had lunch?", time: "2:30 PM" },
      { id: 2, from: "me", text: "Yes ma, don't worry ❤️", time: "2:31 PM" },
      { id: 3, from: "them", text: "Okay, take care!", time: "2:32 PM" }
    ]
  },
  {
    id: 5, name: "Anime Group", avatar: "AG", color: "#7ca88a",
    time: "1:15 PM",avatar: "AG",
  photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb7LJodliOuIF7-iLOCoi6V5cZaXX0mYAJkK7_9aQlDFscHFQ6LWB0xkg&s=10", preview: "You: new episodes does not released yet", unread: 0, group: true,
    messages: [
      { id: 1, from: "them", author: "Obito", text: "Send me naruto shippuden new episodes link", time: "1:10 PM" },
      { id: 2, from: "me", text: "new episodes does not released yet", time: "1:15 PM" }
    ]
  },
  {
    id: 6, name: "TVK VIJAY", avatar: "TV", color: "#9b8bc3",
    time: "Yesterday",avatar: "TV",
  photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW3rJJyRFZQAiJ0j5FvSZ4FCxQD7p_7-DqxH5O_FI71DhGMSmxtfOt4e_e&s=10", preview: "Seri ok", unread: 0,
    messages: [
      { id: 1, from: "them", text: "Marakama Vote potrunga pa", time: "Yesterday" },
      { id: 2, from: "me", text: "Seri ok", time: "Yesterday" }
    ]
  },
  {
    id: 7, name: "Project Team", avatar: "PT", color: "#5fa7a1",
    time: "Yesterday",avatar: "PT",
  photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwBO44i1YpzTRVHQ_22bHUoTsljtvRIUINGfm-m3BhcoSFzTfabJbfbqqI&s=10", preview: "Meeting at 10 tomorrow", unread: 0, group: true,
    messages: [
      { id: 1, from: "them", author: "Lead", text: "Meeting at 10 tomorrow. Please be on time.", time: "Yesterday" }
    ]
  },
  {
    id: 8, name: "Appa", avatar: "A", color: "#bd8f78",
    time: "Monday",avatar: "A",
  photo: "https://blogger.googleusercontent.com/img/a/AVvXsEjgg7OYgkuHq7Qec2aiGG5sgvW5P_N9XqABryKFgAsORK-5cTjrusRx4nIU2TcW4OJQKe0Mk2RAjIgUfgxCVFMNpujuxjyIeFUlUM_bm45m7bl-W24Og11IElhZowszTgKBudNwK7SAbGUsZOk4dKUMcWwI1o-PlWkrJQqjrmTfSKpxBYt16IJJvwTCwt4", preview: "Give my Facebook password please", unread: 0,
    messages: [
      { id: 1, from: "them", text: "Give my Facebook password please", time: "Monday" }
    ]
  }
];

const filters = [
  { id: "all", label: "All" },
  { id: "unread", label: "Unread" },
  { id: "favorites", label: "Favorites" },
  { id: "groups", label: "Groups" }
];



function Avatar({ chat, small = false }) {
  return (
    <div className={`avatar ${small ? "avatar-small" : ""}`}>
      <img
        src={chat.photo}
        alt={chat.name}
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
      {!chat.photo && <span>{chat.avatar}</span>}
    </div>
  );
}


export default function App() {
  const [chats, setChats] = useState(initialChats);
  const [activeId, setActiveId] = useState(1);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [message, setMessage] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [mobileChatOpen, setMobileChatOpen] = useState(false);
  const [toast, setToast] = useState("");

  const activeChat = chats.find((chat) => chat.id === activeId) || chats[0];

  const filteredChats = useMemo(() => {
    return chats.filter((chat) => {
      const matchesSearch = `${chat.name} ${chat.preview}`
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesFilter =
        filter === "all" ||
        (filter === "unread" && chat.unread > 0) ||
        (filter === "favorites" && chat.favorite) ||
        (filter === "groups" && chat.group);

      return matchesSearch && matchesFilter;
    });
  }, [chats, search, filter]);

  function selectChat(chat) {
    setActiveId(chat.id);
    setMobileChatOpen(true);
    setChats((current) =>
      current.map((item) =>
        item.id === chat.id ? { ...item, unread: 0 } : item
      )
    );
  }

  function sendMessage(event) {
    event?.preventDefault();
    const clean = message.trim();
    if (!clean || !activeChat) return;

    const now = new Date().toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit"
    });

    setChats((current) =>
      current.map((chat) =>
        chat.id === activeId
          ? {
              ...chat,
              preview: clean,
              time: now,
              messages: [
                ...chat.messages,
                { id: Date.now(), from: "me", text: clean, time: now }
              ]
            }
          : chat
      )
    );
    setMessage("");
  }

  function notify(text) {
    setToast(text);
    window.setTimeout(() => setToast(""), 2200);
    setShowMenu(false);
  }

  function toggleFavorite() {
    setChats((current) =>
      current.map((chat) =>
        chat.id === activeId ? { ...chat, favorite: !chat.favorite } : chat
      )
    );
    notify(activeChat.favorite ? "Removed from favorites" : "Added to favorites");
  }

  return (
    <main className="app-shell">
      <section className="whatsapp-window">
        <nav className="app-rail" aria-label="Main navigation">
          <div className="rail-top">
            <button className="rail-button active-rail" title="Chats" onClick={() => notify("Chats")}>
              <MessageCircle />
              <span className="rail-badge">2</span>
            </button>
            <button className="rail-button" title="Status" onClick={() => notify("Status updates are a demo")}>
              <CircleDashed />
            </button>
            <button className="rail-button" title="Communities" onClick={() => notify("Communities are a demo")}>
              <Users />
            </button>
            <button className="rail-button" title="Calls" onClick={() => notify("Calls are not connected in this demo")}>
              <Phone />
            </button>
          </div>
          <div className="rail-bottom">
            <button className="rail-button" title="Starred messages" onClick={() => { setFilter("favorites"); notify("Favorites filter selected"); }}>
              <Star />
            </button>
            <button className="rail-button" title="Archived" onClick={() => notify("Archived chats are a demo")}>
              <Archive />
            </button>
            <button className="rail-button" title="Settings" onClick={() => notify("Settings are coming soon")}>
              <Settings />
            </button>
            <div className="my-avatar">S</div>
          </div>
        </nav>

        <aside className={`sidebar ${mobileChatOpen ? "sidebar-hidden-mobile" : ""}`}>
          <header className="sidebar-top">
            <div className="sidebar-title-row">
              <h1>Chats</h1>
              <div className="top-actions">
                <button className="icon-button" title="New chat" onClick={() => notify("Choose a chat from the list to start messaging")}>
                  <MessageCircle />
                  <Plus className="tiny-plus" />
                </button>
                <div className="menu-wrap">
                  <button className="icon-button" title="Menu" onClick={() => setShowMenu(!showMenu)}><MoreVertical /></button>
                  {showMenu && (
                    <div className="dropdown">
                      <button onClick={() => notify("New group feature is a demo")}>New group</button>
                      <button onClick={() => notify("Starred messages view is a demo")}>Starred messages</button>
                      <button onClick={() => notify("Settings are coming soon")}>Settings</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>

          <div className="search-box">
            <Search size={18} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search or start a new chat"
              aria-label="Search chats"
            />
            {search && (
              <button className="clear-search" onClick={() => setSearch("")} aria-label="Clear search">
                <X size={15} />
              </button>
            )}
          </div>

          <div className="tabs" role="tablist" aria-label="Chat filters">
            {filters.map((item) => (
              <button
                key={item.id}
                role="tab"
                aria-selected={filter === item.id}
                className={`tab ${filter === item.id ? "tab-active" : ""}`}
                onClick={() => setFilter(item.id)}
              >
                {item.label}
              </button>
            ))}
            <button className="tab plus-tab" title="Filter options" onClick={() => setFilter("all")}>
              <Plus size={16} />
            </button>
          </div>

          <button className="archived-row" onClick={() => notify("No archived chats in this demo")}>
            <Archive size={18} />
            <span>Archived</span>
            <span className="archived-count">2</span>
          </button>

          <div className="chat-list">
            {filteredChats.map((chat) => (
              <button
                key={chat.id}
                className={`chat-row ${activeId === chat.id ? "chat-row-active" : ""}`}
                onClick={() => selectChat(chat)}
              >
                <Avatar chat={chat} />
                <span className="chat-info">
                  <span className="chat-line">
                    <span className="chat-name">{chat.name}</span>
                    <span className="chat-time">{chat.time}</span>
                  </span>
                  <span className="chat-line">
                    <span className="chat-preview">{chat.preview}</span>
                    {chat.favorite && <Star className="favorite-star" size={13} />}
                    {chat.unread > 0 && <span className="unread-count">{chat.unread}</span>}
                  </span>
                </span>
              </button>
            ))}
            {filteredChats.length === 0 && <div className="empty-search">No chats found</div>}
          </div>

          <div className="sidebar-footer">
            <span className="lock-symbol">🔒</span>
            <span>Your personal messages are <b>end-to-end encrypted</b></span>
          </div>
        </aside>

        <section className={`chat-panel ${mobileChatOpen ? "chat-panel-mobile" : ""}`}>
          {activeChat ? (
            <>
              <header className="chat-header">
                <button className="back-button" onClick={() => setMobileChatOpen(false)} aria-label="Back to chats">
                  <ArrowLeft />
                </button>
                <button className="contact-summary" onClick={() => setShowDetails(!showDetails)}>
                  <Avatar chat={activeChat} small />
                  <span className="contact-text">
                    <strong>{activeChat.name}</strong>
                    <small>{activeChat.online ? "online" : activeChat.group ? "tap here for group info" : "last seen today at 4:12 PM"}</small>
                  </span>
                </button>
                <div className="header-actions">
                  <button className="icon-button" title="Video call" onClick={() => notify("Video calls aren't connected in this demo")}><Video /></button>
                  <button className="icon-button" title="Voice call" onClick={() => notify("Voice calls aren't connected in this demo")}><Phone /></button>
                  <button className="icon-button" title="Search in chat" onClick={() => notify("Search in chat is coming soon")}><Search /></button>
                  <div className="menu-wrap">
                    <button className="icon-button" title="Chat options" onClick={() => setShowMenu(!showMenu)}><MoreVertical /></button>
                    {showMenu && (
                      <div className="dropdown dropdown-right">
                        <button onClick={toggleFavorite}><Star size={15} />{activeChat.favorite ? "Remove favorite" : "Add to favorites"}</button>
                        <button onClick={() => notify("Chat pinned")}><Pin size={15} />Pin chat</button>
                        <button onClick={() => { setShowDetails(!showDetails); setShowMenu(false); }}>Contact info</button>
                      </div>
                    )}
                  </div>
                </div>
              </header>

              {showDetails && (
                <div className="contact-details">
                  <Avatar chat={activeChat} />
                  <strong>{activeChat.name}</strong>
                  <span>{activeChat.group ? "Group · 8 participants" : "+91 98765 43210"}</span>
                  <button onClick={() => setShowDetails(false)}>Close details</button>
                </div>
              )}

              <div className="messages-area">
                <div className="encryption-note">
                  <span>🔒</span> Messages and calls are end-to-end encrypted. No one outside of this chat, not even WhatsApp, can read or listen to them. <b>Click to learn more.</b>
                </div>
                <div className="date-pill">TODAY</div>
                {activeChat.messages.map((msg) => (
                  <div key={msg.id} className={`message-row ${msg.from === "me" ? "message-row-me" : ""}`}>
                    <div className={`message-bubble ${msg.from === "me" ? "message-me" : "message-them"}`}>
                      {msg.author && <span className="message-author">{msg.author}</span>}
                      <span className="message-text">{msg.text}</span>
                      <span className="message-meta">
                        {msg.time}
                        {msg.from === "me" && <CheckCheck size={15} className="read-check" />}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <form className="composer" onSubmit={sendMessage}>
                <button type="button" className="icon-button composer-icon" title="Emoji" onClick={() => setMessage((value) => value + " 😊")}><Smile /></button>
                <button type="button" className="icon-button composer-icon attach-button" title="Attach file" onClick={() => notify("File attachments aren't available in this demo")}><Paperclip /></button>
                <input
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Type a message"
                  aria-label="Type a message"
                />
                {message.trim() ? (
                  <button className="send-button" type="submit" aria-label="Send message"><Send size={19} /></button>
                ) : (
                  <button className="icon-button mic-button" type="button" title="Voice message" onClick={() => notify("Voice messages aren't connected in this demo")}><Mic /></button>
                )}
              </form>
            </>
          ) : (
            <div className="welcome-panel">
              <MessageCircle size={64} />
              <h2>WhatsApp Web</h2>
              <p>Send and receive messages without keeping your phone online.</p>
              <p className="secure-line">🔒 End-to-end encrypted</p>
            </div>
          )}
        </section>
      </section>

      {toast && <div className="toast"><Check size={16} />{toast}</div>}
    </main>
  );
}