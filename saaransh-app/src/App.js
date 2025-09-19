import React, { useState, useMemo, useRef, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Home, ChevronDown, Search, FileText, Calendar, Users, ChevronsRight, Mail, Bell, ArrowLeft, TrendingUp, Filter, Star, Languages, Clock, User, Settings, Shield, LogOut, Lock, AtSign, Eye, EyeOff, AlertTriangle, Menu, X } from 'lucide-react';

// --- MOCK DATA --- //
// This data simulates what would be fetched from a secure API in a real application.

const consultations = [
  { id: 1, title: 'Draft Companies (Amendment) Bill, 2025', status: 'Analysis Complete', submissions: 1345, endDate: '2025-08-31' },
  { id: 2, title: 'Rules on Corporate Social Responsibility (CSR)', status: 'In Progress', submissions: 782, endDate: '2025-09-20' },
  { id: 3, title: 'Insolvency & Bankruptcy Code (Second Amendment)', status: 'Completed', submissions: 2109, endDate: '2025-07-15' },
];

const commentsData = {
  1: [
    { id: 101, submitter: 'Apex Law Associates', stakeholderType: 'Law Firm', date: '2025-08-15', stance: 'Opposed', summary: 'Argues Section 185 amendments are overly restrictive for startups and suggests a higher threshold.', qualityScore: 4.8, originalText: 'To the Ministry of Corporate Affairs,\n\nRegarding the Draft Companies (Amendment) Bill, 2025, our firm wishes to express significant concerns about the proposed changes to Section 185...', keywords: ['Section 185', 'Director Loans', 'Startup Financing'], consultationId: 1 },
    { id: 102, submitter: 'Good Governance Foundation', stakeholderType: 'NGO', date: '2025-08-20', stance: 'Supportive', summary: 'Supports increased disclosure norms for related party transactions to enhance transparency.', qualityScore: 4.2, originalText: 'We at the Good Governance Foundation commend the Ministry for the proposed enhancements to disclosure norms...', keywords: ['Disclosure Norms', 'Transparency', 'Minority Shareholders'], consultationId: 1 },
    { id: 103, submitter: 'Priya Sharma', stakeholderType: 'Individual', date: '2025-08-18', stance: 'Concerned', summary: 'Expresses concern about implementation of Section 145 for small businesses due to high compliance costs.', qualityScore: 3.5, originalText: 'Sir, Section 145 ka implementation aasan nahi hoga, especially small businesses ke liye. Isse compliance costs bahut badh jayenge...', language: 'Hinglish', keywords: ['Section 145', 'Small Businesses', 'Compliance Costs'], consultationId: 1 },
    { id: 104, submitter: 'Federation of Indian Industries', stakeholderType: 'Industry Body', date: '2025-08-22', stance: 'Alternative Proposal', summary: 'Proposes a centralized, government-managed pool for appointing independent directors.', qualityScore: 4.5, originalText: 'While we appreciate the intent behind the new rules for independent directors, we propose an alternative mechanism...', keywords: ['Independent Directors', 'Centralized Pool', 'Corporate Governance'], consultationId: 1 },
    { id: 105, submitter: 'ABC Consulting', stakeholderType: 'Consulting Firm', date: '2025-08-25', stance: 'Request for Clarification', summary: 'Seeks clarification on the definition of "significant beneficial owner" to avoid compliance challenges.', qualityScore: 4.0, originalText: 'We request clarification regarding the definition of "significant beneficial owner" (SBO)...', keywords: ['SBO', 'Clarification', 'Compliance'], consultationId: 1 },
  ],
  2: [{ id: 201, submitter: 'Green Earth Initiative', stakeholderType: 'NGO', date: '2025-09-10', stance: 'Supportive', summary: 'Supports the new CSR rules.', qualityScore: 4.1, originalText: 'The new CSR rules are a welcome change.', keywords: ['CSR', 'Environment'], consultationId: 2 }],
  3: [{ id: 301, submitter: 'National Creditors Association', stakeholderType: 'Industry Body', date: '2025-07-10', stance: 'Opposed', summary: 'Opposes the proposed changes to the IBC.', qualityScore: 4.9, originalText: 'The proposed amendments to the IBC fundamentally weaken the position of financial creditors.', keywords: ['IBC', 'Creditor Rights'], consultationId: 3 }],
};

