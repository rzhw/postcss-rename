/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {promises as fs} from 'fs';
import * as path from 'path';
import * as postcss from 'postcss';

const plugin = require('../');

async function run(input: string, output: string, opts?: Object) {
  const result = await postcss([plugin(opts)]).process(input, { from: undefined });
  expect(result.css).toEqual(output);
  expect(result.warnings()).toHaveLength(0);
}

async function read(filename: string) {
  const file = path.join(__dirname, '/cases/', filename);
  return (await fs.readFile(file)).toString();
}

it('does nothing with no options', async () => {
  await run(await read('default.css'), await read('default.css'));
});

it('does nothing with none renaming type', async () => {
  await run(await read('default.css'), await read('default.css'), { renamingType: 'none' });
});

it('renames with debug renaming type', async () => {
  await run(await read('default.css'), await read('default.debug.css'), { renamingType: 'debug' });
});

it('renames with closure renaming type', async () => {
  await run(await read('default.css'), await read('default.closure.css'), { renamingType: 'closure' });
});