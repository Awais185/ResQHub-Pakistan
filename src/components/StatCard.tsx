import { AlertTriangle, Users, Package, Heart, CheckCircle2, Building2 } from 'lucide-react';

const ICONS: Record<string, typeof Users> = { alert: AlertTriangle, users: Users, package: Package, heart: Heart, check: CheckCircle2, building: Building2 };

export default function StatCard({ label, value, icon = 'users', color = '#1769AA', trend }: { label: string; value: string; icon?: string; color?: string; trend?: string }) {
  const Icon = ICONS[icon] || Users;
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: color + '15', color }}>
          <Icon size={22} />
        </div>
        {trend && <span className="text-xs font-semibold text-relief bg-relief/10 px-2 py-0.5 rounded-full">{trend}</span>}
      </div>
      <div className="mt-4">
        <div className="text-2xl font-display font-extrabold text-navy">{value}</div>
        <div className="text-sm text-muted">{label}</div>
      </div>
    </div>
  );
}
