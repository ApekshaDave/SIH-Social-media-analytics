import React from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { DemographicData } from '../types';
import { ShieldCheck } from 'lucide-react';

interface DemographicsProps {
  data: DemographicData;
}

const COLOR_PALETTE = ['#378ADD', '#639922', '#EF9F27', '#7F77DD', '#E24B4A'];

export const Demographics: React.FC<DemographicsProps> = ({ data }) => {
  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#2C2C2A] tracking-tight">Demographic & Linguistic Analytics</h1>
        <p className="text-xs text-[#5F5E5A] mt-0.5">
          Population aggregate profiling across age distribution, geographical density, and dialect patterns
        </p>
      </div>

      {/* Mandatory Privacy Disclaimer Banner */}
      <div className="bg-[#378ADD]/10 border border-[#378ADD]/30 rounded-xl p-4 text-xs text-[#2C2C2A] flex items-center space-x-3">
        <ShieldCheck className="w-5 h-5 text-[#378ADD] flex-shrink-0" />
        <div>
          <span className="font-bold text-[#378ADD]">Privacy & Data Governance Compliance:</span>
          <p className="text-[#5F5E5A] text-[11px] mt-0.5">
            Aggregate, anonymized data only — no individual identification. Fully compliant with Indian Data Protection standards.
          </p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Age Brackets Bar Chart */}
        <div className="bg-[#F1EFE8] rounded-xl border border-[#E5E3DA] p-5 space-y-4">
          <div>
            <h2 className="text-base font-bold text-[#2C2C2A]">Age Bracket Distribution</h2>
            <p className="text-xs text-[#5F5E5A]">Audience age percentage breakdown across public posts</p>
          </div>

          <div className="w-full h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.ageBrackets} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="bracket" stroke="#5F5E5A" fontSize={11} tickLine={false} />
                <YAxis stroke="#5F5E5A" fontSize={11} tickLine={false} unit="%" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '8px', borderColor: '#E5E3DA', fontSize: '12px' }}
                />
                <Bar dataKey="percentage" fill="#378ADD" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Language Breakdown Donut/Pie Chart */}
        <div className="bg-[#F1EFE8] rounded-xl border border-[#E5E3DA] p-5 space-y-4">
          <div>
            <h2 className="text-base font-bold text-[#2C2C2A]">Language & Dialect Mix</h2>
            <p className="text-xs text-[#5F5E5A]">Linguistic composition including code-mixed Hinglish</p>
          </div>

          <div className="w-full h-56 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.languages}
                  dataKey="percentage"
                  nameKey="language"
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={75}
                  paddingAngle={4}
                >
                  {data.languages.map((entry, index) => (
                    <Cell key={entry.language} fill={COLOR_PALETTE[index % COLOR_PALETTE.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '8px', borderColor: '#E5E3DA', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap gap-3 justify-center text-xs">
            {data.languages.map((lang, index) => (
              <div key={lang.language} className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLOR_PALETTE[index % COLOR_PALETTE.length] }} />
                <span className="text-[#5F5E5A]">{lang.language}: <strong className="text-[#2C2C2A]">{lang.percentage}%</strong></span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Geographic Regional Table */}
      <div className="bg-[#F1EFE8] rounded-xl border border-[#E5E3DA] p-5 space-y-4">
        <div>
          <h2 className="text-base font-bold text-[#2C2C2A]">Geographic Regional Density</h2>
          <p className="text-xs text-[#5F5E5A]">Estimated regional post volume and national audience percentage share</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E5E3DA] text-[#5F5E5A] font-semibold uppercase">
                <th className="pb-2">Region / Metro Zone</th>
                <th className="pb-2">Analyzed Post Volume</th>
                <th className="pb-2">Share of Voice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E3DA]">
              {data.regions.map((reg) => (
                <tr key={reg.region} className="hover:bg-white/50 transition-colors">
                  <td className="py-2.5 font-bold text-[#2C2C2A]">{reg.region}</td>
                  <td className="py-2.5 font-mono text-[#2C2C2A]">{reg.volume.toLocaleString()} posts</td>
                  <td className="py-2.5">
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-[#E5E3DA] h-2 rounded-full overflow-hidden">
                        <div className="bg-[#378ADD] h-full" style={{ width: `${reg.sharePercentage * 3}%` }} />
                      </div>
                      <span className="font-semibold text-[#2C2C2A]">{reg.sharePercentage}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
