import { describe, it, vi, beforeEach } from 'vitest';
import { setupAuthListener } from '../authListener'; 
import { onAuthStateChanged } from 'firebase/auth';

vi.mock('firebase/auth', () => {
  return {
    getAuth: vi.fn(() => ({})),
    onAuthStateChanged: vi.fn(),
  };
});

import { setUser, setInitialized, clearUser, fetchUserCart } from '../authSlice';

vi.mock('../authSlice', () => {
  return {
    setUser: vi.fn(),
    setInitialized: vi.fn(),
    clearUser: vi.fn(),
    fetchUserCart: vi.fn(),
  };
});

describe('setupAuthListener', () => {
  let dispatch;

  beforeEach(() => {
    dispatch = vi.fn();
    vi.clearAllMocks();
    onAuthStateChanged.mockImplementation((auth, callback) => {
      return {
        trigger: (user) => callback(user),
      };
    });
  });

  it('вызывает правильные диспатчи при входе пользователя', () => {
    setupAuthListener(dispatch);
    const mockCall = onAuthStateChanged.mock.results.slice(-1)[0];
    const { trigger } = mockCall.value; 
    const user = {
      uid: '123',
      email: 'test@example.com',
      displayName: 'Test User',
    };
    trigger(user);
    expect(dispatch).toHaveBeenCalledWith(
      setUser({
        uid: '123',
        email: 'test@example.com',
        displayName: 'Test User',
      })
    );
    expect(dispatch).toHaveBeenCalledWith(fetchUserCart('123'));
    expect(dispatch).toHaveBeenCalledWith(setInitialized(true));
  });

  it('вызывает clearUser при выходе пользователя', () => {
    setupAuthListener(dispatch);
    const mockCall = onAuthStateChanged.mock.results.slice(-1)[0];
    const { trigger } = mockCall.value;
    trigger(null);
    expect(dispatch).toHaveBeenCalledWith(clearUser());
    expect(dispatch).toHaveBeenCalledWith(setInitialized(true));
  });
});