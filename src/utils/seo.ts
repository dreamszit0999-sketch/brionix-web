interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
}

export const updateSEO = ({
  title,
  description,
  image,
  url,
  type = 'website',
}: SEOProps): void => {
  // Update page title
  document.title = title;

  // Update/create meta description
  let metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    metaDescription = document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    document.head.appendChild(metaDescription);
  }
  metaDescription.setAttribute('content', description);

  // Update OG tags
  const updateOrCreateMeta = (property: string, content: string): void => {
    let meta = document.querySelector(`meta[property="${property}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('property', property);
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
  };

  updateOrCreateMeta('og:title', title);
  updateOrCreateMeta('og:description', description);
  updateOrCreateMeta('og:type', type);
  if (image) updateOrCreateMeta('og:image', image);
  if (url) updateOrCreateMeta('og:url', url);
};
