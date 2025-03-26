# Purple

**Purple** is a lightweight, developer-first tunneling tool that exposes your local development server to the public internet. It's built to help you test, share, and interact with your `localhost` apps from anywhere — especially handy for mobile devices, remote teammates, or webhook testing.

## Why Purple

Tired of manually configuring tunnels or relying on bloated services just to see your frontend on your phone? Purple does one job and does it cleanly: it gives you a public URL that routes traffic to your local machine.

## Features

- **Quick tunnel setup**: Expose any local port instantly.
- **CLI-first UX**: Everything is controlled through a clean, fast CLI.
- **`.ppl` config files**: Human-readable config with project defaults.
- **Cross-platform**: Works on macOS, Linux, and Windows.

## Example Usage

```bash
purple expose 3000
```

Returns a public HTTPS URL that forwards to `localhost:3000`.

## Installation

Coming soon: Single downloadable binary. No dependencies, no runtime.

## Configuration

Purple looks for a `.ppl` file in the current directory or `$HOME` to load defaults. Example:

```ini
[default]
port = 3000
subdomain = "my-project"
```

## Planned Commands

```bash
purple expose <port>     # Start a tunnel to the given port
purple stop              # Stop the active tunnel
purple status            # Show the current tunnel status
```

## Security

Purple will ship with TLS out of the box. Authentication features will be opt-in via `.ppl` config.

## License

MIT — use it, hack it, share it.

---

*Purple is in active development. Stay tuned for the first release.*

