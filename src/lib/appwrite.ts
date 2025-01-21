import { Client, Account } from 'appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('67699acf002ecc80c89f');

export const account = new Account(client);

export const login = async (email: string, password: string) => {
  try {
    const session = await account.createEmailSession(email, password);
    return { success: true, data: session };
  } catch (error: any) {
    let errorMessage = 'Failed to login. Please check your credentials.';
    if (error.code) {
      if (error.code === 400) {
        errorMessage = 'Invalid email or password.';
      } else if (error.code === 401) {
        errorMessage = 'Unauthorized. Please check your credentials.';
      }
    }
    return { success: false, error: errorMessage };
  }
};

export const signup = async (email: string, password: string, name: string) => {
  try {
    // Create user with a unique ID
    const user = await account.create(
      'unique()', // Automatically generates a unique ID for the user
      email, 
      password, 
      name
    );
    // Log the user in after signup
    const loginResult = await login(email, password);  // Assuming login function works fine
    if (!loginResult.success) {
      throw new Error('Failed to log in after signup');
    }
    return { success: true, data: user };
  } catch (error: any) {
    let message = 'Failed to create account.';
    if (error.code) {
      if (error.code === 409) {
        message = 'Email already exists. Please use a different email.';
      } else if (error.code === 400) {
        message = 'Invalid input data. Please check your details.';
      }
    }
    return { success: false, error: message };
  }
};

export const logout = async () => {
  try {
    await account.deleteSession('current');
    return { success: true };
  } catch (error: any) {
    return { 
      success: false, 
      error: error.message || 'Failed to logout.'
    };
  }
};

export const getCurrentUser = async () => {
  try {
    const user = await account.get();  // This fetches the user based on the current session
    return { success: true, data: user };
  } catch (error: any) {
    // Check if the error is a 401 Unauthorized error
    if (error.code === 401) {
      return { success: false, error: 'User is not authenticated. Please log in.' };
    }
    return { success: false, error: error.message || 'Failed to get user data.' };
  }
};

export const resetPassword = async (email: string) => {
  try {
    // Make sure to replace this URL with a production URL in the future
    await account.createRecovery(email, 'http://localhost:5173/reset-password');
    return { success: true };
  } catch (error: any) {
    return { 
      success: false, 
      error: error.message || 'Failed to send reset email.'
    };
  }
};

export const resetPasswordConfirm = async (password: string, passwordAgain: string, secret: string) => {
  try {
    // Call updateRecovery with user details
    const result = await account.updateRecovery(
      'unique()', // Provide the user's unique ID (you may retrieve this from the current session)
      secret,     // The recovery token from the URL
      password,   // New password
      passwordAgain // Password confirmation
    );
    return { success: true, data: result };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to reset password.' };
  }
};