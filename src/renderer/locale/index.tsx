import React, { createContext, PropsWithChildren, ReactNode, use } from 'react';
import en from './resource/en.json';

enum LangLocale {
  EN = 'en',
}

interface ILocale {
  currentLang: LangLocale;
  t: (
    key: TemplateStringsArray | string,
    values?: InterpolationValues,
  ) => React.ReactNode | string;
}

type InterpolationValues = Record<
  string,
  string | ((props: { children: ReactNode }) => ReactNode)
>;

const resources = {
  [LangLocale.EN]: en,
};

function createTranslator(locale: Record<string, string>) {
  // This handles interpolation
  function parseTranslation(
    template: string,
    values: InterpolationValues,
  ): ReactNode[] {
    const regex = /<(\w+)>(.*?)<\/\1>|{{(.*?)}}|([^<>{}]+)/g;
    const result: ReactNode[] = [];

    let match: RegExpExecArray | null;
    while ((match = regex.exec(template)) !== null) {
      const [_, tag, tagContent, varName, plainText] = match;

      if (tag && tagContent) {
        const Component = values[tag];
        const children = parseTranslation(tagContent, values);

        if (typeof Component === 'function') {
          result.push(Component({ children }));
        } else {
          // fallback if no component or invalid
          result.push(<>{children}</>);
        }
      } else if (varName) {
        const value = values[varName];
        result.push(typeof value === 'string' ? value : '');
      } else if (plainText) {
        result.push(plainText);
      }
    }

    return result;
  }

  function t(
    key: TemplateStringsArray | keyof typeof locale,
    values?: InterpolationValues,
  ): ReactNode | string {
    if (Array.isArray(key)) {
      const actualKey = key[0] as keyof typeof locale;
      return locale[actualKey] ?? actualKey;
    }
    const raw = locale[key as any] as any;
    if (!values) return raw;
    return parseTranslation(raw, values);
  }
  return t;
}

const LocaleContext = createContext<ILocale | null>(null);

export const useLocale = () => {
  const ctx = use(LocaleContext);
  if (!ctx) {
    throw new Error('Please use within LocaleProvider');
  }
  return ctx;
};

export const LocaleProvider = ({ children }: PropsWithChildren) => {
  const currentLang = LangLocale.EN;
  const t = createTranslator(resources[currentLang]);
  const value: ILocale = {
    currentLang,
    t,
  };
  return <LocaleContext value={value}>{children}</LocaleContext>;
};
