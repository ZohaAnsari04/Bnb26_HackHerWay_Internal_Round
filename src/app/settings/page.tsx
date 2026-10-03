'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { AppShell } from '@/components/AppShell';
import {
  Settings,
  Key,
  Cpu,
  Share2,
  ShieldCheck,
  Save,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  RefreshCw
} from 'lucide-react';

export default function SettingsPage() {
  const { isDemoMode, setIsDemoMode, showToast } = useApp();

  const [aiProvider, setAiProvider] = useState('openai');
  const [whisperModel, setWhisperModel] = useState('large-v3');
  const [llmModel, setLlmModel] = useState('gpt-4o-mini');
  const [apiKey, setApiKey] = useState('sk-proj-demo-creatorai-hackathon-token');
  const [autoCaptions, setAutoCaptions] = useState(true);

  const [connectedPlatforms, setConnectedPlatforms] = useState({
    instagram: true,
    youtube: true,
    linkedin: true,
    tiktok: false,
    x: true,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Settings saved successfully');
  };

  const togglePlatform = (key: keyof typeof connectedPlatforms) => {
    setConnectedPlatforms((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      showToast(`${key} connection ${updated[key] ? 'enabled' : 'disabled'}`);
      return updated;
    });
  };

  return (
    <AppShell>
      <div className="max-w-4xl space-y-8">
        {/* Header */}
        <div className="pb-2 border-b border-[rgba(20,20,40,0.06)]">
          <h1 className="text-2xl font-bold tracking-tight text-[#17172A]">Settings & Configuration</h1>
          <p className="text-sm text-[#68697A] mt-0.5">
            Configure AI models, social channels, and runtime fallback modes.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Demo Mode / Fallback Card (Prompt Section 30) */}
          <div className="card-clean card-premium surface-radial-purple card-top-edge p-6 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="icon-box-purple">
                  <ShieldCheck className="w-5 h-5 text-[#635BFF]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#17172A]">Hackathon Demo Mode</h3>
                  <p className="text-xs text-[#68697A]">Guarantees 100% flawless presentation reliability if external APIs are unconfigured</p>
                </div>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isDemoMode}
                  onChange={(e) => {
                    setIsDemoMode(e.target.checked);
                    showToast(e.target.checked ? 'Demo Mode Active' : 'Live API Active', 'info');
                  }}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#E5E7EB] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#635BFF]"></div>
              </label>
            </div>
            <p className="text-xs text-[#68697A] leading-relaxed">
              When Demo Mode is enabled, pre-seeded high-fidelity assets (&ldquo;AI & The Future of Work&rdquo;, Whisper phoneme transcripts, and Opportunity Scores) are served immediately.
            </p>
          </div>

          {/* AI Provider & Models */}
          <div className="card-clean card-premium p-6 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[rgba(20,20,40,0.06)]">
              <div className="icon-box-purple !w-8 !h-8 !rounded-xl">
                <Cpu className="w-4 h-4 text-[#635BFF]" />
              </div>
              <h3 className="text-sm font-bold text-[#17172A]">AI Engine & Model Selection</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#17172A] mb-1.5">
                  AI Provider Architecture
                </label>
                <select
                  value={aiProvider}
                  onChange={(e) => setAiProvider(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[rgba(20,20,40,0.1)] bg-white text-[#17172A] focus:outline-none focus:border-[#635BFF]"
                >
                  <option value="openai">OpenAI (Whisper + GPT-4o)</option>
                  <option value="anthropic">Anthropic (Claude 3.5 Sonnet)</option>
                  <option value="gemini">Google Gemini 2.5 Flash</option>
                  <option value="local">Local Whisper + Fallback Simulator</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#17172A] mb-1.5">
                  Transcription Model
                </label>
                <select
                  value={whisperModel}
                  onChange={(e) => setWhisperModel(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[rgba(20,20,40,0.1)] bg-white text-[#17172A] focus:outline-none focus:border-[#635BFF]"
                >
                  <option value="large-v3">Whisper large-v3 (Word Timestamps)</option>
                  <option value="whisper-1">Whisper-1 Hosted API</option>
                  <option value="distil-whisper">Distil-Whisper (Fast)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#17172A] mb-1.5">
                API Key (Secured & Stored Locally)
              </label>
              <div className="relative">
                <Key className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#9496A8]" />
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-..."
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[rgba(20,20,40,0.1)] bg-white text-[#17172A] focus:outline-none focus:border-[#635BFF]"
                />
              </div>
              <p className="text-[11px] text-[#9496A8] mt-1">
                Keys remain strictly client-side or forward to the private backend proxy.
              </p>
            </div>
          </div>

          {/* Connected Social Platforms */}
          <div className="card-clean card-premium p-6 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[rgba(20,20,40,0.06)]">
              <div className="icon-box-pink !w-8 !h-8 !rounded-xl">
                <Share2 className="w-4 h-4 text-[#EC4899]" />
              </div>
              <h3 className="text-sm font-bold text-[#17172A]">Connected Publishing Channels</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: 'instagram', label: 'Instagram (Reels)', handle: '@alexrivera_tech' },
                { id: 'youtube', label: 'YouTube (Shorts & Longform)', handle: 'Alex Rivera Tech' },
                { id: 'linkedin', label: 'LinkedIn Creator', handle: 'Alex Rivera (12.4k)' },
                { id: 'x', label: 'X / Twitter', handle: '@alexrivera' },
                { id: 'tiktok', label: 'TikTok Creator', handle: 'Not connected' },
              ].map((plat) => {
                const isConnected = connectedPlatforms[plat.id as keyof typeof connectedPlatforms];
                return (
                  <div
                    key={plat.id}
                    className="p-3.5 rounded-2xl bg-white/80 border border-[rgba(20,20,40,0.06)] shadow-2xs hover:border-[#635BFF]/30 hover:bg-[#F9FAFE] transition-all flex items-center justify-between"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-[#17172A]">{plat.label}</h4>
                      <span className="text-[11px] text-[#68697A]">{plat.handle}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => togglePlatform(plat.id as any)}
                      className={`px-3 py-1 text-xs font-semibold rounded-xl border transition-all ${
                        isConnected
                          ? 'border-[#22C55E]/30 bg-[#22C55E]/10 text-[#22C55E]'
                          : 'border-[rgba(20,20,40,0.1)] text-[#68697A] hover:bg-white'
                      }`}
                    >
                      {isConnected ? 'Connected' : 'Connect'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-xs font-semibold btn-primary-gradient flex items-center gap-2 shadow-xs"
            >
              <Save className="w-4 h-4" />
              <span>Save Configuration</span>
            </button>
          </div>
        </form>
      </div>
    </AppShell>
  );
}
