import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  type?: 'website' | 'article' | 'business.business';
  business?: {
    name: string;
    description?: string;
    address?: string;
    phone?: string;
    category?: string;
    image?: string;
    rating?: number;
    reviewCount?: number;
    latitude?: number;
    longitude?: number;
    priceRange?: string;
  };
  article?: {
    title: string;
    description: string;
    image?: string;
    author?: string;
    publishedTime?: string;
  };
}

export function SEOHead({
  title = 'Kasaragod Hub — Discover Local Businesses & Experts',
  description = 'Find verified businesses, hire local experts, and explore the best of Kasaragod district. The #1 digital directory for Kerala\'s northernmost district.',
  url,
  image = '/assets/logo/kasaragodHub-og.png',
  type = 'website',
  business,
  article,
}: SEOHeadProps) {
  const siteUrl = 'https://kasaragodhub.com';
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const fullTitle = title.includes('Kasaragod Hub') ? title : `${title} | Kasaragod Hub`;

  // Build JSON-LD structured data
  const jsonLd: any[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Kasaragod Hub',
      url: siteUrl,
      description,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${siteUrl}/directory?search={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  ];

  // LocalBusiness structured data
  if (business) {
    const localBusiness: any = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: business.name,
      description: business.description || '',
      telephone: business.phone,
      image: business.image,
    };

    if (business.address) {
      localBusiness.address = {
        '@type': 'PostalAddress',
        streetAddress: business.address,
        addressLocality: 'Kasaragod',
        addressRegion: 'Kerala',
        addressCountry: 'IN',
      };
    }

    if (business.latitude && business.longitude) {
      localBusiness.geo = {
        '@type': 'GeoCoordinates',
        latitude: business.latitude,
        longitude: business.longitude,
      };
    }

    if (business.rating && business.reviewCount) {
      localBusiness.aggregateRating = {
        '@type': 'AggregateRating',
        ratingValue: business.rating,
        reviewCount: business.reviewCount,
        bestRating: 5,
      };
    }

    if (business.priceRange) {
      localBusiness.priceRange = business.priceRange;
    }

    jsonLd.push(localBusiness);
  }

  // Article structured data
  if (article) {
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.description,
      image: article.image,
      author: {
        '@type': 'Organization',
        name: article.author || 'Kasaragod Hub',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Kasaragod Hub',
        logo: { '@type': 'ImageObject', url: `${siteUrl}/assets/logo/kasaragodHub-logo.png` },
      },
      datePublished: article.publishedTime,
      mainEntityOfPage: { '@type': 'WebPage', '@id': fullUrl },
    });
  }

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={image.startsWith('http') ? image : `${siteUrl}${image}`} />
      <meta property="og:site_name" content="Kasaragod Hub" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image.startsWith('http') ? image : `${siteUrl}${image}`} />

      {/* JSON-LD Structured Data */}
      {jsonLd.map((data, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
}
