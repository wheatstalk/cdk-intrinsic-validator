export function compilePortSpec(portSpec: string): (x: number) => boolean {
  const portsArray = portSpec.split(',')
    .flatMap(parseToPortList);

  const ports = new Set<number>(portsArray);

  return (x) => ports.has(x);
}

/**
 * Parses a port spec conjunct.
 *
 * @param portSpec
 * @returns the expansion of all values
 *
 * @example "200" -> [200], "500-599" => [500, 501, ..., 599]
 */
function parseToPortList(portSpec: string): number[] {
  if (IS_PORT.test(portSpec)) {
    return [parseInt(portSpec)];
  }

  if (IS_RANGE.test(portSpec)) {
    const [begin, end] = portSpec.split('-', 2);
    if (typeof begin === 'string' && typeof end === 'string') {
      const beginN = parseInt(begin);
      const endN = parseInt(end);
      return Array.from(Array(endN - beginN + 1).keys()).map(x => x + beginN);
    }
  }

  throw new Error(`Invalid port spec: ${portSpec}`);
}

const IS_PORT = /^\d+$/;
const IS_RANGE = /^\d+-\d+$/;