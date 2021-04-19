const subscriptions: any = {};
const getNextUniqueId = getIdGenerator();

export function subscribe<T>(eventType: string, callback: (value: T) => void) {
  const id = getNextUniqueId();

  if (!subscriptions[eventType]) subscriptions[eventType] = {};

  subscriptions[eventType][id] = callback;

  return {
    unsubscribe: () => {
      delete subscriptions[eventType][id];
      if (Object.keys(subscriptions[eventType]).length === 0)
        delete subscriptions[eventType];
    },
  };
}

export function publish<T>(eventType: string, arg: T) {
  if (!subscriptions[eventType]) return;

  Object.keys(subscriptions[eventType]).forEach((key) =>
    subscriptions[eventType][key](arg)
  );
}

function getIdGenerator() {
  let lastId = 0;

  return function getNextUniqueId() {
    lastId += 1;
    return lastId;
  };
}

export type BusError = {
  stepText: string;
  lineNumber: number;
  errorMessage: string;
};
