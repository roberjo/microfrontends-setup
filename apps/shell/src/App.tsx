import {
  Component,
  Suspense,
  lazy,
  useEffect,
  useRef,
  useState
} from "react";
import type { ReactNode } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";

const MfOrders = lazy(() => import("mfOrders/App"));
const MfAdmin = lazy(() => import("mfAdmin/App"));

class MfeErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="mfe-placeholder">
          <h3>Microfrontend unavailable</h3>
          <p>Check that the remote is running and the URL is configured.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

const navItems = [
  {
    label: "Retail Banking",
    key: "retail",
    path: "/retail",
    aliases: ["/applications"],
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 10.4 12 4l9 6.4v8.6a1 1 0 0 1-1 1h-5.5v-6.3a1.2 1.2 0 0 0-1.2-1.2h-2.6a1.2 1.2 0 0 0-1.2 1.2V20H4a1 1 0 0 1-1-1v-8.6Z" />
      </svg>
    )
  },
  {
    label: "Wealth",
    key: "wealth",
    path: "/wealth",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3.5 4 7.7v4.6c0 4.2 2.8 8.1 8 9.7 5.2-1.6 8-5.5 8-9.7V7.7L12 3.5Zm3.6 9.6h-7.2v-1.8h7.2v1.8Zm0 3.6h-7.2v-1.8h7.2v1.8Zm0-7.2h-7.2V7.7h7.2v1.8Z" />
      </svg>
    )
  },
  {
    label: "Insurance",
    key: "insurance",
    path: "/insurance",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2 4 5.6v6.2c0 5.1 3.4 9.4 8 10.8 4.6-1.4 8-5.7 8-10.8V5.6L12 2Zm3 9.2-3.8 4.4c-.3.3-.7.5-1.1.5s-.8-.2-1.1-.5L7 13.4l1.6-1.4 1.5 1.6L13.4 10 15 11.2Z" />
      </svg>
    )
  },
  {
    label: "Treasury",
    key: "treasury",
    path: "/treasury",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 5h16a1 1 0 0 1 1 1v3H3V6a1 1 0 0 1 1-1Zm-1 7h18v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-6Zm4 2v2h4v-2H7Z" />
      </svg>
    )
  },
  {
    label: "Products",
    key: "products",
    path: "/products",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z" />
      </svg>
    )
  },
  {
    label: "Admin",
    key: "admin",
    path: "/admin",
    aliases: ["/approvals", "/users"],
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2 4.5 5.5v5.3c0 5 3.2 9.3 7.5 10.9 4.3-1.6 7.5-5.9 7.5-10.9V5.5L12 2Zm0 5.1a2.7 2.7 0 1 1 0 5.4 2.7 2.7 0 0 1 0-5.4Zm4.4 10.6H7.6a4.5 4.5 0 0 1 8.8 0Z" />
      </svg>
    )
  }
];

