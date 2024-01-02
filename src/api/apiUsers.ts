import axios from 'axios';
import { User } from '../types/User';

const BASE_URL = 'https://reqres.in/api/users';

// Create a new user
export async function createUser(user: User) {
  try {
    const response = await axios.post(BASE_URL, user);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

// Read a user by ID
export async function getUser(userId: number) {
  try {
    const response = await axios.get(`${BASE_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting user:', error);
    throw error;
  }
}

// Update a user by ID
export async function updateUser(userId: number, updatedUser: User) {
  try {
    const response = await axios.put(`${BASE_URL}/${userId}`, updatedUser);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

// Delete a user by ID
export async function deleteUser(userId: number) {
  try {
    const response = await axios.delete(`${BASE_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}

// Get all users
export async function getUsers() {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error getting users:', error);
    throw error;
  }
}
