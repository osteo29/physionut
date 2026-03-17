import {useEffect} from 'react';
import {applySeo, type SeoConfig} from './seoCore';

export default function Seo(props: SeoConfig) {
  useEffect(() => {
    applySeo(props);
  }, [props.title, props.description, props.canonicalPath, props.ogImage, props.noIndex]);

  return null;
}