function App() {
  const [theme, setTheme] = useState("light");
  const [appSwitcherOpen, setAppSwitcherOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const appSwitcherRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const activeItem =
    navItems.find(
      (item) =>
        location.pathname.startsWith(item.path) ||
        item.aliases?.some((alias) => location.pathname.startsWith(alias))
    ) ?? navItems[0];
  const activeLabel = activeItem.label;

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        appSwitcherRef.current &&
        !appSwitcherRef.current.contains(target)
      ) {
        setAppSwitcherOpen(false);
      }
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(target)
      ) {
        setNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(target)) {
        setProfileOpen(false);
      }
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="shell">
      <aside className="shell-nav">
        <div className="brand">
          <div className="brand-mark" />
          <div>
            <div className="brand-title">FinServe Portal</div>
            <div className="brand-subtitle">Microfrontends POC</div>
          </div>
        </div>
        <nav className="nav-list">
          {navItems.map((item) => (
            <button
              key={item.key}
              className={
                item.key === activeItem.key ? "nav-item active" : "nav-item"
              }
              onClick={() => navigate(item.path)}
              type="button"
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      <div className="shell-main">
        <header className="shell-topbar">
          <div className="topbar-title">
            <div className="topbar-row">
              <div className="topbar-crumbs" ref={appSwitcherRef}>
                <button
                  type="button"
                  className="crumb-button"
                  aria-label="Open app switcher"
                  onClick={(event) => {
                    event.stopPropagation();
                    setAppSwitcherOpen((open) => !open);
                    setNotificationsOpen(false);
                    setProfileOpen(false);
                  }}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 5h3v3H5V5Zm5.5 0h3v3h-3V5ZM16 5h3v3h-3V5ZM5 10.5h3v3H5v-3Zm5.5 0h3v3h-3v-3Zm5.5 0h3v3h-3v-3ZM5 16h3v3H5v-3Zm5.5 0h3v3h-3v-3Zm5.5 0h3v3h-3v-3Z" />
                  </svg>
                </button>
                <span>FinServe</span>
                <span className="crumb-sep">/</span>
                <span>{activeLabel}</span>
                {appSwitcherOpen && (
                  <div
                    className="menu-panel app-switcher"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <h4>Switch app</h4>
                    <button
                      type="button"
                      className="ghost"
                      onClick={() => {
                        navigate("/retail");
                        setAppSwitcherOpen(false);
                      }}
                    >
                      Retail Banking
                    </button>
                    <button
                      type="button"
                      className="ghost"
                      onClick={() => {
                        navigate("/admin");
                        setAppSwitcherOpen(false);
                      }}
                    >
                      Admin Console
                    </button>
                    <button
                      type="button"
                      className="ghost"
                      onClick={() => {
                        navigate("/wealth");
                        setAppSwitcherOpen(false);
                      }}
                    >
                      Wealth Operations
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="topbar-actions">
            <div className="icon-group" ref={notificationsRef}>
              <button
                type="button"
                className="icon-button"
                aria-label="Notifications"
                onClick={(event) => {
                  event.stopPropagation();
                  setNotificationsOpen((open) => !open);
                  setProfileOpen(false);
                }}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 17h12l-1.4-1.4V11a4.6 4.6 0 0 0-3.2-4.4V6a1.4 1.4 0 1 0-2.8 0v.6A4.6 4.6 0 0 0 7.4 11v4.6L6 17Zm6 4a2.4 2.4 0 0 0 2.3-1.8h-4.6A2.4 2.4 0 0 0 12 21Z" />
                </svg>
                <span className="status-dot" />
              </button>
              {notificationsOpen && (
                <div
                  className="menu-panel"
                  onClick={(event) => event.stopPropagation()}
                >
                  <h4>Notifications</h4>
                  <ul>
                    <li>3 onboarding files need review.</li>
                    <li>2 access approvals awaiting sign-off.</li>
                    <li>Daily risk report is ready.</li>
                  </ul>
                  <button
                    type="button"
                    className="ghost"
                    onClick={() => {
                      setNotificationsOpen(false);
                    }}
                  >
                    Dismiss
                  </button>
                </div>
              )}
            </div>

            <button
              type="button"
              className="icon-button"
              aria-label="Toggle theme"
              onClick={() =>
                setTheme((current) => (current === "light" ? "dark" : "light"))
              }
            >
              {theme === "light" ? (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 4.2a1 1 0 0 1 1 1v1.4a1 1 0 1 1-2 0V5.2a1 1 0 0 1 1-1Zm0 13.2a1 1 0 0 1 1 1v1.4a1 1 0 1 1-2 0v-1.4a1 1 0 0 1 1-1ZM4.2 12a1 1 0 0 1 1-1h1.4a1 1 0 1 1 0 2H5.2a1 1 0 0 1-1-1Zm13.2 0a1 1 0 0 1 1-1h1.4a1 1 0 1 1 0 2h-1.4a1 1 0 0 1-1-1Zm-9.4-5.8a1 1 0 0 1 1.4 0l1 1a1 1 0 0 1-1.4 1.4l-1-1a1 1 0 0 1 0-1.4Zm8.6 8.6a1 1 0 0 1 1.4 0l1 1a1 1 0 0 1-1.4 1.4l-1-1a1 1 0 0 1 0-1.4ZM6.2 16.8a1 1 0 0 1 1.4-1.4l1 1a1 1 0 0 1-1.4 1.4l-1-1Zm8.6-8.6a1 1 0 0 1 1.4-1.4l1 1a1 1 0 1 1-1.4 1.4l-1-1ZM12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M21 14.5A8.5 8.5 0 0 1 9.5 3a8 8 0 1 0 11.5 11.5Z" />
                </svg>
              )}
            </button>

            <div className="icon-group" ref={profileRef}>
              <button
                type="button"
                className="icon-button avatar-button"
                aria-label="User menu"
                onClick={(event) => {
                  event.stopPropagation();
                  setProfileOpen((open) => !open);
                  setNotificationsOpen(false);
                }}
              >
                <span className="avatar">JD</span>
              </button>
              {profileOpen && (
                <div
                  className="menu-panel"
                  onClick={(event) => event.stopPropagation()}
                >
                  <h4>Jane Doe</h4>
                  <p className="menu-subtitle">Operations Lead</p>
                  <button
                    type="button"
                    className="ghost"
                    onClick={() => {
                      setProfileOpen(false);
                    }}
                  >
                    Profile
                  </button>
                  <button
                    type="button"
                    className="ghost"
                    onClick={() => {
                      setProfileOpen(false);
                    }}
                  >
                    Account settings
                  </button>
                  <button
                    type="button"
                    className="ghost"
                    onClick={() => {
                      setProfileOpen(false);
                    }}
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="shell-content">
          <section className="mfe-host">
            <MfeErrorBoundary>
              <Suspense
                fallback={
                  <div className="mfe-placeholder">
                    <h3>Loading microfrontend…</h3>
                    <p>Fetching the latest deployment.</p>
                  </div>
                }
              >
                <Routes>
                  <Route path="/" element={<Navigate to="/retail" replace />} />
                  <Route path="/retail/*" element={<MfOrders />} />
                  <Route path="/applications/*" element={<MfOrders />} />
                  <Route path="/admin/*" element={<MfAdmin />} />
                  <Route path="/approvals/*" element={<MfAdmin />} />
                  <Route path="/users/*" element={<MfAdmin />} />
                  <Route
                    path="*"
                    element={
                      <div className="mfe-placeholder">
                        <h3>Section not available</h3>
                        <p>Select a mapped tab to continue.</p>
                      </div>
                    }
                  />
                </Routes>
              </Suspense>
            </MfeErrorBoundary>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