const wordCloudData = { 1: [{ text: 'Director Liability', value: 95 }, { text: 'Related Party Transactions', value: 88 }, { text: 'Corporate Governance', value: 85 }, { text: 'Compliance Costs', value: 75 }, { text: 'Minority Shareholders', value: 72 }, { text: 'Section 185', value: 68 }], 2: [], 3: [] };
const trendAnalysisData = [{ name: '2021', 'Data Privacy Concerns': 230, 'CSR Compliance': 400 }, { name: '2022', 'Data Privacy Concerns': 280, 'CSR Compliance': 350 }, { name: '2023', 'Data Privacy Concerns': 250, 'CSR Compliance': 300 }, { name: '2024', 'Data Privacy Concerns': 310, 'CSR Compliance': 550 }, { name: '2025', 'Data Privacy Concerns': 450, 'CSR Compliance': 250 }];

// --- STYLING & CONFIG --- //
const STANCE_COLORS = { 'Supportive': '#22c55e', 'Opposed': '#ef4444', 'Concerned': '#f97316', 'Alternative Proposal': '#3b82f6', 'Request for Clarification': '#a855f7' };
const STANCE_BG_COLORS = { 'Supportive': 'bg-green-100 text-green-800', 'Opposed': 'bg-red-100 text-red-800', 'Concerned': 'bg-orange-100 text-orange-800', 'Alternative Proposal': 'bg-blue-100 text-blue-800', 'Request for Clarification': 'bg-purple-100 text-purple-800' };

// --- UI COMPONENTS --- //

