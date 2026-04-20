import { z } from "zod";

export type ResourceType = 'user' | 'business' | 'pro' | 'inquiry';

export interface ResourceField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'select' | 'textarea' | 'switch';
  options?: { label: string; value: string }[];
  validation: z.ZodTypeAny;
  placeholder?: string;
}

export interface ResourceConfig {
  type: ResourceType;
  title: string;
  endpoint: string;
  queryKey: string;
  fields: ResourceField[];
}

export const ADMIN_RESOURCES: Record<ResourceType, ResourceConfig> = {
  user: {
    type: 'user',
    title: 'Identity Profile',
    endpoint: '/admin/users',
    queryKey: 'admin-users',
    fields: [
      { name: 'name', label: 'Full Name', type: 'text', validation: z.string().min(2), placeholder: 'Enter legal name' },
      { name: 'email', label: 'Email Address', type: 'email', validation: z.string().email(), placeholder: 'account@kasaragodhub.com' },
      { 
        name: 'role', 
        label: 'Security Clearance', 
        type: 'select', 
        validation: z.string(),
        options: [
          { label: 'Admin', value: 'admin' },
          { label: 'Business', value: 'business' },
          { label: 'Pro', value: 'pro' },
          { label: 'User', value: 'user' },
        ]
      },
      { name: 'phone', label: 'Phone Line', type: 'text', validation: z.string().optional(), placeholder: '+91 ...' },
    ]
  },
  business: {
    type: 'business',
    title: 'Enterprise Registry',
    endpoint: '/businesses',
    queryKey: 'admin-listings',
    fields: [
      { name: 'name', label: 'Entity Name', type: 'text', validation: z.string().min(2) },
      { name: 'slug', label: 'Node Slug', type: 'text', validation: z.string().min(2) },
      { 
        name: 'status', 
        label: 'Verification Status', 
        type: 'select', 
        validation: z.string(),
        options: [
          { label: 'Approved', value: 'approved' },
          { label: 'Pending', value: 'pending' },
          { label: 'Suspended', value: 'suspended' },
        ]
      },
      { name: 'address', label: 'Physical Address', type: 'textarea', validation: z.string().optional() },
    ]
  },
  pro: {
    type: 'pro',
    title: 'Expertise Node',
    endpoint: '/professionals',
    queryKey: 'admin-listings',
    fields: [
      { name: 'name', label: 'Professional Name', type: 'text', validation: z.string().min(2) },
      { 
        name: 'status', 
        label: 'Verification Status', 
        type: 'select', 
        validation: z.string(),
        options: [
          { label: 'Approved', value: 'approved' },
          { label: 'Pending', value: 'pending' },
          { label: 'Suspended', value: 'suspended' },
        ]
      },
    ]
  },
  inquiry: {
    type: 'inquiry',
    title: 'Customer Lead',
    endpoint: '/admin/leads',
    queryKey: 'admin-leads',
    fields: [
      { name: 'customer_name', label: 'Inquirer Name', type: 'text', validation: z.string().min(2) },
      { name: 'customer_phone', label: 'Contact Phone', type: 'text', validation: z.string() },
      { name: 'status', label: 'Pipeline Status', type: 'select', validation: z.string(), options: [
        { label: 'New', value: 'new' },
        { label: 'Pending', value: 'pending' },
        { label: 'Resolved', value: 'resolved' },
      ]},
      { name: 'notes', label: 'Requirement Logs', type: 'textarea', validation: z.string().optional() },
    ]
  }
};
