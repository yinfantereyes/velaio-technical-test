/**
 * Credenciales del Login
 */
export interface LoginRequest {
    user: string,
    password: string;
}

/**
 * Respuesta del login
 */
export interface LoginResponse {
    accessToken: Token,
    refreshToken: Token,
    user: UserEntity
}

/**
 * Usuario
 */
export interface UserEntity {
    id: number,
    createdAt: Date,
    updatedAt: Date,
    createdBy: string,
    updatedBy: string,
    deleted: boolean,
    firstName: string,
    firstLastName: string,
    secondLastName: string,
    username: string,
    email: string,
    enabled: boolean,
    roles: Role[]
}

/**
 * Token
 */
export interface Token {
    headerType: string,
    expiresIn: number,
    tokenValue: string
}

/**
 * Rol
 */
export interface Role {
    id: number,
    description: string
}


