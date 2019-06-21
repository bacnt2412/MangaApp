import Realm from 'realm';
export const MANGA_SCHEMA = 'MangaSchema';
export const CHAPTER_SCHEMA = 'ChapterSchema';
export const IMAGE_SCHEMA = 'ImageSchema';

export const ChapterSchema = {
  name: CHAPTER_SCHEMA,
  primaryKey: '_id',
  properties: {
    _id: { type: 'string' },
    idmanga: { type: 'string' },
    name: { type: 'string' },
    link: { type: 'string' },
    created: { type: 'date', default: Date.now() },
    viewers: { type: 'int' },
    listImage: {
      type: 'list',
      objectType: IMAGE_SCHEMA
    }
  }
};

export const MangaSchema = {
  name: MANGA_SCHEMA,
  primaryKey: '_id',
  properties: {
    _id: 'string',
    name: { type: 'string' },
    category: { type: 'string' },
    author: { type: 'string' },
    status: {
      type: 'string',
      default: 'Updating'
    },
    description: {
      type: 'string',
      default: ''
    },
    viewers: {
      type: 'int',
      default: 0
    },
    folowers: {
      type: 'int',
      default: 0
    },
    rating: {
      type: 'int',
      default: 0
    },
    thumbnail: { type: 'string' },
    link: { type: 'string' },
    latestChapter: {
      type: 'string',
      default: 'Updating'
    },
    created: {
      type: 'date',
      default: Date.now()
    },
    updated: {
      type: 'date',
      default: Date.now()
    },
    listChapter: {
      type: 'list',
      objectType: CHAPTER_SCHEMA
    }
  }
};

export const ImageSchema = {
  name: IMAGE_SCHEMA,
  primaryKey: '_id',
  properties: {
    _id: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    link: {
      type: 'string'
    },
    idchapter: {
      type: 'string'
    }
  }
};

const realmDataOptions = {
  path: 'realmData.realm',
  schema: [MangaSchema, ChapterSchema, ImageSchema],
  schemaVersion: 7
};

export const insertManga = newManga =>
  new Promise((resolve, reject) => {
    Realm.open(realmDataOptions)
      .then(realm => {
        realm.write(() => {
          realm.create(MANGA_SCHEMA, newManga);
          resolve(newManga);
        });
      })
      .catch(error => reject(error));
  });

export const deleteManga = idManga =>
  new Promise((resolve, reject) => {
    Realm.open(realmDataOptions)
      .then(realm => {
        realm.write(() => {
          let deleteManga = realm.objectForPrimaryKey(MANGA_SCHEMA, idManga);
          realm.delete(deleteManga);
          resolve();
        });
      })
      .catch(error => reject(error));
  });

export const getManga = () =>
  new Promise((resolve, reject) => {
    Realm.open(realmDataOptions)
      .then(realm => {
        let mangas = realm.objects(MANGA_SCHEMA);
        resolve(mangas);
      })
      .catch(error => reject(error));
  });

export const insertListChapter = (idManga, listChapter) =>
  new Promise((resolve, reject) => {
    Realm.open(realmDataOptions)
      .then(realm => {
        let manga = realm.objectForPrimaryKey(MANGA_SCHEMA, idManga);
        realm.write(() => {
          for (var item of listChapter) {
            manga.listChapter.push(item);
          }
        });
        resolve(listChapter);
      })
      .catch(error => reject(error));
  });

export const insertListImage = (idChapter, listImage) =>
  new Promise((resolve, reject) => {
    Realm.open(realmDataOptions)
      .then(realm => {
        let chapter = realm.objectForPrimaryKey(CHAPTER_SCHEMA, idChapter);
        realm.write(() => {
          for (var item of listImage) {
            chapter.listImage.push(item);
          }
        });
        resolve(listImage);
      })
      .catch(error => reject(error));
  });
