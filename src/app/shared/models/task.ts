/**
 * Tarea
 */
export interface TaskEntity {
    id: string,
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
    skills: string[],
}


