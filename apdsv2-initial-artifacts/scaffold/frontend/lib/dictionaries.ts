import 'server-only'

export type Locale = 'en' | 'es' | 'pt'

const dictionaries = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  es: () => import('@/dictionaries/es.json').then((module) => module.default),
  pt: () => import('@/dictionaries/pt.json').then((module) => module.default),
}

export const getDictionary = async (locale: Locale) => {
  if (!dictionaries[locale]) {
    return dictionaries.en()
  }
  return dictionaries[locale]()
}
