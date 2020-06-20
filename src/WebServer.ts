/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Neil Enns. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import * as LocalStorageManager from "./LocalStorageManager";
import * as log from "./Log";
import * as Settings from "./Settings";

import express from "express";
import { Server } from "http";

const app = express();
let server: Server;

export function startApp(): void {
  app.use("/", express.static(LocalStorageManager.localStoragePath));
  try {
    server = app.listen(Settings.port, () => log.info("Web server", `Listening at http://localhost:${Settings.port}`));
  } catch (e) {
    log.warn("Web server", `Unable to start web server: ${e.error}`);
  }
}

export function stopApp(): void {
  if (server) {
    log.verbose("Web server", "Stopping.");
    server.close();
  }
}