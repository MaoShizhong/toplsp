import * as path from "path";
import { workspace } from "vscode";
import { LanguageClient, TransportKind } from "vscode-languageclient/node";

let client;

export function activate(context) {
  const serverModule = context.asAbsolutePath(
    path.join("server", "out", "main.js"),
  );

  const debugOptions = { execArgv: ["--nolazy", "--inspect=6009"] };
  const serverOptions = {
    run: { module: serverModule, transport: TransportKind.stdio },
    debug: {
      module: serverModule,
      transport: TransportKind.stdio,
      options: debugOptions,
    },
  };

  const clientOptions = {
    documentSelector: [{ scheme: "file", language: "markdown" }],
    synchronize: {
      fileEvents: workspace.createFileSystemWatcher("**/.clientrc"),
    },
  };

  client = new LanguageClient(
    "toplsp",
    "Top Language Server",
    serverOptions,
    clientOptions,
  );

  client.start();
}

export function deactivate() {
  if (!client) {
    return undefined;
  }
  return client.stop();
}
