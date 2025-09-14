export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
  isActive: boolean;
  lastLogin?: Date;
  permissions: Permission[];
}

export enum UserRole {
  ADMIN = 'admin',
  DOCTOR = 'doctor',
  RECEPTIONIST = 'receptionist',
  PATIENT = 'patient'
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  resource: string;
  action: string;
}

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  route: string;
  permissions: string[];
  children?: MenuItem[];
  isVisible: boolean;
}
