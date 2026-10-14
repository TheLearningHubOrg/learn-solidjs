import { Component } from 'solid-js';

interface MetricCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: string;
}

export const MetricCard: Component<MetricCardProps> = (props) => {
  return (
    <div style={{
      background: 'rgba(19, 29, 54, 0.5)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      'border-radius': '10px',
      padding: '1rem 1.25rem',
      display: 'flex',
      'flex-direction': 'column',
      gap: '0.35rem'
    }}>
      <div style={{
        display: 'flex',
        'align-items': 'center',
        gap: '0.5rem',
        color: '#94a3b8',
        'font-size': '0.85rem',
        'text-transform': 'uppercase',
        'letter-spacing': '0.05em',
        'font-weight': '600'
      }}>
        <span>{props.icon || '⚡'}</span>
        <span>{props.title}</span>
      </div>
      <div style={{
        'font-size': '1.75rem',
        'font-weight': '700',
        color: '#f8fafc'
      }}>
        {props.value}
      </div>
      {props.description && (
        <div style={{
          'font-size': '0.8rem',
          color: '#64748b'
        }}>
          {props.description}
        </div>
      )}
    </div>
  );
};
