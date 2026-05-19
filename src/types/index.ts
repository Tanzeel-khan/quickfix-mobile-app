export type Language = 'en' | 'ur' | 'roman-ur';
// API uses roman_ur — map with toApiLang() helper in api.ts
export type ApiLanguage = 'en' | 'ur' | 'roman_ur' | 'auto';

export type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'en_route'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'auto_rescheduled'
  | 'disputed';

export type UrgencyLevel = 'normal' | 'urgent' | 'emergency';

// ── User ──────────────────────────────────────────────
// API uses { name, role: 'customer'|'provider' }
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'provider';
}

// ── Auth payloads ─────────────────────────────────────
export interface RegisterPayload {
  email: string;
  password: string;
  name: string;
  role: 'customer' | 'provider';
}

// ── Service Request (POST /requests response) ─────────
export interface IntentWhen {
  label: string;
  start?: string;
}

export interface IntentBudget {
  max: number;
  currency: string;
  priceSensitive?: boolean;
}

export interface IntentData {
  service: string;
  severity?: string;
  location: string;
  when: IntentWhen;
  budget: IntentBudget;
  urgency: string;
  confidence: number;
  fieldsExtracted: number;
  parsedFrom?: string;
}

export interface ClarificationQuestion {
  key: string;
  label: string;
  options?: string[];
  type: 'choice' | 'text';
  placeholder?: string;
}

export interface ClarificationData {
  summary: string;
  questions: ClarificationQuestion[];
  confidence: number;
  ambiguities: number;
  agentTrace?: string;
}

export interface Candidate {
  id: string;
  name: string;
  score: number;
  rating: number;
  reviews: number;
  distanceKm: number;
  etaMin: number;
  priceEstimate: number;
  specialization?: string;
  yearsExp?: number;
  badge?: string;
}

export interface ServiceRequest {
  id: string;
  status: 'clarifying' | 'ready' | 'pending';
  language?: string;
  intent: IntentData | null;
  clarification: ClarificationData | null;
  candidates: Candidate[] | null;
}

// ── Booking ───────────────────────────────────────────
export interface CreateBookingPayload {
  requestId: string;
  providerId: string;
  scheduledAt?: string;
}

export interface Booking {
  id: string;
  status: BookingStatus;
  provider: {
    id: string;
    name: string;
    rating: number;
    reviews: number;
  };
  scheduledAt: string;
  address?: string;
  service?: string;
  totalPrice: number;
  whatsappPayload?: {
    message: string;
    to: string;
  };
}

// ── Notifications ─────────────────────────────────────
export interface Notification {
  id: string;
  type: string;
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}

// ── Legacy stubs (keep for existing screens that haven't been updated) ──
export interface Provider {
  id: string;
  business_name: string;
  rating: number;
  distance_km: number;
  eta_minutes: number;
  visit_fee: number;
  area: string;
  lat: number;
  lng: number;
  specialization: string[];
  is_available: boolean;
}

export interface FeedbackPayload {
  booking_id: string;
  provider_id: string;
  rating: number;
  comment?: string;
  tags?: string[];
}

export interface DisputePayload {
  booking_id: string;
  reason_category: string;
  description: string;
  photo_url?: string;
}
