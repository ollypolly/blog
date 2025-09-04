export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction = process.env.NODE_ENV === 'production';
export const isTest = process.env.NODE_ENV === 'test';
export const showTestPosts = process.env.SHOW_TEST_POSTS === 'true';
export const envMode = process.env.NEXT_PUBLIC_ENV_MODE;