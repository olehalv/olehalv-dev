import { BookIcon } from '@sanity/icons/Book';
import { CogIcon } from '@sanity/icons/Cog';
import { DocumentIcon } from '@sanity/icons/Document';
import { DocumentsIcon } from '@sanity/icons/Documents';
import { HomeIcon } from '@sanity/icons/Home';
import { UserIcon } from '@sanity/icons/User';
import type { StructureResolver } from 'sanity/structure';

export const singletonTypes = new Set(['siteSettings', 'homePage']);

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Home page')
        .icon(HomeIcon)
        .child(S.document().schemaType('homePage').documentId('homePage')),
      S.listItem()
        .title('Pages')
        .icon(DocumentsIcon)
        .child(S.documentTypeList('page').title('Pages')),
      S.divider(),
      S.documentTypeListItem('project').title('Projects').icon(DocumentIcon),
      S.documentTypeListItem('experience').title('Experience').icon(UserIcon),
      S.documentTypeListItem('education').title('Education').icon(BookIcon),
      S.divider(),
      S.listItem()
        .title('Site settings')
        .icon(CogIcon)
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
    ]);
