import { create } from 'zustand';

type ActionType = 'Logging' | 'Mining' | 'Lumbering' | 'Gathering' | 'Exploring';

export interface ActionDefinition {
  name: string;
  image: string;
  level: number;
  type: ActionType;
  duration: number;
  exp: number;
}

export interface Action extends ActionDefinition {
  count: number | '∞';
}

export interface State {
  actions: Action[] | null;
  prependAction: (action: Action) => void;
  queueAction: (action: Action) => void;
  getCurrentAction: () => Action | null;
  removeCurrentAction: () => void;

  progress: number;
  addProgress: (value: number) => void;
}

export const useStore = create<State>((set, get) => ({
  actions: [],
  prependAction: (action) => set((state) => {
    return {
      progress: 0,
      actions: [action, ...state.actions || []]
    };
  }),
  queueAction: (action) => set((state) => {
    return { actions: [...state.actions || [], action] };
  }),
  getCurrentAction: () => {
    const { actions } = get();
    return actions !== null && actions.length > 0 ? actions[0] : null;
  },
  removeCurrentAction: () => set((state) => {
    const { actions } = state;
    if (actions !== null && actions.length > 0) {
      return { actions: actions.slice(1), progress: 0 };
    }
    return { actions: [] };
  }),

  progress: 0,
  addProgress: (value) => set((state) => {
    const newProgress = state.progress + value;
    if (newProgress >= 100) {
      const currentAction = state.getCurrentAction();
      if (currentAction !== null) {
        if (currentAction.count !== '∞') {
          currentAction.count -= 1;
          if (currentAction.count > 0) {
            return {
              progress: 0,
              actions: [currentAction, ...state.actions!.slice(1)],
            };
          }
          if (currentAction.count <= 0) {
            return {
              progress: 0,
              actions: state.actions!.slice(1),
            };
          }
        }
        else {
          return {
            progress: 0
          }
        }
      }
    }
    return {
      progress: newProgress,
    }
  })
}));