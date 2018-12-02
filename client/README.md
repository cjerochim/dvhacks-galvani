# React - Boilerplate


## Moved to Webpack 4 due to the following benefits:
- code splitting
- Lazy loading
- Bundle Analyser

## Features
- React
- Redux
- React Router
- React Router Redux
- Redux Persist (Basic implementation, stores reducer to session storage)
- Redux Saga
- Redux Saga Routes
- Loadable (Code Splitting)
- Storybook
- Linting (Airbnb rules)
  - pre-push lint check on commit
- Jest / Enzyme configured
  - Single test
  - Test Watching
  - Test Coverage
- Defined Alias's
  - styles
  - images (For Global)
  - decorators (For Storybook)

## TODO 
- Simplify build (Remove animations from routes)
- Add base styles from UI patterns
- Show example of pre-fetched components vs lazy loading components
- Add route component - https://gist.github.com/carlqt/6e4926d250d9e185e9f67a6ce804ca01
- ENV config file (Load config at runtime, not at compile time)
- (Prettier)[https://github.com/prettier/prettier}]
- Unit tests

## Issues
- Updated storybook to work with the latest babel 7
- Latest Storybook is not displaying actions when triggered, need to explore issue


## Application approach
- Routes
- View
- Logic
- State
- Persist

## React 

## Redux
### Implmentation of redux
Follows the ducks proposal, (find out more)[https://github.com/erikras/ducks-modular-redux]

## Routing / Redux Routing
## Sagas
## Code splitting / Performance
## CSS Methodology
- Boxmodel
- B.E.M.
## Animation
## Storybook
## Testing

## Linting
The boilerplate follows the AirBnb rules for linting. Reference to the [rules](https://github.com/airbnb/javascript)

### Commands
- ```npm run lint``` to run a lint check.
- ```npm run lint:fix``` to resolve linting issues, may not fix all.

## Configuration (TODO)
Create a config folder with each environment defined as ```properties.[ENV].json``` e.g. for dev environment it would be ```properties.dev.json```, when deployed the file will be renamed to ```properties.json```, this will be loaded by the application. This allows the configuration to be defined at an environment level, not during the bundling of the JS file. 
