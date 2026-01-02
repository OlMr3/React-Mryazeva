import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

// Расширяем Vitest expect matchers из Jest DOM
expect.extend(matchers)

// Очищаем DOM после каждого теста
afterEach(() => {
  cleanup()
})