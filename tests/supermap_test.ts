import {
    equal,
    assertEquals,
    assertStrictEquals,
    assertArrayIncludes
} from 'https://deno.land/std@0.91.0/testing/asserts.ts'

import { Supermap } from '../mod.ts'

Deno.test('supermap: basic map operations', () => {
    const map = new Supermap()
    map.set('a', 1)
    map.set('b', 1)
    assertEquals(map.size, 2)
    assertEquals(map.has('a'), true)
    assertStrictEquals(map.get('a'), 1)
    map.delete('a')
    assertEquals(map.size, 1)
    assertEquals(map.has('a'), false)
    assertStrictEquals(map.get('a'), undefined)
    map.clear()
    assertEquals(map.size, 0)
})

Deno.test('supermap: convert to array/keyArray', () => {
    const map = new Supermap()
    map.set('a', 1)
    map.set('b', 2)
    const array1 = map.array()
    const keyArray1 = map.keyArray()
    equal(array1, [1, 2])
    equal(keyArray1, ['a', 'b'])
    assertEquals(array1 === map.array(), true)
    assertEquals(keyArray1 === map.keyArray(), true)
    map.set('c', 3)
    const array2 = map.array()
    const keyArray2 = map.keyArray()
    equal(array2, [1, 2, 3])
    equal(keyArray2, ['a', 'b', 'c'])
    assertEquals(array2 === map.array(), true)
    assertEquals(keyArray2 === map.keyArray(), true)
})

Deno.test('supermap: get first/last keys', () => {
    const map = new Supermap()
    map.set('a', 1)
    map.set('b', 2)
    map.set('c', 3)
    assertEquals(map.first(), 1)
    assertEquals(map.first(-1), 3)
    equal(map.first(3), [1, 2, 3])
    equal(map.first(-3), [1, 2, 3])
    assertEquals(map.last(), 3)
    assertEquals(map.last(-1), 1)
    equal(map.last(3), [1, 2, 3])
    equal(map.last(-3), [1, 2, 3])
})

Deno.test('supermap: get first/last values', () => {
    const map = new Supermap()
    map.set('a', 1)
    map.set('b', 2)
    map.set('c', 3)
    assertEquals(map.firstKey(), 'a')
    assertEquals(map.firstKey(-1), 'c')
    equal(map.firstKey(3), ['a', 'b', 'c'])
    equal(map.firstKey(-3), ['a', 'b', 'c'])
    assertEquals(map.lastKey(), 'c')
    assertEquals(map.lastKey(-1), 'a')
    equal(map.lastKey(3), ['a', 'b', 'c'])
    equal(map.lastKey(-3), ['a', 'b', 'c'])
})

Deno.test('supermap: get random keys/values', () => {
    const map = new Supermap()
    const chars = 'abcdefghij'
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    for (let i = 0; i < chars.length; i++) map.set(chars[i], numbers[i])
    assertArrayIncludes(numbers, [map.random()])
    assertArrayIncludes(numbers, map.random(5))
    assertArrayIncludes(chars, map.randomKey(5))
    assertArrayIncludes(chars, [map.randomKey()])
    map.clear()
    assertStrictEquals(map.random(), undefined)
    assertStrictEquals(map.randomKey(), undefined)
    equal(map.random(5), [])
    equal(map.randomKey(5), [])
})
