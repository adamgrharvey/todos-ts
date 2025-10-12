// filepath: /Users/adamharvey/Documents/Code/Personal Dev/todos-ts/src/utils/trpc.ts
import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '../../server/trpc';

export const trpc = createTRPCReact<AppRouter>();