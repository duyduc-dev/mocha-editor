import { CompletionContext } from '@codemirror/autocomplete';
import { loadLanguage, langs } from '@uiw/codemirror-extensions-langs';

const extensionToLangKey: Record<string, keyof typeof langs> = {
  js: 'javascript',
  jsx: 'jsx',
  ts: 'typescript',
  tsx: 'tsx',
  vue: 'vue',
  html: 'html',
  css: 'css',
  json: 'json',
  md: 'markdown',
  xml: 'xml',
  sql: 'sql',
  java: 'java',
  rs: 'rust',
  cpp: 'cpp',
  c: 'c',
  h: 'cpp',
  php: 'php',
  py: 'python',
  go: 'go',
  sh: 'shell',
  rb: 'ruby',
  swift: 'swift',
  kt: 'kotlin',
  m: 'objectiveC',
  mm: 'objectiveCpp',
  cs: 'csharp',
  scss: 'sass',
  sass: 'sass',
  less: 'less',
  yaml: 'yaml',
  yml: 'yaml',
  toml: 'toml',
  pl: 'perl',
  r: 'r',
  lua: 'lua',
  clj: 'clojure',
  coffee: 'coffeescript',
  dockerfile: 'dockerfile',
  bat: 'powershell',
  ps1: 'powershell',
  vb: 'vb',
  vbs: 'vbscript',
};

function getLanguageKeyFromFilename(
  filename: string,
): keyof typeof langs | undefined {
  const match = filename.match(/\.([^.]+)$/);
  if (!match) return undefined;
  const ext = match[1].toLowerCase();
  return extensionToLangKey[ext];
}

const getLanguageProgramming = (fileName: string) => {
  let name = fileName;
  if (name.endsWith('rc')) {
    name += '.json';
  }
  const lang = getLanguageKeyFromFilename(name);
  if (!lang) return null;
  return loadLanguage(lang);
};

export { getLanguageProgramming };
