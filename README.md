# Powergate Pinning Tutorial

## Status

This repository is in a **frozen** state. It is not being maintained or kept in sync with the tools and libraries it builds on. Even though work on this repository has been **shelved**, anyone interested in updating or maintaining this project should express their interest on one Filecoin community conversation mediums: <https://github.com/filecoin-project/community#join-the-community>.

---

- [Overview](#overview)
- [App Architecture Overview](#app-architecture-overview)
- [How to run](#how-to-run)
- [License](#license)

## Overview

In this tutorial, we will build a simple pinning service using Textile Powergate.

A pinning service is a remote service that helps you manage your data (like a decentralized Google Drive). In this tutorial's context the data will be managed on Filecoin & IPFS.

After completing this tutorial, you will be able to:

1. Setup your own Powergate node.
2. Interact with Powergate using Powergate JS Client (@textile/powergate-client)
3. Create a simple pinning service which manages data for multiple users on IPFS & Filecoin.

Here is a sneak-peek of how the final application will look:

**Login**

![Login](./assets/login.png)

**Network Stats**

![Network Stats](./assets/network-stats.png)

**Pinning Files**

![Pinning Files](./assets/pin.png)

## App Architecture Overview

Below is the 10,000 feet overview of how our application will work:

1. A docker-compose script runs a Powergate, Lotus (filecoin client), and IPFS node.
2. A React dashboard showing different features of the pinning service that uses Powergate JS Client to interact with the running powergate node.

**Overall Achitecture**

![Overall Achitecture](./assets/app-arch.png)

**Powergate Architecture**

![Powergate Architecture](./assets/powergate.png)

## How to run

Follow [this tutorial]() on Filecoin docs to get started.

## License

This is dual-licensed under Apache 2.0 and MIT terms:

- Apache License, Version 2.0, ([LICENSE-APACHE](./LICENSE-APACHE) or http://www.apache.org/licenses/LICENSE-2.0)
- MIT license ([LICENSE-MIT](./LICENSE-MIT) or http://opensource.org/licenses/MIT)
