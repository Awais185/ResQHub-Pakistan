export function serialize(data: unknown) {
  return JSON.parse(JSON.stringify(data));
}

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export function fmtDate(d: string | Date) {
  return new Date(d).toLocaleString('en-PK', { dateStyle: 'medium', timeStyle: 'short' });
}
