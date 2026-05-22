export interface User {
  id: number;
  name: string;
  email: string;
}

// intentional lint issue: unused variable (for demo)
const DB_VERSION = "1.0"

const users: User[] = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob",   email: "bob@example.com" },
];

export function getUsers(): User[] {
  return users
}

export function getUserById(id: number): User | undefined {
  return users.find((u) => u.id === id)
}

export function createUser(name: string, email: string): User {
  // intentional lint issue: any type
  const newUser: any = { id: users.length + 1, name, email }
  users.push(newUser)
  return newUser
}
