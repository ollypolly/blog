export async function loadPostComponents(slug: string) {
  try {
    const postComponents = await import(`../../public/posts/${slug}/components.tsx`);
    return postComponents;
  } catch (e: any) {
    if (!e || e.code !== 'MODULE_NOT_FOUND') {
      throw e;
    }
    return {};
  }
}