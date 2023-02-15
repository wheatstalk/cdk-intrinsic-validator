import { compilePortSpec } from '../src/port-spec';

describe('compilePortSpec', () => {
  test('compilePortSpec', () => {
    // GIVEN
    const portSpec = '400,401,500-599';

    // WHEN
    const includesPort = compilePortSpec(portSpec);

    // THEN
    expect(includesPort(400)).toEqual(true);
    expect(includesPort(401)).toEqual(true);
    expect(includesPort(403)).toEqual(false);
    expect(includesPort(500)).toEqual(true);
    expect(includesPort(550)).toEqual(true);
    expect(includesPort(599)).toEqual(true);
    expect(includesPort(600)).toEqual(false);
    expect(includesPort(200)).toEqual(false);
  });

  test('invalid', () => {
    const portSpec = '';

    expect(() => compilePortSpec(portSpec)).toThrow(/invalid port spec/i);
  });
});

