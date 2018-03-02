export class Employer {
  id: number;
  name: string;
  first_name: string;
  last_name: string;
  avatar: string;
  email: string;
  phone: string;
  company_name: string;
  username: string;
  password: string;
  user: UserRegister;
}

export class UserRegister {
  username: string;
  password: string;
}
