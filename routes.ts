/**
 * An array of routes that is Public
 * These routes do not require  authentication 
 * @type {string[]}}
 */
export const publicRoutes = [
    "/"
]

/**
 * An array of routes that can be used to authenticate the user
 * These routes is used authenticate the user
 * @type {string[]}}
 */
export const authRoutes = [
    "/auth/signup",
    "/auth/signin",
]

/**
 * The prefix for API authentication routes
 * Rouets that start with These prefix will be used as API authentication purposes
 * @type {string}}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * Default redirect path after login
 * @type {string}}
 */
export const DEFAULT_LOGIN_REDIRECT_URL = "/dashboard"