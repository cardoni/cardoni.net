'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface ArchiveDatum {
  year: string;
  essays: number;
}

interface ArchiveTimelineProps {
  data: ArchiveDatum[];
}

const BAR_COLORS = ['#2556a6', '#db5a3c', '#5f7454', '#151515'];

export default function ArchiveTimeline({ data }: ArchiveTimelineProps) {
  return (
    <div className="archive-chart" role="img" aria-label="Bar chart showing essays published by year">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 4, bottom: 0, left: -28 }} accessibilityLayer>
          <CartesianGrid vertical={false} stroke="currentColor" strokeOpacity={0.1} />
          <XAxis
            dataKey="year"
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'currentColor', fontSize: 11, fontFamily: 'var(--font-geist-mono)' }}
          />
          <YAxis
            allowDecimals={false}
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'currentColor', fontSize: 11, fontFamily: 'var(--font-geist-mono)' }}
          />
          <Tooltip
            cursor={{ fill: 'currentColor', fillOpacity: 0.05 }}
            contentStyle={{
              background: 'var(--surface-raised)',
              border: '1px solid var(--border)',
              borderRadius: 4,
              color: 'var(--foreground)',
              fontFamily: 'var(--font-geist-mono)',
              fontSize: 12,
            }}
            formatter={(value) => [`${value} essays`, 'Published']}
            labelFormatter={(label) => `Year ${label}`}
          />
          <Bar dataKey="essays" radius={[3, 3, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={entry.year} fill={BAR_COLORS[index % BAR_COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
