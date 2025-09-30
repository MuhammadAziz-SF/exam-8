export enum flight_status {
  SCHEDULED = 'scheduled',
  BOARDING = 'boarding',
  DEPARTED = 'departed',
  ARRIVED = 'arrived',
  DELAYED = 'delayed',
  CANCELLED = 'cancelled',
}

export enum ticket_status {
  CONFIRMED = 'confirmed',
  PENDING = 'pending',
  CANCELLED = 'cancelled',
  CHECKED_IN = 'checked_in',
  BOARDED = 'boarded',
}

export enum payment_status {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REFUNDED = 'refunded',
}

export enum user_roles {
  PASSENGER = 'passenger',
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  AGENT = 'agent',
  PILOT = 'pilot',
  CREW = 'crew',
}

export enum loyalty_levels {
  BRONZE = 'bronze',
  SILVER = 'silver',
  GOLD = 'gold',
  PLATINUM = 'platinum',
}
