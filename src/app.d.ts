// See https://kit.svelte.dev/docs/types#app

import type { WebSocketServer } from "ws"

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
  // eslint-disable-next-line no-var
  var wss: WebSocketServer
}


export {}
