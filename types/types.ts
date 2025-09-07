export type User = {
  id: number;
  name: string;
  username: string;
  email?: string;
  phone: string;
  password: string;
};

export type Company = {
  id: number;
  name: string;
  english_name?: string;
  phone?: string;
  email?: string;
  website?: string;
  address?: string;
  ceo?: string;
  members?: {
    name: string;
    type: string;
  }[];
  letterhead?: string;
  logo?: string;
};

export type Document = {
  id: number;
  company_id: number;
  company?: Company;
  type: string;
  issue_date: string;
  expiry_date: string;
  number: string;
  attachments: string[];
  notes?: string;
  document_path?: string;
};

export type Outgoing = {
  id: number;
  company_id?: number;
  issue_number: string;
  issue_date: string;
  qr_code?: string;
  to_contact_id?: number;
  template_id?: number;
  to?: string;
  subject?: string;
  cc?: string;
  body?: string;
  attachments?: string[];
  document_path?: string;
  contact?: {
    id: number;
    name: string;
  };
  company?: Company;
};

export type Incoming = {
  id: number;
  issue_number: string;
  issue_date: string;
  from_contact_id: number;
  from: string;
  follow_up_id: number;
  followUp?: Outgoing;
  attachments: string[];
  document_path?: string;
  contact?: {
    id: number;
    name: string;
  };
};
