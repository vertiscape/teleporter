import { hookstate, useHookstate } from '@hookstate/core';
import { nanoid } from 'nanoid';
import React, { memo, useLayoutEffect, useMemo } from 'react';

const teleporterStore = hookstate<{
  [name in string]: Map<string, React.ReactNode | null>;
}>({});

const emptyQuery = new Map();

const Teleporter = {
  In: memo((props: { children?: React.ReactNode; name: string }) => {
    const teleporter = useHookstate(teleporterStore);
    const key = useMemo(() => nanoid(), []);

    useLayoutEffect(() => {
      teleporter[props.name].set((state) => {
        if (!state) {
          state = new Map();
        }

        if (Array.isArray(props.children)) {
          state.set(key, props.children);
        } else if (props.children) {
          state.set(key, props.children);
        }

        return state;
      });

      return () => {
        teleporter[props.name].set((state) => {
          if (!state) {
            state = new Map();
          }

          state.set(key, null);

          return state;
        });
      };
    }, [key, props.children, props.name, teleporter]);

    useLayoutEffect(
      () => () => {
        teleporter[props.name].set((state) => {
          state.delete(key);
          return state;
        });
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      []
    );

    return null;
  }),
  Out: memo((props: { name: string }) => {
    const tunnel = useHookstate(teleporterStore);
    const components = useMemo(
      () => tunnel[props.name].get({ noproxy: true }),
      [tunnel]
    );

    if (components) {
      return <>{[...components.values()].flat(1)}</>;
    }

    return null;
  }),
};

export default Teleporter;
