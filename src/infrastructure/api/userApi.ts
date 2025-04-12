import { User, CreateUserDTO, UpdateUserDTO } from '../../domain/models/User';

// API 통신 레이어
export const userApi = {
  async getUsers(): Promise<User[]> {
    try {
      const response = await fetch('/api/users');
      return response.json();
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },

  async getUserById(id: string): Promise<User> {
    try {
      const response = await fetch(`/api/users/${id}`);
      return response.json();
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },

  async createUser(data: CreateUserDTO): Promise<User> {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return response.json();
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },

  async updateUser(id: string, data: UpdateUserDTO): Promise<User> {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return response.json();
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },

  async deleteUser(id: string): Promise<void> {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
};
