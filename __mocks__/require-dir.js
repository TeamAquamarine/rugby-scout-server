'use strict';

export default dir => {
  const fakeMongo = {
    find: () => Promise.resolve([]),
    findOne: () => Promise.resolve({}),
    save: data => Promise.resolve(data),
    findAndDeleteOne: () => Promise.resolve({}),
  };

  if (typeof dir !== 'string') { return {}; }

  return {
    customers: { default: fakeMongo },
  };
};