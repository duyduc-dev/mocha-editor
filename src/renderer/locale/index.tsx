import { createContext, PropsWithChildren, use } from 'react';
import en from './resource/en.json';

enum LangLocale {
  EN = 'en',
}

interface ILocale {
  currentLang: LangLocale;
  t: {
    (tpl: TemplateStringsArray): string;
    (key: string, params?: Record<string, any>): string;
  };
}

const resources = {
  [LangLocale.EN]: en,
};

function createTranslator(locale: Record<string, string>) {
  // This handles interpolation
  const interpolate = (template: string, params: Record<string, any> = {}) => {
    return template.replace(/{{\s*(\w+)\s*}}/g, (_, key) => {
      return String(params[key] ?? '');
    });
  };

  // The `t` function: supports both usages
  const t = ((
    keyOrTpl: TemplateStringsArray | string,
    ...values: any[]
  ): string => {
    if (Array.isArray(keyOrTpl)) {
      // Tagged template: t`greeting`
      const key = keyOrTpl.join('');
      return locale[key] ?? key;
    }

    // Function call: t('greeting', { name: 'Alice' })
    const [params] = values;
    const template = locale[keyOrTpl as any];
    if (!template) return keyOrTpl as any;

    return interpolate(template, params);
  }) as {
    (tpl: TemplateStringsArray): string;
    (key: string, params?: Record<string, any>): string;
  };

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
