'use client';

import React from 'react';

interface FloatingApp {
  id: string;
  name: string;
  type: 'social' | 'creator';
  top: string;
  left?: string;
  right?: string;
  duration: string;
  delay: string;
  iconBg: string;
  icon: React.ReactNode;
}

const APPS: FloatingApp[] = [
  // --- Left Margin ---
  {
    id: 'youtube',
    name: 'YouTube',
    type: 'social',
    top: '12%',
    left: '4%',
    duration: '11s',
    delay: '0s',
    iconBg: '#FF0000',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    id: 'instagram',
    name: 'Instagram',
    type: 'social',
    top: '26%',
    left: '8%',
    duration: '13s',
    delay: '-3s',
    iconBg: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  },
  {
    id: 'premiere',
    name: 'Premiere Pro',
    type: 'creator',
    top: '40%',
    left: '3%',
    duration: '12s',
    delay: '-6s',
    iconBg: '#00005B',
    icon: (
      <span className="font-extrabold text-[11px] text-[#9999FF] tracking-tighter font-sans">Pr</span>
    ),
  },
  {
    id: 'spotify',
    name: 'Spotify',
    type: 'social',
    top: '54%',
    left: '7%',
    duration: '14s',
    delay: '-1s',
    iconBg: '#1DB954',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
      </svg>
    ),
  },
  {
    id: 'figma',
    name: 'Figma',
    type: 'creator',
    top: '68%',
    left: '4%',
    duration: '10s',
    delay: '-4s',
    iconBg: '#1E1E1E',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M6 12C6 8.686 8.686 6 12 6H15V12H12C8.686 12 6 12 6 12Z" fill="#0ACF83"/>
        <path d="M6 6C6 2.686 8.686 0 12 0H18V6H12C8.686 6 6 6 6 6Z" fill="#F24E1E"/>
        <path d="M12 0H15C18.314 0 21 2.686 21 6C21 9.314 18.314 12 15 12H12V0Z" fill="#FF7262"/>
        <path d="M6 18C6 14.686 8.686 12 12 12H18V18C18 21.314 15.314 24 12 24C8.686 24 6 21.314 6 18Z" fill="#1ABCFE"/>
        <path d="M0 12C0 8.686 2.686 6 6 6H12V18H6C2.686 18 0 15.314 0 12Z" fill="#A259FF"/>
      </svg>
    ),
  },
  {
    id: 'notion',
    name: 'Notion',
    type: 'creator',
    top: '82%',
    left: '8%',
    duration: '15s',
    delay: '-7s',
    iconBg: '#FFFFFF',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#000000">
        <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.64c-.42-.326-.98-.746-2.054-.653L2.965 2.06c-.374.047-.467.327-.327.56zm.84 4.808v12.743c0 .84.42 1.12 1.353 1.073l14.195-.84c.933-.047 1.026-.606 1.026-1.26V7.755c0-.653-.28-.98-.84-.933l-14.894.887c-.56.046-.84.42-.84.906zm13.167 1.493c.094.42 0 .84-.373.887l-.98.187v7.653c-.373.187-.746.374-1.12.56l-3.36-5.04v4.993l1.4.327c0 .373-.28.607-.746.607l-3.313.186c-.094-.373.093-.746.373-.84l.98-.186v-6.907l-1.353-.093c-.094-.374.093-.747.56-.84l3.593-.234 3.407 5.187v-4.994l-1.307-.186c-.093-.42.187-.747.56-.794z"/>
      </svg>
    ),
  },

  // --- Right Margin ---
  {
    id: 'tiktok',
    name: 'TikTok',
    type: 'social',
    top: '14%',
    right: '4%',
    duration: '10.5s',
    delay: '-2s',
    iconBg: '#010101',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
      </svg>
    ),
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    type: 'social',
    top: '28%',
    right: '7%',
    duration: '12.5s',
    delay: '-5s',
    iconBg: '#0A66C2',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
      </svg>
    ),
  },
  {
    id: 'x-twitter',
    name: 'X / Twitter',
    type: 'social',
    top: '42%',
    right: '3%',
    duration: '11.5s',
    delay: '-1.5s',
    iconBg: '#000000',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    id: 'openai',
    name: 'OpenAI / GPT-4',
    type: 'creator',
    top: '56%',
    right: '8%',
    duration: '13.5s',
    delay: '-4.5s',
    iconBg: '#10A37F',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
        <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.08 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.493zm-9.66-4.43a4.47 4.47 0 0 1-.534-3.006l.142.082 4.779 2.758a.794.794 0 0 0 .785 0l5.834-3.369v2.332a.08.08 0 0 1-.033.067l-4.838 2.793a4.497 4.497 0 0 1-6.135-1.657zm-1.22-9.69a4.482 4.482 0 0 1 2.342-1.966v5.674a.79.79 0 0 0 .393.681l5.834 3.369-2.02 1.168a.078.078 0 0 1-.074 0l-4.838-2.794a4.504 4.504 0 0 1-1.637-6.132zm16.597 3.855-5.833-3.37L15.163 7.6a.078.078 0 0 1 .074 0l4.838 2.794a4.504 4.504 0 0 1-.696 8.118v-5.674a.79.79 0 0 0-.393-.681zm2.01-3.013l-.142-.08-4.779-2.759a.794.794 0 0 0-.785 0L9.447 9.878V7.546a.08.08 0 0 1 .033-.067l4.838-2.793a4.504 4.504 0 0 1 6.669 4.665zm-12.35 4.316L6.617 12.3a.08.08 0 0 1-.038-.052V6.665a4.504 4.504 0 0 1 7.37-3.453l-.142.08-4.779 2.758a.795.795 0 0 0-.392.681v6.737z"/>
      </svg>
    ),
  },
  {
    id: 'capcut',
    name: 'CapCut',
    type: 'creator',
    top: '70%',
    right: '4%',
    duration: '11s',
    delay: '-6.5s',
    iconBg: '#000000',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="6" r="3"/>
        <circle cx="6" cy="18" r="3"/>
        <line x1="20" y1="4" x2="8.12" y2="15.88"/>
        <line x1="14.47" y1="14.48" x2="20" y2="20"/>
        <line x1="8.12" y1="8.12" x2="12" y2="12"/>
      </svg>
    ),
  },
  {
    id: 'aftereffects',
    name: 'After Effects',
    type: 'creator',
    top: '84%',
    right: '7%',
    duration: '14s',
    delay: '-3.5s',
    iconBg: '#00005B',
    icon: (
      <span className="font-extrabold text-[11px] text-[#CF96FD] tracking-tighter font-sans">Ae</span>
    ),
  },
];

export function FloatingAppIcons() {
  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none z-10"
      aria-hidden="true"
    >
      {APPS.map((app) => {
        return (
          <div
            key={app.id}
            className="floating-app-badge"
            style={{
              top: app.top,
              ...(app.left ? { left: app.left } : {}),
              ...(app.right ? { right: app.right } : {}),
              animation: `float-app-drift ${app.duration} ease-in-out infinite`,
              animationDelay: app.delay,
            }}
          >
            <div
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center shadow-xs shrink-0"
              style={{ background: app.iconBg }}
              title={app.name}
            >
              {app.icon}
            </div>
          </div>
        );
      })}
    </div>
  );
}
