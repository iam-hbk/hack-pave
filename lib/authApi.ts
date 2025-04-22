export type UserRole = 'STUDENT' | 'INSTRUCTOR' | 'ADMIN';

export interface User {
  pk: number;
  email: string;
  first_name: string;
  last_name: string;
  role: UserRole;
  points: number;
  avatar?: string;
}

export interface LoginResponse {
  key: string;
  user: User;
}

export interface RegisterData {
  username: string;
  email: string;
  password1: string;
  password2: string;
}

const API_BASE_URL = 'https://pave-django-3zd6n.kinsta.app/api';

async function handleResponse(response: Response) {
  const data = await response.json();
  if (!response.ok) {
    // Handle different types of error responses
    if (data.detail) {
      throw new Error(data.detail);
    } else if (data.non_field_errors) {
      throw new Error(data.non_field_errors[0]);
    } else if (data.email) {
      throw new Error(`Email error: ${data.email[0]}`);
    } else if (data.username) {
      throw new Error(`Username error: ${data.username[0]}`);
    } else if (data.password1) {
      throw new Error(`Password error: ${data.password1[0]}`);
    } else {
      // Log the error response for debugging
      console.error('Registration error response:', data);
      throw new Error('An error occurred during registration. Please try again.');
    }
  }
  return data;
}

export async function getUserInfo(token: string): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/auth/user/`, {
    headers: {
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  const userData = await handleResponse(response);
  
  return {
    pk: userData.pk,
    email: userData.email,
    first_name: userData.first_name,
    last_name: userData.last_name,
    role: userData.role as UserRole,
    points: userData.points,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.email}`,
  };
}

export async function login(
  email: string,
  password: string,
  role: UserRole
): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
    credentials: 'include',
  });

  const data = await handleResponse(response);
  const user = await getUserInfo(data.key);
  
  return {
    key: data.key,
    user,
  };
}

export async function register(data: RegisterData): Promise<LoginResponse> {
  console.log('Making registration request with data:', {
    ...data,
    password1: '[REDACTED]',
    password2: '[REDACTED]'
  });
  
  const response = await fetch(`${API_BASE_URL}/auth/registration/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    credentials: 'include',
  });

  const responseData = await handleResponse(response);
  console.log('Registration response:', responseData);
  
  const user = await getUserInfo(responseData.key);

  return {
    key: responseData.key,
    user,
  };
}

export async function logout(): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/auth/logout/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  await handleResponse(response);
}

export async function verifyEmail(key: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/auth/registration/verify-email/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ key }),
    credentials: 'include',
  });

  await handleResponse(response);
}

export async function resendVerificationEmail(email: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/auth/registration/resend-email/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
    credentials: 'include',
  });

  await handleResponse(response);
} 