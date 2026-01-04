import { describe, it, expect } from 'vitest';
import authReducer, {
  setUser,
  clearUser,
  clearError,
  setInitialized,
} from '../authSlice';
import { registerUser, loginUser, logoutUser } from '../authThunks';

describe('authSlice', () => {
  const initialState = {
    userData: null,
    isAuth: false,
    isLoading: false,
    error: null,
    isInitialized: false,
  };

  it('должен возвращать правильное начальное состояние', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('должен обрабатывать setUser', () => {
    const payload = { id: '123', name: 'Test User' };
    const newState = authReducer(initialState, setUser(payload));
    expect(newState).toEqual({
      ...initialState,
      userData: payload,
      isAuth: true,
    });
  });

  it('должен обрабатывать clearUser', () => {
    const currentState = {
      ...initialState,
      userData: { id: '123' },
      isAuth: true,
    };
    const newState = authReducer(currentState, clearUser());
    expect(newState).toEqual({
      ...initialState,
      userData: null,
      isAuth: false,
    });
  });

  it('должен обрабатывать clearError', () => {
    const currentState = { ...initialState, error: 'Error' };
    const newState = authReducer(currentState, clearError());
    expect(newState.error).toBeNull();
  });

  it('должен обрабатывать setInitialized', () => {
    const newState = authReducer(initialState, setInitialized());
    expect(newState.isInitialized).toBe(true);
  });

  it('registerUser.pending должен устанавливать isLoading в true и ошибку в null', () => {
    const action = { type: registerUser.pending.type };
    const state = authReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('registerUser.fulfilled должен обновлять состояние после успешной регистрации', () => {
    const payload = { id: '1', name: 'John' };
    const action = { type: registerUser.fulfilled.type, payload };
    const prevState = { ...initialState, isLoading: true };
    const state = authReducer(prevState, action);
    expect(state.isLoading).toBe(false);
    expect(state.isAuth).toBe(true);
    expect(state.userData).toEqual(payload);
  });

  it('registerUser.rejected должен устанавливать ошибку и снимать loading', () => {
    const errorPayload = 'Error message';
    const action = { type: registerUser.rejected.type, payload: errorPayload };
    const prevState = { ...initialState, isLoading: true };
    const state = authReducer(prevState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(errorPayload);
  });

  it('loginUser.pending должен устанавливать isLoading в true', () => {
    const action = { type: loginUser.pending.type };
    const state = authReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('loginUser.fulfilled обновляет состояние', () => {
    const payload = { id: '2', name: 'Jane' };
    const action = { type: loginUser.fulfilled.type, payload };
    const prevState = { ...initialState, isLoading: true };
    const state = authReducer(prevState, action);
    expect(state.isLoading).toBe(false);
    expect(state.isAuth).toBe(true);
    expect(state.userData).toEqual(payload);
  });

  it('loginUser.rejected обновляет ошибку', () => {
    const errorPayload = 'Login error';
    const action = { type: loginUser.rejected.type, payload: errorPayload };
    const prevState = { ...initialState, isLoading: true };
    const state = authReducer(prevState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(errorPayload);
  });

  it('logoutUser.pending должен устанавливать isLoading в true', () => {
    const action = { type: logoutUser.pending.type };
    const state = authReducer(initialState, action);
    expect(state.isLoading).toBe(true);
  });

  it('logoutUser.fulfilled должен сбрасывать userData и isAuth', () => {
    const prevState = {
      ...initialState,
      userData: { id: '123' },
      isAuth: true,
      isLoading: true,
    };
    const action = { type: logoutUser.fulfilled.type };
    const state = authReducer(prevState, action);
    expect(state.isLoading).toBe(false);
    expect(state.userData).toBeNull();
    expect(state.isAuth).toBe(false);
  });

  it('logoutUser.rejected должен устанавливать ошибку', () => {
    const errorPayload = 'Logout error';
    const action = { type: logoutUser.rejected.type, payload: errorPayload };
    const prevState = { ...initialState, isLoading: true };
    const state = authReducer(prevState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(errorPayload);
  });
});