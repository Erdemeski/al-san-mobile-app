import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import users from '../temp/users.json'; // JSON dosyasını içe aktar
import { router } from 'expo-router';

interface AuthState {
  token: string | null;
  userInfo: { username: string; name: string; email: string } | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  userInfo: null,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }: { username: string; password: string }, thunkAPI) => {
    try {
      // Kullanıcıyı JSON dosyasındaki verilerle doğrula
      const user = users.find((u) => u.username === username && u.password === password);

      if (!user) {
        return thunkAPI.rejectWithValue('Geçersiz kullanıcı adı veya şifre!');
      }

      const token = `mock-token-${user.username}`; // Gerçek token yerine geçici token oluşturduk

      // AsyncStorage'a kullanıcı bilgilerini kaydet
      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('userInfo', JSON.stringify(user));

      router.replace('/home');
      return { token, user };
    } catch (error) {
      return thunkAPI.rejectWithValue('Giriş yapılamadı.');
    }
  }
);

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  await AsyncStorage.removeItem('userToken');
  await AsyncStorage.removeItem('userInfo');
  router.replace('/login');
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.userInfo = action.payload.user;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.token = null;
        state.userInfo = null;
        state.error = null;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
