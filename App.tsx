
import React, { useState, useEffect } from 'react';
import { User, AuthState } from './types.ts';
import StudentPortal from './components/StudentPortal.tsx';
import AdminPortal from './components/AdminPortal.tsx';
import Sidebar from './components/Sidebar.tsx';
import { STORAGE_KEYS } from './constants.ts';
import { isSupabaseConfigured } from './services/supabaseService.ts';

const App: React.FC = () => {
  const [auth, setAuth] = useState<AuthState>({ user: null, isAuthenticated: false });
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginMode, setLoginMode] = useState<'student' | 'admin'>('student');
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isSyncing, setIsSyncing] = useState(false);
  
  const [formUsername, setFormUsername] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPass, setFormPass] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.AUTH);
    if (saved) {
      setAuth(JSON.parse(saved));
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    
    setTimeout(() => {
      const user: User = {
        id: formUsername.toLowerCase().replace(/\s+/g, '_'),
        name: formUsername || 'User',
        username: formUsername,
        email: formEmail,
        role: loginMode,
      };

      const newAuthState = { user, isAuthenticated: true };
      setAuth(newAuthState);
      localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(newAuthState));
      setIsLoggingIn(false);
      
      setIsSyncing(true);
      setTimeout(() => setIsSyncing(false), 2000);
    }, 1200);
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.AUTH);
    setAuth({ user: null, isAuthenticated: false });
    setActiveTab('home');
    setFormPass(''); // Clear sensitive state
  };

  const menuItems = [
    { id: 'home', label: 'Home', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
    { id: '8th', label: '8th Papers', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg> },
    { id: '9th', label: '9th Papers', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg> },
    { id: 'donations', label: 'Donate', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg> },
    { id: 'settings', label: 'Vault', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg> },
  ];

  if (!auth.isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col selection:bg-indigo-500/30">
        <div className="w-full bg-slate-900/50 backdrop-blur border-b border-white/5 text-slate-500 py-3 text-center text-[10px] font-bold tracking-[0.3em] uppercase z-50">
          made by sparsh rathore
        </div>
        
        <div className="flex-1 flex items-center justify-center p-6 relative overflow-hidden">
          <div className="absolute top-1/4 -left-20 w-80 h-80 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-pink-600/10 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="w-full max-w-[440px] glass-dark rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-700 border border-white/5">
            <div className="p-8 sm:p-12 text-center border-b border-white/5 bg-gradient-to-b from-indigo-500/10 to-transparent relative">
              <div className="absolute top-6 right-8 flex items-center gap-1.5">
                <div className={`w-1.5 h-1.5 rounded-full ${isSupabaseConfigured ? 'bg-emerald-500' : 'bg-red-500 animate-pulse'}`}></div>
                <span className="text-[8px] font-black uppercase tracking-widest text-slate-500">
                  {isSupabaseConfigured ? 'Cloud Linked' : 'Cloud Offline'}
                </span>
              </div>

              <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl glow-indigo rotate-3">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-2">paperslol</h1>
              <p className="text-slate-500 font-medium">Secure Academic Cloud</p>
            </div>
            
            <form onSubmit={handleLogin} className="p-6 sm:p-10 space-y-7">
              <div className="flex bg-slate-900/80 p-1.5 rounded-2xl border border-white/5">
                <button type="button" onClick={() => setLoginMode('student')} className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${loginMode === 'student' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-500 hover:text-slate-300'}`}>Student</button>
                <button type="button" onClick={() => setLoginMode('admin')} className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${loginMode === 'admin' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-500 hover:text-slate-300'}`}>Admin</button>
              </div>

              <div className="space-y-5">
                <div className="group">
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1 transition group-focus-within:text-indigo-400">Username</label>
                  <input type="text" value={formUsername} onChange={(e) => setFormUsername(e.target.value)} className="w-full px-5 py-4 bg-slate-900/50 border border-white/5 focus:border-indigo-500/50 rounded-2xl transition-all outline-none text-white placeholder-slate-700 text-sm" placeholder="e.g. sparsh_rathore" required />
                </div>
                <div className="group">
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1 transition group-focus-within:text-indigo-400">Cloud Email</label>
                  <input type="email" value={formEmail} onChange={(e) => setFormEmail(e.target.value)} className="w-full px-5 py-4 bg-slate-900/50 border border-white/5 focus:border-indigo-500/50 rounded-2xl transition-all outline-none text-white placeholder-slate-700 text-sm" placeholder="name@college.edu" required />
                </div>
                <div className="group">
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1 transition group-focus-within:text-indigo-400">Vault Password</label>
                  <input type="password" value={formPass} onChange={(e) => setFormPass(e.target.value)} className="w-full px-5 py-4 bg-slate-900/50 border border-white/5 focus:border-indigo-500/50 rounded-2xl transition-all outline-none text-white placeholder-slate-700 text-sm" placeholder="••••••••" required />
                </div>
              </div>

              <button type="submit" disabled={isLoggingIn} className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-500/20 mt-4 flex items-center justify-center gap-3 disabled:opacity-50 group">
                {isLoggingIn ? (
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                ) : 'Unlock Vault'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col font-['Plus_Jakarta_Sans'] selection:bg-indigo-500/30 overflow-x-hidden">
      <div className="w-full bg-slate-900/50 border-b border-white/5 text-slate-500 py-2.5 text-center text-[9px] font-bold tracking-[0.3em] uppercase z-50">
        made by sparsh rathore
      </div>

      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        <div className="hidden lg:block">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} role={auth.user?.role || ''} />
        </div>
        
        <div className="flex-1 flex flex-col overflow-y-auto custom-scrollbar pb-24 lg:pb-0">
          <nav className="glass-dark border-b border-white/5 sticky top-0 z-40 h-16 lg:h-20 flex items-center px-4 sm:px-10 justify-between">
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-2 px-2 sm:px-3 py-1 bg-slate-900 rounded-full border border-white/5">
                <div className={`w-1.5 h-1.5 rounded-full ${isSupabaseConfigured ? (isSyncing ? 'bg-indigo-500 animate-pulse' : 'bg-emerald-500') : 'bg-amber-500 animate-pulse'}`}></div>
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 whitespace-nowrap">
                  {!isSupabaseConfigured ? 'Cloud Config Error' : (isSyncing ? 'Syncing' : 'Cloud On')}
                </span>
              </div>
              <svg className="hidden sm:block w-3 h-3 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              <span className="text-white font-extrabold capitalize text-xs sm:text-sm tracking-tight truncate max-w-[100px] sm:max-w-none">{activeTab.replace('-', ' ')}</span>
            </div>
            
            <div className="flex items-center gap-3 sm:gap-5">
               <div className="text-right hidden sm:block">
                  <p className="text-sm font-black text-white leading-none">{auth.user?.name}</p>
                  <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest mt-1.5 opacity-80">@{auth.user?.username}</p>
               </div>
               <div className="w-9 h-9 sm:w-11 sm:h-11 bg-gradient-to-tr from-indigo-600 to-indigo-400 rounded-xl sm:rounded-2xl flex items-center justify-center text-white font-black uppercase shadow-lg shadow-indigo-500/20 rotate-3 text-xs sm:text-base">
                 {auth.user?.name[0]}
               </div>
            </div>
          </nav>

          <main className="p-4 sm:p-10 flex-1 relative max-w-7xl mx-auto w-full">
            {auth.user?.role === 'admin' && activeTab === 'home' ? (
              <AdminPortal />
            ) : (
              (() => {
                switch (activeTab) {
                  case 'home':
                    return (
                      <div className="space-y-6 sm:space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-700">
                        <div className="bg-gradient-to-br from-indigo-600 to-indigo-900 rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-16 text-white shadow-2xl relative overflow-hidden group">
                          <h2 className="text-3xl sm:text-5xl font-black mb-4 sm:mb-6 tracking-tighter leading-tight">Welcome back,<br/>{auth.user?.name}!</h2>
                          <p className="text-indigo-100 text-sm sm:text-lg max-w-xl font-medium leading-relaxed opacity-90">All your exam papers are safely encrypted and synced to the paperslol cloud. Access anything, from any device.</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
                          <div className="glass-dark p-6 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] border border-white/5">
                            <h3 className="text-xl sm:text-2xl font-black text-white mb-6">Broadcast</h3>
                            <div className="bg-slate-900/50 p-6 rounded-[1.5rem] border border-white/5 border-dashed">
                              <p className="text-slate-300 text-sm sm:text-base font-medium leading-relaxed mb-4">"for adervisment dm me on insta"</p>
                              <a href="https://instagram.com/fire.drgon" target="_blank" className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">@fire.drgon</a>
                            </div>
                          </div>
                          <div className="glass-dark p-6 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] border border-white/5">
                            <h3 className="text-xl sm:text-2xl font-black text-white mb-6">Vault Status</h3>
                            <div className="space-y-4">
                              <div className="flex justify-between items-center text-[10px]">
                                <span className="text-slate-500 font-bold uppercase tracking-widest">Connection</span>
                                <span className={isSupabaseConfigured ? "text-emerald-400 font-black" : "text-amber-500 font-black"}>
                                  {isSupabaseConfigured ? "CLOUD LINKED" : "OFFLINE MODE"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  case '8th':
                    return <StudentPortal user={auth.user!} category="8th" />;
                  case '9th':
                    return <StudentPortal user={auth.user!} category="9th" />;
                  case 'donations':
                    return (
                      <div className="max-w-2xl mx-auto space-y-6 sm:space-y-10 animate-in zoom-in-95 duration-700 mt-4 sm:mt-10">
                        <div className="glass-dark rounded-[2.5rem] sm:rounded-[4rem] p-10 sm:p-20 text-center border border-indigo-500/20">
                          <h2 className="text-3xl sm:text-5xl font-black text-white mb-4 sm:mb-6 tracking-tighter">Support</h2>
                          <p className="text-slate-400 font-bold text-lg sm:text-2xl mb-10 tracking-tight">follow me on insta <span className="text-white">fire.drgon</span></p>
                          <a href="https://instagram.com/fire.drgon" target="_blank" className="inline-flex px-10 py-4 bg-white text-slate-950 font-black rounded-2xl uppercase tracking-widest text-[10px]">Go to Insta</a>
                        </div>
                      </div>
                    );
                  case 'settings':
                    return (
                      <div className="glass-dark rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-16 border border-white/5 animate-in fade-in duration-500 max-w-4xl">
                        <h2 className="text-2xl sm:text-4xl font-black text-white mb-8 tracking-tight">Vault Controls</h2>
                        <div className="space-y-6 max-w-xl">
                          <div className="p-6 bg-slate-900 rounded-[1.5rem] border border-white/5">
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Owner Name</p>
                            <p className="text-lg font-black text-white">{auth.user?.name}</p>
                          </div>
                          <div className="p-6 bg-slate-900 rounded-[1.5rem] border border-white/5">
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Cloud Access</p>
                            <p className="text-xs font-bold text-slate-400">{isSupabaseConfigured ? "Connected to Supabase Project" : "Not Linked"}</p>
                          </div>
                          <button onClick={logout} className="w-full py-5 bg-red-500/10 text-red-500 border border-red-500/20 rounded-[1.5rem] font-black uppercase tracking-widest text-[10px] hover:bg-red-500 hover:text-white transition-all">Logout</button>
                        </div>
                      </div>
                    );
                  default:
                    return null;
                }
              })()
            )}
          </main>
        </div>

        <div className="lg:hidden fixed bottom-0 left-0 right-0 h-20 glass-dark border-t border-white/5 z-[60] flex items-center justify-around px-4">
          {menuItems.map((item) => (
            <button key={item.id} onClick={() => setActiveTab(item.id)} className={`flex flex-col items-center gap-1 transition-all ${activeTab === item.id ? 'text-indigo-400 scale-110' : 'text-slate-500'}`}>
              {item.icon}<span className="text-[8px] font-black uppercase tracking-widest">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
