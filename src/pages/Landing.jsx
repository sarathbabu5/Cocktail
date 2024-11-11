import axios from "axios";
import React from "react";
import { Outlet, useLoaderData, useParams } from "react-router";
import CocktailList from "../components/CocktailList";
import SearchForm from "../components/SearchForm";
const cocktailSearchUrl =
  "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get("search") || "vodka";

  const response = await axios.get(`${cocktailSearchUrl}${searchTerm}`);

  return { drinks: response.data.drinks, searchTerm };
};

const Landing = () => {
  const { drinks, searchQuery } = useLoaderData();
  // console.log(drinks);
  return (
    <>
      <SearchForm />

      <CocktailList drinks={drinks} />
    </>
  );
};

export default Landing;
