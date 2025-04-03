# Teleporter

Teleport your components to any destination with strict mode and hot reload supported (to some extent), inspired by [`tunnel-rat`](https://github.com/pmndrs/tunnel-rat).

Using [`@hookstate/core`](https://hookstate.js.org/)'s nested state to archived such simple usage.

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
> `@hookstate/core` can in fact run on React ^19.0.0 just fine, but the upstream package does not update `peerDependencies`, I'm looking forward to get this fixed.

## Usage

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

## Why not `tunnel-rat`?

This package is purely made just to deal with `React.StrictMode`. While using `tunnel-rat`, I've ran into issues related to `React.StrictMode` being itself, especially when the component is mounted conditionally after tunneled, `React.StrictMode` messed with the object's lifecycle, causing it to be in a "limbo" state, even though it appears on React nodes tree, only some of the effect in scene work.

The only fix I can come up with is to "cheese" strict mode, when cleaning up effect, `teleporter` won't immediately remove those components, it instead slaps a `null`.

Only when the `Teleporter.In` actually disposes, then we can go ahead and clean everything up.
