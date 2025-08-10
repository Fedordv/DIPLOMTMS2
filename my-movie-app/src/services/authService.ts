interface UserData {
  email: string;
  password: string;
  name?: string;
}

export const authService = {
  login: async (userData: UserData): Promise<{ user: { email: string; name: string } }> => {
    
    return {
      user: {
        email: userData.email,
        name: userData.email.split('@')[0],
      }
    };
  },

  register: async (userData: UserData): Promise<{ user: { email: string; name: string } }> => {
    return {
      user: {
        email: userData.email,
        name: userData.name || userData.email.split('@')[0],
      }
    };
  },

  logout: async (): Promise<void> => {
  }
};