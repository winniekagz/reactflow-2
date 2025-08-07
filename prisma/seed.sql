-- Create a test user (password: test123)
INSERT INTO "User" (id, email, password, name, "createdAt", "updatedAt") 
VALUES (
  'test-user-id',
  'test@example.com',
  '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/HS.sm6e',
  'Test User',
  NOW(),
  NOW()
) ON CONFLICT (id) DO NOTHING; 