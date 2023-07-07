import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { InferModel } from 'drizzle-orm';

export const todos = sqliteTable('todos', {
    id: integer('id').primaryKey(),  // 'id' is the column name
    title: text('title'),
    description: text('description'),
    completed: integer('completed', { mode: 'boolean' }),
})

export type Todo = InferModel<typeof todos> // return type when queried
export type InsertTodo = InferModel<typeof todos, 'insert'> // insert type