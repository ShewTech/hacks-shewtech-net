# Web Injection Control Panel

If you are not familiar with the different technologies used in this project, please refer to the respective docs.

- [Next.js](https://nextjs.org)
- [tRPC](https://trpc.io)


## Getting Started
### Pre-requisites
- Node.js
- Bun (npm install -g bun)

### Installation
1. Clone the repository
2. Run `bun install`
3. Run `bun dev` to start the development server

### Deployment
1. Ensure that the build succeeds by running `bun build`
2. Run `bun version <major|minor|patch>` to bump the version (follow [semver](https://semver.org))
2. Open a pull request to the `main` branch
3. Once the PR is merged, the changes will be automatically deployed to the production environment

## Writing a new hack
1. Create a new folder in the `src/hacks` directory titled with the id of the hack (lowercase, use dashes for spaces)
2. Create an `index.ts` file in the new folder
```typescript
export default {
  id: '<hack-id>',
  name: '`<Hack Name>`',
  visible: true,
  functions: {},
  dependencies: [],
  scripts: ['main.js'],
};
```
3. Create a `main.js` file in the new folder. Note that this must be written in JavaScript, not TypeScript.
4. Add the new hack to the `hacks` array in `src/hacks/index.ts`
5. Run `bun dev` to see the new hack in the control panel

Scripts and dependencies are loaded in the order they are defined. Scripts will always be loaded after all dependencies.

If your hack requires any dependencies, add them to the `dependencies` array (list of hack ids) in the `index.ts` file. These dependencies will be automatically loaded before the hack is executed.

If your hack requires user input, you can define a function in the `functions` object in the `index.ts` file. This function will be called with the user input as an argument when the hack is executed. The key is the display name and the value is the name of the function to be executed. Make sure the function name is exposed in one of your scripts.

Open an issue if you have any questions or need help with anything.