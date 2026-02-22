import { messages, type InsertMessage, type Message } from "@shared/schema";

export interface IStorage {
  createMessage(message: InsertMessage): Promise<Message>;
}

export class DatabaseStorage implements IStorage {
  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const { db } = await import("./db");
    const [message] = await db
      .insert(messages)
      .values(insertMessage)
      .returning();
    return message;
  }
}

export class MemoryStorage implements IStorage {
  private nextId = 1;
  private data: Message[] = [];

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const message: Message = {
      id: this.nextId++,
      ...insertMessage,
    };
    this.data.push(message);
    return message;
  }
}

export const storage: IStorage = process.env.DATABASE_URL
  ? new DatabaseStorage()
  : (() => {
      console.warn(
        "[storage] DATABASE_URL not set; using in-memory storage (messages will not persist).",
      );
      return new MemoryStorage();
    })();
