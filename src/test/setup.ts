import '@testing-library/jest-dom/vitest'
import { afterEach, beforeEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// Algunas versiones de Node exponen un localStorage global incompleto que
// tapa al de jsdom; se usa un almacenamiento en memoria equivalente.
class MemoryStorage implements Storage {
  private items = new Map<string, string>()

  get length(): number {
    return this.items.size
  }

  clear(): void {
    this.items.clear()
  }

  getItem(key: string): string | null {
    return this.items.get(key) ?? null
  }

  key(index: number): string | null {
    return Array.from(this.items.keys())[index] ?? null
  }

  removeItem(key: string): void {
    this.items.delete(key)
  }

  setItem(key: string, value: string): void {
    this.items.set(key, String(value))
  }
}

const storage = new MemoryStorage()
Object.defineProperty(window, 'localStorage', { value: storage, configurable: true })
Object.defineProperty(globalThis, 'localStorage', { value: storage, configurable: true })

beforeEach(() => {
  window.localStorage.clear()
})

afterEach(() => {
  cleanup()
})
