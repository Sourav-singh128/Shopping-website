export default {
  name: 'product',
  type: 'document',
  title: 'Product',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'A Product description',
      name: 'Desc',
      type: 'text',
    },
    {
      title: 'Product Image',
      name: 'prdImage',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'amount',
      type: 'number',
      title: 'Amount',
      validation: (Rule) => Rule.required(),
    },
  ],
}
