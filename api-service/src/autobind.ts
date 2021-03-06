export default function autobind(cls: any) {
  const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(cls));
  methods
    .filter(method => (method !== 'constructor'))
    .forEach((method) => { cls[method] = cls[method].bind(cls); });
}
