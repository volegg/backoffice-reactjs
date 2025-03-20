export function initLogger() {
  const isProd = process.env.NODE_ENV === 'production';

  const banner = '                                \n' +
    '           BACKOFFICE           \n' +
    '          ver.' + String('0.0.1').padStart(8, ' ') + '          \n' +
    '                                \n' +
    '  visit https://oleggnet.dev/   \n' +
    '  email olegg.net@gmail.com     \n' +
    '                                \n';

  console.log(
    '%c' + banner,
    'background:#000000;color:#fafafa;font-size:12px;font-weight:bold',
  );

  const nativeLog = console.log;
  const nativeWarn = console.warn;
  const nativeError = console.error;

  console.log = (...args: AnyType) => {
    if (!isProd) {
      nativeLog(...args);
    }
  };

  console.info = console.log;

  console.warn = (...args: AnyType) => {
    if (!isProd) {
      nativeWarn(...args);
    }
  };

  console.error = (...args: AnyType) => {
    if (!isProd) {
      nativeError(...args);
    }
  };

  console.log('IS DEV MODE', !isProd);
}
