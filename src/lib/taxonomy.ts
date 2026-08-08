import type { BlogPost } from '@/types/blog';
import { getCanonicalParam, stringToSlug } from '@/lib/url-utils';

export type TaxonomyKind = 'category' | 'tag';

export interface TaxonomyTerm {
  name: string;
  slug: string;
  href: string;
  count: number;
  posts: BlogPost[];
}

function getPostTerms(post: BlogPost, kind: TaxonomyKind): string[] {
  return kind === 'category' ? post.categories : post.tags;
}

export function getTaxonomyHref(kind: TaxonomyKind, term: string): string {
  const basePath = kind === 'category' ? '/categories' : '/tag';
  return `${basePath}/${stringToSlug(term)}`;
}

/**
 * Builds the canonical taxonomy index used by directories, archive pages, and
 * contextual links. A term is counted at most once per post.
 */
export function getTaxonomyTerms(posts: BlogPost[], kind: TaxonomyKind): TaxonomyTerm[] {
  const terms = new Map<string, { name: string; posts: BlogPost[] }>();

  posts.forEach((post) => {
    const postTerms = new Set<string>();

    getPostTerms(post, kind).forEach((value) => {
      const name = value.trim();
      const slug = stringToSlug(name);

      if (!slug || postTerms.has(slug)) {
        return;
      }

      postTerms.add(slug);
      const term = terms.get(slug);

      if (term) {
        term.posts.push(post);
        return;
      }

      terms.set(slug, { name, posts: [post] });
    });
  });

  return Array.from(terms, ([slug, term]) => ({
    name: term.name,
    slug,
    href: getTaxonomyHref(kind, term.name),
    count: term.posts.length,
    posts: term.posts,
  })).sort((a, b) => a.name.localeCompare(b.name));
}

export function getTaxonomyTermByParam(
  terms: TaxonomyTerm[],
  param: string,
): TaxonomyTerm | undefined {
  const slug = getCanonicalParam(param);
  return terms.find((term) => term.slug === slug);
}

export function getTaxonomyTermByName(
  terms: TaxonomyTerm[],
  name: string,
): TaxonomyTerm | undefined {
  return terms.find((term) => term.slug === stringToSlug(name));
}

/**
 * Returns terms connected to the selected archive. Direct co-occurrence is
 * preferred; categories also fall back to shared tags so single-category posts
 * still lead readers to genuinely connected subjects.
 */
export function getRelatedTaxonomyTerms({
  posts,
  sourceKind,
  sourceTerm,
  targetKind,
  limit = 8,
}: {
  posts: BlogPost[];
  sourceKind: TaxonomyKind;
  sourceTerm: string;
  targetKind: TaxonomyKind;
  limit?: number;
}): TaxonomyTerm[] {
  const sourceTerms = getTaxonomyTerms(posts, sourceKind);
  const selectedTerm = getTaxonomyTermByName(sourceTerms, sourceTerm);

  if (!selectedTerm) {
    return [];
  }

  const targetTerms = getTaxonomyTerms(posts, targetKind);
  const sourceSlug = selectedTerm.slug;
  const scores = new Map<string, number>();

  selectedTerm.posts.forEach((post) => {
    const postTerms = new Set(getPostTerms(post, targetKind).map(stringToSlug));

    postTerms.forEach((slug) => {
      if (sourceKind === targetKind && slug === sourceSlug) {
        return;
      }

      scores.set(slug, (scores.get(slug) || 0) + 1);
    });
  });

  // Every current post has one category. When categories do not directly
  // co-occur, use shared tags to connect the category archive to its nearest
  // neighboring subjects instead of showing an arbitrary fallback.
  if (scores.size === 0 && sourceKind === 'category' && targetKind === 'category') {
    const sourceTagSlugs = new Set(
      selectedTerm.posts.flatMap((post) => post.tags.map(stringToSlug)),
    );

    targetTerms.forEach((term) => {
      if (term.slug === sourceSlug) {
        return;
      }

      const candidateTagSlugs = new Set(
        term.posts.flatMap((post) => post.tags.map(stringToSlug)),
      );
      const score = Array.from(candidateTagSlugs)
        .filter((tag) => sourceTagSlugs.has(tag))
        .length;

      if (score > 0) {
        scores.set(term.slug, score);
      }
    });
  }

  return targetTerms
    .filter((term) => scores.has(term.slug))
    .sort((a, b) => (
      (scores.get(b.slug) || 0) - (scores.get(a.slug) || 0)
      || b.count - a.count
      || a.name.localeCompare(b.name)
    ))
    .slice(0, limit);
}
