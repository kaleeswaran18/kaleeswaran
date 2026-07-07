import categoriesData from '../data/categories.json';

const vocabularyCache = new Map();

export function getCategories() {
  return categoriesData.categories;
}

export function getCategoryById(categoryId) {
  return categoriesData.categories.find((c) => c.id === categoryId) ?? null;
}

export function getSubcategory(categoryId, subcategoryId) {
  const category = getCategoryById(categoryId);
  if (!category) return null;
  const sub = category.subcategories.find((s) => s.id === subcategoryId);
  if (!sub) return null;
  return { category, subcategory: sub };
}

export async function loadVocabulary(vocabularyFile) {
  if (vocabularyCache.has(vocabularyFile)) {
    return vocabularyCache.get(vocabularyFile);
  }

  const modules = import.meta.glob('../data/vocabulary/*.json');
  const loader = modules[`../data/vocabulary/${vocabularyFile}`];

  if (!loader) {
    throw new Error(`Vocabulary file not found: ${vocabularyFile}`);
  }

  const module = await loader();
  const data = module.default;
  vocabularyCache.set(vocabularyFile, data);
  return data;
}

export async function getVocabularyItems(categoryId, subcategoryId) {
  const result = getSubcategory(categoryId, subcategoryId);
  if (!result) return null;

  const vocabulary = await loadVocabulary(result.subcategory.vocabularyFile);
  return {
    ...result,
    vocabulary,
    items: vocabulary.items,
  };
}
