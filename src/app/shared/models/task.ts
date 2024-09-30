/**
 * Credenciales del Login
 */
export interface LoginRequest {
    user: string,
    password: string;
}

/**
 * Tarea
 */
export interface TaskEntity {
    id: number,
    taskName: string,
    endDate: Date,
    state: string,
    associatedPerson: PersonEntity[]
}

/**
 * Persona
 */
export interface PersonEntity {
    id: number,
    personName: string,
    age: string,
    skills: Skill[],
}

/**
 * Habilidad
 */
export interface Skill {
    skillName: string
}


