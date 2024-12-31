import {
  useRef,
  createContext,
  useContext,
  useCallback,
  useSyncExternalStore,
} from 'react';

export default function createFastContext<FastContextType>(
  initialState: FastContextType
) {
  function useFastContextData(): {
    get: () => FastContextType;
    set: (value: Partial<FastContextType>) => void;
    subscribe: (callback: () => void) => () => void;
  } {
    const store = useRef(initialState);

    const get = useCallback(() => store.current, []);

    const subscribers = useRef(new Set<() => void>());

    const set = useCallback((value: Partial<FastContextType>) => {
      store.current = { ...store.current, ...value };
      subscribers.current.forEach((callback) => callback());
    }, []);

    const subscribe = useCallback((callback: () => void) => {
      subscribers.current.add(callback);
      return () => subscribers.current.delete(callback);
    }, []);

    return {
      get,
      set,
      subscribe,
    };
  }

  type UseFastContextDataReturnType = ReturnType<typeof useFastContextData>;

  const FastContext = createContext<UseFastContextDataReturnType | null>(null);

  function FastContextProvider({ children }: { children: React.ReactNode }) {
    const value = useFastContextData();
    return <FastContext.Provider value={value}>{children}</FastContext.Provider>;
  }

  function useFastContext<SelectorOutput>(
    selector: (store: FastContextType) => SelectorOutput
  ): [SelectorOutput, (value: Partial<FastContextType>) => void] {
    const fastContext = useContext(FastContext);
    if (!fastContext) {
      throw new Error('Store not found');
    }

    const state = useSyncExternalStore(
      fastContext.subscribe,
      () => selector(fastContext.get()),
      () => selector(initialState)
    );

    return [state, fastContext.set];
  }

  function useFastContextFields<K extends keyof FastContextType>(
    fieldNames: K[]
  ): {
    [key in K]: {
      get: FastContextType[key];
      set: (value: FastContextType[key]) => void;
    };
  } {
    const gettersAndSetters = {} as {
      [key in K]: {
        get: FastContextType[key];
        set: (value: FastContextType[key]) => void;
      };
    };

    for (const fieldName of fieldNames) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [getter, setter] = useFastContext(
        (fc) => (fc as FastContextType)[fieldName]
      );
      gettersAndSetters[fieldName] = {
        get: getter,
        set: (value: any) => setter({ [fieldName]: value } as Partial<FastContextType>),
      };
    }

    return gettersAndSetters;
  }

  return { FastContextProvider, useFastContext, useFastContextFields };
}
