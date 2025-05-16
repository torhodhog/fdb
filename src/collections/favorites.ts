import { CollectionConfig } from 'payload/types';

const Favorites: CollectionConfig = {
  slug: 'favorites',
  admin: {
    useAsTitle: 'user',
  },
  access: {
    create: ({ req: { user } }) => {
      // Du må være innlogget for å opprette en favoritt
      return Boolean(user);
    },
    delete: ({ req: { user } }) => {
      // Kan bare slettes av den som opprettet favoritten 
      return Boolean(user);
    },
    read: ({ req: { user } }) => {
      if (!user) return false;
    
      return {
        user: {
          equals: user.id,
        },
      };
    },
    
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'product',
      type: 'relationship',
      relationTo: 'products',
      required: true,
    },
  ],
};

export default Favorites;