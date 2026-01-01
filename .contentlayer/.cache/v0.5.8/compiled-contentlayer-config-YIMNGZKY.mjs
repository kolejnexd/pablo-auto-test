// contentlayer.config.ts
import { defineDocumentType, defineNestedType, makeSource } from "contentlayer2/source-files";
import readingTime from "reading-time";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
var LOCALES = ["de", "pl", "en"];
var CLUSTERS = ["roadside", "buying", "selling", "logistics", "mobility"];
var CATEGORY_SLUG = {
  de: {
    roadside: "pannenhilfe",
    buying: "ratgeber-kauf",
    selling: "autoankauf",
    logistics: "logistik-recht",
    mobility: "mobilitaet"
  },
  pl: {
    roadside: "pomoc-drogowa",
    buying: "poradnik-kupujacy",
    selling: "sprzedaz-skup",
    logistics: "logistyka-przepisy",
    mobility: "wynajem-mobilnosc"
  },
  en: {
    roadside: "roadside-assistance",
    buying: "buying-guide",
    selling: "car-selling",
    logistics: "logistics-law",
    mobility: "mobility-rental"
  }
};
var FAQItem = defineNestedType(() => ({
  name: "FAQItem",
  fields: {
    q: { type: "string", required: true },
    a: { type: "string", required: true }
  }
}));
var BlogPost = defineDocumentType(() => ({
  name: "BlogPost",
  filePathPattern: `blog/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    date: { type: "date", required: true },
    updated: { type: "date", required: false },
    locale: { type: "enum", options: [...LOCALES], required: true },
    cluster: { type: "enum", options: [...CLUSTERS], required: true },
    slug: { type: "string", required: true },
    translationKey: { type: "string", required: false },
    heroImage: { type: "string", required: false },
    tags: { type: "list", of: { type: "string" }, required: false },
    takeaways: { type: "list", of: { type: "string" }, required: false },
    faq: {
      type: "list",
      required: false,
      of: FAQItem
    },
    draft: { type: "boolean", required: false, default: false },
    featured: { type: "boolean", required: false, default: false },
    author: { type: "string", required: false, default: "Pablo e.U." }
  },
  computedFields: {
    categorySlug: {
      type: "string",
      resolve: (doc) => CATEGORY_SLUG[doc.locale][doc.cluster]
    },
    url: {
      type: "string",
      resolve: (doc) => {
        const locale = doc.locale;
        const categorySlug = CATEGORY_SLUG[locale][doc.cluster];
        const prefix = locale === "de" ? "" : `/${locale}`;
        return `${prefix}/blog/${categorySlug}/${doc.slug}`;
      }
    },
    readingTime: {
      type: "number",
      resolve: (doc) => Math.ceil(readingTime(doc.body.raw).minutes)
    },
    headings: {
      type: "json",
      resolve: (doc) => {
        const regX = /\n(?<flag>#{1,6})\s+(?<content>.+)/g;
        const headings = Array.from(doc.body.raw.matchAll(regX)).map(({ groups }) => {
          const flag = groups?.flag;
          const content = groups?.content;
          return {
            depth: flag ? flag.length : 1,
            text: content,
            slug: content ? content.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "") : ""
          };
        });
        return headings;
      }
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "content",
  documentTypes: [BlogPost],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: "wrap" }]
    ]
  }
});
export {
  BlogPost,
  FAQItem,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-YIMNGZKY.mjs.map
