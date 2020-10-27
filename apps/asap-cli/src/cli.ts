#!/usr/bin/env node

/* eslint-disable strict */

'use strict';

import yargs from 'yargs/yargs';
import { parseAndCreateEntities } from './import';
import { inviteUsers } from './invite';

// eslint-disable-next-line no-unused-expressions
yargs(process.argv.slice(2))
  .command({
    command: 'import <path>',
    describe: 'import data to squidex from csv',
    builder: (cli) => {
      return cli.positional('path', {
        describe: 'specific path to csv file',
        type: 'string',
      });
    },
    handler: async ({ path }) => {
      return parseAndCreateEntities(path as string);
    },
  })
  .command({
    command: 'invite <role>',
    describe: 'invite people to the ASAP Hub',
    builder: (cli) => {
      return cli.positional('role', {
        describe: 'specific a role to invite',
        type: 'string',
        choices: ['Staff', 'Grantee', 'Guest'],
      });
    },
    handler: async ({ role }) => {
      return inviteUsers(role as string);
    },
  })
  .demandCommand(1)
  .help('h')
  .alias('h', 'help')
  .completion()
  .strict().argv;