const Header = ({ setView, setIsAuthenticated, toggleSidebar, isSidebarOpen }) => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [profileRef]);

    const handleMenuClick = (view) => {
        setView(view);
        setIsProfileOpen(false);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setIsProfileOpen(false);
    };

    return (
        <header className="bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 py-3 fixed top-0 left-0 right-0 z-20 h-16">
            <div className="flex items-center">
                <button onClick={toggleSidebar} className="lg:hidden mr-3 text-slate-600 hover:text-slate-800">
                    {isSidebarOpen ? <X size={24}/> : <Menu size={24}/>}
                </button>
                <img src="./mca.png" alt="MCA Emblem" className="h-10 mr-2 sm:mr-4"/>
                <h1 className="text-lg sm:text-xl font-semibold text-slate-800">Project Saaransh</h1>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-5">
                <div className="hidden sm:block relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input type="text" placeholder="Search..." className="bg-slate-100 rounded-lg pl-10 pr-4 py-2 text-sm w-48 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <button className="text-slate-500 hover:text-slate-800 relative p-1">
                    <Bell size={20} />
                    <span className="absolute -top-0 -right-0 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                </button>
                <div className="relative" ref={profileRef}>
                    <div onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center space-x-2 cursor-pointer p-1">
                        <img src="https://placehold.co/40x40/E2E8F0/475569?text=I" alt="User Avatar" className="rounded-full h-9 w-9" />
                        <div className="hidden md:block text-sm">
                            <p className="font-semibold text-slate-700">Ishaan Saxena</p>
                            <p className="text-slate-500">Policy Analyst</p>
                        </div>
                    </div>
                    {isProfileOpen && (
                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden z-30">
                            <div className="p-2">
                                <a href="#" onClick={() => handleMenuClick('profile')} className="flex items-center px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-md"><User size={16} className="mr-3" /> My Profile</a>
                                <a href="#" onClick={() => handleMenuClick('settings')} className="flex items-center px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-md"><Settings size={16} className="mr-3" /> User Settings</a>
                                <a href="#" onClick={() => handleMenuClick('auth')} className="flex items-center px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-md"><Shield size={16} className="mr-3" /> Authorizations</a>
                            </div>
                            <div className="border-t border-slate-200 p-2">
                                <a href="#" onClick={handleLogout} className="flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"><LogOut size={16} className="mr-3" /> Logout</a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

const Sidebar = ({ selectedConsultation, setSelectedConsultation, view, setView, isSidebarOpen, setIsSidebarOpen }) => {
    const handleLinkClick = (view, consultationId = null) => {
        setView(view);
        setSelectedConsultation(consultationId);
        if (window.innerWidth < 1024) { // Close sidebar on mobile after click
            setIsSidebarOpen(false);
        }
    };
    
    return (
        <aside className={`bg-slate-50 border-r border-slate-200 w-72 fixed top-16 left-0 h-[calc(100vh-4rem)] p-4 flex flex-col z-10 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
            <nav className="flex-grow overflow-y-auto">
                <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Menu</h2>
                <ul>
                    <li><a href="#" onClick={(e) => { e.preventDefault(); handleLinkClick('home'); }} className={`flex items-center p-3 my-1 rounded-lg transition-colors text-sm ${view === 'home' ? 'bg-blue-100 text-blue-800 font-semibold' : 'hover:bg-slate-200 text-slate-700'}`}><Home size={18} className="mr-3" /><span>Home</span></a></li>
                    <li><a href="#" onClick={(e) => { e.preventDefault(); handleLinkClick('trends'); }} className={`flex items-center p-3 my-1 rounded-lg transition-colors text-sm ${view === 'trends' ? 'bg-blue-100 text-blue-800 font-semibold' : 'hover:bg-slate-200 text-slate-700'}`}><TrendingUp size={18} className="mr-3" /><span>Trend Analysis</span></a></li>
                </ul>
                <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-6 mb-3">Consultations</h2>
                <ul>
                    {consultations.map(c => (
                        <li key={c.id}>
                            <a href="#" onClick={(e) => { e.preventDefault(); handleLinkClick('dashboard', c.id); }} className={`flex flex-col p-3 my-1 rounded-lg transition-colors text-sm ${selectedConsultation === c.id && view === 'dashboard' ? 'bg-blue-100 text-blue-800' : 'hover:bg-slate-200'}`}>
                                <span className={`font-semibold ${selectedConsultation === c.id ? '' : 'text-slate-700'}`}>{c.title}</span>
                                <span className={`text-xs mt-1 ${selectedConsultation === c.id ? 'text-blue-600' : 'text-slate-500'}`}>{c.status}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="text-center text-xs text-slate-400 p-4"><p>&copy; 2025 Ministry of Corporate Affairs</p></div>
        </aside>
    );
};

const StanceChart = ({ data, title = "Overall Stance" }) => (
    <div className="bg-white p-6 rounded-xl border border-slate-200 h-full">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">{title}</h3>
        <ResponsiveContainer width="100%" height={250}>
            <PieChart>
                <Pie data={Object.entries(STANCE_COLORS).map(([name]) => ({ name, value: data.filter(c => c.stance === name).length }))} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value" nameKey="name">
                    {Object.keys(STANCE_COLORS).map((name, index) => <Cell key={`cell-${index}`} fill={STANCE_COLORS[name]} />)}
                </Pie>
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4">
            {Object.keys(STANCE_COLORS).map(name => (<div key={name} className="flex items-center text-sm"><span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: STANCE_COLORS[name] }}></span><span className="text-slate-600">{name}</span></div>))}
        </div>
    </div>
);

const WordCloud = ({ data }) => {
    if (!data || data.length === 0) {
        return (
            <div className="bg-white p-6 rounded-xl border border-slate-200 h-full">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Salient Themes</h3>
                <div className="flex items-center justify-center h-full text-slate-500">No theme data available.</div>
            </div>
        );
    }
    const maxVal = Math.max(...data.map(d => d.value));
    const sizes = ['text-sm', 'text-md', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl'];
    
    return (
        <div className="bg-white p-6 rounded-xl border border-slate-200 h-full">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Salient Themes</h3>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 py-4">
                {data.sort((a,b) => b.value - a.value).map(word => {
                    const sizeIndex = Math.floor((word.value / maxVal) * (sizes.length -1));
                    const colorClasses = ['text-blue-600', 'text-slate-800', 'text-sky-600', 'text-slate-600'];
                    const color = colorClasses[Math.floor(Math.random() * colorClasses.length)];
                    return (<span key={word.text} className={`${sizes[sizeIndex]} ${color} font-semibold transition-all hover:scale-110 cursor-pointer`}>{word.text}</span>);
                })}
            </div>
        </div>
    );
};

const SubmissionList = ({ comments, setSelectedComment, setView }) => {
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredComments = useMemo(() => {
    return comments
      .filter(c => filter === 'All' || c.stance === filter)
      .filter(c => c.submitter.toLowerCase().includes(searchTerm.toLowerCase()) || c.summary.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [comments, filter, searchTerm]);

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl border border-slate-200 mt-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h3 className="text-lg font-semibold text-slate-800">Submissions</h3>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
           <div className="relative w-full sm:w-auto">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
             <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="bg-slate-100 rounded-lg pl-9 pr-3 py-2 text-sm w-full sm:w-48 focus:outline-none focus:ring-2 focus:ring-blue-500" />
           </div>
          <div className="flex items-center bg-slate-100 rounded-lg p-1 overflow-x-auto">
            {['All', ...Object.keys(STANCE_COLORS)].map(stance => (<button key={stance} onClick={() => setFilter(stance)} className={`px-3 py-1 text-sm rounded-md whitespace-nowrap ${filter === stance ? 'bg-white shadow-sm' : 'text-slate-600'}`}>{stance}</button>))}
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-slate-500">
          <thead className="text-xs text-slate-700 uppercase bg-slate-50">
            <tr>
              <th scope="col" className="px-6 py-3">Submitter</th>
              <th scope="col" className="px-6 py-3 hidden md:table-cell">Stance</th>
              <th scope="col" className="px-6 py-3 hidden lg:table-cell">Argument Quality</th>
              <th scope="col" className="px-6 py-3">Summary</th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filteredComments.map(comment => (
              <tr key={comment.id} className="bg-white border-b hover:bg-slate-50">
                <td className="px-6 py-4 font-semibold text-slate-900">{comment.submitter}</td>
                <td className="px-6 py-4 hidden md:table-cell"><span className={`px-2 py-1 text-xs font-medium rounded-full ${STANCE_BG_COLORS[comment.stance]}`}>{comment.stance}</span></td>
                <td className="px-6 py-4 hidden lg:table-cell"><div className="flex items-center"><Star size={16} className={'text-amber-400 fill-current'} /><span className="text-slate-600 font-medium ml-2">{comment.qualityScore.toFixed(1)}</span></div></td>
                <td className="px-6 py-4 max-w-xs xl:max-w-sm truncate">{comment.summary}</td>
                <td className="px-6 py-4 text-right"><button onClick={() => { setSelectedComment(comment); setView('detail'); }} className="font-medium text-blue-600 hover:underline">Details</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const DashboardView = ({ consultation, setSelectedComment, setView }) => (
    <>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">{consultation.title}</h2>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500 mb-6">
            <div className="flex items-center"><FileText size={16} className="mr-2"/>{consultation.submissions} Submissions</div>
            <div className="flex items-center"><Calendar size={16} className="mr-2"/>Ends on {consultation.endDate}</div>
            <div className="flex items-center"><span className={`w-2 h-2 rounded-full mr-2 ${consultation.status === 'In Progress' ? 'bg-yellow-500' : 'bg-green-500'}`}></span>{consultation.status}</div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6"><StanceChart data={commentsData[consultation.id]}/><WordCloud data={wordCloudData[consultation.id]}/></div>
        <SubmissionList comments={commentsData[consultation.id]} setSelectedComment={setSelectedComment} setView={setView}/>
    </>
);

const DetailView = ({ comment, setView, setSelectedConsultation }) => (
    <div>
        <button onClick={() => { setView('dashboard'); setSelectedConsultation(comment.consultationId); }} className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 mb-6"><ArrowLeft size={16} className="mr-2" />Back to Dashboard</button>
        <div className="bg-white rounded-xl border border-slate-200">
            <div className="p-6 border-b border-slate-200">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-800">{comment.submitter}</h2>
                        <p className="text-sm text-slate-500">{comment.stakeholderType} &bull; Submitted on {comment.date}</p>
                    </div>
                    <span className={`px-3 py-1.5 text-sm font-semibold rounded-full whitespace-nowrap ${STANCE_BG_COLORS[comment.stance]}`}>{comment.stance}</span>
                </div>
                <div className="flex items-center mt-4">
                    <span className="text-sm font-semibold text-slate-700 mr-3">Argument Quality Score:</span>
                    <div className="flex items-center">{[...Array(5)].map((_, i) => (<Star key={i} size={20} className={i < Math.round(comment.qualityScore) ? 'text-amber-400 fill-current' : 'text-slate-300'} />))}<span className="text-slate-800 font-bold ml-2 text-lg">{comment.qualityScore.toFixed(1)}</span></div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-200">
                 <div className="bg-white p-6"><h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center"><ChevronsRight size={20} className="text-blue-500 mr-2" /> AI Generated Summary</h3><p className="text-slate-600 leading-relaxed">{comment.summary}</p><h4 className="text-md font-semibold text-slate-700 mt-6 mb-3">Key Themes:</h4><div className="flex flex-wrap gap-2">{comment.keywords.map(kw => (<span key={kw} className="bg-slate-100 text-slate-700 text-xs font-medium px-2.5 py-1 rounded-full">{kw}</span>))}</div></div>
                 <div className="bg-slate-50 p-6"><h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center"><FileText size={18} className="mr-2" /> Original Submission{comment.language && (<span className="ml-auto bg-fuchsia-100 text-fuchsia-800 text-xs font-medium px-2.5 py-1 rounded-full flex items-center"><Languages size={14} className="mr-1.5" /> Detected: {comment.language}</span>)}</h3><div className="bg-white p-4 rounded-lg border border-slate-200 max-h-96 overflow-y-auto"><p className="text-slate-700 whitespace-pre-wrap font-mono text-sm">{comment.originalText}</p></div></div>
            </div>
        </div>
    </div>
);

const TrendAnalysisView = () => (
     <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Cross-Consultation Trend Analysis</h2>
        <div className="bg-white p-6 rounded-xl border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Emerging Regulatory Themes Over Time</h3>
             <ResponsiveContainer width="100%" height={400}>
                <BarChart data={trendAnalysisData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}><XAxis dataKey="name" /><YAxis /><Tooltip /><Legend /><Bar dataKey="Data Privacy Concerns" fill="#3b82f6" /><Bar dataKey="CSR Compliance" fill="#10b981" /></BarChart>
            </ResponsiveContainer>
            <div className="mt-4 p-4 bg-slate-50 rounded-lg"><h4 className="font-semibold text-slate-700">AI-Generated Insight:</h4><p className="text-slate-600 text-sm mt-1">The volume of public concern related to "Data Privacy" has shown a consistent upward trend across multiple legislative consultations since 2021, indicating it is an escalating area of public and corporate interest requiring proactive policy consideration.</p></div>
        </div>
    </div>
);

const StatCard = ({ title, value, icon, color }) => { const Icon = icon; return (<div className="bg-white p-5 rounded-xl border border-slate-200 flex items-center"><div className={`rounded-full p-3 ${color}`}><Icon className="h-6 w-6 text-white" /></div><div className="ml-4"><p className="text-sm text-slate-500">{title}</p><p className="text-2xl font-bold text-slate-800">{value}</p></div></div>); };
const SecurityNotification = ({ onDismiss }) => (<div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-r-lg shadow-md"><div className="flex"><div className="py-1"><AlertTriangle className="h-6 w-6 text-yellow-500 mr-3" /></div><div><p className="font-bold text-yellow-800">Security Alert</p><p className="text-sm text-yellow-700">A new device has signed into your account from Delhi, India on {new Date().toLocaleDateString()}. If this wasn't you, please <a href="#" onClick={(e) => e.preventDefault()} className="font-semibold underline">secure your account</a> immediately.</p></div><button onClick={onDismiss} className="ml-auto text-yellow-600 hover:text-yellow-800">&times;</button></div></div>);
const HomeView = ({ setView, setSelectedConsultation, setSelectedComment }) => {
    const [showNotification, setShowNotification] = useState(true);
    const allComments = useMemo(() => Object.values(commentsData).flat(), []);
    const highPriorityComments = allComments.filter(c => c.qualityScore >= 4.5).slice(0, 3);
    return (<div><h2 className="text-2xl font-bold text-slate-800 mb-6">Welcome back, Ishaan</h2>{showNotification && <SecurityNotification onDismiss={() => setShowNotification(false)} />}<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"><StatCard title="Total Submissions" value={allComments.length} icon={FileText} color="bg-blue-500" /><StatCard title="Total Consultations" value={consultations.length} icon={Users} color="bg-emerald-500" /><StatCard title="Active Consultations" value={consultations.filter(c => c.status === 'In Progress').length} icon={Clock} color="bg-amber-500" /><StatCard title="High Priority Items" value={highPriorityComments.length} icon={Bell} color="bg-red-500" /></div><div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-6"><div className="lg:col-span-2"><StanceChart data={allComments} title="Overall Stance (All Time)" /></div><div className="lg:col-span-3"><div className="bg-white p-6 rounded-xl border border-slate-200 h-full"><h3 className="text-lg font-semibold text-slate-800 mb-4">High Priority Submissions</h3><div className="space-y-4">{highPriorityComments.map(c => (<div key={c.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200"><div className="flex justify-between items-start"><p className="font-semibold text-slate-800">{c.submitter}</p><span className={`px-2 py-1 text-xs font-medium rounded-full ${STANCE_BG_COLORS[c.stance]}`}>{c.stance}</span></div><p className="text-sm text-slate-600 mt-2 truncate">{c.summary}</p><div className="flex justify-between items-center mt-3"><div className="flex items-center"><Star size={14} className="text-amber-400 fill-current mr-1" /><span className="text-sm font-bold text-slate-700">{c.qualityScore}</span></div><button onClick={() => { setSelectedComment(c); setView('detail'); setSelectedConsultation(c.consultationId)}} className="text-sm font-medium text-blue-600 hover:underline">View Details</button></div></div>))}</div></div></div></div></div>);};
const UserProfileView = () => (<div><h2 className="text-2xl font-bold text-slate-800 mb-6">My Profile</h2><div className="grid grid-cols-1 lg:grid-cols-3 gap-6"><div className="lg:col-span-1"><div className="bg-white p-6 rounded-xl border border-slate-200 text-center"><img src="https://placehold.co/120x120/E2E8F0/475569?text=I" alt="User Avatar" className="rounded-full h-32 w-32 border-4 border-white shadow-md mx-auto -mt-16" /><h3 className="text-xl font-bold text-slate-800 mt-4">Ishaan Saxena</h3><p className="text-slate-500">Policy Analyst</p><button className="mt-4 w-full bg-blue-100 text-blue-700 font-semibold py-2 px-4 rounded-lg hover:bg-blue-200 text-sm">Change Profile Picture</button></div></div><div className="lg:col-span-2"><div className="bg-white p-6 rounded-xl border border-slate-200"><h3 className="text-lg font-semibold text-slate-800 mb-4">Account Details</h3><div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm"><div><p className="text-slate-500">Email:</p><p className="font-medium text-slate-800">ishaan.saxena@mca.gov.in</p></div><div><p className="text-slate-500">Employee ID:</p><p className="font-medium text-slate-800">MCA-AN-0845</p></div><div><p className="text-slate-500">Department:</p><p className="font-medium text-slate-800">Policy & Research Wing</p></div></div><h3 className="text-lg font-semibold text-slate-800 mt-6 mb-4">Security Settings</h3><div className="space-y-3"><button className="text-sm w-full text-left font-medium text-slate-700 p-3 bg-slate-50 rounded-lg border hover:bg-slate-100">Change Password</button><button className="text-sm w-full text-left font-medium text-slate-700 p-3 bg-slate-50 rounded-lg border hover:bg-slate-100">Manage Two-Factor Authentication (2FA)</button></div></div></div></div></div>);
const SettingsView = () => (<div><h2 className="text-2xl font-bold text-slate-800 mb-6">User Settings</h2><div className="bg-white p-8 rounded-xl border border-slate-200 max-w-2xl mx-auto"><h3 className="text-lg font-semibold text-slate-800 mb-4">Notifications</h3><div className="space-y-4"><div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg"><label htmlFor="new-consultation" className="font-medium text-slate-700">Email for new consultations</label><div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in"><input type="checkbox" name="toggle" id="new-consultation" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"/><label htmlFor="new-consultation" className="toggle-label block overflow-hidden h-6 rounded-full bg-slate-300 cursor-pointer"></label></div></div><div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg"><label htmlFor="analysis-complete" className="font-medium text-slate-700">Notify when analysis is complete</label><div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in"><input type="checkbox" name="toggle" id="analysis-complete" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" defaultChecked/><label htmlFor="analysis-complete" className="toggle-label block overflow-hidden h-6 rounded-full bg-slate-300 cursor-pointer"></label></div></div></div><style>{`.toggle-checkbox:checked { right: 0; border-color: #3b82f6; } .toggle-checkbox:checked + .toggle-label { background-color: #3b82f6; }`}</style><div className="border-t border-slate-200 mt-6 pt-6"><button className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700">Save Changes</button></div></div></div>);
const AuthorizationView = () => (<div><h2 className="text-2xl font-bold text-slate-800 mb-6">Authorizations & Permissions</h2><div className="bg-white p-8 rounded-xl border border-slate-200 max-w-2xl mx-auto"><div className="flex items-center space-x-4 p-4 bg-blue-50 border border-blue-200 rounded-lg"><Shield size={24} className="text-blue-600"/><div><h3 className="font-bold text-blue-800">Your Role: Policy Analyst</h3><p className="text-sm text-blue-700">This role grants you access to view and analyze consultation data.</p></div></div><div className="mt-6"><h4 className="text-md font-semibold text-slate-700 mb-3">Your Permissions:</h4><ul className="list-disc list-inside space-y-2 text-slate-600"><li>View all public submissions.</li><li>Access AI-generated summaries and stance analysis.</li><li>Generate and export reports for active consultations.</li><li className="text-slate-400">Manage user accounts (Admin permission required).</li><li className="text-slate-400">Initiate new consultations (Admin permission required).</li></ul></div></div></div>);
const LoginView = ({ setIsAuthenticated }) => {
    const [step, setStep] = useState(1); const [email, setEmail] = useState("ishaan.saxena@mca.gov.in"); const [password, setPassword] = useState("password"); const [showPassword, setShowPassword] = useState(false); const [otp, setOtp] = useState(""); const [error, setError] = useState("");
    const handleNext = (e) => { e.preventDefault(); setError(""); if (step === 1 && email) setStep(2); if (step === 2 && password) setStep(3); if (step === 3 && otp === "123456") { setIsAuthenticated(true); } else if (step === 3) { setError("Invalid OTP. Please try again."); }};
    return (<div className="min-h-screen bg-slate-100 flex flex-col justify-center items-center p-4"><div className="w-full max-w-md"><div className="text-center mb-8"><img src="./mca.png" alt="MCA Emblem" className="h-12 mx-auto mb-4"/><h1 className="text-3xl font-bold text-slate-800">Project Saaransh</h1><p className="text-slate-500">MCA E-Consultation Analysis Portal</p></div><div className="bg-white shadow-lg rounded-xl p-8"><h2 className="text-2xl font-semibold text-center text-slate-700 mb-2">Secure Sign In</h2>{error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}<form onSubmit={handleNext}>{step === 1 && (<div className="mb-4"><label className="block text-slate-700 text-sm font-bold mb-2" htmlFor="email">Email Address</label><div className="relative"><AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" /><input value={email} onChange={(e) => setEmail(e.target.value)} className="shadow-sm appearance-none border rounded-lg w-full py-2 pl-10 pr-3 text-slate-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" id="email" type="email" placeholder="user@mca.gov.in" /></div></div>)}{step === 2 && (<div className="mb-6"><label className="block text-slate-700 text-sm font-bold mb-2" htmlFor="password">Password</label><div className="relative"><Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" /><input value={password} onChange={(e) => setPassword(e.target.value)} className="shadow-sm appearance-none border rounded-lg w-full py-2 pl-10 pr-10 text-slate-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" id="password" type={showPassword ? "text" : "password"} placeholder="******************" /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">{showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}</button></div><a href="#" className="text-xs text-blue-600 hover:underline mt-2 inline-block">Forgot Password?</a></div>)}{step === 3 && (<div className="mb-4"><label className="block text-slate-700 text-sm font-bold mb-2" htmlFor="otp">One-Time Password (OTP)</label><p className="text-xs text-slate-500 mb-2">An OTP has been sent to your email. (Hint: 123456)</p><input value={otp} onChange={(e) => setOtp(e.target.value)} className="shadow-sm appearance-none border rounded-lg w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" id="otp" type="text" placeholder="Enter 6-digit OTP" /></div>)}<button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full" type="submit">{step === 1 && "Continue"}{step === 2 && "Sign In"}{step === 3 && "Verify & Sign In"}</button></form></div><p className="text-center text-slate-500 text-xs mt-6">This is a secure government system. All activities are monitored.</p><p className="text-center text-slate-500 text-xs mt-6">©2025 Ministry of Corporate Affairs. All rights reserved.</p></div></div>);};

// --- MAIN APP COMPONENT --- //
export default function App() {
  const [selectedConsultation, setSelectedConsultation] = useState(1);
  const [selectedComment, setSelectedComment] = useState(null);
  const [view, setView] = useState('home'); // home, dashboard, detail, trends, profile, settings, auth
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const currentConsultation = consultations.find(c => c.id === selectedConsultation);
  
  useEffect(() => {
    if (isSidebarOpen && window.innerWidth < 1024) { document.body.style.overflow = 'hidden'; } 
    else { document.body.style.overflow = 'auto'; }
  }, [isSidebarOpen]);

  const renderContent = () => {
    switch (view) {
      case 'home': return <HomeView setView={setView} setSelectedConsultation={setSelectedConsultation} setSelectedComment={setSelectedComment} />;
      case 'detail': return <DetailView comment={selectedComment} setView={setView} setSelectedConsultation={setSelectedConsultation} />;
      case 'trends': return <TrendAnalysisView />;
      case 'profile': return <UserProfileView />;
      case 'settings': return <SettingsView />;
      case 'auth': return <AuthorizationView />;
      case 'dashboard':
      default: return currentConsultation ? <DashboardView consultation={currentConsultation} setSelectedComment={setSelectedComment} setView={setView} /> : <HomeView setView={setView} setSelectedConsultation={setSelectedConsultation} setSelectedComment={setSelectedComment}/>;
    }
  };

  if (!isAuthenticated) { return <LoginView setIsAuthenticated={setIsAuthenticated} /> }

  return (
    <div className="bg-slate-100 min-h-screen font-sans text-slate-800">
      <Header setView={setView} setIsAuthenticated={setIsAuthenticated} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} isSidebarOpen={isSidebarOpen}/>
      <Sidebar selectedConsultation={selectedConsultation} setSelectedConsultation={setSelectedConsultation} view={view} setView={setView} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <main className="lg:pl-72 pt-16 transition-all duration-300 ease-in-out">
        <div className="p-4 sm:p-6 lg:p-8">
            {renderContent()}
        </div>
      </main>
      {isSidebarOpen && <div onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-black bg-opacity-30 z-0 lg:hidden"></div>}
    </div>
  );
}

