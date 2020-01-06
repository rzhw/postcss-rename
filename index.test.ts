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

import * as postcss from 'postcss';

const plugin = require('.');

async function run(input: string, output: string) {
  const result = await postcss([plugin()]).process(input, { from: undefined });
  expect(result.css).toEqual(output);
  expect(result.warnings()).toHaveLength(0);
}

it('does something', async () => {
  await run(`body {
font-size: 12px;
}

.container, .image.full-width {
margin: 0 auto;
width: 800px;
}

.container {
background: #fff;
}

.image {
box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
}

.image.full-width {
box-shadow: none;
}

.full-size {
width: 100%;
}
`, /*`body {
font-size: 12px;
}

.a, .b.c {
margin: 0 auto;
width: 800px;
}

.a {
background: #fff;
}

.b {
box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
}

.b.c {
box-shadow: none;
}

.d {
width: 100%;
}
`*/
`body {
font-size: 12px;
}

.a, .b.c-d {
margin: 0 auto;
width: 800px;
}

.a {
background: #fff;
}

.b {
box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
}

.b.c-d {
box-shadow: none;
}

.c-e {
width: 100%;
}
`);
});