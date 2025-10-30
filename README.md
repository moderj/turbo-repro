# Reproduction Steps

- Clone the repository:

over https:
```bash
git clone https://github.com/moderj/turbo-repro.git
```

over ssh:
```bash
git clone git@github.com:moderj/turbo-repro.git
```

- Run `pnpm install` to install dependencies.

- Run `pnpx turbo prune typescript-app --docker` to create a pruned monorepo for the `typescript-app` project.

- Run `cd out/json` to navigate to the output directory.

- Run `pnpm install --frozen-lockfile` to install dependencies in the pruned monorepo.

You should see that it fails.
