export interface User {
  id?: string
  username: string
  email: string
  createdAt?: string
  updatedAt?: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
}

export interface RegisterRequest {
  username: string
  email: string
  password: string
}

export interface RegisterResponse {
  message: string
  user?: User
}

export interface ForgotPasswordRequest {
  email: string
}

export interface ForgotPasswordResponse {
  message: string
  success: boolean
}

export interface ResetPasswordRequest {
  email: string
  otp: string
  newPassword: string
}

export interface ResetPasswordResponse {
  message: string
  success: boolean
}

export interface SendOtpRequest {
  email: string
}

export interface SendOtpResponse {
  message: string
  success: boolean
}

export interface UsersResponse {
  users: User[]
}

export interface ApiError {
  message: string
  status: number
  code?: string
  error?: string
}
  