// src/db/db.ts
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { eq } from 'drizzle-orm'
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { drizzle as drizzleLibSQL } from 'drizzle-orm/libsql'
import { createClient as createLibSQLClient } from '@libsql/client/http'
// import Database from 'better-sqlite3';
import { todos, Todo, InsertTodo } from '../db/schema/todos';

let sqlite: any | null = null;
let db_drizzle: any = null;

export function connect(): void {
  // sqlite = new Database('todos.db');
  // db_drizzle = drizzle(sqlite);
  db_drizzle = drizzleLibSQL(createLibSQLClient({
    url: "http://localhost:8080"
  }))
  migrate(db_drizzle, { migrationsFolder: "dkit-migrations-folder" });
  console.log('Connected to the SQLite database!');
}

export function disconnect(): void {
  if (sqlite) {
    sqlite.close();
    sqlite = null;
    db_drizzle = null;
  }
}

export function getAllTodos(): Todo[] {
  return db_drizzle.select().from(todos).all();
}

export function createTodo(todo: InsertTodo) {
  return db_drizzle.insert(todos)
    .values(todo)
    .run()
}

export function getTodoById(id: number): Todo | null {
  return db_drizzle.select().from(todos).where(eq(todos.id, id)).get();
}

export function deleteTodo(id: number) {
  return db_drizzle.delete(todos).where(eq(todos.id, id)).run();
}

export function updateTodo(todo: Todo) {
  return db_drizzle.update(todos).set(todo).where(eq(todos.id, todo.id)).run();
}