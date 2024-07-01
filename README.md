# solidtime | Documentation

solidtime is a modern open-source time tracking application for freelancers and agencies.

This repository contains the documentation for solidtime.
The documentation is built using [Docusaurus](https://docusaurus.io/).

## Installation

First, clone the repository:

```bash
git clone git@github.com:solidtime-io/docs.git
```

Then, install the dependencies:

```bash
npm install
```
### Local Development

```bash
npm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.
Some features, like search and the API page, won't work in the local development environment. If you want to test this, you need to build the documentation and serve from the `build` directory.

### Build

```bash
npm run build
```

This command generates static content into the build directory.
You can test the build by running a local HTTP server:

```bash
npm run serve
```

## Contributing

Contributions to the documentation are welcome.

## License

The documentation is licensed under the MIT License. See [LICENSE](LICENSE.md) for more information.
