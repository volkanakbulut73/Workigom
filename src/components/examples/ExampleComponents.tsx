/**
 * WORKIGOM Example Components
 * "Sevimli & Eğlenceli" Theme - Using Design Tokens
 * 
 * These are reference implementations showing how to use
 * the design system tokens in React components.
 * 
 * Import this file's styles: import './ExampleComponents.css'
 */

import React from 'react';
import { Zap, Users, DollarSign, MapPin, Star } from 'lucide-react';

// ========================================
// HEADER CARD EXAMPLE
// ========================================
export function ExampleHeaderCard() {
  return (
    <div className="header-card">
      <h1 className="header-card__title">Test Şirketi</h1>
      <div className="header-card__subtitle">
        <MapPin className="w-3 h-3" />
        <span>Beşiktaş, İstanbul</span>
        <Star className="w-3 h-3 fill-white" />
        <span>4.6</span>
      </div>
    </div>
  );
}

// ========================================
// METRIC CARD EXAMPLE
// ========================================
interface MetricCardProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  variant?: 'turquoise' | 'pink' | 'lavender';
}

export function ExampleMetricCard({ 
  icon, 
  value, 
  label, 
  variant = 'turquoise' 
}: MetricCardProps) {
  return (
    <div className="metric-card">
      <div className="metric-card__header">
        <div className={`metric-card__icon metric-card__icon--${variant}`}>
          {icon}
        </div>
      </div>
      <div className="metric-card__value">{value}</div>
      <div className="metric-card__label">{label}</div>
    </div>
  );
}

// Usage Example:
// <ExampleMetricCard 
//   icon={<Users className="w-4 h-4" />}
//   value="24"
//   label="Gelen Personel"
//   variant="turquoise"
// />

// ========================================
// CTA CARD EXAMPLE
// ========================================
interface CTACardProps {
  title: string;
  description: string;
  buttonText: string;
  onButtonClick: () => void;
}

export function ExampleCTACard({ 
  title, 
  description, 
  buttonText, 
  onButtonClick 
}: CTACardProps) {
  return (
    <div className="cta-card">
      <div className="cta-card__content">
        <h4 className="cta-card__title">{title}</h4>
        <p className="cta-card__description">{description}</p>
        <button className="cta-card__button" onClick={onButtonClick}>
          <Zap className="w-3 h-3" />
          {buttonText}
        </button>
      </div>
    </div>
  );
}

// Usage Example:
// <ExampleCTACard
//   title="Günlük personel ihtiyacınız mı var?"
//   description="Yakındaki çalışanlar anında bildirim alsın"
//   buttonText="İş Talebi Oluştur"
//   onButtonClick={() => console.log('CTA clicked')}
// />

// ========================================
// SEARCH INPUT EXAMPLE
// ========================================
interface SearchInputProps {
  placeholder?: string;
  onSearch: (query: string) => void;
}

export function ExampleSearchInput({ 
  placeholder = "Ara...", 
  onSearch 
}: SearchInputProps) {
  const [query, setQuery] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form className="search-input-wrapper" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">Ara</button>
    </form>
  );
}

// ========================================
// APPLICATION CARD EXAMPLE
// ========================================
interface ApplicationCardProps {
  name: string;
  role: string;
  badge?: string;
  onClick?: () => void;
}

export function ExampleApplicationCard({ 
  name, 
  role, 
  badge,
  onClick 
}: ApplicationCardProps) {
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <div className="application-card" onClick={onClick}>
      <div className="application-card__header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="application-card__avatar">
            {initials}
          </div>
          <div>
            <div className="application-card__name">{name}</div>
            <div className="application-card__role">{role}</div>
          </div>
        </div>
        {badge && (
          <span className="badge badge--turquoise">{badge}</span>
        )}
      </div>
    </div>
  );
}

// ========================================
// BADGE EXAMPLES
// ========================================
interface BadgeProps {
  children: React.ReactNode;
  variant?: 'turquoise' | 'pink' | 'lavender' | 'lemon' | 'outline';
}

export function ExampleBadge({ children, variant = 'turquoise' }: BadgeProps) {
  return (
    <span className={`badge badge--${variant}`}>
      {children}
    </span>
  );
}

// ========================================
// BUTTON EXAMPLES
// ========================================
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'gradient' | 'outline';
  onClick?: () => void;
  disabled?: boolean;
}

