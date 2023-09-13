const algoliasearch = require("algoliasearch/lite");
const data = [
  {
    title: "shirt and paints",
    description: "Shirt and paints for daily casaul use. long lasting",
    image:
      "https://cdn.sanity.io/images/8lfrht2u/production/6fce944ac50cbdd56e2c25ce13f2fd9a08b0c75d-3064x4592.jpg",
    likes: 11,
    sales: 28,
    categories: ["dress", "fancy", "laundary"],
    brand: "flying-Machine",
  },
  {
    title: "IPhone",
    description: "Iphone 14 with latest features, high resolution camera long",
    image:
      "https://cdn.sanity.io/images/8lfrht2u/production/9d134764f4a030d168624e6e172f1f32e179b996-4000x6000.jpg",
    likes: 19,
    sales: 218,
    categories: ["gadgets", "Mobile"],
    brand: "Apple",
  },
  {
    title: "OnePlus",
    description:
      "OnePlus creates premium, user-centric technology that challenges market conventions and the industry status quo. Founded in 2013 around the bold Never Settle mantra, OnePlus consistently creates premium devices and software that provide the best user experience possible.",
    image:
      "https://cdn.sanity.io/images/8lfrht2u/production/bf88603ef3ac1f7fc919004be7cb589fec794383-6000x4000.jpg",
    likes: 15,
    sales: 118,
    categories: ["gadgets", "Mobile"],
    brand: "One-Plus",
  },
  {
    title: "NikeShoe",
    description:
      "Buy this nike shoe, light weight shoe, gives you felling of flying in the air,fit for runnig, gym, spoart.",
    image:
      "https://cdn.sanity.io/images/8lfrht2u/production/99b15b86bf42103d24e7f43daf824bc64f399529-5472x3648.jpg",
    likes: 115,
    sales: 418,
    categories: ["Shoes"],
    brand: "Nike",
  },
];
const client = algoliasearch("H1FZXKRHXX", "14adfa55f4c883ca70173580ae3caf14");
const index = client.initIndex("shopping-web");

const clearRecords = async () => {
  const rec = await index.clearObjects();
  console.log("records deleted ", rec);
  insertIntoIndex();
};

const searchableAttri = async () => {
  const searchAtt = await index.setSettings({
    searchableAttributes: ["title", "description"],
    attributesForFaceting: ["brand"],
  });
  console.log(searchAtt);
};
const insertIntoIndex = async () => {
  const res = await index.saveObjects(data, {
    autoGenerateObjectIDIfNotExist: true,
  });
  console.log(res);
  searchableAttri();
};
clearRecords();
