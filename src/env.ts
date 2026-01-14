import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
  runtimeEnv: import.meta.env,
  emptyStringAsUndefined: true,

  clientPrefix: 'VITE_',

  client: {
    VITE_API_URL: z.url().nonempty(),
  },
});
