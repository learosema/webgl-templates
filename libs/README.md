# Library folder

As this repository is also a GitHub page, there is no extra deployment process and no bundling toolchain is used. To keep the dependencies out of `node_modules` (which only includes server-side dependencies in this repo), I've created a simple script that downloads the necessary files (latest version) into this folder.

Executing `download-libs.sh` may break the examples, because it doesn't take care of breaking changes.

In a real world project, you might want to use some kind of NPM toolchain instead.
