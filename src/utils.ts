import sh from 'shelljs';

export const readFile = (path: string, quitOnError: boolean = true): string => {
  const reader = sh.cat(path);
  if (reader.stderr) {
    quitOnError && process.exit(1);
    return '';
  }
  return reader.stdout;
}
