export interface AuthUser {
  id: string;
  name: string;
  role: 'admin' | 'doctor' | 'staff' | 'user';
  email: string;
  data?: any; // Extra data like doctorId, branchId, etc.
}
