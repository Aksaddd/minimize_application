/**
 * API client for communicating with the Python backend.
 * All endpoints are proxied through Vite dev server in development.
 */

const BASE_URL = "/api";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export const api = {
  // Applications
  getApplications: () => request("/applications"),
  getRunningApps: () => request("/applications/running"),
  updateApplication: (id: number, data: Record<string, unknown>) =>
    request(`/applications/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  // Categories
  getCategories: () => request("/categories"),
  createCategory: (data: Record<string, unknown>) =>
    request("/categories", { method: "POST", body: JSON.stringify(data) }),
  updateCategory: (id: number, data: Record<string, unknown>) =>
    request(`/categories/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  deleteCategory: (id: number) =>
    request(`/categories/${id}`, { method: "DELETE" }),
  assignApps: (categoryId: number, appIds: number[]) =>
    request(`/categories/${categoryId}/apps`, {
      method: "PATCH",
      body: JSON.stringify({ app_ids: appIds }),
    }),

  // Schedules
  getSchedules: () => request("/schedules"),
  createSchedule: (data: Record<string, unknown>) =>
    request("/schedules", { method: "POST", body: JSON.stringify(data) }),
  updateSchedule: (id: number, data: Record<string, unknown>) =>
    request(`/schedules/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  deleteSchedule: (id: number) =>
    request(`/schedules/${id}`, { method: "DELETE" }),
  toggleSchedule: (id: number) =>
    request(`/schedules/${id}/toggle`, { method: "PATCH" }),

  // Screen Time
  getTodayUsage: () => request("/screen-time/today"),
  getUsageRange: (from: string, to: string) =>
    request(`/screen-time/range?from=${from}&to=${to}`),
  getAppUsage: (appId: number) => request(`/screen-time/app/${appId}`),
  getUsageByCategory: () => request("/screen-time/by-category"),
  getTrends: () => request("/screen-time/trends"),
  getLiveSession: () => request("/screen-time/live"),

  // Settings
  getSettings: () => request("/settings"),
  updateSettings: (data: Record<string, unknown>) =>
    request("/settings", { method: "PATCH", body: JSON.stringify(data) }),
};
