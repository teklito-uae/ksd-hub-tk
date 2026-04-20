import { Settings, Shield, Bell, Database, Lock, Globe } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function SystemSettings() {
  return (
    <div className="space-y-12">
      <header className="mb-12">
        <h1 className="text-4xl font-black tracking-tight mb-2 bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent text-left">System Settings</h1>
        <div className="flex items-center gap-2">
          <div className="size-1.5 rounded-full bg-zinc-500 shadow-[0_0_8px_rgba(255,255,255,0.2)]" />
          <p className="text-zinc-500 uppercase tracking-[0.2em] text-[10px] font-black">Core Configuration & Governance</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <SettingsCard 
          icon={Shield} 
          title="Security Protocols" 
          description="Manage MFA, session timeouts, and encryption keys." 
          status="Hardened"
        />
        <SettingsCard 
          icon={Globe} 
          title="Localization" 
          description="Adjust geographic bounds and currency mappings." 
          status="Active"
        />
        <SettingsCard 
          icon={Bell} 
          title="Notifications" 
          description="Configure system-wide alerts and push telemetry." 
          status="Enabled"
        />
        <SettingsCard 
          icon={Database} 
          title="Storage Registry" 
          description="Optimize CDN nodes and media assets." 
          status="Optimal"
        />
        <SettingsCard 
          icon={Lock} 
          title="Access Control" 
          description="Define granular RBAC permissions for staff." 
          status="Restricted"
        />
      </div>

      <div className="mt-12 bg-zinc-900/40 border border-zinc-800 rounded-2xl p-8 max-w-2xl">
        <h3 className="text-xl font-black text-white mb-4">System Integrity Check</h3>
        <p className="text-zinc-500 text-sm mb-8 leading-relaxed">Ensure all system modules are synchronized with the primary database node. Any discrepancies in registry counts will be logged in the audit trail.</p>
        <Button className="bg-white text-black hover:bg-zinc-200 font-black text-[11px] uppercase tracking-widest h-12 px-8 rounded-xl">
          Execute Global Sync
        </Button>
      </div>
    </div>
  );
}

function SettingsCard({ icon: Icon, title, description, status }: any) {
  return (
    <div className="bg-zinc-900/40 backdrop-blur-sm border border-zinc-800 p-8 rounded-2xl hover:border-primary/50 transition-all group cursor-pointer">
      <div className="size-12 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        <Icon className="size-5 text-zinc-500 group-hover:text-primary transition-colors" />
      </div>
      <h4 className="text-[15px] font-black text-white mb-2 tracking-tight">{title}</h4>
      <p className="text-[12px] text-zinc-500 leading-relaxed mb-6 font-medium">{description}</p>
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-600">{status}</span>
        <div className="size-1.5 rounded-full bg-emerald-500" />
      </div>
    </div>
  );
}
