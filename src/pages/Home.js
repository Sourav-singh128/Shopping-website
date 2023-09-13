import React from "react";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
  RefinementList,
  Pagination,
} from "react-instantsearch";
import CustomSearchBox from "../components/SearchBar";
const searchClient = algoliasearch(
  "H1FZXKRHXX",
  "14adfa55f4c883ca70173580ae3caf14"
);

function Hit({ hit }) {
  console.log("hits ", hit);
  return (
    <article>
      <img src={hit.image} alt={hit.title} style={{ maxWidth: "5%" }} />
      {/* <h1>{hit.title}</h1> */}
      <h1>
        <Highlight attribute="title" hit={hit} />
      </h1>
      <p>
        <Highlight attribute="description" hit={hit} />
      </p>
      {/* <p>{hit.price}</p> */}
    </article>
  );
}
const Home = () => {
  return (
    <div style={{ textAlign: "center" }}>
      Home
      <InstantSearch indexName="shopping-web" searchClient={searchClient}>
        {/* <SearchBox /> */}
        <CustomSearchBox />
        <Hits hitComponent={Hit} />
        <RefinementList
          attribute="brand"
          searchable={true}
          searchablePlaceholder="Search brands"
        />
        <Pagination totalPages={2} />
      </InstantSearch>
    </div>
  );
};

export default Home;
