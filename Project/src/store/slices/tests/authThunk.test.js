import { describe, it, expect, vi } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import {
  registerUser,
  loginUser,
  logoutUser,
} from '../authThunks';

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';

vi.mock('firebase/auth', () => {
  return {
    getAuth: vi.fn(() => ({})),
    createUserWithEmailAndPassword: vi.fn(),
    signInWithEmailAndPassword: vi.fn(),
    signOut: vi.fn(),
    updateProfile: vi.fn(),
  };
});

const mockUser = {
  uid: '123456',
  email: 'test@example.com',
  displayName: 'Test User',
};
const store = configureStore({ reducer: () => ({}) });
beforeEach(() => {
  vi.clearAllMocks(); // очищает счётчики вызовов и возвращаемые значения
});
// Тесты для registerUser
describe('registerUser', () => {
   it('успешная регистрация с displayName', async () => {
    createUserWithEmailAndPassword.mockResolvedValue({ user: mockUser });
    updateProfile.mockResolvedValue();
    const args = { email: 'test@example.com', password: 'pass123', displayName: 'Test User' };
    const result = await store.dispatch(registerUser(args));
    expect(result.type).toBe('auth/register/fulfilled');
    expect(result.payload).toEqual({
      uid: mockUser.uid,
      email: mockUser.email,
      displayName: mockUser.displayName,
    });
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(expect.anything(), args.email, args.password);
    expect(updateProfile).toHaveBeenCalledWith(expect.anything(), { displayName: args.displayName });
  });

   it('успешная регистрация без displayName', async () => {
    createUserWithEmailAndPassword.mockResolvedValue({ user: mockUser });
    updateProfile.mockResolvedValue();

    const args = { email: 'test@example.com', password: 'pass123', displayName: undefined };
    const result = await store.dispatch(registerUser(args));

    expect(result.type).toBe('auth/register/fulfilled');
    expect(result.payload).toEqual({
      uid: mockUser.uid,
      email: mockUser.email,
      displayName: mockUser.displayName,
    });

    expect(updateProfile).not.toHaveBeenCalled();
  });

  it('ошибка регистрации', async () => {
    const errorMsg = 'Registration failed';
    createUserWithEmailAndPassword.mockRejectedValue(new Error(errorMsg));

    const args = { email: 'test', password: 'pass', displayName: 'name' };
    const result = await store.dispatch(registerUser(args));

    expect(result.type).toBe('auth/register/rejected');
    expect(result.payload).toBe(errorMsg);
  });
});

// Тесты для loginUser
describe('loginUser', () => {
   it('успешный вход', async () => {
    signInWithEmailAndPassword.mockResolvedValue({ user: mockUser });

    const args = { email: 'test@example.com', password: 'pass123' };
    const result = await store.dispatch(loginUser(args));

    expect(result.type).toBe('auth/login/fulfilled');
    expect(result.payload).toEqual({
      uid: mockUser.uid,
      email: mockUser.email,
      displayName: mockUser.displayName,
    });
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(expect.anything(), 'test@example.com', 'pass123');
  });


  it('ошибка входа', async () => {
    const errorMsg = 'Login failed';
    signInWithEmailAndPassword.mockRejectedValue(new Error(errorMsg));

    const args = { email: 'test', password: 'pass' };
    const result = await store.dispatch(loginUser(args));

    expect(result.type).toBe('auth/login/rejected');
    expect(result.payload).toBe(errorMsg);
  });
});

// Тесты для logoutUser
describe('logoutUser', () => {
  it('успешный выход', async () => {
    signOut.mockResolvedValue();

    const result = await store.dispatch(logoutUser());
    expect(result.type).toBe('auth/logout/fulfilled');
    expect(result.payload).toBeUndefined();
  });

  it('ошибка выхода', async () => {
    const errorMsg = 'Logout failed';
    signOut.mockRejectedValue(new Error(errorMsg));

    const result = await store.dispatch(logoutUser());
    expect(result.type).toBe('auth/logout/rejected');
    expect(result.payload).toBe(errorMsg);
  });
});