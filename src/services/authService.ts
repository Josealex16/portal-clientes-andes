// DATOS DE DEMOSTRACION: este servicio de autenticacion es ficticio.
// Guarda usuarios y sesion en localStorage del navegador; no hay servidor,
// no se cifra nada y no debe usarse con credenciales reales.

export interface User {
  id: string
  name: string
  email: string
  company: string
}

interface StoredUser extends User {
  password: string
}

export interface RegisterInput {
  name: string
  email: string
  password: string
}

const USERS_KEY = 'andes.demo.users'
const SESSION_KEY = 'andes.demo.session'

const SEED_USERS: StoredUser[] = [
  {
    id: 'u-1001',
    name: 'Camila Rojas',
    email: 'demo@andes.example',
    password: 'Demo1234',
    company: 'Distribuidora Cordillera S.A.',
  },
]

export class AuthError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AuthError'
  }
}

function readUsers(): StoredUser[] {
  const raw = window.localStorage.getItem(USERS_KEY)
  if (!raw) {
    window.localStorage.setItem(USERS_KEY, JSON.stringify(SEED_USERS))
    return [...SEED_USERS]
  }
  return JSON.parse(raw) as StoredUser[]
}

function writeUsers(users: StoredUser[]): void {
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function toPublicUser(user: StoredUser): User {
  return { id: user.id, name: user.name, email: user.email, company: user.company }
}

export function login(email: string, password: string): User {
  const normalized = email.trim().toLowerCase()
  const user = readUsers().find((u) => u.email.toLowerCase() === normalized)
  if (!user || user.password !== password) {
    throw new AuthError('Correo o contraseña incorrectos.')
  }
  const publicUser = toPublicUser(user)
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(publicUser))
  return publicUser
}

export function register(input: RegisterInput): User {
  const users = readUsers()
  const normalized = input.email.trim().toLowerCase()
  if (users.some((u) => u.email.toLowerCase() === normalized)) {
    throw new AuthError('Ya existe una cuenta con ese correo.')
  }
  const created: StoredUser = {
    id: `u-${Date.now()}`,
    name: input.name.trim(),
    email: normalized,
    password: input.password,
    company: 'Sin empresa asignada',
  }
  writeUsers([...users, created])
  return toPublicUser(created)
}

export function logout(): void {
  window.localStorage.removeItem(SESSION_KEY)
}

export function getSession(): User | null {
  const raw = window.localStorage.getItem(SESSION_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as User
  } catch {
    return null
  }
}
