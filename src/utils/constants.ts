export const API_BASE_URL = "https://jsonplaceholder.typicode.com";
export const USERS_ENDPOINT = `${API_BASE_URL}/users`;

export const AVATAR_BASE_URL = "https://api.dicebear.com/9.x/avataaars/svg";

export const FALLBACK_AVATAR = "/fallback-avatar.svg";

export const getAvatarUrl = (username: string): string => {
  return `${AVATAR_BASE_URL}?seed=${username}`;
};
