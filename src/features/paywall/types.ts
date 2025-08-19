export enum Plan {
  FREE = 'free',
  PREMIUM = 'premium',
}

export type PlanType = (typeof Plan)[keyof typeof Plan];

export interface Features {
  ai: {
    summary: boolean;
    themes: boolean;
    tips: boolean;
  };
}

export interface PlanDefinition {
  id: Plan;
  name: string;
  price: string;
  featuresText: string[];
  featureFlags: Features;
  badge?: string;
}

/**
 * Plans and Features

 Free:  
    - 'summary', true, 
    - 'mood', true, 
 Premium:
    - 'summary', true,
    - 'mood', true,
    - 'themes', true,
    - 'tips', true,
    - 'export_pdf', true,
    - 'priority_support', true
 */
