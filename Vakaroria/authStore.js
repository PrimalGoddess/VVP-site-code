// src/stores/authStore.js
import { writable } from 'svelte/store';

// Initialize the store with default state
export const user = writable(null); // 'null' means not logged in
export const isAuthenticated = writable(false);

// Function to call upon successful login
export function login(userData) {
    user.set(userData);
    isAuthenticated.set(true);
}

// Function to call upon logout
export function logout() {
    user.set(null);
    isAuthenticated.set(false);
}