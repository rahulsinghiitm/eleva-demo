import React, { useEffect } from 'react';

const paths = {
  home: 'M3 10 12 3l9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z',
  compass: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM16 8l-2.5 5.5L8 16l2.5-5.5Z',
  card: 'M3 5h18v14H3ZM3 9h18M7 15h3',
  chart: 'M4 20h16M6 16v-5m6 5V4m6 12V8',
  activity: 'M3 12h4l3-8 4 16 3-8h4',
  spark: 'm12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3Z',
  bell: 'M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4',
  chevron: 'm9 5 7 7-7 7',
};

function Icon({ name, size = 20 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]} /></svg>;
}

function Brand() {
  const source = location.protocol === 'file:' ? './dist/assets/eleva-mark-acid.png' : './assets/eleva-mark-acid.png';
  return <a className="brand" href="#home" aria-label="Eleva home"><span className="brand-mark" aria-hidden="true"><img src={source} alt="" /></span>eleva</a>;
}

function Sidebar({ view }) {
  return <aside className="sidebar">
    <Brand />
    <div className="eyebrow">Your space</div>
    <nav className="nav-list" aria-label="Main navigation">{view.navs.map(([route, icon, label]) => <a key={route} className={`nav-item ${view.route === route ? 'active' : ''}`} aria-current={view.route === route ? 'page' : undefined} href={`#${route}`}><Icon name={icon} /><span>{label}</span></a>)}</nav>
    <div className="member-stamp"><div className="mini-line" /><p>Built for people<br />who build.</p><small>YOUR WEALTH. YOUR CREDIT.</small></div>
    <button className="sidebar-profile" data-action="profile"><span className="avatar">RS</span><span><strong>Rahul Singh</strong><small>Founding member · #001</small></span><span className="arrow"><Icon name="chevron" size={15} /></span></button>
  </aside>;
}

function Header({ view, label }) {
  return <header className="topbar"><div className="mobile-logo"><Brand /></div><div className="breadcrumb">Your Eleva <span>/ &nbsp;{label}</span></div><div className="top-actions"><span className="proto-pill"><i />PRIVATE PROTOTYPE · DEMO DATA</span><button className="onboarding-nav-link" data-action="onboard-start">Try onboarding <Icon name="chevron" size={13} /></button><button className="icon-button" aria-label="Notifications" data-action="notifications"><Icon name="bell" size={18} />{!view.noticesRead && <span className="notification-dot" />}</button><button className="avatar" aria-label="Your profile" data-action="profile">RS</button></div></header>;
}

function MobileNavigation({ view }) {
  return <nav className="mobile-nav" aria-label="Mobile navigation">{view.navs.filter(([route]) => route !== 'activity').map(([route, icon, label]) => <a key={route} href={`#${route}`} className={view.route === route ? 'active' : ''} aria-current={view.route === route ? 'page' : undefined}><Icon name={icon} />{route === 'home' ? 'Home' : route === 'card' ? 'Card' : route === 'limits' ? 'Limits' : label}</a>)}</nav>;
}

export function ElevaApp({ view }) {
  const label = view.route === 'onboarding' ? 'Get started' : view.navs.find(([route]) => route === view.route)[2];
  useEffect(() => { document.title = `Eleva — ${label}`; }, [label]);
  if (view.route === 'onboarding') return <div dangerouslySetInnerHTML={{ __html: view.content }} />;
  return <>
    <Sidebar view={view} />
    <div className="shell"><Header view={view} label={label} /><main id="main" className="main" tabIndex={-1}><div dangerouslySetInnerHTML={{ __html: view.content }} /><footer className="app-footer"><span>© 2026 Eleva · Built around your ambition.</span><span>Illustrative terms &amp; demo balances. No real banking actions. &nbsp; <button data-action="about">About this prototype ↗</button></span></footer></main></div>
    <MobileNavigation view={view} />
  </>;
}
