import { map } from "../functions";

import { isAsyncFunction } from "../utils";

const toArrayAsync = async iterable => {
  const promises = map(iterable, t => (isAsyncFunction(t) ? t() : t));
  const result = await Promise.all(promises);

  return result;
};

export default toArrayAsync;
