import { html } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import type { BlockHost } from '@building-blocks/shared';
import type { BaseBlockModel } from '@building-blocks/store';
import type { ListBlockModel } from '../list-block/list-model';
import type { TextBlockModel } from '../text-block/text-model';

// TODO support dynamic block types
function getBlockElement(model: BaseBlockModel, host: BlockHost) {
  switch (model.flavour) {
    case 'text':
      return html`
        <text-block-element
          .model=${model as TextBlockModel}
          .host=${host}
        ></text-block-element>
      `;
    case 'list':
      return html`
        <list-block-element
          .model=${model as ListBlockModel}
          .host=${host}
        ></list-block-element>
      `;
  }
  return html`<div>Unknown block type: "${model.flavour}"</div>`;
}

export function getBlockChildrenContainer(
  model: BaseBlockModel,
  host: BlockHost
) {
  return html`
    <style>
      .affine-block-children-container {
        padding-left: 1rem;
      }
    </style>
    <div class="affine-block-children-container">
      ${repeat(
        model.children,
        child => child.id,
        child => getBlockElement(child, host)
      )}
    </div>
  `;
}

// https://stackoverflow.com/a/2345915
export function focusTextEnd(input: HTMLInputElement) {
  const current = input.value;
  input.focus();
  input.value = '';
  input.value = current;
}