export function ExampleButton({ 
  children, 
  variant = 'primary', 
  onClick,
  disabled = false
}: ButtonProps) {
  return (
    <button 
      className={`btn btn--${variant}`} 
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

// ========================================
// SIDEBAR ITEM EXAMPLE
// ========================================
interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export function ExampleSidebarItem({ 
  icon, 
  label, 
  active = false, 
  onClick 
}: SidebarItemProps) {
  return (
    <div 
      className={`sidebar__item ${active ? 'sidebar__item--active' : ''}`}
      onClick={onClick}
    >
      <span className="sidebar__icon">{icon}</span>
      <span>{label}</span>
    </div>
  );
}

// ========================================
// DEMO PAGE - Shows all components
// ========================================
export function DesignSystemDemo() {
  return (
    <div style={{ padding: '24px', background: 'var(--color-bg)', minHeight: '100vh' }}>
      <h1 style={{ marginBottom: '32px', color: 'var(--text-strong)' }}>
        🎨 WORKIGOM Design System Demo
      </h1>

      {/* Header Card */}
      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ marginBottom: '16px', color: 'var(--text-strong)' }}>Header Card</h2>
        <ExampleHeaderCard />
      </section>

      {/* Metric Cards */}
      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ marginBottom: '16px', color: 'var(--text-strong)' }}>Metric Cards</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <ExampleMetricCard
            icon={<Users className="w-4 h-4" />}
            value="24"
            label="Gelen Personel"
            variant="turquoise"
          />
          <ExampleMetricCard
            icon={<DollarSign className="w-4 h-4" />}
            value="15.2K₺"
            label="Giden Ödeme"
            variant="pink"
          />
          <ExampleMetricCard
            icon={<Star className="w-4 h-4 fill-current" />}
            value="4.6"
            label="Puan"
            variant="lavender"
          />
        </div>
      </section>

      {/* CTA Card */}
      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ marginBottom: '16px', color: 'var(--text-strong)' }}>CTA Card</h2>
        <ExampleCTACard
          title="Günlük personel ihtiyacınız mı var?"
          description="Yakındaki çalışanlar anında bildirim alsın"
          buttonText="İş Talebi Oluştur"
          onButtonClick={() => alert('CTA clicked!')}
        />
      </section>

      {/* Search Input */}
      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ marginBottom: '16px', color: 'var(--text-strong)' }}>Search Input</h2>
        <ExampleSearchInput
          placeholder="İş ara..."
          onSearch={(query) => console.log('Search:', query)}
        />
      </section>

      {/* Badges */}
      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ marginBottom: '16px', color: 'var(--text-strong)' }}>Badges</h2>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <ExampleBadge variant="turquoise">Aktif</ExampleBadge>
          <ExampleBadge variant="pink">Yeni</ExampleBadge>
          <ExampleBadge variant="lavender">Bekliyor</ExampleBadge>
          <ExampleBadge variant="lemon">Uyarı</ExampleBadge>
          <ExampleBadge variant="outline">Outline</ExampleBadge>
        </div>
      </section>

      {/* Buttons */}
      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ marginBottom: '16px', color: 'var(--text-strong)' }}>Buttons</h2>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <ExampleButton variant="primary">Primary</ExampleButton>
          <ExampleButton variant="secondary">Secondary</ExampleButton>
          <ExampleButton variant="gradient">Gradient</ExampleButton>
          <ExampleButton variant="outline">Outline</ExampleButton>
        </div>
      </section>

      {/* Application Card */}
      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ marginBottom: '16px', color: 'var(--text-strong)' }}>Application Card</h2>
        <ExampleApplicationCard
          name="Ahmet Yılmaz"
          role="Garson"
          badge="Görüntüle →"
          onClick={() => console.log('Application clicked')}
        />
      </section>
    </div>
  );
}

// ========================================
// HOW TO USE IN YOUR APP
// ========================================

/*
// 1. Import the component styles
import './ExampleComponents.css'; // or ensure components.css is imported globally

// 2. Use the components
function MyPage() {
  return (
    <div>
      <ExampleHeaderCard />
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        <ExampleMetricCard
          icon={<Users />}
          value="24"
          label="Personel"
          variant="turquoise"
        />
      </div>

      <ExampleCTACard
        title="Başlık"
        description="Açıklama"
        buttonText="Buton"
        onButtonClick={() => {}}
      />
    </div>
  );
}
*/
