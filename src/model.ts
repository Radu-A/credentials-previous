export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface ConnectedUser {
  credential: string;
  email: string;
  name: string;
}

export interface ErrorResponse {
  error: string;
}
