## Step Instructions - Frontend

We use bun and typescript on frontend.
The web framework is NextJS.

Bun installation - please use bun version `1.1.45`
```shell
# on macOS / linux
curl -fsSL https://bun.sh/install | bash

curl -fsSL https://bun.sh/install | bash -s "bun-v1.1.45"
```

**If you have any other OS, please refer to - https://bun.sh/docs/installation **

Create `.env` file at the root of directory
```env
# make sure you point to backend API server
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Install packages. Run following command to install it.
```shell
# this will create a node module folder
bun install
```

Run the frontend app.
```shell
bun run dev
```

This will start the frontend client at - http://localhost:3000
You can go to browser and interact with the agent at - http://localhost:3000