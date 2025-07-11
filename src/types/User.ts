export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

export interface Company {
  name: string;
}

export interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  phone: string;
  website: string;
  address: Address;
  company: Company;
}

export interface UserFormData {
  name: string;
  email: string;
  phone: string;
  website: string;
  address: Address;
  company: Company;
}

export interface UserContextType {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  likedUsers: Set<number>;
  toggleLike: (userId: number) => void;
  deleteUser: (userId: number) => void;
  updateUser: (userId: number, updatedUser: Partial<UserFormData>) => void;
}

export interface UserProviderProps {
  children: React.ReactNode;
}

export interface EditModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedData: UserFormData) => void;
}

export interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName: string;
}

export interface UserCardProps {
  user: User;
}
