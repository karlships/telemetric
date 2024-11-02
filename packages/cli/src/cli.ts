#!/usr/bin/env node
import { Command } from "commander";
import { setup } from "./commands/setup.js";

const program = new Command();

program
  .name("telemetric")
  .description("CLI tool for setting up Telemetric in your React applications")
  .version("0.1.0");

program
  .command("setup")
  .description("Setup Telemetric in your project")
  .argument("<framework>", "Framework to setup (next, react)")
  .action(setup);

program.parse(process.argv);
