# Teleporter

Teleport your components to any destination with strict mode and hot reload supported (to some extent), inspired by [`tunnel-rat`](https://github.com/pmndrs/tunnel-rat).

## Installation

```
yarn add @vertiscape/teleporter
```

```
npm i @vertiscape/teleporter
```

> [!NOTE]
> For `npm` on React 19, ` --force` argument must be added.
> 
> `@hookstate/core` can in fact run on React ^19.0.0 just fine, but the upstream package does not update `peerDependencies`.

## Usage

I didn't manage to get it to auto-import, so, manually it is :)
```tsx
import Teleporter from '@vertiscape/teleporter';
```

Use `Teleporter.In` to put your test subjects inside the chamber, remember to give it a name, we'll use it for later:
```tsx
<Teleporter.In name="overworld">
  <p>who are you?</p>
  <p>I. AM STEVE</p>
</Teleporter.In>
```

Find your destination, and RELEASE:
```tsx
<Teleporter.Out name="overworld" />
```

Multiple test subjects from different regions, you must assign them `key` to let React know which one is which, treat 'em just like a list:
```tsx
<Teleporter.In name="overworld">
  <p key="who">who are you?</p>
  <p key="I">I. AM STEVE</p>
</Teleporter.In>

<Teleporter.In name="overworld">
  <p key="flint">FLINT AND STEEL</p>
  <p key="nether">THE NETHER</p>
</Teleporter.In>
```

P/S: [`@hookstate/core`](https://hookstate.js.org/)'s nested state really good frfr no cap, I only needed to declare one single store for the whole package, and it handles the rest, `name` in the top level of the state's object, values can act as a state itself; rerender only when it's modified, no rerender when other `name` fields modify, peak, idk why people didn't use it as many as it deserves.

## Why not `tunnel-rat`?

This package is purely made just to deal with `React.StrictMode`. While using `tunnel-rat`, I've ran into issues related to `React.StrictMode` being itself, especially when the component is mounted conditionally after tunneled, `React.StrictMode` messed with the object's lifecycle, causing it to be in a "limbo" state, even though it appears on React nodes tree, only some of the effect in scene work.

The only fix I can come up with is to "cheese" strict mode, when cleaning up effect, `teleporter` won't immediately remove those components, it instead slaps a `null`.

Only when the `Teleporter.In` actually disposes, then we can go ahead and clean everything up.
