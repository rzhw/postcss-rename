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
import * as selectorParser from 'postcss-selector-parser';
import { IdentitySubstitutionMap } from './css/identity-substitution-map';
import { MinimalSubstitutionMap } from './css/minimal-substitution-map';
import { SimpleSubstitutionMap } from './css/simple-substitution-map';
import { SplittingSubstitutionMap } from './css/splitting-substitution-map';

const RenamingType = {
  'none': () => new IdentitySubstitutionMap(),
  'debug': () => new SplittingSubstitutionMap(new SimpleSubstitutionMap()),
  'closure': () => new SplittingSubstitutionMap(new MinimalSubstitutionMap()),
}

type Options = {
  renamingType?: keyof typeof RenamingType;
}

module.exports = postcss.plugin('postcss-rename', (options: Partial<Options> = {}) => {
  return (root: postcss.Root) => {
    const opts = Object.assign({
      renamingType: 'none',
    }, options);

    const substitutionMap = RenamingType[opts.renamingType]();

    const selectorProcessor = selectorParser(selectors => {
      selectors.walkClasses(classNode => {
        if (classNode.value) {
          classNode.value = substitutionMap.get(classNode.value);
        }
      });
    });

    root.walkRules(ruleNode => {
      return selectorProcessor.process(ruleNode);
    });
  };
});
