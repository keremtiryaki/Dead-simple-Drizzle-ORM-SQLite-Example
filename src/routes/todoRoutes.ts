import express, { Request, Response } from 'express';
import { Todo, InsertTodo } from '../db/schema/todos';
import {
  getAllTodos,
  createTodo,
  getTodoById,
  deleteTodo,
  updateTodo,
} from '../db/db';

const router = express.Router();

router.get('/todos', async (req: Request, res: Response) => {
  try {
    const result: Todo[] = getAllTodos();
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/todos', async (req: Request, res: Response) => {
  const { title, description, completed } = req.body;

  if (!title || !description || completed === undefined) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }
  var todo = req.body as InsertTodo;
  try {
    const result = createTodo(todo);
    if (result && result.lastInsertRowid) { 
      res.status(201).json(result.lastInsertRowid);
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.get('/todos/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  try {
    const todo = getTodoById(id);
    if (todo) {
      res.json(todo);
    } else {
      res.status(404).json({ error: 'Todo not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/todos/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  try {
    const result = deleteTodo(id);
    if (result && result.changes === 1) {
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: 'Todo not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/todos/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const { title, description, completed } = req.body;

  if (!title || !description || completed === undefined) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  var todo = req.body as Todo;
  todo.id = id;

  try {
    const result = updateTodo(todo);
    if (result && result.changes === 1) {
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: 'Todo not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
